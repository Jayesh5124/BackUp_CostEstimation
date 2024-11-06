"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const userController_1 = require("../controllers/userController");
const router = express_1.default.Router();
router.post('/users', userController_1.createUser);
router.put('/users/:id', userController_1.updateUser);
router.get('/users', userController_1.getAllUsers); // Route to get all users
router.get('/users/:id', userController_1.getUserById);
exports.default = router;
//# sourceMappingURL=userRoutes.js.map