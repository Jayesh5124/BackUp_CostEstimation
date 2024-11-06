import mongoose, { Document, Schema } from 'mongoose';

export interface ICostEstimate extends Document {
    project_id: number;
    constructor_id: number; // Ensure this is included
    total_estimate: number;
    generated_at?: Date; // Optional, since it can be set automatically by Mongoose
}

const CostEstimateSchema: Schema = new Schema({
    project_id: { type: Number, required: true },
    constructor_id: { type: Number, required: true }, // Ensure this matches the expected data type
    total_estimate: { type: Number, required: true },
    generated_at: { type: Date, default: Date.now } // Auto-generated timestamp
});

export default mongoose.model<ICostEstimate>('CostEstimate', CostEstimateSchema);
