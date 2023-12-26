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
      const tableBody = document.getElementById('user-input-table');
  
      // Create a new row for the table
      const newRow = document.createElement('tr');
  
      // Create a cell for vector length
      const vectorLengthCell = document.createElement('td');
      vectorLengthCell.textContent = inputValue;
      newRow.appendChild(vectorLengthCell);
  
      // Create a cell for rotation speed
      const rotationSpeedCell = document.createElement('td');
      newRow.appendChild(rotationSpeedCell);
  
      // Create a new input element for rotation speed
      const rotationSpeedInput = document.createElement('input');
      rotationSpeedInput.type = 'number';
      rotationSpeedInput.placeholder = 'Enter rotation speed';
      rotationSpeedCell.appendChild(rotationSpeedInput);
  
      // Append the new row to the table body
      tableBody.appendChild(newRow);
  
      // Add the new length to the array
      vectorLengths.push(Number(inputValue));
  
      // Add a corresponding point with (length, 0) coordinates
      points.push(new Point(Number(inputValue), 0));
    }
  }
  
function addRotationSpeed() {
    const rotationSpeedValue = document.getElementById('rotationSpeed').value;
    const tableBody = document.getElementById('user-input-table');
    const lastRow = tableBody.lastChild;
  
    if (rotationSpeedValue !== '' && lastRow) {
      // Find the rotation speed cell in the last row
      const rotationSpeedCell = lastRow.lastChild;
  
      // Create a new input element for rotation speed
      const rotationSpeedInput = document.createElement('input');
      rotationSpeedInput.type = 'number';
      rotationSpeedInput.value = rotationSpeedValue;
      rotationSpeedInput.disabled = true;
  
      // Append the new input element to the rotation speed cell
      rotationSpeedCell.appendChild(rotationSpeedInput);
  
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
