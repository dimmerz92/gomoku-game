import gamecontrols from "../Helpers/gamecontrols";
import Gameboard from "./Gameboard";
import { Render } from "./Render";

enum PLAYER {
    A = "BLACK",
    B = "WHITE"
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
        const leftDiag = this.diagonalCheck(cellId, this.size + 1) + this.diagonalCheck(cellId, -this.size + 1) - 1;
        const rightDiag = this.diagonalCheck(cellId, this.size - 1) + this.diagonalCheck(cellId, -this.size - 1) - 1;
        if (rightDiag === 5 || leftDiag === 5) {
            return RESULT.WIN;
        } else if (this.linearCheck(row) || this.linearCheck(-1, col)) {
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

    private linearCheck(row:number, col:number = -1):boolean {
        const arr = col < 0 ? this.gamemap[row] : this.gamemap.map(i => i[col]);
        if (this.size === 5) return arr.every(i => i === this.player);
        for (let i = 0; i < this.size - 5; i++) {
            if (arr.slice(i, i + 5).every(i => i === this.player)) {
                return true;
            }
        }
        return false;
    }

    private endGame(result:RESULT):void {
        const div = document.createElement("div");
        div.id = "endgame";
        const h2 = document.createElement("h2");
        h2.textContent = result === RESULT.WIN ? `${this.player} WON!` : "THE GAME ENDED IN A DRAW"
        div.appendChild(h2);
        Render.append(div, this.player.toLowerCase());
        this.gameboard.getRows.forEach(row => {
            row.getCells.forEach(cell => {
                cell.removeHandler()
            })
        })
    }
}