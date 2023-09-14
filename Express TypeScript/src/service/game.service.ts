import mongoose from "mongoose";
import GameModel, { GameInput, GameDocument } from "../model/game.model";

// Retrieves a list of games belonging to a user
export async function getGamesById(user_id: string) {
    return GameModel.find({
        user_id: new mongoose.Types.ObjectId(user_id)
    }).lean();
}

// Retrieves a game by it's ID, ensuring it belongs to the requesting user
export async function getGameById(user_id: string, game_id: string) {
    return GameModel.findOne({
        _id: new mongoose.Types.ObjectId(game_id),
        user_id: new mongoose.Types.ObjectId(user_id)
    }).lean();
}

// Updates the game state for a game ID and it's user
export async function updateGameState
    (user_id: string, game_id: string, index: number, colour: string) {
        const current_state = await getGameById(user_id, game_id);
        if (!current_state) {
            return null
        }

        const move = {
            user_id: new mongoose.Types.ObjectId(user_id),
            colour: colour
        }

        const new_state = current_state.gameboard.map(
            (v, i) => i === index ? move : v);

        return GameModel.findOneAndUpdate({
            _id: new mongoose.Types.ObjectId(game_id),
            user_id: new mongoose.Types.ObjectId(user_id)
        }, { gameboard: new_state }, { new: true });
}

// Creates a new game and assigns it to the user ID
export async function createGame(input: GameInput) {
    const game = {
        user_id: new mongoose.Types.ObjectId(input.user_id),
        size: input.size,
        gameboard: new Array<undefined>(input.size ** 2)
    }
    return GameModel.create(game);
}