"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = require("express");
const controller_1 = require("../controllers/controller");
// import { authMiddleware } from '../middlewares/authMiddleware';
const router = (0, express_1.Router)();
router.get('/:id', controller_1.getConstructor);
// Route to create a new user
router.post('/', controller_1.createConstructor);
exports.default = router;
