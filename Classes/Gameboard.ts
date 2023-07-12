import Row from "./Row";

class Gameboard {
    rows:Row[];
    nRows:number;
    element:HTMLDivElement;

    constructor(nRows:number) {
        this.rows = Array.from({length: nRows}, (_, i) => {
            return new Row(i, nRows);
        });
        this.nRows = nRows - 1;
        this.element = document.createElement("div");
        this.element.id = "gameboard";
        this.element.append(...this.rows.map(row => row.element));
    }
}

export default Gameboard;