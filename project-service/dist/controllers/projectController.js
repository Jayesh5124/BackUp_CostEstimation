"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.getProjectById = exports.createProject = void 0;
const projectService_1 = require("../services/projectService");
const projectService = new projectService_1.ProjectService();
const createProject = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const project = yield projectService.createProject(req.body);
        res.status(201).json(project);
    }
    catch (error) {
        res.status(500).json({ error: 'Failed to create project' });
    }
});
exports.createProject = createProject;
const getProjectById = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const project = yield projectService.getProjectById(req.params.id);
        project ? res.json(project) : res.status(404).json({ error: 'Project not found' });
    }
    catch (error) {
        res.status(500).json({ error: 'Failed to retrieve project' });
    }
});
exports.getProjectById = getProjectById;
// Other functions for update, delete, and getAll...
//# sourceMappingURL=projectController.js.map