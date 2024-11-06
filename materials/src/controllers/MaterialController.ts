import { Request, Response } from 'express';
import MaterialModel from '../models/MaterialModel';

export class MaterialController {
    // Get all materials
    public async getAllMaterials(req: Request, res: Response): Promise<void> {
        try {
            const materials = await MaterialModel.find();
            res.status(200).json(materials);
        } catch (error) {
            res.status(500).json({ message: error instanceof Error ? error.message : 'An unknown error occurred' });
        }
    }

    // Get single material
    public async getMaterial(req: Request, res: Response): Promise<void> {
        try {
            const material = await MaterialModel.findById(req.params.id);
            if (!material) {
                res.status(404).json({ message: 'Material not found' });
                return;
            }
            res.status(200).json(material);
        } catch (error) {
            res.status(500).json({ message: error instanceof Error ? error.message : 'An unknown error occurred' });
        }
    }

    // Create material
    public async createMaterial(req: Request, res: Response): Promise<void> {
        try {
            const material = new MaterialModel(req.body);
            const newMaterial = await material.save();
            res.status(201).json(newMaterial);
        } catch (error) {
            res.status(400).json({ message: error instanceof Error ? error.message : 'An unknown error occurred' });
        }
    }

    // Update material
    public async updateMaterial(req: Request, res: Response): Promise<void> {
        try {
            const material = await MaterialModel.findByIdAndUpdate(
                req.params.id,
                req.body,
                { new: true }
            );
            if (!material) {
                res.status(404).json({ message: 'Material not found' });
                return;
            }
            res.status(200).json(material);
        } catch (error) {
            res.status(400).json({ message: error instanceof Error ? error.message : 'An unknown error occurred' });
        }
    }

    // Delete material
    public async deleteMaterial(req: Request, res: Response): Promise<void> {
        try {
            const material = await MaterialModel.findByIdAndDelete(req.params.id);
            if (!material) {
                res.status(404).json({ message: 'Material not found' });
                return;
            }
            res.status(200).json({ message: 'Material deleted' });
        } catch (error) {
            res.status(500).json({ message: error instanceof Error ? error.message : 'An unknown error occurred' });
        }
    }
}
