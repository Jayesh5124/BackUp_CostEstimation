import { Router } from 'express';
import * as constructorController from '../controllers/controller';

const router = Router();

// All routes are now public
router.post('/register', constructorController.createConstructor);
router.post('/login', constructorController.loginConstructor as any);
router.get('/listings', constructorController.getListings);
router.get('/dashboard', constructorController.getDashboard);
router.get('/all-reports', constructorController.getReports);
router.get('/view-project/:id', constructorController.getViewProject);
router.get('/:id', constructorController.getConstructor);
router.get('/allConstructors', constructorController.allConstructors);

export default router;
