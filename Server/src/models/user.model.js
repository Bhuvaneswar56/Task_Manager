import mongoose from "mongoose";
import bcrypt from "bcrypt";
import jwt from 'jsonwebtoken';
import CONFIG from "../config/config.js";

const { Schema } = mongoose;

const userSchema = new Schema({
    name: {
        type: String,
        required: [true, "Name is required"],
    },
    email: {
        type: String,
        required: [true, "Email is required"],
        unique: true,
        lowercase: true
    },
    password: {
        type: String,
        required: [true, "Password is required"]
    }
}, 
    { timestamps: true } 
);

userSchema.pre('save', async function (next) {
    if (!this.isModified('password')) next()
    this.password = await bcrypt.hash(this.password, CONFIG.SALT_ROUNDS)
    next()
})

userSchema.methods.isPasswordCorrect = async function (plainTextPassword) {
    return await bcrypt.compare(plainTextPassword, this.password)
}

userSchema.methods.generateAccessToken = function () {
    let jwtPayload = { userId: this._id };
    console.log('Token Payload:', jwtPayload);
    console.log('Secret Key:', CONFIG.JWT_SECRET_KEY);
    return jwt.sign(jwtPayload, CONFIG.JWT_SECRET_KEY, { expiresIn: '1d' });
}


export default mongoose.model('User', userSchema, 'users')