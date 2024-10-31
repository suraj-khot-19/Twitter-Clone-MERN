import jwt from "jsonwebtoken"
import User from "../model/user.model.js"


//middleware
const userMiddleware = async (req, res, next) => {
    try {
        //get token from request
        const token = req.cookies.jwt;

        //if no token
        if (!token) {
            return res.status(401).json({ msg: "Token required!" })
        }

        //verify
        const verify = jwt.verify(token, process.env.JWT_SECURE_CODE)

        if (!verify) {
            return res.status(401).json({ msg: "invalid token" })
        }

        //if verifyed
        const user = await User.findById(verify.userId).select('-password'); //select user but not password

        if (!user) {
            return res.status(401).json({ msg: "user not found" })
        }

        //if user found send to req
        req.user = user;

        //if everything ok
        next();
    } catch (error) {
        res.status(500).json({ error: error.message })
        console.log("error in middleware, ", error.message)
    }
}

export default userMiddleware;