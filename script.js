// Returns random rgb color in string
function getRandomColor() {
    return `rgb(${Math.floor(Math.random() * 256)}, ${Math.floor(Math.random() * 256)}, ${Math.floor(Math.random() * 256)})`;
}

function draw(color) {
    let container = document.querySelector("#container");

    // Simulate dragging effect. Color multiple cells on drag if primary mouse button is clicked.
    container.addEventListener(`mouseover`, (e) => {
        let targetDiv = e.target;
        if (e.buttons == 1) {
            // If some color is given then use that color else generate random colors
            targetDiv.style.backgroundColor = color ?? getRandomColor();
        }
    });

    /* Here mousedown event is used instead of click because 
    mousedown doesn't wait for the mouse keys to be released, 
    hence the user can drag to color multiple cells */
    container.addEventListener(`mousedown`, (e) => {
        let targetDiv = e.target;
        if (e.buttons == 1) {
            // If some color is given then use that color else generate random colors
            targetDiv.style.backgroundColor = color ?? getRandomColor();
        }

    });
}

// Returns an integer for grid size. If user cancels or enters an empty string then returns false
function getGridSize() {
    let size;

    while (!(size > 0 && size <= 50 && size != NaN)) {
        size = prompt("Enter Grid Size of less than 51: ", 12);

        if (size)
            gridSize = parseInt(size);
        else
            return false;
    }

    return true;
}

// Generates grid of current value of global gridSize variable
function generateGrid() {
    let container = document.querySelector("#container");
    container.textContent = "";

    for (let i = 0; i < gridSize; i++) {

        // Creating a div row which will contain 16 divs
        let rowDiv = document.createElement("div");
        rowDiv.setAttribute("class", "row-div");

        for (let j = 0; j < gridSize; j++) {
            // Creatinng column divs
            let columnDiv = document.createElement("div");
            columnDiv.setAttribute("class", "column-div");

            // Setting the size of divs
            columnDiv.style.cssText = `width: ${container.offsetWidth / gridSize}px; height: ${container.offsetHeight / gridSize}px;`;

            // Appending the divs to their respective row
            rowDiv.appendChild(columnDiv);
        }

        // Appending rows each containing 16 divs to the container
        container.appendChild(rowDiv);
    }
}

// Variables
let defaultClr = `rgb(255, 153, 0)`;
let gridSize = 12;

// Adding event listeners to buttons
let gridSizeBtn = document.querySelector("#grid-size-btn");
let changeClrBtn = document.querySelector("#change-clr-btn");
let randomizeClrBtn = document.querySelector("#randomize-clr-btn");
let clearBtn = document.querySelector("#clear-btn");

// Generates a new grid if user has given a valid size.
gridSizeBtn.addEventListener("click", () => {
    if (getGridSize()) {
        generateGrid();
    }
});

// Takes color input and calls addHoverEffect with the selected color
changeClrBtn.addEventListener("click", () => {
    let clrInput = document.createElement("input");
    clrInput.type = "color";

    // Add oninput listener so that selected color will be passed to addHoverEffect()
    clrInput.oninput = () => {
        draw(clrInput.value);
    }

    // Dispatch click event to get user defined color
    clrInput.click();
});

// Randomizes color changes on hover on divs
randomizeClrBtn.addEventListener("click", () => {
    draw();
});

// Generates a new grid of current grid size (stored in global gridSize)
clearBtn.addEventListener("click", () => {
    generateGrid();
});

generateGrid();
draw(defaultClr);