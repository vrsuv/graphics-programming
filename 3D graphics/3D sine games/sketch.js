var confLocs;
var confTheta;

var threshold;
var thresholdSlider;

function setup() {
    createCanvas(900, 800, WEBGL);

    confLocs = [];
    confTheta = [];

    for(var i=0; i<200; i++) {
        var r_x = random(-500, 500);
        var r_y = random(-800, 0);
        var r_z = random(-500, 500);
        var r_v = createVector(r_x, r_y, r_z);
        confLocs.push(r_v);
        var r_a = random(0, 360);
        confTheta.push(r_a);
    }

    // Slider to adjust speed of waviness
    thresholdSlider = createSlider(0, 100, 0);
    thresholdSlider.position(20, 20);
}

function draw() {
    background(125);
    angleMode(DEGREES);

    var xLoc = cos(frameCount/10) * 900;
    var zLoc = sin(frameCount/10) * 900;
    camera(xLoc, -600, zLoc, 0, 0, 0, 0, 1, 0);

    normalMaterial();
    
    stroke(0);
    strokeWeight(2);

    threshold = thresholdSlider.value();

    for(var x = -400; x < 400; x += 50) {
        for(var z = -400; z < 400; z += 50) {
            push();
            ambientMaterial(255);
            pointLight(0, 255, 255, xLoc, 0, 0);
            pointLight(255, 0, 255, 0, 0, zLoc);
            translate(x, 0, z);

            if(threshold >= 0)
            {
                var distance = dist(0, 0, x, z) + frameCount/4;
                var length = map(sin(distance), -1, 1, 100, 300);
            }

            if(threshold > 25)
            {
                var distance = dist(0, 0, x, z) + frameCount/2;
                var length = map(sin(distance), -1, 1, 100, 300);
            }

            if(threshold > 75)
            {
                var distance = dist(0, 0, x, z) + frameCount;
                var length = map(sin(distance), -1, 1, 100, 300);
            }

            box(50, length, 50);
            pop();
        }
    }

    confetti();
}

function confetti() {
    for(var i=0; i<confLocs.length; i++) {
        push();
        translate(confLocs[i].x, confLocs[i].y, confLocs[i].z);
        rotateX(confTheta[i]);
        plane(15, 15);

        confLocs[i].y += 1;
        confTheta[i] += 10;

        if(confLocs[i].y > 0) {
            confLocs[i].y = -800;
        }

        pop();
    }
}