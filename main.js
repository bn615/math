const canvasWidth = 800;
const canvasHeight = 600;


function setup() {
    const canvas = createCanvas(canvasWidth, canvasHeight);
    canvas.parent('canvas-container');
    positionUserInput(); // Call the function to position the user input
  }

function positionUserInput() {
    const inputX = windowWidth / 2; // X position for the user input (centered horizontally)
    const inputY = 100; // Y position for the user input above the coordinates header
    const userInput = document.getElementById('userInput');
    userInput.style.position = 'absolute';
    userInput.style.left = inputX + 'px';
    userInput.style.top = inputY + 'px';
  
    const labelX = windowWidth / 2; // X position for the label (centered horizontally)
    const labelY = 70; // Y position for the label above the user input
    const inputLabel = document.getElementById('input-label'); // Assuming you have a label with this id
    inputLabel.style.position = 'absolute';
    inputLabel.style.left = labelX + 'px';
    inputLabel.style.top = labelY + 'px';
  }


function draw() {

}

function mouseClicked() {
}

function keyPressed() {
}

function startDragging() {

}

function stopDragging() {
}
