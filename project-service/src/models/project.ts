import mongoose, { Schema, Document } from 'mongoose';

export interface IProject extends Document {
    user_id: number;
    project_type: string;
    location: string;
    project_dimensions: string;
    start_date: Date;
    end_date: Date;
    total_cost: number;
    created_at: Date;
    updated_at: Date;
}

const ProjectSchema: Schema = new Schema({
    user_id: { type: Number, required: true },
    project_type: { type: String, required: true },
    location: { type: String, required: true },
    project_dimensions: { type: String, required: true },
    start_date: { type: Date, required: true },
    end_date: { type: Date, required: true },
    total_cost: { type: Number, required: true },
    created_at: { type: Date, default: Date.now },
    updated_at: { type: Date, default: Date.now }
});

export default mongoose.model<IProject>('Project', ProjectSchema);
