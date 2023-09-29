class Spaceship {

  constructor(){
    this.velocity = new createVector(0, 0);
    this.location = new createVector(width/2, height/2);
    this.acceleration = new createVector(0, 0);
    this.maxVelocity = 5;
    this.bulletSys = new BulletSystem();
    this.size = 45;

  }

  applyForce(f){
    this.acceleration.add(f);
  }

  setNearEarth(){
    //YOUR CODE HERE (6 lines approx)
    var gravity = createVector(0, 0.05);
    this.applyForce(gravity);

    var friction = spaceship.velocity.copy();
    friction.mult(-1); //point towards the opp direction
    friction.mult(1/30); //reduce by 30 times
    this.applyForce(friction);
  }

  run(){
    this.bulletSys.run();
    this.draw();
    this.move();
    this.edges();
    this.interaction();
  }

  draw(){
    fill(0, 200, 255);
    stroke(0);
    ellipse(this.location.x, this.location.y - 10, this.size + 20, this.size + 10);
    fill(125);
    ellipse(this.location.x, this.location.y, this.size + 50, this.size);

    fill(0, 200, 255);
    ellipse(this.location.x - 30, this.location.y - 5, 10, 10);
    ellipse(this.location.x - 10, this.location.y - 5, 10, 10);
    ellipse(this.location.x + 10, this.location.y - 5, 10, 10);
    ellipse(this.location.x + 30, this.location.y - 5, 10, 10);

  }

  move(){
    // YOUR CODE HERE (4 lines)
    this.velocity.add(this.acceleration);
    this.velocity.limit(this.maxVelocity);
    this.location.add(this.velocity);
    this.acceleration.mult(-0.1);
  }

  interaction() {
      if (keyIsDown(LEFT_ARROW)){
        this.applyForce(createVector(-0.1, 0));
      }

      if (keyIsDown(RIGHT_ARROW)){
        this.applyForce(createVector(0.1, 0));
      }

      if (keyIsDown(UP_ARROW)){
        this.applyForce(createVector(0, -0.1));
        this.drawThrusts();
      }
      
      if (keyIsDown(DOWN_ARROW)){
        this.applyForce(createVector(0, 0.1));
      }
  }

  fire(){
    this.bulletSys.fire(this.location.x, this.location.y);
  }

  edges(){
    if (this.location.x<0) this.location.x=width;
    else if (this.location.x>width) this.location.x = 0;
    else if (this.location.y<0) this.location.y = height;
    else if (this.location.y>height) this.location.y = 0;
  }

  

  drawThrusts(){
    // jet thrusts
    var nX = noise((frameCount) + this.location.x + this.location.y);
    var mX = map(nX, 0, 1, -10, 10);

    var nY = noise((frameCount * 2) + this.location.x + this.location.y);
    var mY = map(nY, 0, 1, -10, 10);

    var x = this.location.x + mX;
    var y = this.location.y + mY + 30;

    noStroke();
    fill(255, 69, 0);
    ellipse(x - 30, y, 10, 10);
    ellipse(x + 30, y, 10, 10);
    
  }


}
