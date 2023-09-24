"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const bcryptjs_1 = __importDefault(require("bcryptjs"));
const validateSchema_1 = __importDefault(require("../middleware/validateSchema"));
const auth_service_1 = require("../service/auth.service");
const auth_schema_1 = require("../schema/auth.schema");
const jwt_1 = require("../util/jwt");
const authHandler = express_1.default.Router();
authHandler.post("/register", (0, validateSchema_1.default)(auth_schema_1.registerSchema), (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const { username, password } = req.body;
        const existingUser = yield (0, auth_service_1.getUserByUsername)(username);
        if (existingUser) {
            return res.status(409).send("Username already exists");
        }
        const encryptedPassword = yield bcryptjs_1.default.hash(password, 10);
        const newUser = yield (0, auth_service_1.createUser)({
            username,
            password: encryptedPassword
        });
        const token = (0, jwt_1.signJwt)({ username, _id: newUser._id });
        res.status(200).json({ _id: newUser._id, token });
    }
    catch (error) {
        return res.status(500).send(error);
    }
}));
authHandler.post("/login", (0, validateSchema_1.default)(auth_schema_1.loginSchema), (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const { username, password } = req.body;
        const user = yield (0, auth_service_1.getUserByUsername)(username);
        if (user &&
            (yield bcryptjs_1.default.compare(password, user.password))) {
            const token = (0, jwt_1.signJwt)({ username, _id: user._id });
            return res.status(200).json({ _id: user._id, token });
        }
        return res.status(400).send("Invalid username or password");
    }
    catch (error) {
        return res.status(500).send(error);
    }
}));
exports.default = authHandler;
