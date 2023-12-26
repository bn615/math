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
        
        // Add the new point to the array
        arr.push(new Point(0, Number(inputValue))); // Modified to accumulate vertically
    }
}

function draw() {
    const rotatingSpeed = [Math.PI / 6, Math.PI / 6, Math.PI / 6];

    let cumulPoint = new Point(0, 0);
    let cumulAngle = 0;

    for (let i = 0; i < arr.length; i++) {
        cumulPoint = Point.rotate(cumulPoint, cumulPoint.add(arr[i]), rotatingSpeed[i] + cumulAngle);
        cumulAngle += rotatingSpeed[i];
    }
}

function mouseClicked() {
}

function keyPressed() {
}

function startDragging() {

}

function stopDragging() {
}
