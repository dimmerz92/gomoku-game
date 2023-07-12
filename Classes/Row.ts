import Cell from "./Cell";

class Row {
    id:number;
    cells:Cell[];
    element:HTMLDivElement;

    constructor(id:number, nCells:number) {
        this.id = id;
        this.cells = Array.from({length: nCells}, (_, i) => {
            const cellId = nCells * id + i;
            return new Cell(cellId);
        });
        this.element = document.createElement("div");
        this.element.classList.add("row");
        this.element.append(...this.cells.map(cell => cell.element));
    }

}

export default Row;