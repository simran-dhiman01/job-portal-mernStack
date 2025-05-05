import jwt from "jsonwebtoken";
import { promisify } from "util"; 

const isAuthenticated = async (req, res, next) => {
    try {
        const token = req.cookies.token;
        if (!token) {
            return res.status(401).json({
                message: "User not authenticated",
                success: false,
            })
        }
        const jwtVerify = promisify(jwt.verify); 
        const decode = await jwtVerify(token, process.env.SECRET_KEY);
        if(!decode){
            return res.status(401).json({
                message:"Invalid token",
                success:false
            })
        };
        req.id = decode.userId;
        next()
    } catch (error) {
        console.log(error);
    }
}
export default isAuthenticated;