import JWT from "jsonwebtoken";

// route protection based on token
export const requireSignIn = async (req, res, next) => {
    try {
        const auth = req.headers?.authorization || req.headers?.Authorization
        const decode = JWT.verify(auth, process.env.JWT_SECRET);

        req.user = decode;
        next();
    } catch (error) {
        res.send({
            success: false,
            message: 'Access denied',
            error
        });
    }
}
