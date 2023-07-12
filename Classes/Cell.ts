import Handler from "./Handler";

enum STATUS {
    AVAILABLE = "AVAILABLE",
    OCCUPIED = "OCCUPIED" 
}

class Cell {
    private id:number;
    private status:STATUS;
    private handler:Handler;
    public element:HTMLDivElement;

    constructor(handler:Handler, id:number) { // add a game handler class later
        this.id = id;
        this.status = STATUS.AVAILABLE;
        this.handler = handler;
        this.element = document.createElement("div");
        this.element.classList.add("cell");
        this.element.classList.add(this.status.toLowerCase());
        this.element.addEventListener("click", () =>{
            this.handleClick();
        });
    }

    handleClick() {
        if (this.status === STATUS.OCCUPIED) return;
        this.element.classList.remove(this.status.toLowerCase());
        this.status = STATUS.OCCUPIED;
        this.element.classList.add(STATUS.OCCUPIED.toLowerCase());
        const pebble = document.createElement("div");
        pebble.classList.add("pebble", this.handler.whosTurn);
        this.element.appendChild(pebble);
        this.handler.nextTurn();
    }
}

export default Cell;