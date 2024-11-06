import mongoose, { Document, Schema } from 'mongoose';

export interface IUser extends Document {
    name: string;
    email: string;
    password: string;
    projectId?: string; // Added projectId
}

const UserSchema: Schema = new Schema({
    name: { type: String, required: true },
    email: { type: String, required: true, unique: true },
    password: { type: String, required: true },
    projectId: { type: String, required: false} // New field
});

export default mongoose.model<IUser>('User', UserSchema);
