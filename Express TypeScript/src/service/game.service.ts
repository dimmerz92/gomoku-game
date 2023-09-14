import mongoose from "mongoose";
import GameModel, { GameInput, GameDocument } from "../model/game.model";

export async function getGamesById(user_id: string) {
    return GameModel.find({
        user_id: new mongoose.Types.ObjectId(user_id)
    }).lean();
}

export async function getGameById(user_id: string, game_id: string) {
    return GameModel.findOne({
        _id: new mongoose.Types.ObjectId(game_id),
        user_id: new mongoose.Types.ObjectId(user_id)
    }).lean();
}

export async function updateGameState
    (user_id: string, game_id: string, input: GameDocument) {
        return GameModel.findOneAndUpdate({
            _id: new mongoose.Types.ObjectId(game_id),
            user_id: new mongoose.Types.ObjectId(user_id)
        }, input);
}

export async function createGame(input: GameInput) {
    const game = {
        user_id: new mongoose.Types.ObjectId(input.user_id),
        size: input.size,
        gameboard: new Array<undefined>(input.size ** 2)
    }
    return GameModel.create(game);
}