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
exports.createConstructor = exports.getConstructor = void 0;
const constructorSchema_1 = __importDefault(require("../models/constructorSchema"));
// Get user by ID
const getConstructor = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const cons = yield constructorSchema_1.default.findById(req.params.id);
        if (cons) {
            res.json(cons);
        }
        else {
            res.status(404).json({ error: 'Constructor not found' });
        }
    }
    catch (error) {
        res.status(500).json({ error: 'Error fetching cons' });
    }
});
exports.getConstructor = getConstructor;
// Create a new user
const createConstructor = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const newUser = new constructorSchema_1.default(req.body);
        yield newUser.save();
        res.status(201).json(newUser);
    }
    catch (error) {
        res.status(500).json({ error: 'Error creating user' });
    }
});
exports.createConstructor = createConstructor;
