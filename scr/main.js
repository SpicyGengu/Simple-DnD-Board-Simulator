let mySize;
let figures = [];
let isHolding = 0;
let colorPicker;
let inputBox;
let infoButton;
let okButton;
let infoBoxOn = false;
let fps = 300;

function preload() {
  backgroundSkin = loadImage('public/images/Taverna_2K_grid.jpg');
  
}

function setup() {
  createCanvas(windowWidth, windowHeight);
  frameRate(fps);
  mySize = windowHeight * 0.04;

  //constructing the color picker
  colorPicker = createColorPicker('#00FF6E');
  colorPicker.position(0 + mySize * 3.3, 0);
  colorPicker.size(mySize, mySize/2);
  
  //constructing the input box
  inputBox = createInput('enter name here!!!');
  inputBox.position(0, 0);
  inputBox.size(mySize * 3, mySize * 0.4);
  
  infoButton = createButton('info');
  infoButton.position(mySize * 3.3 + mySize * 1.1, 0);
  infoButton.size(mySize, mySize/2);
  infoButton.mousePressed(infoBoxTurnOn);
  
  okButton = createButton('ok');
  okButton.position(windowWidth * -1, windowHeight * -1);
  okButton.mousePressed(infoBoxTurnOff);
  
  imageMode(CENTER);
}

function draw() {
  background(28, 28, 28);
  image(backgroundSkin, windowHeight*1.26/2 + (windowWidth - windowHeight*1.26) / 2, windowHeight/2, windowHeight*1.26, windowHeight);
  if(isHolding <= 0) {
    for(let creature of figures) {
      creature.update();
    }
  }
  
  if(infoBoxOn) {
    push();
    rect(0, mySize, mySize * 5.7, mySize * 5);
    textAlign(LEFT);
    textSize(mySize * 0.4);
    text('To create a figurine simply write its name in the input box above, select its color and press enter. The figurine will then proceed to spawn on top of your mouse button. To delete it just hover over it and press backspace or delete.', mySize * 0.2, mySize * 1.3, mySize * 5.5, mySize * 5);
    okButton.position(mySize * 2.55, mySize * 5.35);
    pop();
  } else {
    okButton.position(windowWidth * -1, windowHeight * -1);
  }
  isHolding = 0;
}

function keyPressed() {
  //keycode 13 is for the enter
  if(keyCode === 13) {
    figures.push(new Creature(mouseX, mouseY, mySize, colorPicker.color(), inputBox.value()));
  }
  //keycode 8 is for backspace and 46 is for delete
  if(keyCode === 8 || keyCode === 46) {
    for(let creature of figures) {
      if(creature.mouseIsInHitbox()) {
        creature.isDeleted = true;
      }
    }
  } 
}

function infoBoxTurnOn() {
  infoBoxOn = true;
}

function infoBoxTurnOff() {
  infoBoxOn = false;
}