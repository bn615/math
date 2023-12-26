const canvasWidth = 800;
const canvasHeight = 600;

let vectorLengths = [];
let rotationSpeeds = [];
let points = [];

let currentFrame = 0;


function setup() {
    const canvas = createCanvas(canvasWidth, canvasHeight);
    canvas.parent('canvas-container');
    
    setInterval(draw, 10);
    positionUserInput(); // Call the function to position the user input

}

function positionUserInput() {
    const userInputContainer = document.getElementById('user-input-container');
    userInputContainer.style.display = 'flex'; // Use flexbox to arrange columns horizontally
    userInputContainer.style.gap = '20px'; // Adjust the gap between columns as needed
  
    // Position the user input form
    const userForm = document.querySelector('.user-input-form');
    userForm.style.flex = '1'; // Adjust flex property as needed
  
    const formX = window.innerWidth / 4; // X position for the user input form (centered horizontally)
    const formY = 100; // Y position for the user input above the coordinates header
    userForm.style.position = 'absolute';
    userForm.style.left = formX + 'px';
    userForm.style.top = formY + 'px';
  }

function addValue() {
  const inputValue = document.getElementById('userInput').value;
  if (inputValue !== '') {
    // Add vector length to the array
    vectorLengths.push(Number(inputValue));

    // Add a new row to the user input table
    const tableBody = document.getElementById('user-input-table');
    const newRow = tableBody.insertRow();

    // Add cells to the new row
    const vectorLengthCell = newRow.insertCell(0);
    const rotationSpeedCell = newRow.insertCell(1);

    // Set the text content of the cells
    vectorLengthCell.textContent = inputValue;
    rotationSpeedCell.textContent = ''; // Leave rotation speed cell empty

    // Clear the input value
    document.getElementById('userInput').value = '';
  }
}

function addUserInput() {
    const vectorLengthInput = document.getElementById('vectorLength').value;
    const rotationSpeedInput = document.getElementById('rotationSpeed').value;
  
    if (vectorLengthInput !== '' && rotationSpeedInput !== '') {
      // Add vector length and rotation speed to their respective arrays
      vectorLengths.push(Number(vectorLengthInput));
      rotationSpeeds.push(Number(rotationSpeedInput));
  
      // Add a new row to the user input table
      const tableBody = document.getElementById('user-input-table');
      const newRow = tableBody.insertRow();
  
      // Add cells to the new row
      const vectorLengthCell = newRow.insertCell(0);
      const rotationSpeedCell = newRow.insertCell(1);
  
      // Set the text content of the cells
      vectorLengthCell.textContent = vectorLengthInput;
      rotationSpeedCell.textContent = rotationSpeedInput;
  
      // Add a button to delete the row
      const deleteButton = document.createElement('button');
      deleteButton.textContent = 'Delete';
      deleteButton.onclick = function() {
        // Get the index of the row and delete it
        const rowIndex = newRow.rowIndex - 1; // Subtract 1 to account for the header row
        deleteUserInput(rowIndex);
      };
  
      // Add the delete button to the row
      const deleteCell = newRow.insertCell(2);
      deleteCell.appendChild(deleteButton);
  
      // Clear the input values
      document.getElementById('vectorLength').value = '';
      document.getElementById('rotationSpeed').value = '';
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


function deleteUserInput(index) {
    // Remove the selected row from the table
    const tableBody = document.getElementById('user-input-table');
    tableBody.deleteRow(index);
  
    // Remove the corresponding values from the arrays
    vectorLengths.splice(index, 1);
    rotationSpeeds.splice(index, 1);
}
function draw() {
    // Ensure that the arrays have the same length
    if (vectorLengths.length !== rotationSpeeds.length) {
      console.error('Vector lengths and rotation speeds arrays must have the same length.');
      return;
    }
  
    // Clear the canvas on each frame
    background(255);
  
    // Update cumulPoint based on the current frame
    let cumulPoint = new Point(0, 0);
    let cumulAngle = 0;
  
    for (let i = 0; i < points.length; i++) {
      cumulPoint = Point.rotate(cumulPoint, cumulPoint.add(points[i]), rotationSpeeds[i] * currentFrame / 100 + cumulAngle);
      cumulAngle += rotationSpeeds[i];
    }
  
    // Your drawing logic goes here using cumulPoint
    fill(0);
    ellipse(cumulPoint.x, cumulPoint.y, 10, 10);
  
    // Increment the frame counter
    currentFrame++;
  }
