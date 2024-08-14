import mongoose from "mongoose";

const todoSchema = new mongoose.Schema({
    title: {
        type: String,
        required: true,
        trim: true
    },
    stateG: {
        type: String,
        enum: ["pending", "completed"],
        default: "completed"
    },
    userId: {
        type: mongoose.Schema.Types.ObjectId,
        required: true,
        ref: "User"
    }
});

const Todo = mongoose.model("Todo", todoSchema);

export default Todo;