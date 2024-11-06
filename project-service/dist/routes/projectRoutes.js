"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const projectController_1 = require("../controllers/projectController");
const router = express_1.default.Router();
router.post('/projects', projectController_1.createProject);
router.get('/projects/:id', projectController_1.getProjectById);
// router.put('/projects/:id', updateProject);
// router.delete('/projects/:id', deleteProject);
// router.get('/projects', getAllProjects);
exports.default = router;
//# sourceMappingURL=projectRoutes.js.map