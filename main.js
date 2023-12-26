const canvasWidth = 800;
const canvasHeight = 600;

let rotationSpeeds = [];
let vectorLengths = [];
let points = [];


function setup() {
    const canvas = createCanvas(canvasWidth, canvasHeight);
    canvas.parent('canvas-container');
    positionUserInput(); // Call the function to position the user input
}

function positionUserInput() {
    const userContainer = document.getElementById('user-input-container');
    userContainer.style.display = 'flex'; // Use flexbox to arrange columns horizontally
    userContainer.style.gap = '20px'; // Adjust the gap between columns as needed
  
    // Position the first user input column
    const firstColumn = document.querySelector('.user-input-column:nth-child(1)');
    firstColumn.style.flex = '1'; // Adjust flex property as needed
  
    const inputX = windowWidth / 4; // X position for the user input column (centered horizontally)
    const inputY = 100; // Y position for the user input above the coordinates header
    firstColumn.style.position = 'absolute';
    firstColumn.style.left = inputX + 'px';
    firstColumn.style.top = inputY + 'px';
  
    // Position the second user input column
    const secondColumn = document.querySelector('.user-input-column:nth-child(2)');
    secondColumn.style.flex = '1'; // Adjust flex property as needed
  
    const rotationSpeedX = (windowWidth / 4) * 3; // X position for the rotation speed column (centered horizontally)
    const rotationSpeedY = 100; // Y position for the rotation speed above the coordinates header
    secondColumn.style.position = 'absolute';
    secondColumn.style.left = rotationSpeedX + 'px';
    secondColumn.style.top = rotationSpeedY + 'px';
  } 


function addValue() {
    const inputValue = document.getElementById('userInput').value;
    if (inputValue !== '') {
      const inputContainer = document.getElementById('input-container');
      
      // Create a new div to contain the input element
      const inputDiv = document.createElement('div');
      inputDiv.style.marginBottom = '10px'; // Adjust the margin as needed
      
      // Create a new input element
      const newInput = document.createElement('input');
      newInput.type = 'number';
      newInput.value = inputValue;
      newInput.disabled = true;
      
      // Append the input element to the div
      inputDiv.appendChild(newInput);
      
      // Append the div to the input container
      inputContainer.appendChild(inputDiv);
      
      // Add the new length to the array
      vectorLengths.push(Number(inputValue));
      
      // Add a corresponding point with (length, 0) coordinates
      points.push(new Point(Number(inputValue), 0));
    }
  }
  
function addRotationSpeed() {
    const rotationSpeedValue = document.getElementById('rotationSpeed').value;
    if (rotationSpeedValue !== '') {
      const rotationSpeedContainer = document.getElementById('rotation-speed-container');
  
      // Create a new div to contain the input element
      const rotationSpeedDiv = document.createElement('div');
      rotationSpeedDiv.style.marginBottom = '10px'; // Adjust the margin as needed
  
      // Create a new input element
      const newRotationSpeed = document.createElement('input');
      newRotationSpeed.type = 'number';
      newRotationSpeed.value = rotationSpeedValue;
      newRotationSpeed.disabled = true;
  
      // Append the input element to the div
      rotationSpeedDiv.appendChild(newRotationSpeed);
  
      // Append the div to the rotation speed container
      rotationSpeedContainer.appendChild(rotationSpeedDiv);
  
      // Add the new rotation speed to the array
      rotationSpeeds.push(Number(rotationSpeedValue));
    }
}
  
function draw() {
    // Ensure that the arrays have the same length
    if (vectorLengths.length !== rotationSpeeds.length) {
      console.error('Vector lengths and rotation speeds arrays must have the same length.');
      return;
    }
  
    let cumulPoint = new Point(0, 0);
    let cumulAngle = 0;
  
    for (let i = 0; i < vectorLengths.length; i++) {
      cumulPoint = Point.rotate(cumulPoint, cumulPoint.add(points[i]), rotationSpeeds[i] + cumulAngle);
      cumulAngle += rotationSpeeds[i];
    }
  
    // Your drawing logic goes here using cumulPoint
}  

function mouseClicked() {
}

function keyPressed() {
}

function startDragging() {

}

function stopDragging() {
}
