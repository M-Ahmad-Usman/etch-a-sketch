// Returns random rgb color in string
function getRandomColor() {
    return `rgb(${Math.floor(Math.random() * 256)}, ${Math.floor(Math.random() * 256)}, ${Math.floor(Math.random() * 256)})`;
}

let container = document.querySelector("#container");

function draw(color) {

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

/* Validates the input and returns an integer for grid size. 
If user cancels or enters an empty string then returns error. */
function getGridSize() {
    let size;

    while (true) {

        size = Number(prompt("Enter the new size of grid. Size cannot be larger than 50.", 12));

        if (size >= 1 && size <= 50)
            return parseInt(size);
        else if (size == null || size == 0)
            throw new Error("User canceled the operation or entered an empty string.");
    }
}

function erase() {

    // Simulate dragging effect. Erase colors in multiple cells on drag if primary mouse button is clicked.
    container.addEventListener(`mouseover`, (e) => {
        let targetDiv = e.target;
        if (e.buttons == 1) {
            targetDiv.style.backgroundColor = "#fff";
        }
    });

    /* Here mousedown event is used instead of click because 
    mousedown doesn't wait for the mouse keys to be released, 
    hence the user can drag to erase multiple cells in one go. */
    container.addEventListener(`mousedown`, (e) => {
        let targetDiv = e.target;
        if (e.buttons == 1) {
            targetDiv.style.backgroundColor = "#fff";
        }

    });
}

// Generates grid of given size.
function generateGrid(size=12) {
    container.textContent = "";

    for (let i = 0; i < size; i++) {

        // Creating a div row which will contain 16 divs
        let rowDiv = document.createElement("div");
        rowDiv.setAttribute("class", "row-div");

        for (let j = 0; j < size; j++) {
            // Creatinng column divs
            let columnDiv = document.createElement("div");
            columnDiv.setAttribute("class", "column-div");

            // Setting the size of divs
            columnDiv.style.cssText = `width: ${container.offsetWidth / size}px; height: ${container.offsetHeight / size}px;`;

            // Appending the divs to their respective row
            rowDiv.appendChild(columnDiv);
        }

        // Appending rows each containing 16 divs to the container
        container.appendChild(rowDiv);
    }
}

// Variables
let defaultClr = `rgb(255, 153, 0)`;

// Adding event listeners to buttons
let gridSizeBtn = document.querySelector("#grid-size-btn");
let changeClrBtn = document.querySelector("#change-clr-btn");
let randomizeClrBtn = document.querySelector("#randomize-clr-btn");
let clearBtn = document.querySelector("#clear-btn");
let eraseBtn = document.querySelector("#erase-btn");

// Generates a new grid if user has given a valid size.
gridSizeBtn.addEventListener("click", () => {
    let size;
    try {
        size = getGridSize();
    } catch (error) {
        return;
    }
    generateGrid(size);

});

// Takes color input and passes the selected color to draw.
changeClrBtn.addEventListener("click", () => {
    let clrInput = document.createElement("input");
    clrInput.type = "color";

    // Add oninput listener so that selected color will be passed to draw()
    clrInput.oninput = () => {
        draw(clrInput.value);
    }

    // Dispatch click event to get user defined color
    clrInput.click();
});

// Randomizes color changes on hover on divs
randomizeClrBtn.addEventListener("click", () => draw());

// Generates a new grid of current grid size (stored in global gridSize)
clearBtn.addEventListener("click", () => generateGrid());

// Erase color. Works in the same way as draw.
eraseBtn.addEventListener("click", () => erase());

generateGrid(12);
draw(defaultClr);