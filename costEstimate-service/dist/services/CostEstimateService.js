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
exports.CostEstimateService = void 0;
const cost_estimates_1 = __importDefault(require("../models/cost_estimates"));
class CostEstimateService {
    // Create a new cost estimate
    createCostEstimate(data) {
        return __awaiter(this, void 0, void 0, function* () {
            const estimate = new cost_estimates_1.default(data);
            yield estimate.save();
            return estimate;
        });
    }
    // Get all cost estimates
    getAllCostEstimates() {
        return __awaiter(this, void 0, void 0, function* () {
            return yield cost_estimates_1.default.find();
        });
    }
    // Get cost estimate by ID
    getCostEstimateById(id) {
        return __awaiter(this, void 0, void 0, function* () {
            return yield cost_estimates_1.default.findById(id);
        });
    }
    // Update a cost estimate
    updateCostEstimate(id, data) {
        return __awaiter(this, void 0, void 0, function* () {
            return yield cost_estimates_1.default.findByIdAndUpdate(id, data, { new: true });
        });
    }
    // Delete a cost estimate
    deleteCostEstimate(id) {
        return __awaiter(this, void 0, void 0, function* () {
            return yield cost_estimates_1.default.findByIdAndDelete(id);
        });
    }
}
exports.CostEstimateService = CostEstimateService;
