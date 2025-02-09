import jwt from 'jsonwebtoken'
import CONFIG from '../config/config.js'
import userModel from '../models/user.model.js'
import { ApiError } from '../utils/ApiError.js';

async function verifyToken(req, res, next) {
    try {
       
        let token = req.headers.authorization.split(" ")[1];  
        if (!token) {
            token = req.cookies.token  
        }
        
        console.log('Token to Verify:', token);
        console.log('Secret Key for Verification:', CONFIG.JWT_SECRET_KEY);
       
        var decoded = jwt.verify(token, CONFIG.JWT_SECRET_KEY);
        req.payload = decoded;

       
        let userFound = await userModel
            .findById(req.payload.userId)
            .select("-password"); 
        if (!userFound) {
            throw new ApiError(401, "User not found");
        }

        req.user = userFound;

        next();
    } catch (error) {
        console.log(error);
        return res.status(401).json(new ApiError(401, "Token Invalid"));
    }
}

export default verifyToken