class Grid {
    /////////////////////////////////
    constructor(_w, _h) {
        this.gridWidth = _w;
        this.gridHeight = _h;

        /***********************/  
        this.noteSize = 40;
        this.notePos = [];
        this.noteState = [];
        /***********************/ 
        this.notes = [];

        // initalise grid structure and state
        Note.noteSize = 40;
        console.log(Note.noteSize);
        for (var x=0;x<_w;x+=Note.noteSize){
            var posColumn = [];
            var stateColumn = [];
            for (var y=0;y<_h;y+=Note.noteSize){
                posColumn.push(createVector(x+Note.noteSize/2,y+Note.noteSize/2));
                stateColumn.push(0);
            }
              
            this.notes.push(new Note(posColumn,stateColumn));
        }
    }
    /////////////////////////////////
    run(img) {
        img.loadPixels();
        this.findActiveNotes(img);
        this.drawActiveNotes(img);
    }
    /////////////////////////////////
    drawActiveNotes(img){
        // draw active notes
        fill(255);
        noStroke();

        /***********************/ 
        for (var i=0;i<this.notePos.length;i++){
            for (var j=0;j<this.notePos[i].length;j++){
                var x = this.notePos[i][j].x;
                var y = this.notePos[i][j].y;
                if (this.noteState[i][j]>0) {
                    var alpha = this.noteState[i][j] * 200;
                    var c1 = color(255,0,0,alpha);
                    var c2 = color(0,255,0,alpha);
                    var mix = lerpColor(c1, c2, map(i, 0, this.notePos.length, 0, 1));
                    fill(mix);
                    var s = this.noteState[i][j];
                    // triangle(x - (this.noteSize*s)/2, y + (this.noteSize*s)/2, 
                    //         this.noteSize*s, y - (this.noteSize*s)/2, 
                    //         x + (this.noteSize*s)/2, y + (this.noteSize*s)/2);
                    rect(x - (this.noteSize*s)/2, y - (this.noteSize*s)/2, this.noteSize*s, this.noteSize*s);
                    // ellipse(x, y, this.noteSize*s, this.noteSize*s);
                }
                this.noteState[i][j]-=0.05;
                this.noteState[i][j]=constrain(this.noteState[i][j],0,1);
            }
        }

        /***********************/  
        for (var i=0;i<this.notes.length;i++){
            //console.log(this.notes[i]);
            var notePos = this.notes[i].notePos;
            var noteState = this.notes[i].noteState;
            var noteSize = Note.noteSize;
            for (var j=0;j<notePos.length;j++){
                var x = notePos[j].x;
                var y = notePos[j].y;
                 if (noteState[j]>0) {
                    var alpha = noteState[j] * 200;
                    var c1 = color(255,0,0,alpha);
                    var c2 = color(0,255,0,alpha);
                    var mix = lerpColor(c1, c2, map(i, 0, notePos.length, 0, 1));
                    fill(mix);
                    var s = noteState[j];
                    // triangle(x - (Note.noteSize*s)/2, y + (Note.noteSize*s)/2, 
                    //         Note.noteSize*s, y - (Note.noteSize*s)/2, 
                    //         x + (Note.noteSize*s)/2, y + (Note.noteSize*s)/2);
                    rect(x - (Note.noteSize*s)/2, y - (Note.noteSize*s)/2, Note.noteSize*s, Note.noteSize*s);
                    // ellipse(x, y, Note.noteSize*s, Note.noteSize*s);
                 }
                noteState[j]-=0.05;
                noteState[j]=constrain(noteState[j],0,1);
            }   
        }
    }
    /////////////////////////////////
    findActiveNotes(img){
        for (var x = 0; x < img.width; x += 1) {
            for (var y = 0; y < img.height; y += 1) {
                var index = (x + (y * img.width)) * 4;
                var state = img.pixels[index + 0];
                if (state==0){ // if pixel is black (ie there is movement)
                    // find which note to activate
                    var screenX = map(x, 0, img.width, 0, this.gridWidth);
                    var screenY = map(y, 0, img.height, 0, this.gridHeight);
                    var i = int(screenX/Note.noteSize);
                    var j = int(screenY/Note.noteSize);
                    this.notes[i].noteState[j] = 1;
                }
            }
        }
    }
}
