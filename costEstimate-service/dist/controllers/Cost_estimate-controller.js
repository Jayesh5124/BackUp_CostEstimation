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
exports.deleteCostEstimate = exports.updateCostEstimate = exports.getCostEstimateById = exports.getAllCostEstimates = exports.createCostEstimate = void 0;
const CostEstimateService_1 = require("../services/CostEstimateService");
const costEstimateService = new CostEstimateService_1.CostEstimateService();
// Create a new cost estimate
const createCostEstimate = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const { project_id, user_id, constructor_id, total_estimate } = req.body;
        // Make sure to pass the correct object type to the service
        const estimate = yield costEstimateService.createCostEstimate({
            project_id,
            user_id,
            constructor_id,
            total_estimate,
        }); // Assert the type if necessary
        res.status(201).json(estimate);
    }
    catch (error) {
        console.error(error);
        res.status(500).json({ error: 'Failed to create cost estimate' });
    }
});
exports.createCostEstimate = createCostEstimate;
// Get all cost estimates
const getAllCostEstimates = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const estimates = yield costEstimateService.getAllCostEstimates();
        res.status(200).json(estimates);
    }
    catch (error) {
        console.error(error);
        res.status(500).json({ error: 'Failed to retrieve cost estimates' });
    }
});
exports.getAllCostEstimates = getAllCostEstimates;
// Get cost estimate by ID
const getCostEstimateById = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const estimate = yield costEstimateService.getCostEstimateById(req.params.id);
        if (estimate) {
            res.status(200).json(estimate);
        }
        else {
            res.status(404).json({ error: 'Cost estimate not found' });
        }
    }
    catch (error) {
        console.error(error);
        res.status(500).json({ error: 'Failed to retrieve cost estimate' });
    }
});
exports.getCostEstimateById = getCostEstimateById;
// Update cost estimate
const updateCostEstimate = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const updatedEstimate = yield costEstimateService.updateCostEstimate(req.params.id, req.body);
        if (updatedEstimate) {
            res.status(200).json(updatedEstimate);
        }
        else {
            res.status(404).json({ error: 'Cost estimate not found' });
        }
    }
    catch (error) {
        console.error(error);
        res.status(500).json({ error: 'Failed to update cost estimate' });
    }
});
exports.updateCostEstimate = updateCostEstimate;
// Delete cost estimate
const deleteCostEstimate = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const deletedEstimate = yield costEstimateService.deleteCostEstimate(req.params.id);
        if (deletedEstimate) {
            res.status(204).send();
        }
        else {
            res.status(404).json({ error: 'Cost estimate not found' });
        }
    }
    catch (error) {
        console.error(error);
        res.status(500).json({ error: 'Failed to delete cost estimate' });
    }
});
exports.deleteCostEstimate = deleteCostEstimate;
