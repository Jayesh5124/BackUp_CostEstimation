// controllers/areaRequestController.ts

import { Request, Response } from 'express';
import { AreaRequestService } from '../services/areaRequestService';
import { AreaRequestModel } from '../models/areaRequest';

const areaRequestService = new AreaRequestService();

export const createAreaRequest = async (req: Request, res: Response) => {
    try {
        const {
            user_email,
            user_name,
            city,
            state,
            builtup_area,
            property_name,
            property_type,
            flats_per_floor,
            cabins_needed,
            land_clearance_needed,
            land_clearance,
            floors_needed,
            isEstimated, // Capture the new property
            isStartBuild, // Capture the new property
            constructorList, // Capture the new constructor list
        } = req.body;

        // Validate required fields
        if (!user_email || !user_name || !city || !state || !builtup_area || !property_name || !property_type || !floors_needed || land_clearance_needed === undefined) {
            return res.status(400).json({ error: 'Missing required fields' });
        }

        const areaRequest = new AreaRequestModel({
            user_email,
            user_name,
            city,
            state,
            builtup_area,
            property_name,
            property_type,
            flats_per_floor: property_type === 'Residential' ? flats_per_floor : undefined,
            cabins_needed: property_type === 'Commercial' ? cabins_needed : undefined,
            land_clearance_needed,
            land_clearance: land_clearance_needed ? land_clearance : undefined,
            floors_needed,
            isEstimated: isEstimated ?? false, // Default to false if not provided
            isStartBuild: isStartBuild ?? false, // Default to false if not provided
            constructorList: constructorList || [], // Default to an empty array if not provided
        });

        await areaRequest.save();
        res.status(201).json(areaRequest);
    } catch (error) {        console.error('Error creating area request:', error);
        res.status(500).json({ error: 'Failed to create area request' });
    }
};
// Get all area requests
export const getAllAreaRequests = async (req: Request, res: Response) => {
    try {
        const requests = await areaRequestService.getAllAreaRequests();
        res.status(200).json(requests);
    } catch (error) {
        console.error('Error fetching area requests:', error);
        res.status(500).json({ error: 'Failed to fetch area requests' });
    }
};

// Get area request by ID
export const getAreaRequestById = async (req: Request, res: Response) => {
    try {
        const request = await areaRequestService.getAreaRequestById(req.params.id);
        if (request) {
            res.status(200).json(request);
        } else {
            res.status(404).json({ error: 'Area request not found' });
        }
    } catch (error) {
        console.error(error);
        res.status(500).json({ error: 'Failed to retrieve area request' });
    }
};



// Update area request
export const updateAreaRequest = async (req: Request, res: Response) => {
    try {
        const id = req.params.id;
        const updatedRequest = await AreaRequestModel.findByIdAndUpdate(
            id,
            { isStartBuild: true },
            { new: true }
        );

        if (!updatedRequest) {
            return res.status(404).json({
                success: false,
                message: 'Area request not found'
            });
        }

        res.status(200).json({
            success: true,
            data: updatedRequest
        });
    } catch (error) {
        console.error('Error updating area request:', error);
        res.status(500).json({
            success: false,
            message: 'Error updating area request',
            error: error instanceof Error ? error.message : 'Unknown error'
        });
    }
};

// Delete area request
export const deleteAreaRequest = async (req: Request, res: Response) => {
    try {
        const deletedRequest = await areaRequestService.deleteAreaRequest(req.params.id);
        if (deletedRequest) {
            res.status(204).send();
        } else {
            res.status(404).json({ error: 'Area request not found' });
        }
    } catch (error) {
        console.error(error);
        res.status(500).json({ error: 'Failed to delete area request' });
    }
};
