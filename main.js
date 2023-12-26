const canvasWidth = 800;
const canvasHeight = 600;

let vectorLengths = [];
let rotationSpeeds = [];
let points = [];
let currentFrame = 0;

function setup() {
  const canvas = createCanvas(canvasWidth, canvasHeight);
  frameRate(20);
  canvas.parent('canvas-container');
  positionUserInput();
}

function positionUserInput() {
  const userInputContainer = document.getElementById('user-input-container');
  userInputContainer.style.display = 'flex';
  userInputContainer.style.gap = '20px';

  const userForm = document.querySelector('.user-input-form');
  userForm.style.flex = '1';
  userForm.style.marginRight = '20px';

  const formX = window.innerWidth / 4 + 1000;
  const formY = 100;
  userForm.style.position = 'absolute';
  userForm.style.left = formX + 'px';
  userForm.style.top = formY + 'px';
}

function addValue() {
  const inputValue = document.getElementById('userInput').value;
  if (inputValue !== '') {
    vectorLengths.push(Number(inputValue));
    const tableBody = document.getElementById('user-input-table');
    const newRow = tableBody.insertRow();
    const vectorLengthCell = newRow.insertCell(0);
    const rotationSpeedCell = newRow.insertCell(1);
    vectorLengthCell.textContent = inputValue;
    rotationSpeedCell.textContent = '';
    document.getElementById('userInput').value = '';
    setDeleteButton(newRow);
  }
}

function addUserInput() {
  const vectorLengthInput = document.getElementById('vectorLength').value;
  const rotationSpeedInput = document.getElementById('rotationSpeed').value;

  if (vectorLengthInput !== '' && rotationSpeedInput !== '') {
    vectorLengths.push(Number(vectorLengthInput));
    rotationSpeeds.push(Number(rotationSpeedInput));
    const tableBody = document.getElementById('user-input-table');
    const newRow = tableBody.insertRow();
    const vectorLengthCell = newRow.insertCell(0);
    const rotationSpeedCell = newRow.insertCell(1);
    vectorLengthCell.textContent = vectorLengthInput;
    rotationSpeedCell.textContent = rotationSpeedInput;
    document.getElementById('vectorLength').value = '';
    document.getElementById('rotationSpeed').value = '';
    setDeleteButton(newRow);
  }
}

function setDeleteButton(row) {
  const deleteButton = document.createElement('button');
  deleteButton.textContent = 'Delete';
  deleteButton.onclick = function() {
    deleteUserInput(row);
  };

  const deleteCell = row.insertCell(2);
  deleteCell.appendChild(deleteButton);
}

function addRotationSpeed() {
  const rotationSpeedValue = document.getElementById('rotationSpeed').value;
  const tableBody = document.getElementById('user-input-table');
  const lastRow = tableBody.lastChild;

  if (rotationSpeedValue !== '' && lastRow) {
    const rotationSpeedCell = lastRow.lastChild;
    const rotationSpeedInput = document.createElement('input');
    rotationSpeedInput.type = 'number';
    rotationSpeedInput.value = rotationSpeedValue;
    rotationSpeedInput.disabled = true;
    rotationSpeedCell.appendChild(rotationSpeedInput);
    rotationSpeeds.push(Number(rotationSpeedValue));
  }
}

function deleteUserInput(row) {
  const rowIndex = row.rowIndex - 1;
  row.remove();
  vectorLengths.splice(rowIndex, 1);
  rotationSpeeds.splice(rowIndex, 1);
}

function draw() {
  background(255);
  drawGrid(20, 20);

  let x = width / 2;
  let y = height / 2;

  fill(0);
  noStroke();
  ellipse(width / 2, height / 2, 10, 10);

  for (let i = 0; i < vectorLengths.length; i++) {
    let prevX = x;
    let prevY = y;

    let n = i * 2 + 1;

    let radius = vectorLengths[i];
    let speed = radians(rotationSpeeds[i]);

    x += radius * cos(n * currentFrame * speed);
    y += radius * sin(n * currentFrame * speed);

    stroke(0);
    line(prevX, prevY, x, y);
    ellipse(prevX, prevY, 5, 5);
  }

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