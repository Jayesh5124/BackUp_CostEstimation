"use strict";
// models/areaRequest.ts
Object.defineProperty(exports, "__esModule", { value: true });
const mongoose_1 = require("mongoose");
const AreaRequestSchema = new mongoose_1.Schema({
    user_id: { type: Number, required: true },
    city: { type: String, required: true },
    state: { type: String, required: true },
    builtup_area: { type: Number, required: true },
}, { timestamps: true }); // This will automatically create createdAt and updatedAt fields
exports.default = (0, mongoose_1.model)('AreaRequest', AreaRequestSchema);
