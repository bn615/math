const canvasWidth = 1000;
const canvasHeight = 1000;

let vectorLengths = [];
let rotationSpeeds = [];
let cumSpeeds = [0];
let points = [];

let currentFrame = 0;
let setFramerate = 50;
let endPointPath = [];


function setup() {
    const canvas = createCanvas(canvasWidth, canvasHeight);
    frameRate(setFramerate);
    canvas.parent('canvas-container');
    positionUserInput(); 
    TableEventListeners();

}


function positionUserInput() {
  const userInputContainer = document.getElementById('user-input-container');
  userInputContainer.style.display = 'flex'; // Use flexbox to arrange columns horizontally
  userInputContainer.style.gap = '20px'; // Adjust the gap between columns as needed

  // Position the user input form
  const userForm = document.querySelector('.user-input-form');
  userForm.style.flex = '1'; // Adjust flex property as needed
  userForm.style.marginRight = '20px'; // Add margin to the right to create space

  const formX = window.innerWidth * 5 / 6; // X position for the user input form 
  const formY = 100; // Y position for the user input
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
      
      currentFrame = 0;
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
      TableEventListeners();
      endPointPath = [];
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
    
    currentFrame = 0;
  
    // Remove the corresponding values from the arrays
    vectorLengths.splice(index - 1, 1);
    rotationSpeeds.splice(index - 1, 1);
    TableEventListeners();
    endPointPath = [];
}

function TableEventListeners() {
  const table = document.getElementById('user-input-table');
  table.addEventListener('click', function(event) {
    const cell = event.target;
    if (cell.tagName === 'TD') {
      editCellValue(cell);
    }
  });
}
function editCellValue(cell) {
  const currentValue = cell.textContent;
  const input = document.createElement('input');
  input.type = 'text';
  input.value = currentValue;
  input.addEventListener('blur', function() {
    cell.textContent = input.value;
    updateArraysFromTable();
  });

  // Replace the cell content with the input field
  cell.innerHTML = '';
  cell.appendChild(input);
  input.focus();
  currentFrame = 0;
  endPointPath = [];
}

function updateArraysFromTable() {
  vectorLengths = [];
  rotationSpeeds = [];

  const table = document.getElementById('user-input-table');
  const rows = table.rows;
  
  for (let i = 1; i < rows.length; i++) {
    const vectorLengthCell = rows[i].cells[0];
    const rotationSpeedCell = rows[i].cells[1];

    vectorLengths.push(Number(vectorLengthCell.textContent));
    rotationSpeeds.push(Number(rotationSpeedCell.textContent));
  }
}

// Draw function
function draw() {
  background(255);

  cumSpeeds = [0];  


  drawGrid(20, 20);

  let x = width / 2;
  let y = height / 2;
  updateArraysFromTable();
  fill(0);
  noStroke();
  ellipse(width / 2, height / 2, 10, 10);

  stroke(0);
  
  for (let i = 0; i < vectorLengths.length; i++) {
    let radius = vectorLengths[i];
    
    let speed = rotationSpeeds[i];

    
    if((speed > 0 && cumSpeeds[i] >= 0) || (speed < 0 && cumSpeeds[i] <= 0)){
      cumSpeeds.push(cumSpeeds[i] + speed);
    }
    if((speed > 0 && cumSpeeds[i] < 0) || (speed < 0 && cumSpeeds[i] > 0)){
      cumSpeeds.push(speed);
    }
    
    let px = x;
    let py = y;

    x += radius * cos(currentFrame * cumSpeeds[i + 1] / setFramerate);
    y += radius * sin(currentFrame * cumSpeeds[i + 1] / setFramerate);

    stroke(0);
    line(px, py, x, y);
    ellipse(px, py, 5, 5);
  }

  // Store only the endpoint of the last vector in the path array
  endPointPath.push(createVector(x, y));

  
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