import { asyncHandler } from '../utils/asyncHandler.js';
import { ApiError } from '../utils/ApiError.js';
import { ApiResponse } from '../utils/ApiResponse.js';
import Task from '../models/task.model.js';


const createTask = asyncHandler(async (req, res) => {
    const { title, description, status } = req.body;

    const task = await Task.create({
        title,
        description,
        status,
        createdBy: req.user._id
    });

    return res.status(201).json(
        new ApiResponse(201, "Task created successfully", task)
    );
});


const getAllTasks = asyncHandler(async (req, res) => {
    const tasks = await Task.find({ createdBy: req.user._id });

    return res.status(200).json(
        new ApiResponse(200, "Tasks fetched successfully", tasks)
    );
});


const getTaskById = asyncHandler(async (req, res) => {
    const task = await Task.findOne({
        _id: req.params.id,
        createdBy: req.user._id
    });

    if (!task) {
        throw new ApiError(404, "Task not found");
    }

    return res.status(200).json(
        new ApiResponse(200, "Task fetched successfully", task)
    );
});



const updateTask = asyncHandler(async (req, res) => {
    
    const { title, description, status } = req.body;

    const task = await Task.findOne({
        _id: req.params.id,
        createdBy: req.user._id
    }); 

    if (!task) {
        console.log("4. Task not found");
        throw new ApiError(404, "Task not found");
    }

    if (title) task.title = title;
    if (description !== undefined) task.description = description;
    if (status) task.status = status;

    
    await task.save();
   

    return res.status(200).json(
        new ApiResponse(200, "Task updated successfully", task)
    );
});

const deleteTask = asyncHandler(async (req, res) => {
    const task = await Task.findOneAndDelete({
        _id: req.params.id,
        createdBy: req.user._id
    });

    if (!task) {
        throw new ApiError(404, "Task not found");
    }

    return res.status(200).json(
        new ApiResponse(200, "Task deleted successfully", task)
    );
});

export {
    createTask,
    getAllTasks,
    getTaskById,
    updateTask,
    deleteTask
};