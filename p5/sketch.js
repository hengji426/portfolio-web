let shupingwidth = 400;
let hengpingwidth =400;

let slider;
// Define the Gradient class
class Gradient {
  constructor() {
    // Set properties for the gradient object
    if(windowWidth>992){
      this.rectwidth = hengpingwidth;
    }else{
      this.rectwidth = shupingwidth;
    }
    // this.rectwidth =slider.value();
    this.posx = random(0, windowWidth);
    this.posy = random(0, windowHeight);
    this.rectrotate = random(0, PI);
    this.rotatev = random(0, PI / 180);

    this.dx = random(-2, 2);
    this.dy = random(-2, 2);
    this.sc = color(random(255), random(255), random(255), random(100, 200));
    this.ec = color(random(255), random(255), random(255), 0);
  }
  
  // Method to update the position of the gradient object
  updatepos() {
    this.posx += this.dx;
    this.posy += this.dy;
    if (this.posx > windowWidth || this.posx < 0) {
      this.dx = -this.dx;
    }
    if (this.posy > windowHeight || this.posy < 0) {
      this.dy = -this.dy;
    }
    this.rectrotate += this.rotatev;
  }

  // Method to draw the gradient rectangle
  drawrect() {
    push();
    
    translate(this.posx, this.posy);
    fill(0);
    // circle(0,0,50);
    gradient = drawingContext.createLinearGradient(0, 0, this.rectwidth, 0);
    gradient.addColorStop(0, this.sc);
    gradient.addColorStop(1, this.ec);
    drawingContext.fillStyle = gradient;
    rotate(this.rectrotate);
    let rectheight = windowHeight*3;
    rect(0, -rectheight/2 , this.rectwidth, rectheight);
    rotate(PI);
    rect(0, -rectheight/2, this.rectwidth, rectheight);
    pop();
  }
  getslide(){
    this.rectwidth =slider.value();
  }
}

// Initialize variables and arrays
let gradient;
let grads = [];
const container = document.querySelector('.content');
const item = document.querySelector('.header');
const distance =800;
container.addEventListener('scroll', function(){
  
  // print(container.scrollTop);
  let video1 = document.getElementById('video1');
  let num1 = container.scrollTop-windowHeight;
// print(num1);
  let video2 = document.getElementById('video2');
  let num2 = container.scrollTop-windowHeight*2;


  
  if (num1 > -1 && num1 < windowHeight) {
    video1.play();
  } else {
    video1.pause();
  }
  if (num2 > -1 && num2 < windowHeight) {
    video2.play();
  } else {
    video2.pause();
  }

});

container.addEventListener('DOMContentLoaded', setTimeout(function() { scroll(); }, 3000));

function scroll(){
  container.scrollIntoView({ behavior: 'smooth' })
    container.scrollTop += distance;
    print(container.scrollTop);
  
  
}

function setup() {
  createCanvas(windowWidth, windowHeight);
  background(255);
  noStroke();

  // slider = createSlider(0, 500);
  // slider.position(10, 10);
  // slider.size(80);
  
  // Create instances of the Gradient class and store in array
  for (let i = 0; i <5; i++) {
    grads[i] = new Gradient();
  }
}

function draw() {
  createCanvas(windowWidth, windowHeight);
  background(255);

  // Update and draw each gradient object
  for (let i of grads) {
    i.updatepos();
    // i.getslide();
    i.drawrect();
  }
  push();
  rectMode(CENTER);
  textSize(320);
  text('FanYi Qu',windowWidth/2,windowHeight/2,200,200);
pop();

}

function windowResized() {
  resizeCanvas(windowWidth, windowHeight);
  if(windowWidth>992){
    for (let i of grads) {
      i.rectwidth = hengpingwidth;
    }
  }else{
    for (let i of grads) {
      i.rectwidth = shupingwidth;
    }
  }

}


