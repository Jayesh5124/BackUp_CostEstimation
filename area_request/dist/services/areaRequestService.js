"use strict";
// services/areaRequestService.ts
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
exports.AreaRequestService = void 0;
const areaRequest_1 = __importDefault(require("../models/areaRequest"));
class AreaRequestService {
    createAreaRequest(data) {
        return __awaiter(this, void 0, void 0, function* () {
            const areaRequest = new areaRequest_1.default(data);
            return yield areaRequest.save();
        });
    }
    getAllAreaRequests() {
        return __awaiter(this, void 0, void 0, function* () {
            return yield areaRequest_1.default.find();
        });
    }
    getAreaRequestById(id) {
        return __awaiter(this, void 0, void 0, function* () {
            return yield areaRequest_1.default.findById(id);
        });
    }
    updateAreaRequest(id, data) {
        return __awaiter(this, void 0, void 0, function* () {
            return yield areaRequest_1.default.findByIdAndUpdate(id, data, { new: true });
        });
    }
    deleteAreaRequest(id) {
        return __awaiter(this, void 0, void 0, function* () {
            return yield areaRequest_1.default.findByIdAndDelete(id);
        });
    }
}
exports.AreaRequestService = AreaRequestService;
