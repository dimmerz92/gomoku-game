import mongoose, { Document } from "mongoose";
import { UserDocument } from "./user.model";

export interface GameCell {
    user_id: UserDocument["_id"];
    colour: string;
    turn: number;
}

export interface GameInput {
    user_id: UserDocument["_id"];
    size: number;
}

export interface GameDocument extends GameInput, Document {
    gameboard: Array<undefined | GameCell>;
    colour?: string;
    winner?: string;
    createdAt?: Date;
    updatedAt?: Date;
}

const cellSchema = new mongoose.Schema({
    user_id: {
        type: mongoose.Schema.Types.ObjectId,
        ref: "User",
        required: true
    },
    colour: {
        type: String,
        required: true
    }
});

const gameSchema = new mongoose.Schema({
    user_id: {
        type: mongoose.Schema.Types.ObjectId,
        ref: "User",
        required: true
    },
    size: {
        type: Number,
        required: true
    },
    gameboard: {
        type: [cellSchema],
        required: true
    },
    winner: {
        type: String,
        required: false
    }
}, {timestamps: true});

export default mongoose.model<GameDocument>("Game", gameSchema);