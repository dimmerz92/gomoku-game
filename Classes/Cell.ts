enum PLAYER {
    A = "PLAYER-A",
    B = "PLAYER-B"
}

enum STATUS {
    AVAILABLE = "AVAILABLE",
    OCCUPIED = "OCCUPIED" 
}

class Cell {
    id:number;
    status:STATUS;
    element:HTMLDivElement;

    constructor(id:number) { // add a game handler class later
        this.id = id;
        this.status = STATUS.AVAILABLE;
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
        this.element.classList.add(STATUS.OCCUPIED.toLowerCase());
        // add code to add pebble later
    }
}

export default Cell;