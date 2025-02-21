let container = document.querySelector("#container");
const gridSize = 16;

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