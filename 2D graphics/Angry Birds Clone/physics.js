////////////////////////////////////////////////////////////////
function setupGround(){
  ground = Bodies.rectangle(500, 600, 1000, 40, {
    isStatic: true, angle: 0
  });
  World.add(engine.world, [ground]);
}

////////////////////////////////////////////////////////////////
function drawGround(){
  push();
  fill(128);
  drawVertices(ground.vertices);
  pop();
}
////////////////////////////////////////////////////////////////
function setupPropeller(){
  
  propeller = Bodies.rectangle(150, 480, 200, 15, {
    isStatic: true, angle: angle
  });

  World.add(engine.world, [propeller]);
}
////////////////////////////////////////////////////////////////
//updates and draws the propeller
function drawPropeller(){
  push();
  
  Body.setAngle(propeller, angle);
  Body.setAngularVelocity(propeller, angleSpeed);
  angle += angleSpeed;

  fill(128);
  drawVertices(propeller.vertices);
  pop();
}
////////////////////////////////////////////////////////////////
function setupBird(){
  var bird = Bodies.circle(mouseX, mouseY, 20, {friction: 0,
      restitution: 0.95 });
  
  Matter.Body.setMass(bird, bird.mass*10);
  World.add(engine.world, [bird]);
  birds.push(bird);
}
////////////////////////////////////////////////////////////////
function drawBirds(){
  push();
  
  for(var i = 0; i < birds.length; i++) {
    fill(255, 0, 0);
    drawVertices(birds[i].vertices);
  }
  pop();
}
////////////////////////////////////////////////////////////////
//creates a tower of boxes
function setupTower(){
  
  boxes = Composites.stack(500, 180, 3, 4, 0, 0, createOneTowerBrick);

  for(var i = 0; i < boxes.bodies.length; i++) {
    var g = random(100, 200);
    boxes.bodies[i].render.fillStyle = color(g, 100, 30);
  }

  World.add(engine.world, [boxes]);
}

function createOneTowerBrick(x, y) {

  var brickStyle = {fillStyle: "brown", strokeStyle: "black"};
  var boxes = Bodies.rectangle(x, y, 80, 70, {render: brickStyle});
  return boxes;
}

////////////////////////////////////////////////////////////////
//draws tower of boxes
function drawTower(){
  push();
  
  for(var i = 0; i < boxes.bodies.length; i++) {
    fill(boxes.bodies[i].render.fillStyle);
    stroke(boxes.bodies[i].render.strokeStyle);
    drawVertices(boxes.bodies[i].vertices);
  }

  pop();
}

////////////////////////////////////////////////////////////////
//creates a row of pillars above the tower
function setupRow(){
  
  pillars = Composites.stack(510, 100, 3, 1, 20, 0, createOneRowPillar);

  for(var i = 0; i < pillars.bodies.length; i++) {
    var g = random(100, 200);
    pillars.bodies[i].render.fillStyle = color(g, 100, 30);
  }

  World.add(engine.world, [pillars]);
}

function createOneRowPillar(x, y) {

  var pillarStyle = {fillStyle: "brown"};
  var pillars = Bodies.rectangle(x, y, 60, 120, {render: pillarStyle});
  return pillars;
}

////////////////////////////////////////////////////////////////
//draws row of pillars
function drawPillars(){
  push();
  
  for(var i = 0; i < pillars.bodies.length; i++) {
    fill(pillars.bodies[i].render.fillStyle);
    drawVertices(pillars.bodies[i].vertices);
  }

  pop();
}

////////////////////////////////////////////////////////////////
//creates a extra objects on tower
function setupObjects(){
  
  objects = Composites.stack(520, 0, 3, 1, 30, 0, createObjects);

  for(var i = 0; i < objects.bodies.length; i++) {
    var g = random(170, 255);
    objects.bodies[i].render.fillStyle = color(255, g, 0);
  }

  World.add(engine.world, [objects]);
}

function createObjects(x, y) {

  var objectStyle = {fillStyle: "gold"};
  // var objects = Bodies.circle(x, y, 25, {render: objectStyle, mass:0});
  var objects = Bodies.polygon(x, y, 7, 27, {render: objectStyle, mass:0});
  return objects;
}

////////////////////////////////////////////////////////////////
//draws extra objects
function drawObjects(){
  push();
  
  for(var i = 0; i < objects.bodies.length; i++) {
    fill(objects.bodies[i].render.fillStyle);
    drawVertices(objects.bodies[i].vertices);
  }

  pop();
}

////////////////////////////////////////////////////////////////
// draw physical obstacles 
function setUpObstacles(){
  obstacles = Composites.stack(370, 140, 1, 3, 0, 80, createOneObstacle);

  World.add(engine.world, [obstacles]);

}

function createOneObstacle(x, y){
  var woodStyle = {fillStyle: "brown", strokeStyle: "brown"};
  var obstacles = Bodies.rectangle(x, y, 15, 80, {render: woodStyle, 
                                  isStatic: true, 
                                  angle: angle});
  return obstacles;
}

function drawObstacles(){
  push();
  
  for(var i = 0; i < obstacles.bodies.length; i++) {
    fill(obstacles.bodies[i].render.fillStyle);
    stroke(obstacles.bodies[i].render.strokeStyle);
    drawVertices(obstacles.bodies[i].vertices);
    Body.setAngle(obstacles.bodies[i], angle);
    Body.setAngularVelocity(obstacles.bodies[i], angleSpeed);
    angle += angleSpeed;
  }

  pop();
}
////////////////////////////////////////////////////////////////
function setupSlingshot(){
  
  slingshotBird = Bodies.circle(180, 180, 20, {restitution:0.9, friction:0, mass: 10});

  var constraint_prop = {pointA: {x:200, y:200},
                        bodyB: slingshotBird,
                        pointB: {x:0, y:0},
                        stiffness: 0.01,
                        damping: 0.0001};
  slingshotConstraint = Constraint.create(constraint_prop);

  World.add(engine.world, [slingshotBird, slingshotConstraint]);
}
////////////////////////////////////////////////////////////////
//draws slingshot bird and its constraint
function drawSlingshot(){
  push();
  
  drawVertices(slingshotBird.vertices);
  drawConstraint(slingshotConstraint);
  pop();
}
/////////////////////////////////////////////////////////////////
function setupMouseInteraction(){
  var mouse = Mouse.create(canvas.elt);
  var mouseParams = {
    mouse: mouse,
    constraint: { stiffness: 0.05 }
  }
  mouseConstraint = MouseConstraint.create(engine, mouseParams);
  mouseConstraint.mouse.pixelRatio = pixelDensity();
  World.add(engine.world, mouseConstraint);
}
