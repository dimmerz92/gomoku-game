import Handler from "./Handler";

type Method = () => void;

enum STATUS {
    AVAILABLE = "AVAILABLE",
    OCCUPIED = "OCCUPIED" 
}

class Cell {
    private id:number;
    private status:STATUS;
    private handler:Handler;
    private eventHandler:Method;
    private element:HTMLDivElement;

    constructor(handler:Handler, id:number) { // add a game handler class later
        this.id = id;
        this.status = STATUS.AVAILABLE;
        this.handler = handler;
        this.element = document.createElement("div");
        this.element.classList.add("cell");
        this.element.classList.add(this.status.toLowerCase());
        this.eventHandler = this.handleClick.bind(this);
        this.element.addEventListener("click", this.eventHandler);
        console.log(typeof(this.eventHandler))
    }

    private handleClick():void {
        if (this.status === STATUS.OCCUPIED) return;
        this.element.classList.remove(this.status.toLowerCase());
        this.status = STATUS.OCCUPIED;
        this.element.classList.add(STATUS.OCCUPIED.toLowerCase());
        const pebble = document.createElement("div");
        pebble.classList.add("pebble", this.handler.whosTurn);
        this.element.appendChild(pebble);
        this.handler.nextTurn(this.id);
    }

    get getCell():HTMLDivElement {
        return this.element;
    }

    public removeHandler():void {
        this.element.removeEventListener("click", this.eventHandler);
    }
}

export default Cell;