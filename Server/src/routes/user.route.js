import express from 'express';
import { registerUser, loginUser, getUserProfile } from '../controllers/user.controller.js';
import { userLoginValidation, userRegisterValidation, handleValidationErrors } from '../middlewares/validation.middleware.js';
import verifyToken from '../middlewares/verifyToken.middleware.js';

const router = express.Router();


router.post('/register', 
    userRegisterValidation(),
    handleValidationErrors,
    registerUser
);

router.post('/login',
    userLoginValidation(),
    handleValidationErrors,
    loginUser
);


router.get('/me',
    verifyToken,
    getUserProfile
);

export default router;