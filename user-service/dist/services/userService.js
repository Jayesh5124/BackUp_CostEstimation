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
exports.UserService = void 0;
const User_1 = __importDefault(require("../models/User"));
class UserService {
    getUserById(id) {
        return __awaiter(this, void 0, void 0, function* () {
            return yield User_1.default.findById(id); // Fetch user by ID
        });
    }
    getAllUsers() {
        return __awaiter(this, void 0, void 0, function* () {
            return yield User_1.default.find();
        });
    }
    // Method to create a user
    createUser(userData) {
        return __awaiter(this, void 0, void 0, function* () {
            const user = new User_1.default(userData);
            yield user.save();
            return user;
        });
    }
    // Method to update a user
    updateUser(id, updateData) {
        return __awaiter(this, void 0, void 0, function* () {
            return yield User_1.default.findByIdAndUpdate(id, updateData, { new: true });
        });
    }
}
exports.UserService = UserService;
//# sourceMappingURL=userService.js.map