import express, { Request, Response } from "express";
import validateSchema from "../middleware/validateSchema";
import { createGameSchema, updateGameSchema, getGameSchema } from
    "../schema/game.schema";
import { createGame, getGameById, updateGameState } from "../service/game.service";
import mongoose from "mongoose";
 

const gameHandler = express.Router();

// Creates a new game
gameHandler.post("/",
    validateSchema(createGameSchema),
    (req: Request, res: Response) => {
        const user_id = new mongoose.Types.ObjectId(req.user_id);
        const size = req.body.size;

        const new_game = createGame({ user_id, size });
        if (!new_game) {
            return res.status(400);
        }
    
        return res.status(201).json(new_game);
});

// Updates the game state and returns the new game state
gameHandler.put("/id/:game_id",
    validateSchema(updateGameSchema),
    (req: Request, res: Response) => {
        const user_id = req.user_id;
        const game_id = req.params.game_id;
        const index = req.body.index;
        const colour = req.body.colour;

        const game_state = updateGameState(user_id, game_id, index, colour);
        if (!game_state) {
            return res.status(400);
        }

        return res.status(200);
});

// Returns a game
gameHandler.get("/id/:game_id",
    validateSchema(getGameSchema),
    (req: Request, res: Response) => {
        const user_id = req.user_id;
        const game_id = req.params.game_id;

        const game = getGameById(user_id, game_id);
        if (!game) {
            return res.status(400);
        }

        return res.status(200).json(game);
});

export default gameHandler;