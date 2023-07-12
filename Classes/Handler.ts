import gamecontrols from "../Helpers/gamecontrols";
import Gameboard from "./Gameboard";
import { Render } from "./Render";

enum PLAYER {
    A = "PLAYER-A",
    B = "PLAYER-B"
}

export default class Handler {
    private newgame:HTMLElement|null;
    private gameboard:Gameboard;
    private player:PLAYER;
    private size:number;

    constructor() {
        Render.append(gamecontrols(), "main");
        this.newgame = document.getElementById("newgame");
        this.newgame?.addEventListener("click", () => {
            this.getGridSize();
            this.gameboard = new Gameboard(this, this.size);
            this.player = PLAYER.A;
            Render.removeNode("gameboard");
            Render.append(this.gameboard.getGameboard, "main");
        });
    }

    private getGridSize():void {
        const sizes = document.getElementById("gridsize")?.children;
        if (sizes && !Array.from(sizes).some(c => c.classList.contains("selected"))) {
            return;
        }
        this.size = Number(document.getElementsByClassName("sizeselector selected")[0].id)
    }

    get whosTurn():string {
        return this.player.toLowerCase();
    }

    public nextTurn():void {
        if (this.player === PLAYER.A) {
            this.player = PLAYER.B;
        } else {
            this.player = PLAYER.A;
        }
    }
}