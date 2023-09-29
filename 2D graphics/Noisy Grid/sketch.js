var stepSize = 20;

function setup() {
  createCanvas(900, 600);
  background(255);
}
///////////////////////////////////////////////////////////////////////
function draw() {
  background(125);

  colorGrid();
  compassGrid();
}
///////////////////////////////////////////////////////////////////////
function colorGrid(){
  
  fill(255);
  var green = color(0, 255, 0);
  var blue = color(0, 0, 255);

  for(var x = 0; x < 25; x++)
  {
    for(var y = 0; y < 25; y++)
    {
      var tx = (x*5 + frameCount - mouseX) * 0.005;
      var ty = (y*10 + frameCount) * 0.005;
      var n = noise(tx, ty);
      var c = lerpColor(green, blue, n);

      fill(c);
      noStroke();
      rect(x*20, y*20, stepSize, stepSize);
    }
  }
}
///////////////////////////////////////////////////////////////////////
function compassGrid(){

  var factorX = map(mouseX, 0, width, 0, 5);
  console.log(factorX);
  
  for(var x = 0; x < 25; x++)
  {
    for(var y = 0; y < 25; y++)
    {
      push();

      translate(x*stepSize+stepSize/2, y*stepSize+stepSize/2);

      var tx = (x*2 + frameCount/2 * factorX) * 0.01;
      var ty = (y*2 + frameCount/2) * 0.01;
      var n = noise(tx, ty);

      var a = map(n,0,1,0,720);
      rotate(radians(a));
      
      stroke(0);
      strokeWeight(2.5);
      var length = map(mouseY, 0, height, 0, 10);
      line(0, -stepSize/2.5, 0, length);

      pop();
    }
  }
}
