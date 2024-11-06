import { Request, Response } from 'express';
import { ProjectService } from '../services/projectService';

const projectService = new ProjectService();

export const createProject = async (req: Request, res: Response) => {
    try {
        const project = await projectService.createProject(req.body);
        res.status(201).json(project);
    } catch (error) {
        res.status(500).json({ error: 'Failed to create project' });
    }
};

export const getProjectById = async (req: Request, res: Response) => {
    try {
        const project = await projectService.getProjectById(req.params.id);
        project ? res.json(project) : res.status(404).json({ error: 'Project not found' });
    } catch (error) {
        res.status(500).json({ error: 'Failed to retrieve project' });
    }
};
export const updateProject=async (req:Request, res:Response)=>
{

    try{
        const updatedProject = await projectService.updateProject(req.params.id, req.body);
        updatedProject? res.json(updatedProject) : res.status(404).json({ error: 'Project not found' });
    }
    catch(error){
        res.status(500).json({ error: 'Failed to update project' });
    }
}
export const deleteProject=async (req:Request, res:Response) => {
    try {
        const deletedProject = await projectService.deleteProject(req.params.id);
        deletedProject? res.json(deletedProject) : res.status(404).json({ error: 'Project not found' });
    } catch (error) {
        res.status(500).json({ error: 'Failed to delete project' });
    }
};
export const getAllProjects=async(req: Request,res: Response)=>
{
    try{
        const projects = await projectService.getAllProjects();
        res.json(projects);
    }
    catch(error){
        res.status(500).json({ error: 'Failed to retrieve projects' });
    }
}

// Other functions for update, delete, and getAll...
