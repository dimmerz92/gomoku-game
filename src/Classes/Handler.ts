import gamecontrols from "../Helpers/gamecontrols";
import Gameboard from "./Gameboard";
import { Render } from "./Render";

enum PLAYER {
    A = "PLAYER-A",
    B = "PLAYER-B"
}

enum RESULT {
    WIN = "WIN",
    DRAW = "DRAW"
}

export default class Handler {
    private newgame:HTMLElement|null;
    private gameboard:Gameboard;
    private gamemap:PLAYER[][];
    private player:PLAYER;
    private size:number;

    constructor() {
        Render.append(gamecontrols(), "main");
        this.player = PLAYER.A;
        this.newgame = document.getElementById("newgame");
        this.newgame?.addEventListener("click", () => {
            this.getGridSize();
            this.gameboard = new Gameboard(this, this.size);
            Render.removeNode("gameboard");
            Render.removeNode("endgame");
            Render.append(this.gameboard.getGameboard, "main");
        });
    }

    private getGridSize():void {
        const sizes = document.getElementById("gridsize")?.children;
        if (sizes && !Array.from(sizes).some(c => c.classList.contains("selected"))) {
            return;
        }
        this.size = Number(document.getElementsByClassName("sizeselector selected")[0].id)
        this.gamemap = Array(this.size).fill(undefined).map(arr => Array(this.size).fill(undefined));
    }

    get whosTurn():string {
        return this.player.toLowerCase();
    }

    public nextTurn(cellId:number):void {
        const row = Math.floor(cellId / this.size);
        const col = cellId % this.size;
        this.gamemap[row][col] = this.player;
        const result = this.gameStatus(cellId, row, col);
        if (result) return this.endGame(result);
        if (this.player === PLAYER.A) {
            this.player = PLAYER.B;
        } else {
            this.player = PLAYER.A;
        }
    }

    private gameStatus(cellId:number, row:number, col:number):RESULT|false {
        if ((this.diagonalCheck(cellId, 1) + this.diagonalCheck(cellId, -1) - 1) === this.size) {
            return RESULT.WIN;
        } else if (this.linearCheck(row) === this.size || this.linearCheck(-1, col)) {
            return RESULT.WIN;
        } else if (this.gamemap.flat().every(i => i !== undefined)) {
            return RESULT.DRAW;
        } else {
            return false;
        }
    }

    private diagonalCheck(cellId:number, direction:number):number {
        if (cellId < 0 || cellId > this.size**2) return 0;
        if (this.gamemap.flat()[cellId] !== this.player) return 0;
        return 1 + this.diagonalCheck(cellId + direction, direction);
    }

    private linearCheck(row:number, col:number = -1):number {
        const arr = col < 0 ? this.gamemap[row] : this.gamemap.map(i => i[col]);
        let count = 0;
        for (let i = 1; i < arr.length; i++) {
            if (arr[i] !== this.player) {
                count = 0;
            } else {
                count++;
            }
        }
        return count;
    }

    private endGame(result:RESULT):void {
        const div = document.createElement("div");
        div.id = "endgame";
        const h2 = document.createElement("h2");
        console.log(result)
        h2.textContent = result === RESULT.WIN ? `${this.player} WON!` : "THE GAME ENDED IN A DRAW"
        div.appendChild(h2);
        Render.append(div, "main");
        this.gameboard.getRows.forEach(row => {
            row.getCells.forEach(cell => {
                cell.removeHandler()
            })
        })
    }
}