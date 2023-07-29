import Cell from "./Cell";
import Handler from "./Handler";

class Row {
    private id:number;
    private cells:Cell[];
    private element:HTMLDivElement;

    constructor(handler:Handler, id:number, nCells:number) {
        this.id = id;
        this.cells = Array.from({length: nCells}, (_, i) => {
            const cellId = nCells * id + i;
            return new Cell(handler, cellId);
        });
        this.element = document.createElement("div");
        this.element.classList.add("row");
        this.element.append(...this.cells.map(cell => cell.getCell));
    }

    get getRows():HTMLDivElement {
        return this.element;
    }

    get getCells():Cell[] {
        return this.cells;
    }
}

export default Row;