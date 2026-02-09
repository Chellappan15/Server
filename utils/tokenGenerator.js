import jwt from "jsonwebtoken";
import { JWT_PRIVATE_KEY } from "../constants.js";
const tokenGenerator = (payload) => jwt.sign(payload, process.env.JWT_PRIVATE_KEY);
export default tokenGenerator;