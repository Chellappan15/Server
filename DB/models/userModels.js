import mongoose from "mongoose"

const userSchema = mongoose.Schema({
    "name": {type: String },
    "username": { type: String, required: true, unique: true },
    "password": { type: String, required: true },
});

const userModels = mongoose.model("users", userSchema);

export default userModels;