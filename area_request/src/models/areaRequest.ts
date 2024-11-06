import { Schema, model, Document } from 'mongoose';

// Define an interface for constructors in the constructorList
interface IConstructor {
    constructorName: string; // Example property, adjust as necessary
    contactInfo?: string;    // Optional property
}

export interface IAreaRequest extends Document {
    user_email: string;
    user_name: string;
    constructor_email: string;
    city: string;
    state: string;
    builtup_area: number;
    property_name: string;
    property_type: string;
    flats_per_floor?: number;
    cabins_needed?: number;
    land_clearance_needed: boolean;
    land_clearance?: number;
    floors_needed: number;
    isEstimated?: boolean;  // Fixed typo: isEstimited to isEstimated
    isStartBuild?: boolean; // Fixed typo: isStrtBuild to isStartBuild
    constructorList?: IConstructor[]; // Array of constructors
}

// Define the schema for AreaRequest
const AreaRequestSchema = new Schema<IAreaRequest>(
    {
        user_email: { type: String, required: true },
        user_name: { type: String, required: true },
        constructor_email: { type: String, required: false },
        city: { type: String, required: true },
        state: { type: String, required: true },
        builtup_area: { type: Number, required: true },
        property_name: { type: String, required: true },
        property_type: { type: String, required: true },
        flats_per_floor: { type: Number, required: false },
        cabins_needed: { type: Number, required: false },
        land_clearance_needed: { type: Boolean, required: false },
        land_clearance: { type: Number, required: false },
        floors_needed: { type: Number, required: false },
        isEstimated: { type: Boolean, required: false, default: false }, // Adding default value
        isStartBuild: { type: Boolean, required: false, default: false }, // Adding default value
        constructorList: [{ // Define as an array of objects
            constructorName: { type: String, required: false},
            contactInfo: { type: String, required: false }
        }]
    },
    { timestamps: true } // Automatically manage createdAt and updatedAt fields
);

// Export the model
export const AreaRequestModel = model<IAreaRequest>('AreaRequest', AreaRequestSchema);
