import mongoose from 'mongoose';
const { Schema } = mongoose;

const taskSchema = new Schema({
    title: {
        type: String,
        required: [true, "Title is required"],
        trim: true
    },
    description: {
        type: String,
        trim: true
    },
    status: {
        type: String,
        enum: ['Pending', 'In Progress', 'Completed'],
        default: 'Pending'
    },
    createdBy: {
        type: Schema.Types.ObjectId,
        ref: 'User',
        required: true
    }
}, 
    { timestamps: true }
);

export default mongoose.model('Task', taskSchema, 'tasks')