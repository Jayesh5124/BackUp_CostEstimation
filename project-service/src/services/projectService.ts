import Project, { IProject } from '../models/project';

export class ProjectService {
    async createProject(data: IProject): Promise<IProject> {
        const project = new Project(data);
        return await project.save();
    }

    async getProjectById(id: string): Promise<IProject | null> {
        return await Project.findById(id);
    }

    async updateProject(id: string, data: Partial<IProject>): Promise<IProject | null> {
        return await Project.findByIdAndUpdate(id, data, { new: true });
    }

    async deleteProject(id: string): Promise<IProject | null> {
        return await Project.findByIdAndDelete(id);
    }

    async getAllProjects(): Promise<IProject[]> {
        return await Project.find();
    }
}
