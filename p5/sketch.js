let shupingwidth = 400;
let hengpingwidth =400;

let slider;
// Define the Gradient class
class Gradient {
  constructor() {
    // Set properties for the gradient object
    if(windowWidth>768){  // 将阈值改为768px
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
    colorMode(HSB); // 设置颜色模式为HSB
    this.sc = color(random(360), random(20,100), random(70, 100), random(100, 200));
    this.ec = color(random(360), random(20,100), random(70, 100), 0);
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
  shupingwidth = windowWidth * 0.8;  // 更新宽度值
  hengpingwidth = windowWidth * 0.5;
  if(windowWidth>768){  // 保持一致的阈值
    for (let i of grads) {
      i.rectwidth = hengpingwidth;
    }
  }else{
    for (let i of grads) {
      i.rectwidth = shupingwidth;
    }
  }

}


