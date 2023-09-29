// Image of Husky Creative commons from Wikipedia:
// https://en.wikipedia.org/wiki/Dog#/media/File:Siberian_Husky_pho.jpg

var imgIn;

var matrix = [
    [1/64, 1/64, 1/64, 1/64, 1/64, 1/64, 1/64, 1/64],
    [1/64, 1/64, 1/64, 1/64, 1/64, 1/64, 1/64, 1/64],
    [1/64, 1/64, 1/64, 1/64, 1/64, 1/64, 1/64, 1/64],
    [1/64, 1/64, 1/64, 1/64, 1/64, 1/64, 1/64, 1/64],
    [1/64, 1/64, 1/64, 1/64, 1/64, 1/64, 1/64, 1/64],
    [1/64, 1/64, 1/64, 1/64, 1/64, 1/64, 1/64, 1/64],
    [1/64, 1/64, 1/64, 1/64, 1/64, 1/64, 1/64, 1/64],
    [1/64, 1/64, 1/64, 1/64, 1/64, 1/64, 1/64, 1/64]
];
/////////////////////////////////////////////////////////////////
function preload() {
    imgIn = loadImage("assets/husky.jpg");
}
/////////////////////////////////////////////////////////////////
function setup() {
    createCanvas((imgIn.width * 2), imgIn.height);
}
/////////////////////////////////////////////////////////////////
function draw() {
  background(125);
  image(imgIn, 0, 0);
  image(earlyBirdFilter(imgIn), imgIn.width, 0);

  if(key == "n")
  {
    image(newFilterImp(imgIn), imgIn.width, 0);
  }
  
  noStroke();
  textSize(20);
  text("1. click anywhere on the image to focus on that spot.", 20, 30)
  text("2. click 'n' and then click anywhere on the image for a new filter.", 20, 55);
  noLoop();

}
/////////////////////////////////////////////////////////////////
function mousePressed(){
  loop();
}
/////////////////////////////////////////////////////////////////
function earlyBirdFilter(img){
  var resultImg = createImage(imgIn.width, imgIn.height);

  resultImg = sepiaFilter(resultImg);
  resultImg = darkCorners(resultImg);
  resultImg = radialBlurFilter(resultImg);
  resultImg = borderFilter(resultImg);

  return resultImg;
}

function newFilterImp(img) {
  var resultImg = createImage(imgIn.width, imgIn.height);
  resultImg = newFilter(img);
  return resultImg;
}

function sepiaFilter(resultImg) {
  imgIn.loadPixels();
  resultImg.loadPixels();

  for(var x=0; x<resultImg.width; x++) {
    for(var y=0; y<resultImg.height; y++) {
      var pixelIndex = ((resultImg.width * y) + x) * 4;
      var oldRed   = imgIn.pixels[pixelIndex + 0];
      var oldGreen = imgIn.pixels[pixelIndex + 1];
      var oldBlue  = imgIn.pixels[pixelIndex + 2];

      newRed = (oldRed * .393) + (oldGreen *.769) + (oldBlue * .189);
      newGreen = (oldRed * .349) + (oldGreen *.686) + (oldBlue * .168);
      newBlue = (oldRed * .272) + (oldGreen *.534) + (oldBlue * .131);

      resultImg.pixels[pixelIndex + 0] = newRed;
      resultImg.pixels[pixelIndex + 1] = newGreen;
      resultImg.pixels[pixelIndex + 2] = newBlue;
      resultImg.pixels[pixelIndex + 3] = 255;
    }
  }
  resultImg.updatePixels();
  return resultImg;
}

function darkCorners(resultImg) {
  var midX = resultImg.width/2;
  var midY = resultImg.height/2;
  var maxDist = abs(dist(0, 0, midX, midY));

  for(var x=0; x<resultImg.width; x++) {
    for(var y=0; y<resultImg.height; y++) {
      var d = abs(dist(x, y, midX, midY));

      if(d >= 300) {
        var pixelIndex = ((resultImg.width * y) + x) * 4;
        var oldRed   = imgIn.pixels[pixelIndex + 0];
        var oldGreen = imgIn.pixels[pixelIndex + 1];
        var oldBlue  = imgIn.pixels[pixelIndex + 2];
        var dynLum = 1;

        if(d < 450) { //300 to 449
          dynLum = map(d, 300, 450, 1, 0.4);
        }
        else {
          dynLum = map(d, 450, maxDist, 0.4, 0);
        }

        var newRed   = oldRed * dynLum;
        var newGreen = oldGreen * dynLum;
        var newBlue  = oldBlue * dynLum;

        resultImg.pixels[pixelIndex + 0] = newRed;
        resultImg.pixels[pixelIndex + 1] = newGreen;
        resultImg.pixels[pixelIndex + 2] = newBlue;
      }
    }
  }
  resultImg.updatePixels();
  return resultImg;
}

function radialBlurFilter(resultImg) {
  for(var x=0; x<resultImg.width; x++) {
    for(var y=0; y<resultImg.height; y++) {
      var pixelIndex = ((resultImg.width * y) + x) * 4;
      var oldRed   = resultImg.pixels[pixelIndex + 0];
      var oldGreen = resultImg.pixels[pixelIndex + 1];
      var oldBlue  = resultImg.pixels[pixelIndex + 2];

      //c[0] => red, c[1] => green, c[2] => blue
      var c = convolution(x, y, matrix, matrix.length, resultImg);

      var mouseDist = abs(dist(x, y, mouseX, mouseY));
      var dynBlur = map(mouseDist, 100, 300, 0, 1);
      dynBlur = constrain(dynBlur, 0, 1); //so dynBlur is always btw 0 and 1

      var newRed   = c[0]*dynBlur + oldRed*(1-dynBlur);
      var newGreen = c[1]*dynBlur + oldGreen*(1-dynBlur);
      var newBlue  = c[2]*dynBlur + oldBlue*(1-dynBlur);

      resultImg.pixels[pixelIndex + 0] = newRed;
      resultImg.pixels[pixelIndex + 1] = newGreen;
      resultImg.pixels[pixelIndex + 2] = newBlue;
    }
  }
  resultImg.updatePixels();
  return resultImg;
}

function borderFilter(resultImg) {
  // Draw the img onto the buffer.
  var buffer = createGraphics(resultImg.width, resultImg.height);
  buffer.image(resultImg, 0, 0, resultImg.width, resultImg.height);

  // Draw a big, fat, white rectangle with rounded corners around the image. 
  buffer.noFill();
  buffer.stroke(255);
  buffer.strokeWeight(20);
  buffer.rect(0, 0, resultImg.width, resultImg.height, 50);

  // Draw another rectangle now, without rounded corners, in order to 
  // get rid of the little triangles so you end up with the image below. 
  // at the end of the function.
  buffer.rect(0, 0, resultImg.width, resultImg.height);

  return buffer;
}

function convolution(x, y, matrix, matrixSize, img) {
  var totalRed = 0.0;
  var totalGreen = 0.0;
  var totalBlue = 0.0;
  var offset = floor(matrixSize / 2);

  // convolution matrix loop
  for (var i = 0; i < matrixSize; i++) {
    for (var j = 0; j < matrixSize; j++) {
      // Get pixel loc within convolution matrix
      var xloc = x + i - offset;
      var yloc = y + j - offset;
      var index = (xloc + img.width * yloc) * 4;
      // ensure we don't address a pixel that doesn't exist
      index = constrain(index, 0, img.pixels.length - 1);

      // multiply all values with the mask and sum up
      totalRed   += img.pixels[index + 0] * matrix[i][j];
      totalGreen += img.pixels[index + 1] * matrix[i][j];
      totalBlue  += img.pixels[index + 2] * matrix[i][j];
    }
  }

  // return the new color as an array
  return [totalRed, totalGreen, totalBlue];
}

function newFilter(resultImg) {
  imgIn.loadPixels();
  resultImg.loadPixels();

  for(var x=0; x<resultImg.width; x++) {
    for(var y=0; y<resultImg.height; y++) {
      var pixelIndex = ((resultImg.width * y) + x) * 4;
      var oldRed   = imgIn.pixels[pixelIndex + 0];
      var oldGreen = imgIn.pixels[pixelIndex + 1];
      var oldBlue  = imgIn.pixels[pixelIndex + 2];

      newRed   = (oldRed * .5) + (oldGreen *.7) + (oldBlue * .1);
      newGreen = (oldRed * .3) + (oldGreen *.6) + (oldBlue * .1);
      newBlue  = (oldRed * .2) + (oldGreen *.5) + (oldBlue * .1);

      resultImg.pixels[pixelIndex + 0] = newRed;
      resultImg.pixels[pixelIndex + 1] = newGreen;
      resultImg.pixels[pixelIndex + 2] = newBlue;
      resultImg.pixels[pixelIndex + 3] = 255;
    }
  }
  resultImg.updatePixels();
  return resultImg;
  
}