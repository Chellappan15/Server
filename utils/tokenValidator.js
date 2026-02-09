import jwt from "jsonwebtoken";
import { JWT_PRIVATE_KEY } from "../constants.js";

export const tokenValidator = (token) => {
    const decoded = jwt.verify(token, process.env.JWT_PRIVATE_KEY);         
    return decoded.username;
}