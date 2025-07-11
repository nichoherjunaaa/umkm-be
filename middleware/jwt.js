import jwt from 'jsonwebtoken';
import dotenv from 'dotenv';

dotenv.config();

const JWT_SECRET = process.env.JWT_SECRET;
const JWT_EXPIRES_IN = process.env.JWT_EXPIRES_IN;

export const generateToken = (userId, role) => {
    return jwt.sign(
        { id: userId, role },
        JWT_SECRET,
        { expiresIn: JWT_EXPIRES_IN }
    );
};

export const verifyToken = (token) => {
    return jwt.verify(token, JWT_SECRET);
};

export const protect = async (req, res, next) => {
    try {
        let token;

        if (
            req.headers.authorization &&
            req.headers.authorization.startsWith('Bearer')
        ) {
            token = req.headers.authorization.split(' ')[1];
        } else if (req.cookies.token) {
            token = req.cookies.token;
        }

        if (!token) {
            return res.status(401).json({
                message: 'Not authorized, no token provided'
            });
        }

        const decoded = verifyToken(token);

        req.user = decoded;
        next();
    } catch (error) {
        console.error('Authentication error:', error);
        return res.status(401).json({
            message: 'Not authorized, token failed'
        });
    }
};

export const authorize = (...roles) => {
    return (req, res, next) => {
        if (!roles.includes(req.user.role)) {
            return res.status(403).json({
                message: `User role ${req.user.role} is not authorized to access this route`
            });
        }
        next();
    };
};