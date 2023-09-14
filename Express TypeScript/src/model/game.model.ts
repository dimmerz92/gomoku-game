import mongoose, { Document } from "mongoose";
import { UserDocument } from "./user.model";

export interface GameInput {
    user_id: UserDocument["_id"];
    size: number;
}

export interface GameDocument extends GameInput, Document {
    gameboard: Array<undefined | {
        user_id: UserDocument["_id"];
        colour: string;
    }>;
    createdAt?: Date;
    updatedAt?: Date;
}

const cellSchema = new mongoose.Schema({
    user_id: {
        type: mongoose.Schema.Types.ObjectId,
        ref: "User",
        require: true
    },
    colour: {
        type: String,
        require: true
    }
});

const gameSchema = new mongoose.Schema({
    user_id: {
        type: mongoose.Schema.Types.ObjectId,
        ref: "User",
        require: true
    },
    size: {
        type: Number,
        require: true
    },
    gameboard: {
        type: [cellSchema],
        require: true
    }
}, {timestamps: true});

export default mongoose.model<GameDocument>("Game", gameSchema);