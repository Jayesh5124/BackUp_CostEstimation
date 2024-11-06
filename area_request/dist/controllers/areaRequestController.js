"use strict";
// controllers/areaRequestController.ts
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
exports.deleteAreaRequest = exports.updateAreaRequest = exports.getAreaRequestById = exports.getAllAreaRequests = exports.createAreaRequest = void 0;
const areaRequestService_1 = require("../services/areaRequestService");
const areaRequestService = new areaRequestService_1.AreaRequestService();
// Create a new area request
const createAreaRequest = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const { user_id, city, state, builtup_area } = req.body;
        const areaRequest = yield areaRequestService.createAreaRequest({ user_id, city, state, builtup_area });
        res.status(201).json(areaRequest);
    }
    catch (error) {
        console.error(error);
        res.status(500).json({ error: 'Failed to create area request' });
    }
});
exports.createAreaRequest = createAreaRequest;
// Get all area requests
const getAllAreaRequests = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const requests = yield areaRequestService.getAllAreaRequests();
        res.status(200).json(requests);
    }
    catch (error) {
        console.error(error);
        res.status(500).json({ error: 'Failed to retrieve area requests' });
    }
});
exports.getAllAreaRequests = getAllAreaRequests;
// Get area request by ID
const getAreaRequestById = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const request = yield areaRequestService.getAreaRequestById(req.params.id);
        if (request) {
            res.status(200).json(request);
        }
        else {
            res.status(404).json({ error: 'Area request not found' });
        }
    }
    catch (error) {
        console.error(error);
        res.status(500).json({ error: 'Failed to retrieve area request' });
    }
});
exports.getAreaRequestById = getAreaRequestById;
// Update area request
const updateAreaRequest = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const updatedRequest = yield areaRequestService.updateAreaRequest(req.params.id, req.body);
        if (updatedRequest) {
            res.status(200).json(updatedRequest);
        }
        else {
            res.status(404).json({ error: 'Area request not found' });
        }
    }
    catch (error) {
        console.error(error);
        res.status(500).json({ error: 'Failed to update area request' });
    }
});
exports.updateAreaRequest = updateAreaRequest;
// Delete area request
const deleteAreaRequest = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const deletedRequest = yield areaRequestService.deleteAreaRequest(req.params.id);
        if (deletedRequest) {
            res.status(204).send();
        }
        else {
            res.status(404).json({ error: 'Area request not found' });
        }
    }
    catch (error) {
        console.error(error);
        res.status(500).json({ error: 'Failed to delete area request' });
    }
});
exports.deleteAreaRequest = deleteAreaRequest;
