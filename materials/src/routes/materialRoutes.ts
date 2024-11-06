import { Router } from 'express';
import { MaterialController } from '../controllers/MaterialController';

const router = Router();
const materialController = new MaterialController();

// GET all materials
router.get('/', materialController.getAllMaterials);

// GET single material
router.get('/:id', materialController.getMaterial);

// POST new material
router.post('/', materialController.createMaterial);

// PUT update material
router.put('/:id', materialController.updateMaterial);

// DELETE material
router.delete('/:id', materialController.deleteMaterial);

export default router;
