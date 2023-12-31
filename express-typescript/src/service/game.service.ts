import mongoose from "mongoose";
import UserModel from "../model/user.model";
import GameModel, { GameCell } from "../model/game.model";
import { isTerminal } from "../game_logic/win_status";
import { GameStatus } from "../enum/game.enum";

// Retrieves a list of games belonging to a user
export async function getGamesById(user_id: string) {
    return GameModel.find({
        user_id: new mongoose.Types.ObjectId(user_id)
    }, "_id winner createdAt",).sort({createdAt: "desc"});
}

// Retrieves a game by it's ID, ensuring it belongs to the requesting user
export async function getGameById(user_id: string, game_id: string) {
    return GameModel.findOne({
        _id: new mongoose.Types.ObjectId(game_id),
        user_id: new mongoose.Types.ObjectId(user_id)
    }).lean();
}

// Creates a new game and assigns it to the user ID
export async function createGame(user_id: string, size: number) {
    const user_exists = await UserModel.exists({ _id: user_id });
    if (!user_exists) return null;

    const game = {
        user_id: new mongoose.Types.ObjectId(user_id),
        size: size,
        gameboard: new Array(size ** 2).fill(undefined)
    }
    return GameModel.create(game);
}

// Updates the game state for a game ID and its user
export async function updateGameState
    (user_id: string, game_id: string, index: number, colour: string,
     turn: number) {
        const game_state = await getGameById(user_id, game_id);
        if (!game_state) return null;

        const move: GameCell = {
            user_id: new mongoose.Types.ObjectId(user_id),
            colour: colour,
            turn: turn
        }

        game_state.gameboard[index] = move;

        const status = isTerminal(game_state, index, colour);
        let winner: string | undefined;
        if (status !== GameStatus.CONTINUE) {
            winner = status === GameStatus.DRAW
                ? status
                : move.colour;
        }

        const return_state = await GameModel.findOneAndUpdate({
            _id: new mongoose.Types.ObjectId(game_id),
            user_id: new mongoose.Types.ObjectId(user_id)
        },
        { gameboard: game_state.gameboard, winner: winner },
        { new: true }).lean();

        return {
            status: status,
            state: return_state
        }
}

// Resets a game state for a game ID and its user
export async function resetGameState(user_id: string, game_id: string) {
    const game_state = await getGameById(user_id, game_id);
    if (!game_state) return null;

    return GameModel.findOneAndUpdate({
        _id: new mongoose.Types.ObjectId(game_id),
        user_id: new mongoose.Types.ObjectId(user_id)
    },
    { gameboard: game_state.gameboard.fill(undefined), $unset: { winner: 1 } },
    { new: true }).lean();
}

// Deletes a game based on game ID and its user
export async function deleteGame(user_id: string, game_id: string) {
    const result = await GameModel.deleteOne({
        _id: new mongoose.Types.ObjectId(game_id),
        user_id: new mongoose.Types.ObjectId(user_id)
    });

    if (result.deletedCount !== 1) return false;
    return true;
}