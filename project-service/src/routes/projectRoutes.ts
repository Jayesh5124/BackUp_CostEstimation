import express from 'express';
import { createProject, deleteProject, getAllProjects, getProjectById, updateProject} from '../controllers/projectController';

const router = express.Router();

router.post('/projects', createProject);
router.get('/projects/:id', getProjectById);
router.put('/projects/:id', updateProject);
 router.delete('/projects/:id', deleteProject);
router.get('/projects', getAllProjects);

export default router;
