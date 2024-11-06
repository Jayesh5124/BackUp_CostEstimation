import CostEstimate, { ICostEstimate } from '../models/cost_estimates';

export class CostEstimateService {
    // Create a new cost estimate
    async createCostEstimate(data: Omit<ICostEstimate, 'generated_at'>): Promise<ICostEstimate> {
        const estimate = new CostEstimate(data);
        await estimate.save();
        return estimate;
    }

    // Get all cost estimates
    async getAllCostEstimates(): Promise<ICostEstimate[]> {
        return await CostEstimate.find();
    }

    // Get cost estimate by ID
    async getCostEstimateById(id: string): Promise<ICostEstimate | null> {
        return await CostEstimate.findById(id);
    }

    // Update a cost estimate
    async updateCostEstimate(id: string, data: Partial<Omit<ICostEstimate, 'generated_at'>>): Promise<ICostEstimate | null> {
        return await CostEstimate.findByIdAndUpdate(id, data, { new: true });
    }

    // Delete a cost estimate
    async deleteCostEstimate(id: string): Promise<ICostEstimate | null> {
        return await CostEstimate.findByIdAndDelete(id);
    }

}
