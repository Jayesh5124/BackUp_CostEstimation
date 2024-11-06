import { Request, Response } from 'express';
import { CostEstimateService } from '../services/CostEstimateService';
import { ICostEstimate } from '../models/cost_estimates';
import axios from 'axios';

const costEstimateService = new CostEstimateService();

// Create a new cost estimate
export const createCostEstimate = async (req: Request, res: Response) => {
    try {
        const { project_id,  constructor_id, total_estimate } = req.body;

        // Make sure to pass the correct object type to the service
        const estimate = await costEstimateService.createCostEstimate({
            project_id,
            
            constructor_id,
            total_estimate,
        } as ICostEstimate); // Assert the type if necessary

        res.status(201).json(estimate);
    } catch (error) {
        console.error(error);
        res.status(500).json({ error: 'Failed to create cost estimate' });
    }
};

// Get all cost estimates
export const getAllCostEstimates = async (req: Request, res: Response) => {
    try {
        const estimates = await costEstimateService.getAllCostEstimates();
        res.status(200).json(estimates);
    } catch (error) {
        console.error(error);
        res.status(500).json({ error: 'Failed to retrieve cost estimates' });
    }
};

// Get cost estimate by ID
export const getCostEstimateById = async (req: Request, res: Response) => {
    try {
        const estimate = await costEstimateService.getCostEstimateById(req.params.id);
        if (estimate) {
            res.status(200).json(estimate);
        } else {
            res.status(404).json({ error: 'Cost estimate not found' });
        }
    } catch (error) {
        console.error(error);
        res.status(500).json({ error: 'Failed to retrieve cost estimate' });
    }
};

// Update cost estimate
export const updateCostEstimate = async (req: Request, res: Response) => {
    try {
        const updatedEstimate = await costEstimateService.updateCostEstimate(req.params.id, req.body);
        if (updatedEstimate) {
            res.status(200).json(updatedEstimate);
        } else {
            res.status(404).json({ error: 'Cost estimate not found' });
        }
    } catch (error) {
        console.error(error);
        res.status(500).json({ error: 'Failed to update cost estimate' });
    }
};

// Delete cost estimate
export const deleteCostEstimate = async (req: Request, res: Response) => {
    try {
        const deletedEstimate = await costEstimateService.deleteCostEstimate(req.params.id);
        if (deletedEstimate) {
            res.status(204).send();
        } else {
            res.status(404).json({ error: 'Cost estimate not found' });
        }
    } catch (error) {
        console.error(error);
        res.status(500).json({ error: 'Failed to delete cost estimate' });
    }
};

export const calculateTotalCostEstimate = async (req: Request, res: Response) => {
    try {
        const area = Number(req.params.area);
        const type = Number(req.params.type);
        
        if (isNaN(area)) {
            return res.status(400).json({ error: 'Area must be a valid number' });
        }

        if (![1, 2].includes(type)) {
            return res.status(400).json({ error: 'Type must be 1, 2' });
        }

        const [cost1, cost2] = [1202, 1560];
        let totalCostEstimate = 0;

        if(type === 1){
            totalCostEstimate = area * cost1;
        }else{
            totalCostEstimate = area * cost2;
        }
        
        res.status(200).json(totalCostEstimate);
    } catch (error) {
        console.error(error);
        res.status(500).json({ error: 'Failed to calculate total cost estimate' });
    }
};

export const quantityWiseCalculation = async (req: Request, res: Response) => {
    const cost = Number(req.params.cost);
    const area = Number(req.params.area);

    const cementReq = Math.ceil(area * 0.4);
    const cementCost = 16.4/100 * cost;

    const sandReq = Number((area * 0.816).toFixed(2));
    const sandCost = 12.3/100 * cost;

    const aggregateReq = Number((area * 0.608).toFixed(2));
    const aggregateCost = 7.4/100 * cost;

    const steelReq = Math.ceil(area * 4);
    const steelCost = 24.6/100 * cost;

    const paintReq = Number((area * 0.18).toFixed(2));
    const bricks = Math.ceil(area * 8);
    
    const fittings = 22.8/100 * cost;
    const finishers = 16.5/100 * cost;

    res.status(200).json({
        cementReq, 
        cementCost, 
        sandReq, 
        sandCost, 
        aggregateReq, 
        aggregateCost, 
        steelReq, 
        steelCost, 
        paintReq, 
        bricks, 
        fittings, 
        finishers
    });
}