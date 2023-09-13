import mongoose, { Document } from "mongoose";
import { UserDocument } from "./user.model";

export interface GameDocument extends Document {
    user_id: UserDocument["_id"];
    size: number;
    gameboard: Array<undefined | {
        user_id: number;
        colour: string;
    }>;
}

const cellSchema = new mongoose.Schema({
    user_id: {
        type: mongoose.Schema.Types.ObjectId,
        ref: "User"
    },
    colour: String
});

const gameSchema = new mongoose.Schema({
    user_id: {
        type: mongoose.Schema.Types.ObjectId,
        ref: "User"
    },
    size: Number,
    gameboard: [cellSchema]
});

export default mongoose.model<GameDocument>("Game", gameSchema);