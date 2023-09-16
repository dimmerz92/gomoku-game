import express, { Express, Request, Response } from "express";
import dotenv from "dotenv";
import mongoose from "mongoose";

import connectDB from "./util/connectDB";
import gameHandler from "./handler/game.handler";
import registerHandler from "./handler/auth.handler"

dotenv.config();
connectDB();

const app: Express = express();
const port = process.env.PORT;
app.use(express.json());

app.use("/api/game", gameHandler);
app.use("/api/auth", registerHandler);

mongoose.connection.once("connected", () => {
    console.log("[server]: Conntected to MongoDB");
    app.listen(port, () => {
        console.log(`[server]: Server is running at http://localhost:${port}`);
    });
});