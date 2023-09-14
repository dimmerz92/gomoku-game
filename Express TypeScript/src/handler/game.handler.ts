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
    async (req: Request, res: Response) => {
        const user_id = req.user_id;
        const size = req.body.size;

        const new_game = await createGame(user_id, size);

        if (!new_game) {
            return res.status(401).send("Unauthorised");
        }
    
        return res.status(201).json(new_game);
});

// Updates the game state and returns the new game state
gameHandler.put("/id/:game_id",
    validateSchema(updateGameSchema),
    async (req: Request, res: Response) => {
        const user_id = req.user_id;
        const game_id = req.params.game_id;
        const index = req.body.index;
        const colour = req.body.colour;
        const turn = req.body.turn;

        const game_state = await
            updateGameState(user_id, game_id, index, colour, turn);

        if (!game_state) {
            return res.status(400).send("Bad Request");
        }

        return res.status(200);
});

// Returns a game
gameHandler.get("/id/:game_id",
    validateSchema(getGameSchema),
    async (req: Request, res: Response) => {
        const user_id = req.user_id;
        const game_id = req.params.game_id;

        const game = await getGameById(user_id, game_id);
        if (!game) {
            return res.status(400).send("Bad Request");
        }

        return res.status(200).json(game);
});

export default gameHandler;