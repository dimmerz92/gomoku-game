import { Request, Response, NextFunction } from "express";
import { getUserById } from "../service/auth.service";
import { verifyJwt } from "../util/jwt";

interface TokenBody {
    username: string;
    _id: string;
    iat: number;
    exp: number;
}

export const deserialiseUser =
    async (req: Request, res: Response, next: NextFunction) => {
        try {
            let token;
            if (req.headers.authorization &&
                req.headers.authorization.startsWith("Bearer")) {
                    token = req.headers.authorization.split(" ")[1];
            } else {
                return res.status(403).send("Token missing");
            }

            const decoded = verifyJwt<TokenBody>(token);
            if (!decoded) {
                return res.status(401).send("Invalid token");
            }

            const user = await getUserById(decoded._id);
            if (!user) {
                return res.status(401).send("Invalid user");
            }

            req.user_id = user._id;
            next();
        } catch (error) {
            next(error);
        }
    }