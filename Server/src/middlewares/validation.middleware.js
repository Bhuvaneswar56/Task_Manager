import { body, validationResult } from 'express-validator';
import { ApiError } from "../utils/ApiError.js";


function userRegisterValidation() {
    return [
        body("name")
            .notEmpty().withMessage("Name is required"),
        
        body("email")
            .notEmpty().withMessage("Email is required")
            .isEmail().withMessage("Invalid Email"),
        
        body("password")
            .notEmpty().withMessage("Password is required")
    ];
}


function userLoginValidation() {
    return [
        body("email")
            .notEmpty().withMessage("Email is required")
            .isEmail().withMessage("Invalid Email"),
        
        body("password")
            .notEmpty().withMessage("Password is required")
    ];
}


function createTaskValidation() {
    return [
        body("title")
            .notEmpty().withMessage("Task title is required"),
        
        body("status")
            .optional()
            .isIn(['Pending', 'In Progress', 'Completed'])
            .withMessage("Status must be Pending, In Progress, or Completed")
    ];
}

function updateTaskValidation() {
    return [
        body("title")
            .optional()  
            .notEmpty().withMessage("Title cannot be empty if provided"),
        
        body("status")
            .optional()
            .isIn(['Pending', 'In Progress', 'Completed'])
            .withMessage("Status must be Pending, In Progress, or Completed")
    ];
}

function handleValidationErrors(req, res, next) {
    const errorsResult = validationResult(req);

    if (errorsResult.isEmpty()) {
        return next();
    }
    throw new ApiError(400, "Validation Error", errorsResult.array())
}

export {
    handleValidationErrors,
    userRegisterValidation,
    userLoginValidation,
    createTaskValidation,
    updateTaskValidation
};