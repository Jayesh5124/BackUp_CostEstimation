import mongoose, { Schema, Document } from 'mongoose';

export interface IMaterial extends Document {
    id: string;
    name: string;
    price: number;
    quality?: string;
    quantity?: number;
}

const MaterialSchema: Schema = new Schema({
    name: { type: String, required: true },
    price: { type: Number, required: true },
    quality: { type: String, required: false },
    quantity: { type: Number, required: false },
});

export default mongoose.model<IMaterial>('Material', MaterialSchema);
