// services/areaRequestService.ts

import { AreaRequestModel as AreaRequest, IAreaRequest } from '../models/areaRequest';


export class AreaRequestService {
    async createAreaRequest(data: Omit<IAreaRequest, '_id' | 'createdAt' | 'updatedAt'>): Promise<IAreaRequest> {
        const areaRequest = new AreaRequest(data);
        return await areaRequest.save();
    }

    async getAllAreaRequests(): Promise<IAreaRequest[]> {
        return await AreaRequest.find();
    }

    async getAreaRequestById(id: string): Promise<IAreaRequest | null> {
        return await AreaRequest.findById(id);
    }

    async updateAreaRequest(id: string, data: Partial<Omit<IAreaRequest, '_id' | 'createdAt' | 'updatedAt'>>): Promise<IAreaRequest | null> {
        return await AreaRequest.findByIdAndUpdate(id, data, { new: true });
    }

    async updateAreaRequestByEmail(email: string, data: Partial<Omit<IAreaRequest, '_id' | 'createdAt' | 'updatedAt'>>): Promise<IAreaRequest | null> {
        return await AreaRequest.findOneAndUpdate({ user_email: email }, data, { new: true });
    }

    async deleteAreaRequest(id: string): Promise<IAreaRequest | null> {
        return await AreaRequest.findByIdAndDelete(id);
    }
}
