import { createServer } from "http";
import express, { Express } from "express";
import cors from "cors";

import gameHandler from "./handler/game.handler";
import registerHandler from "./handler/auth.handler"

const app: Express = express();

app.use(cors({
    origin: process.env.allowHost || true
}));

app.use(express.json());

app.use("/api/game", gameHandler);
app.use("/api/auth", registerHandler);

export const server = createServer(app);

export default app;