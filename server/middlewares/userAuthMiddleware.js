import jwt from "jsonwebtoken";

export const userAuth = (req, res, next) => {
    try {
        const { token } = req.cookies;

        if (!token) {
            return res.status(400).json({ success: false, msg: "user not authenticated",ts: "error" });
        }

        const tokenVerified = jwt.verify(token, process.env.jWTKEY);

        if (!tokenVerified) {
            return res.status(400).json({ success: false, msg: "user not authenticated",ts: "error" });
        }

        req.user = tokenVerified;
        
        next();
    } catch (error) {
        console.log(error);
    }
};