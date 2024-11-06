"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = require("express");
const Cost_estimate_controller_1 = require("../controllers/Cost_estimate-controller");
const router = (0, express_1.Router)();
// Define routes
router.post('/cost-estimates', Cost_estimate_controller_1.createCostEstimate);
router.get('/cost-estimates', Cost_estimate_controller_1.getAllCostEstimates);
router.get('/cost-estimates/:id', Cost_estimate_controller_1.getCostEstimateById);
router.put('/cost-estimates/:id', Cost_estimate_controller_1.updateCostEstimate);
router.delete('/cost-estimates/:id', Cost_estimate_controller_1.deleteCostEstimate);
exports.default = router;
