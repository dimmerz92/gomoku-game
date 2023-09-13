import express, { Request, Response } from "express";

const gameHandler = express.Router();

// new game
gameHandler.post("/",
    (req: Request, res: Response) => {
        // create new game
        // add to database
        // return gamestate and id to client
    });

// take turn
gameHandler.put("/",
    (req: Request, res: Response) => {
        // read and validate the payload
        // retrieve gamestate from database
        // modify gamestate with players move
        // save back in database
        // send new gamestate back to client
    });

export default gameHandler;