import mongoose from "mongoose";
import postModels from "../DB/models/postModels.js";
import userModels from "../DB/models/userModels.js";
import { tokenValidator } from "../utils/tokenValidator.js";

const getAllPosts = async (parent, args, context, info) => {
    try { 
        const getUserName = tokenValidator((context.authorization).split(" ")[1]);

        // Check if user exists
        const findUser = await userModels.findOne({
            username: getUserName
        });

        if (!findUser) {
            return {
                success: false,
                message: "User not found"
            }
        };

        // Retrieve all posts
        const allPosts = await postModels.find();
        
        return {
            posts: allPosts,
            ReturnDetails: {
                success: true,
                message: "Posts retrieved successfully"
            }
        };   
    }
    catch (error) {         
        console.error("Error retrieving posts:", error);
        throw new Error("Failed to retrieve posts");
    }
}

const createPost = async(parent, args, context, info) => {
    try {
        const { post } = args;
        const getUserName = tokenValidator((context.authorization).split(" ")[1]);
        
        // Check if user exists
        const findUser = await userModels.findOne({
            username: getUserName
        });

        if (!findUser) {     
            return {
                success: false,
                message: "User not found"
            }
        };

        // Create new post
        const newPost = await postModels.create({
            title: post.title,
            content: post.content,
            tag: post.tag,
            author: getUserName,
            dateCreated: new Date().toDateString(),
        });

        return {
            returnDetails:{
                success: true,
                message: "Post added successfully"
            },
            post: {
                title: post.title,
                content: post.content,
                tag: post.tag,
                dateCreated: new Date().toDateString(),
                id: newPost._id,
                author: getUserName,
            }
        };
    }
    catch (error) {
        console.error("Error adding post:", error);
        throw new Error("Failed to add post");
    }
}

const getMyPosts = async(parent, args, context, info) => {
    try {
        const getUserName = tokenValidator((context.authorization).split(" ")[1]);  

        // Check if user exists
        const findUser = await userModels.findOne({
            username: getUserName
        }); 

        if (!findUser) {
            return {
                success: false,
                message: "User not found"
            }
        }

        // Retrieve user's posts
        const userPosts = await postModels.find({ author: getUserName });
        
        return {
            posts: userPosts,
            success: true,
            message: "User posts retrieved successfully"
        };
    }   
    catch (error) {
        console.error("Error retrieving user posts:", error);
        throw new Error("Failed to retrieve user posts");
    }
}

const updateMyPosts = async (parent, args, context, info) => {
    try {
        const getUserName = tokenValidator((context.authorization).split(" ")[1]);

        // Check if user exists
        const findUser = await userModels.findOne({
            username: getUserName
        });
        if (!findUser) {
            return {
                returnDetails: {
                    success: false,
                    message: "User not found"
                }
            }
        }
        
        const { title, content, tag } = args.post;
        const id = args.id;
        // Update post logic here
        const findPostAndUpdate = await postModels.findOneAndUpdate(
            { _id: new mongoose.Types.ObjectId(id), author: getUserName },
            { $set: { title, content, tag } },
            { new: true }
        );

        if (!findPostAndUpdate) {
            return {
                returnDetails: {
                    success: false,
                    message: "Post not found or you're not the author"
                }
            }
        }

        return {
            returnDetails: {
                success: true,
                message: "Post updated successfully",
            },
            post: findPostAndUpdate
        }
    }
    catch (error) {
        return {
            returnDetails: {
                success: false,
                message: "Error updating post"
            }
        }
    }
}

const deleteMyPost = async (parent, args, context, info) => {
    try {
        const getUserName = tokenValidator((context.authorization).split(" ")[1]);

        // Check if user exists
        const findUser = await userModels.findOne({
            username: getUserName
        });
        if (!findUser) {
            return {
                returnDetails: {
                    success: false,
                    message: "User not found"
                }
            }
        }
        
        const id = args.id;
        // Update post logic here
        const findPostAndUpdate = await postModels.findOneAndDelete(
            { _id: new mongoose.Types.ObjectId(id), author: getUserName }
        );

        if (!findPostAndUpdate) {
            return {
                returnDetails: {
                    success: false,
                    message: "Post not found"
                }
            }
        }

        return {
            returnDetails: {
                success: true,
                message: "Post deleted successfully",
            },
            deleted: true
        }
    }
    catch (error) {
        return {
            returnDetails: {
                success: false,
                message: "Error updating post"
            }
        }
    }
}

const getSingleRequestedPost = async (parent, args, context, info) => {
    try { 
        const getUserName = tokenValidator((context.authorization).split(" ")[1]);
        const postId = args.postId;

        // Check if user exists
        const findUser = await userModels.findOne({
            username: getUserName
        });

        if (!findUser) {
            return {
                returnDetails: {
                    success: false,
                    message: "User not found"
                }
            }
        };

        // Retrieve asingle requested posts
        const requestedPost = await postModels.find({
            _id: new mongoose.Types.ObjectId(postId)
        });

        if (!requestedPost) {
            return {
                returnDetails: {
                    success: false,
                    message: "Post not found"
                }
            }
        }
        
        return {
            returnDetails: {
                success: true,
                message: "Post found"
            },
            post: requestedPost[0]
        };
    }
    catch (error) {         
        console.error("Error retrieving post:", error);
        throw new Error("Failed to retrieve posts");
    }
}

export { getAllPosts, createPost, getMyPosts, updateMyPosts, deleteMyPost, getSingleRequestedPost };