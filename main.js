const canvasWidth = 1000;
const canvasHeight = 1000;

let vectorLengths = [];
let rotationSpeeds = [];
let points = [];

let currentFrame = 0;
let endPointPath = [];


function setup() {
    const canvas = createCanvas(canvasWidth, canvasHeight);
    frameRate(20);
    canvas.parent('canvas-container');
    positionUserInput(); // Call the function to position the user input

}


function positionUserInput() {
  const userInputContainer = document.getElementById('user-input-container');
  userInputContainer.style.display = 'flex'; // Use flexbox to arrange columns horizontally
  userInputContainer.style.gap = '20px'; // Adjust the gap between columns as needed

  // Position the user input form
  const userForm = document.querySelector('.user-input-form');
  userForm.style.flex = '1'; // Adjust flex property as needed
  userForm.style.marginRight = '20px'; // Add margin to the right to create space

  const formX = window.innerWidth / 4 + 1000; // X position for the user input form (centered horizontally)
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
        const rowIndex = newRow.rowIndex;
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
    vectorLengths.splice(index - 1, 1);
    rotationSpeeds.splice(index - 1, 1);
}




function draw() {
  background(255);

  endPointPath = [];

  drawGrid(20, 20);

  let x = width / 2;
  let y = height / 2;

  fill(0);
  noStroke();
  ellipse(width / 2, height / 2, 10, 10);

  stroke(0);

  for (let i = 0; i < vectorLengths.length; i++) {
    let n = i * 2 + 1;

    let radius = vectorLengths[i];
    let speed = radians(rotationSpeeds[i]);

    let px = x;
    let py = y;

    x += radius * cos(n * currentFrame * speed);
    y += radius * sin(n * currentFrame * speed);

    stroke(0);
    line(prevX, prevY, x, y);
    ellipse(prevX, prevY, 5, 5);
  }

  // Store only the endpoint of the last vector in the path array
  endPointPath.push(createVector(x, y));

  // Highlight the path traced out by the endpoint of the last vector
  stroke(0, 255, 0);
  for (let i = 1; i < endPointPath.length; i++) {
    line(endPointPath[i - 1].x, endPointPath[i - 1].y, endPointPath[i].x, endPointPath[i].y);
  }

  // Draw the permanent paths
  noFill();
  beginShape();
  for (const point of endPointPath) {
    vertex(point.x, point.y);
  }
  endShape();

  fill(0);
  ellipse(x, y, 10, 10);

  currentFrame++;
}

function drawGrid(spacingX, spacingY) {
  stroke(200);
  strokeWeight(1);

  for (let x = 0; x <= width; x += spacingX) {
    line(x, 0, x, height);
  }

  for (let y = 0; y <= height; y += spacingY) {
    line(0, y, width, y);
  }
}