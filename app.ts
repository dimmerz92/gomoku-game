import Gameboard from "./Classes/Gameboard";
const gameboard = new Gameboard(5);

document.getElementById("main")?.append(gameboard.element);