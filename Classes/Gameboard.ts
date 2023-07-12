import Handler from "./Handler";
import Row from "./Row";

class Gameboard {
    private rows:Row[];
    public element:HTMLDivElement;

    constructor(handler:Handler, nRows:number) {
        this.rows = Array.from({length: nRows}, (_, i) => {
            return new Row(handler, i, nRows);
        });
        this.element = document.createElement("div");
        this.element.id = "gameboard";
        this.element.append(...this.rows.map(row => row.element));
    }
}

export default Gameboard;