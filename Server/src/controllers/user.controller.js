import { asyncHandler } from '../utils/asyncHandler.js';
import { ApiError } from '../utils/ApiError.js';
import { ApiResponse } from '../utils/ApiResponse.js';
import User from '../models/user.model.js';
import CONFIG from '../config/config.js';

const registerUser = asyncHandler(async (req, res) => {
    const { name, email, password } = req.body;

    const existingUser = await User.findOne({ email });
    if (existingUser) {
        throw new ApiError(400, "Email already registered");
    }

   
    const user = await User.create({
        name,
        email,
        password
    });

    const createdUser = await User.findById(user._id).select("-password");

    return res.status(201).json(
        new ApiResponse(201, "User registered successfully",createdUser)
    );
});

const loginUser = asyncHandler(async (req, res) => {
    const { email, password } = req.body;

    const userFound = await User.findOne({ email });
    if (!userFound) {
        throw new ApiError(404, "User does not exist");
    }

    const isPasswordValid = await userFound.isPasswordCorrect(password);
    if (!isPasswordValid) {
        throw new ApiError(401, "Invalid credentials");
    }

    
    const token = userFound.generateAccessToken();

    console.log('Generated Token:', token);
    console.log('Token Payload:', { userId: userFound._id });
    console.log('Secret Key Used:', CONFIG.JWT_SECRET_KEY);

    const loggedInUser = await User.findById(userFound._id).select("-password");

    return res.status(200).json(
        new ApiResponse(200, "User logged in successfully", {
            user: loggedInUser,
            token
        })
    );
});

const getUserProfile = asyncHandler(async (req, res) => {
    const user = await User.findById(req.user._id).select("-password");
    
    return res.status(200).json(
        new ApiResponse(200, "User profile fetched successfully", user)
    );
});

export {
    registerUser,
    loginUser,
    getUserProfile
};