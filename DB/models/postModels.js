import mongoose from "mongoose"

const postsSchema = mongoose.Schema({
    "title": {type: String, required: true },
    "content": { type: String, required: true },
    "tag": { type: String, required: true },
    "author": { type: String, required: true },
    "dateCreated": { type: Date, required: true }
});

const postModels = mongoose.model("posts", postsSchema);

export default postModels;