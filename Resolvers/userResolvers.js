import bcrypt from "bcrypt";
import userModels from "../DB/models/userModels.js";
import { JWT_PRIVATE_KEY } from "../constants.js";
import tokenGenerator from "../utils/tokenGenerator.js";

const loginUser = async (parent, args, context) => {
    try {
        const { username, password } = args.user;
        
        const getUser = await userModels.findOne({
            username
        });

        if (!getUser) {
            return {
                success: false,
                message: "User not found"
            }
        }

        const parsePassword = await bcrypt.compare(password, getUser.password);
        if (!parsePassword) {
            return {
                success: false,
                message: "Incorrect password"
            }
        };

        return {
            success: true,
            message: "Login successful",
            name: getUser.name,
            username,
            token: tokenGenerator({ username })
        }
    }
    catch (error) {
        console.error("Error logging in user:", error);
        throw new Error("Failed to log in user");
    }
}

const createUser = async (parent, args, context) => {
    try {
        const { name, username, password } = args.user;

        const existingUser = await userModels.findOne({ username });
        if (existingUser) {
            return {
                success: false,
                message: "User already exists"
            };
        }

        const hashedPassword = await bcrypt.hash(password, 10);

        await userModels.create({
            name,
            username,
            password: hashedPassword
        });

        return {
            success: true,
            message: "User added successfully",
            name,
            username,
            token: tokenGenerator({ username })
        };
    } catch (error) {
        console.error("Error adding user:", error);
        throw new Error("Failed to add user");
    }
};

export { loginUser, createUser };