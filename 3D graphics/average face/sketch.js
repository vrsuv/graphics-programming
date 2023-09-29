var img;
var imgs = [];
var avgImg;
var numOfImages = 30;
var loadCounter = 0;

//////////////////////////////////////////////////////////
function preload() { // preload() runs once
    for(var i=0; i<numOfImages; i++) {
        img = loadImage("assets/" + i + ".jpg", imageLoadSuccess);
        imgs.push(img);
    }
}

function imageLoadSuccess() {
    loadCounter++;
}

//////////////////////////////////////////////////////////
function setup() {
    createCanvas((imgs[0].width * 2), imgs[0].height);
    pixelDensity(1);
}

//////////////////////////////////////////////////////////
function draw() {
    background(125);
    if(loadCounter != numOfImages) {
        console.log("not ready");
        return;
    }
    console.log("all images loaded, ready for average face!");


    for(var i=0; i<imgs.length; i++) {
        image(imgs[i], 0, 0);
    }

    var avgImg = averageFace(imgs);
    image(avgImg, imgs[0].width, 0);

    keyPressed();
    noLoop();
}

function averageFace(images) {
    console.log("in average face");
    // load the pixels of all images in the array.
    for(var i=0; i<images.length; i++) {
        images[i].loadPixels();
    }

    // create a blank image to store all the ave RGB value
    var imgOut = createImage(images[0].width, 
                            images[0].height);

    imgOut.loadPixels();

    // each row
    for(var y=0; y<imgOut.height; y++) {
        // each col
        for(var x=0; x<imgOut.width; x++) {
            var pixelIndex = ((imgOut.width * y) + x) * 4;

            // compute the average RGB for each pixel for all the images
            var redSum = 0;
            var greenSum = 0;
            var blueSum = 0;

            // go to each image in images to get the RGB value for that pixel
            for(var i=0; i<images.length; i++) {
                var img = images[i];
                redSum += img.pixels[pixelIndex + 0];
                greenSum += img.pixels[pixelIndex + 1];
                blueSum += img.pixels[pixelIndex + 2];
            }

            imgOut.pixels[pixelIndex + 0] = redSum/images.length;
            imgOut.pixels[pixelIndex + 1] = greenSum/images.length;
            imgOut.pixels[pixelIndex + 2] = blueSum/images.length;
            imgOut.pixels[pixelIndex + 3] = 255;
        }
    }

    imgOut.updatePixels();
    return imgOut;
}

function keyPressed() {
    if(key == "R" || key == "r") {
        console.log("refresh");
        for(var i=0; i<imgs.length; i++) {
            image(random(imgs), 0, 0);
        }
    }
}