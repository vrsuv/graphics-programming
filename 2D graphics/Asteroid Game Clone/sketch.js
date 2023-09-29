var spaceship;
var asteroids;
var atmosphereLoc;
var atmosphereSize;
var earthLoc;
var earthSize;
var starLocs = [];

var game_score;

//////////////////////////////////////////////////
function setup() {
  createCanvas(1200,800);
  spaceship = new Spaceship();
  asteroids = new AsteroidSystem();

  //location and size of earth and its atmosphere
  atmosphereLoc = new createVector(width/2, height*2.9);
  atmosphereSize = new createVector(width*3, width*3);
  earthLoc = new createVector(width/2, height*3.1);
  earthSize = new createVector(width*3, width*3);

  game_score = 0;
}

//////////////////////////////////////////////////
function draw() {
  background(0);
  sky();

  spaceship.run();
  asteroids.run();

  drawEarth();

  // function that checks collision between various elements
  checkCollisions(spaceship, asteroids);

  drawGameScore();
}

//////////////////////////////////////////////////
//draws earth and atmosphere
function drawEarth(){
  noStroke();
  //draw atmosphere
  fill(0,0,255, 50);
  ellipse(atmosphereLoc.x, atmosphereLoc.y, atmosphereSize.x,  atmosphereSize.y);
  //draw earth
  fill(100,255);
  ellipse(earthLoc.x, earthLoc.y, earthSize.x, earthSize.y);
}

function drawGameScore(){
  fill(255);
  noStroke();
  text("Number of asteroids hit: " + game_score, 20, 35);
  textSize(25);
}

//////////////////////////////////////////////////
//checks collisions between all types of bodies
function checkCollisions(spaceship, asteroids){
    //asteroid-2-earth collisions
    for(var i = 0; i < asteroids.locations.length; i++) {
      var asteroidLoc = asteroids.locations[i];
      var asteroidDiam = asteroids.diams[i];
      var r = isInside(asteroidLoc, asteroidDiam, earthLoc, earthSize.y);
      if (r) {
        gameOver();
      }
    }
    //spaceship-2-earth
    var r = isInside(spaceship.location, spaceship.size, earthLoc, earthSize.y);
    if (r) {
      gameOver();
    }
    //spaceship-2-asteroid collisions
    for(var i = 0; i < asteroids.locations.length; i++) {
      var asteroidLoc = asteroids.locations[i];
      var asteroidDiam = asteroids.diams[i];
      var r = isInside(asteroidLoc, asteroidDiam, 
                      spaceship.location, spaceship.size + 30);
      if (r) {
        gameOver();
      }
    }
    //spaceship-2-atmosphere
    var r = isInside(spaceship.location, spaceship.size,
                    atmosphereLoc, atmosphereSize.y);
    if (r) {
      spaceship.setNearEarth();
    }
    //bullet collisions
    var bulletSys = spaceship.bulletSys;
    var bullets = bulletSys.bullets;
    for(var i = 0; i < bullets.length; i++) {
      for(var j = 0; j < asteroids.locations.length; j++) {
        var asteroidLoc = asteroids.locations[j];
        var asteroidDiam = asteroids.diams[j];
        var r = isInside(asteroidLoc, asteroidDiam,
                          bullets[i], bulletSys.diam);
        if (r) {
          asteroids.destroy(j);
          game_score++;
        }
      }
    }
}

//////////////////////////////////////////////////
//helper function checking if there's collision between object A and object B
function isInside(locA, sizeA, locB, sizeB){
  
  var d = dist(locA.x, locA.y, locB.x, locB.y);
  var maxDist = (sizeA/2 + sizeB/2);
  if (maxDist < d) {
    return false;
  }else {
    return true;
  }
}

//////////////////////////////////////////////////
function keyPressed(){
  if (keyIsPressed && keyCode === 32){ // if spacebar is pressed, fire!
    spaceship.fire();
  }
}

//////////////////////////////////////////////////
// function that ends the game by stopping the loops and displaying "Game Over"
function gameOver(){
  push();
  fill(255);
  textSize(80);
  textAlign(CENTER);
  text("GAME OVER", width/2, height/2)
  noLoop();

  fill(255);
  textSize(25);
  textAlign(CENTER);
  text("You have hit " + game_score + " asteroids.", width/2, height/2 + 45)
  noLoop();
  pop();
}

//////////////////////////////////////////////////
// function that creates a star lit sky
function sky(){
  push();
  while (starLocs.length<300){
    starLocs.push(new createVector(random(width), random(height)));
  }
  fill(255);
  for (var i=0; i<starLocs.length; i++){
    rect(starLocs[i].x, starLocs[i].y,2,2);
  }

  if (random(1)<0.3) starLocs.splice(int(random(starLocs.length)),1);
  pop();
}
