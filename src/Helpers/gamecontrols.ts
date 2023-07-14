export default function gamecontrols():HTMLDivElement {
    // parent div for game controls
    const gamecontrols = document.createElement("div");
    gamecontrols.id = "gamecontrols";

    const blackDiv = document.createElement("div");
    blackDiv.id = "black";
    gamecontrols.appendChild(blackDiv);

    // parent div for interactive elements
    const buttons = document.createElement("div");
    buttons.id = "buttons";

    // parent div for grid size selectors
    const gridsize = document.createElement("div");
    gridsize.id = "gridsize";

    // iteratively add grid size selectors
    for (let i of [5,7,9,11]) {
        const selector = document.createElement("div");
        selector.id = String(i);
        selector.classList.add("sizeselector");
        selector.textContent = `${i}x${i}`;
        selector.addEventListener("click", () => {
            selectGridSize(i);
        });
        gridsize.appendChild(selector);
    }

    buttons.appendChild(gridsize);
    const newgame = document.createElement("button");
    newgame.id = "newgame";
    newgame.textContent = "New Game";
    buttons.appendChild(newgame);
    gamecontrols.appendChild(buttons);

    const whiteDiv = document.createElement("div");
    whiteDiv.id = "white";
    gamecontrols.appendChild(whiteDiv);

    return gamecontrols;
}

// applies the selected id to the selected html element
function selectGridSize(size:number):void {
    const sizeElements = document.getElementById("gridsize")?.children;
    for (let i = 0; sizeElements && i < sizeElements?.length; i++) {
        sizeElements[i].classList.remove("selected");
    }
    document.getElementById(String(size))?.classList.add("selected");
}