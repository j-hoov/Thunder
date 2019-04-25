/*
 * getLevel() from the p5.Amplitude object
 * and map it to the ellipse position.
 */

//declare variables
var mic, sound;
var amplitude;
var mapMax = 1.0;
let rx; //rect x coordinate
let ry; //rect y coordinate
let rw; //rect width
let rh; //rect height 
let num_seg;
let shape = [];
let bez_shape = [];
let rotate_speed;
let shape_code; //segment or bezier
let tint_color = 55;
let yoff = 0.0;

function preload() {
  sound = loadSound('assets/thunder.mp3');
  img = loadImage('images/stormy.jpeg');
}

function setup() {
  c = createCanvas(windowWidth, windowHeight);
  c.mouseClicked(togglePlay);
  background(0);
  fill(255);
  noStroke();

  // mic = new p5.AudioIn();
  // mic.start();

  sound.play();

  amplitude = new p5.Amplitude();
  amplitude.setInput(sound);
  amplitude.smooth(0.8); 

  rx = 0;
  ry = 0;
  rw = 100;
  rh = 100;
  num_seg = 1;
  shape_code = 0; //default object displayed is Seg
  createCanvas(windowWidth, windowHeight);  
}

function draw() {
  //alpha blended background
  // fill(0,10);
  // noStroke();
  // rect(0,0,width,height); 
  ms = millis();
  tint_color = map(ms,0,187000,0,255);
  // tint(tint_color,69,255);
  tint(tint_color, 40);
  image(img,0,0,windowWidth,windowHeight);
  
  //perlin noise lightning shape
  stroke(255,map(ms,0,187000,255,133),160);
  for(let i=1; i<=5; i+=1){
    noFill();
    strokeWeight(1);
    beginShape();
    let xoff = 0; // 2D Noise
    // Iterate over vertical pixels
    for (let y = 0; y <= height; y += 2) {
      let x = map(noise(xoff, yoff), 0, 1, (width/6*i)-map(ms,0,187000,0,200), (width/6*i)+map(ms,0,187000,0,200)); // Calculate x value according to noise, map to 2D Noise
      vertex(x,y);    // Set the vertex
      xoff += 0.01; // Increment x dimension for noise
    }
    yoff += 0.05;  // increment y dimension for noise
    endShape(CLOSE);
  }

  // noFill();
  //   strokeWeight(1);
  //   beginShape();
  //   let xoff = 0; // 2D Noise
  //   // Iterate over vertical pixels
  //   for (let y = 0; y <= height; y += 2) {
  //     let x = map(noise(xoff, yoff), 0, 1, (width/2)-map(ms,0,187000,0,200), (width/2)+map(ms,0,187000,0,200)); // Calculate x value according to noise, map to 2D Noise
  //     vertex(x,y);    // Set the vertex
  //     xoff += 0.01; // Increment x dimension for noise
  //   }
  //   yoff += 0.05;  // increment y dimension for noise
  //   endShape(CLOSE);
  

  //determine dimensions with audio
  var level = amplitude.getLevel();
  rx = map(level, 0, mapMax, 0, 20);
  ry = map(level, 0, mapMax, 0, 20);
  rx = 0;
  ry = 0;
  rw = map(level, 0, mapMax, 0, 500);
  rh = map(level, 0, mapMax, 0, 1000);
  num_seg = map(level, 0, mapMax, 0, 150);

  // // map ellipse height
  fill(50,100);
  stroke(200);
  strokeWeight(1);
  var ellipseHeight = map(level, 0, mapMax, height, 0);
  ellipse(width/2, 0, 1.3*ellipseHeight, ellipseHeight);
  
  //invisible rectangle 
  noStroke();
  noFill();
 
  //rotate rectangle every frame
  rotate_speed = frameCount/(1/(.1*(mouseX+8))); //rotation speed based on mouseX
  if(frameCount % 1 == 0){
    //translate(width/2,height/2);
    translate(width/2,0);
    rotate(radians(rotate_speed % 360));
    rect(rx,ry,rw,rh);
  }

  //fill shape array with Seg objects, fill bez_shape array with Bez objects
  for(i=0; i<num_seg; i++){
    shape[i] = new Seg(this.x1,this.y1,this.x2,this.y2,this.shade,this.stroke);
    bez_shape[i] = new Bez(this.x1,this.y1,this.x2,this.y2,this.x3,this.y3,this.x4,this.y4);
  }

  //decide whether to display Seg or Bez depending on keycode "S" or "B"
  if(keyCode == 83){
    shape_code = 0;
  }
  if(keyCode == 66){
    shape_code = 1;
  }
  for(i=0; i<num_seg; i++){
    if(shape_code == 0){
      shape[i].display();
    }
    if(shape_code == 1){
      bez_shape[i].display();
    }
  }

}

// fade sound if mouse is clicked
function togglePlay() {
  if (sound.isPlaying()) {
    sound.pause();
  } else {
    sound.loop();
  }
}


//establish Seg class - dimensions based on rectangle
class Seg {
  constructor() {
    this.x1 = rx;
    this.y1 = ry+i*(rh/num_seg);
    this.x2 = rx+rw;
    this.y2 = ry+i*(rh/num_seg);
    this.shade = map(ms,0,187000,255,133); //shade based on mouse height
    this.stroke = 5;
  }  

//display Seg objects
  display(){
    stroke(map(ms,0,187000,70,255),140,222); //color based on varying green value
    strokeWeight(this.stroke);
    line(this.x1, this.y1, this.x2, this.y2, this.shade, this.stroke);
  
  }

}

//establish Bez class - dimensions based on rectangle
class Bez{
  constructor(){
    this.x1 = rx;
    this.y1 = ry+i*(rh/num_seg);
    this.x2 = this.x1+.75*rw;
    this.y2 = this.y1+.25*rh;
    this.x3 = this.x1+.25*rw;
    this.y3 = this.y1-.25*rh;
    this.x4 = rx+1.25*rw;
    this.y4 = ry+i*(rh/num_seg);
    this.shade = map(mouseY,0,height,50,220); //shade based on mouse height
    this.stroke = 2;
  }

//display Bez objects
  display(){
    stroke(this.shade,210,150); //color based on varying red value
    strokeWeight(this.stroke);
    bezier(this.x1, this.y1, this.x2, this.y2, this.x3, this.y3, this.x4, this.y4, this.shade, this.stroke);
  }
}


/*
//declare variables
let rx; //rect x coordinate
let ry; //rect y coordinate
let rw; //rect width
let rh; //rect height 
let num_seg;
let shape = [];
let bez_shape = [];
let rotate_speed;
let shape_code; //segment or bezier

function setup(){
  rx = 0;
  ry = 0;
  rw = 100;
  rh = 100;
  num_seg = 1;
  shape_code = 0; //default object displayed is Seg
  createCanvas(windowWidth, windowHeight);  
}

function draw(){
//info button
fill(57,100);
stroke(200,20);
strokeWeight(1);
ellipseMode(CENTER);
ellipse(20,20,30,30);
fill(200);
textAlign(CENTER,CENTER);
textSize(20);
text("?",20,20);

//info text to display when mouse hovers over question mark circle
let d = dist(mouseX,mouseY,20,20);
if(d < 30){
  textAlign(LEFT);
  textSize(15);
  noStroke();
  text("move mouse horizontally: change rotation speed",10,50);
  text("move mouse vertically: change color",10,70);
  text("right arrow: increase width",10,90);
  text("left arrow: decrease width",10,110);
  text("up arrow: increase height",10,130);
  text("down arrow: decrease height",10,150);
  text("J: increase number of lines",10,170);
  text("F: decrease number of lines",10,190);
  text("B: change shape to bezier curve",10,210);
  text("S: return shape to line segment",10,230)
}

//alpha blended background
  fill(0,10);
  noStroke();
  rect(0,0,width,height); 

//keypress interaction
if(frameCount % 5 == 0){ //if key is held for more than 5 frames
  if (keyIsDown(70)){
      num_seg -= 1;
  }
  if (keyIsDown(74)){
    num_seg += 1;
  }
  if (keyIsDown(RIGHT_ARROW)){
    rw += 10;
  }
  if (keyIsDown(LEFT_ARROW)){
    rw -= 10;
  }
  if (keyIsDown(UP_ARROW)){
    rh += 10;
  }
  if (keyIsDown(DOWN_ARROW)){
    rh -= 10;
  }
}
  
//invisible rectangle 
  noStroke();
  noFill();
 
//rotate rectangle every frame
  rotate_speed = frameCount/(1/(.1*(mouseX+8))); //rotation speed based on mouseX
  if(frameCount % 1 == 0){
    translate(width/2,height/2);
    rotate(radians(rotate_speed % 360));
    rect(rx,ry,rw,rh);
  }

//fill shape array with Seg objects, fill bez_shape array with Bez objects
  for(i=0; i<num_seg; i++){
    shape[i] = new Seg(this.x1,this.y1,this.x2,this.y2,this.shade,this.stroke);
    bez_shape[i] = new Bez(this.x1,this.y1,this.x2,this.y2,this.x3,this.y3,this.x4,this.y4);
  }

//decide whether to display Seg or Bez depending on keycode "S" or "B"
  if(keyCode == 83){
    shape_code = 0;
  }
  if(keyCode == 66){
    shape_code = 1;
  }
  for(i=0; i<num_seg; i++){
    if(shape_code == 0){
      shape[i].display();
    }
    if(shape_code == 1){
      bez_shape[i].display();
    }
  }
  }


//establish Seg class - dimensions based on rectangle
  class Seg {
    constructor() {
      this.x1 = rx;
      this.y1 = ry+i*(rh/num_seg);
      this.x2 = rx+rw;
      this.y2 = ry+i*(rh/num_seg);
      this.shade = map(mouseY,0,height,50,220); //shade based on mouse height
      this.stroke = 5;
    }  
  
  //display Seg objects
    display(){
      stroke(100,this.shade,300); //color based on varying green value
      strokeWeight(this.stroke);
      line(this.x1, this.y1, this.x2, this.y2, this.shade, this.stroke);
    }

  }

//establish Bez class - dimensions based on rectangle
  class Bez{
    constructor(){
      this.x1 = rx;
      this.y1 = ry+i*(rh/num_seg);
      this.x2 = this.x1+.75*rw;
      this.y2 = this.y1+.25*rh;
      this.x3 = this.x1+.25*rw;
      this.y3 = this.y1-.25*rh;
      this.x4 = rx+1.25*rw;
      this.y4 = ry+i*(rh/num_seg);
      this.shade = map(mouseY,0,height,50,220); //shade based on mouse height
      this.stroke = 2;
    }

  //display Bez objects
    display(){
      stroke(this.shade,210,150); //color based on varying red value
      strokeWeight(this.stroke);
      bezier(this.x1, this.y1, this.x2, this.y2, this.x3, this.y3, this.x4, this.y4, this.shade, this.stroke);
    }
  }

  */
