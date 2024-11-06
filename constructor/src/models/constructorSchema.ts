import mongoose, { Document, Schema } from 'mongoose';
import { v4 as uuidv4 } from 'uuid';

export interface IConstructor extends Document {
  consid: string;
  name: string;
  email: string;
  password: string;
  estimations: Array<{
    value: number;
    description: string;
  }>;
}

const ConstSchema = new Schema({
  consid: {
    type: String,
    required: true,
    unique: true,
    default: () => uuidv4()
  },
  name: { type: String, required: true },
  email: { type: String, required: true, unique: true },
  password: { type: String, required: true },
  estimations: [{
    value: { type: Number, required: true },
    description: { type: String, required: true }
  }]

});

export default mongoose.model<IConstructor>('Constructor', ConstSchema);
