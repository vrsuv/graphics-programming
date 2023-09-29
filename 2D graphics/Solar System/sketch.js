var speed;

function setup() {
    createCanvas(900, 700);
}


function draw() {
    background(0);
    speed = frameCount;

    // SUN
    push();
    translate(width/2, height/2);
    rotate(radians(speed/3));
    celestialObj(color(255,150,0), 200); // SUN
    pop();

    // EARTH
    push();
    translate(width/2, height/2);
    rotate(radians(speed));

    translate(300, 0);
    rotate(radians(speed));
    celestialObj(color(0,0,200), 80); // EARTH
    pop();

    // MOON
    push();
    translate(width/2, height/2);
    rotate(radians(speed));
    
    translate(300, 0);
    rotate(radians(-speed * 2));

    translate(width/12, height/12);

    celestialObj(color(255), 30); // MOON

    pop();

    //ASTEROID around MOON
    push();
    translate(width/2, height/2);
    rotate(radians(speed));
    
    translate(300, 0);
    rotate(radians(-speed * 2));

    translate(width/12, height/12);
    rotate(radians(-speed * 2));

    translate(width/25, height/25);

    celestialObj(color(238, 75, 43), 20); // ASTEROID

    pop();

    // 2nd MOON
    push();
    translate(width/2, height/2);
    rotate(radians(speed));
    
    translate(300, 0);
    rotate(radians(-speed * 2.5));

    translate(width/8, height/8);

    celestialObj(color(150), 30); // 2nd MOON

    pop();

}

function celestialObj(c, size){
    strokeWeight(5);
    fill(c);
    stroke(0);
    ellipse(0, 0, size, size);
    line(0, 0, size/2, 0);
}
