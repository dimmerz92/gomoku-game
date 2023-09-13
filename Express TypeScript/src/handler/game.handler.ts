import express, { Request, Response } from "express";
import validateSchema from "../middleware/validateSchema";
import { createGameSchema, updateGameSchema, getGameSchema } from
    "../schema/game.schema";
 

const gameHandler = express.Router();

// new game
gameHandler.post("/",
    validateSchema(createGameSchema),
    (req: Request, res: Response) => {
        // create new game
        // add to database
        // return gamestate and id to client
        console.log(req.body)
        res.status(200).json({"hi": "hello"})
    });

// take turn
gameHandler.put("/id/:game_id",
    validateSchema(updateGameSchema),
    (req: Request, res: Response) => {
        // read and validate the payload
        // retrieve gamestate from database
        // modify gamestate with players move
        // save back in database
        // send new gamestate back to client
        console.log(req.body)
        res.status(200).json({"that": "worked"})
    });

gameHandler.get("/id/:game_id",
    validateSchema(getGameSchema),
    (req: Request, res: Response) => {
        // get the game state from the data base
        // send to client
        res.status(200).json({"here": "you go"})
    })

export default gameHandler;