import express from 'express';
import { createTask, getAllTasks, getTaskById, updateTask, deleteTask } from '../controllers/task.controller.js';
import { createTaskValidation,updateTaskValidation, handleValidationErrors } from '../middlewares/validation.middleware.js';
import verifyToken from '../middlewares/verifyToken.middleware.js';
import { asyncHandler } from '../utils/asyncHandler.js';

const router = express.Router();

router.get('/', verifyToken, getAllTasks);


router.post('/', 
    verifyToken, 
    createTaskValidation(), 
    handleValidationErrors, 
    createTask
);


router.get('/:id', verifyToken, getTaskById);


router.put('/:id', 
    verifyToken, 
    updateTaskValidation(),
    handleValidationErrors, 
    updateTask
);


router.delete('/:id', verifyToken, deleteTask);

export default router;