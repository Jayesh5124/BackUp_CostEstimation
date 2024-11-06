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
Object.defineProperty(exports, "__esModule", { value: true });
exports.getUserById = exports.getAllUsers = exports.updateUser = exports.createUser = void 0;
const userService_1 = require("../services/userService"); // Import the user service
const userService = new userService_1.UserService(); // Instantiate the user service
const createUser = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const { name, email, password, projectId } = req.body;
        const user = yield userService.createUser({ name, email, password, projectId });
        res.status(201).json(user);
    }
    catch (error) {
        console.error(error);
        res.status(500).json({ error: 'Failed to create user' });
    }
});
exports.createUser = createUser;
const updateUser = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    // try {
    //     const { id } = req.params;
    //     const { name, email, password, projectId } = req.body;
    //     const user = await userService.updateUser(id, { name, email, password, projectId });
    //     if (!user) return res.status(404).json({ error: 'User not found' });
    //     res.status(200).json(user);
    // } catch (error) {
    //     console.error(error);
    //     res.status(500).json({ error: 'Failed to update user' });
    // }
});
exports.updateUser = updateUser;
const getAllUsers = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const users = yield userService.getAllUsers();
    res.status(200).json(users);
});
exports.getAllUsers = getAllUsers;
const getUserById = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    // try{
    //     const { id } = req.params;
    //     const user = await userService.getUserById(id);
    //     if(!user) return res.status(404).json({ error: 'User not found' });
    //     res.status(200).json(user);
    // }
    // catch(error){
    //     console.error(error);
    //     res.status(500).json({ error: 'Failed to get user' });
    try {
        const { id } = req.params;
        const user = yield userService.getUserById(id);
        if (user) {
            res.json(user);
        }
        else {
            res.status(404).json({ message: 'User not found' });
        }
    }
    catch (error) {
        if (error instanceof Error) {
            res.status(500).json({ error: error.message });
        }
        else {
            res.status(500).json({ error: 'An unknown error occurred' });
        }
    }
});
exports.getUserById = getUserById;
//# sourceMappingURL=userController.js.map