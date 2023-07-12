export default function gamecontrols():HTMLDivElement {
    // parent div for game controls
    const gamecontrols = document.createElement("div");
    gamecontrols.id = "gamecontrols";

    // parent div for grid size selectors
    const gridsize = document.createElement("div");
    gridsize.id = "gridsize";

    // iteratively add grid size selectors
    for (let i of [5,9,13,17]) {
        const selector = document.createElement("div");
        selector.id = String(i);
        selector.classList.add("sizeselector");
        selector.textContent = `${i}x${i}`;
        selector.addEventListener("click", () => {
            selectGridSize(i);
        });
        gridsize.appendChild(selector);
    }

    gamecontrols.appendChild(gridsize);
    const newgame = document.createElement("button");
    newgame.id = "newgame";
    newgame.textContent = "New Game";
    gamecontrols.appendChild(newgame);

    return gamecontrols;
}

function selectGridSize(size:number):void {
    const sizeElements = document.getElementById("gridsize")?.children;
    for (let i = 0; sizeElements && i < sizeElements?.length; i++) {
        sizeElements[i].classList.remove("selected");
    }
    document.getElementById(String(size))?.classList.add("selected");
}