import jwt from "jsonwebtoken";

export const managerAuth = (req, res, next) => {
    try {
        const { token } = req.cookies;

        if (!token) {
            return res.status(401).json({ success: false, msg: "user not authenticated", ts: "error" });
        }

        const tokenVerified = jwt.verify(token, process.env.jWTKEY);

        if (!tokenVerified) {
            return res.status(401).json({ success: false, msg: "user not authenticated", ts: "error" });
        }
        
        if (tokenVerified.role === 'admin') {
            req.user = tokenVerified;
            return next();
        } else {
            return res.status(403).json({ success: false, msg: "user does not have permission to access this route", ts: "error" });
        }

    } catch (error) {
        console.error(error);
        return res.status(500).json({ success: false, msg: "internal server error", ts: "error" });
    }
};
