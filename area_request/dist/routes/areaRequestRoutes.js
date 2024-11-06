"use strict";
// routes/areaRequestRoutes.ts
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const areaRequestController_1 = require("../controllers/areaRequestController");
const router = express_1.default.Router();
// Define routes
router.post('/area-requests', areaRequestController_1.createAreaRequest);
router.get('/area-requests', areaRequestController_1.getAllAreaRequests);
router.get('/area-requests/:id', areaRequestController_1.getAreaRequestById);
router.put('/area-requests/:id', areaRequestController_1.updateAreaRequest);
router.delete('/area-requests/:id', areaRequestController_1.deleteAreaRequest);
exports.default = router;
