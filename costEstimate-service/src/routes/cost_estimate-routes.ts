import { Router } from 'express';
import { 
    createCostEstimate, 
    getAllCostEstimates, 
    getCostEstimateById, 
    updateCostEstimate, 
    deleteCostEstimate,
    calculateTotalCostEstimate,
    quantityWiseCalculation
} from '../controllers/Cost_estimate-controller';

const router = Router();

// Define routes
router.post('/cost-estimates', createCostEstimate);
router.get('/cost-estimates', getAllCostEstimates);
router.get('/cost-estimates/:id', getCostEstimateById);
router.put('/cost-estimates/:id', updateCostEstimate);
router.delete('/cost-estimates/:id', deleteCostEstimate);
router.post('/cost-estimates/calculate/:area/:type', calculateTotalCostEstimate as any);
router.get('/cost-estimates/quantity-wise/:area/:cost', quantityWiseCalculation as any);

export default router;
