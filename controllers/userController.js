import User from './../models/User.js';
// import { generateToken } from '../utils/jwt.js';
export const authRegister = async (req, res) => {
    try {
        const { email, ...rest } = req.body;
        if (!email) {
            throw new Error("Email is required");
        }
        const existingUser = await User.findOne({ email });
        if (existingUser) {
            throw new Error("Email already exists");
        }
        const user = new User({ email, ...rest });
        await user.save();
        res.status(201).json({ data: user, message: "Register success" });
    } catch (error) {
        res.status(400).json({ message: error.message || "Registration failed" });
    }
}

export const authLogin = async (req, res) => {
    try {
        const { email, password } = req.body;

        if (!email || !password) {
            return res.status(400).json({
                message: "Email and password are required"
            });
        }

        const user = await User.findOne({ email }).select('+password');
        if (!user) {
            return res.status(401).json({
                message: "Invalid credentials"
            });
        }

        const isPasswordValid = await user.comparePassword(password);
        if (!isPasswordValid) {
            return res.status(401).json({
                message: "Invalid credentials"
            });
        }
        
        const token = user.generateAuthToken();

        res.cookie('token', token, {
            httpOnly: true,
            secure: process.env.NODE_ENV === 'production',
            sameSite: 'strict',
            maxAge: 24 * 60 * 60 * 1000 // 1 hari
        });

        res.status(200).json({
            success: true,
            token,
            user: {
                id: user._id,
                name: `${user.firstname} ${user.lastname}`,
                email: user.email,
                role: user.role
            }
        });

    } catch (error) {
        console.error('Login error:', error);
        res.status(500).json({
            message: error.message || "Login failed"
        });
    }
};

export const authLogout = (req, res) => {
    res.cookie('token', '', {
        httpOnly: true,
        expires: new Date(0)
    });
    res.status(200).json({ message: 'Logged out successfully' });
};

export const deleteUser = async (req, res) => {
    try {
        const userId = req.params.id;
        if (!userId) {
            throw new Error("User ID is required");
        }
        const user = await User.findByIdAndDelete(userId);
        if (!user) {
            throw new Error("User not found");
        }
        res.json({ message: "User deleted successfully" });
    } catch (error) {
        res.status(400).json({ message: error.message || "Delete user failed" });
    }
}

export const getUsers = async (req, res) => {
    try {
        const users = await User.find().exec();
        if (!users) {
            throw new Error("No users found");
        }
        res.json({ data: users, message: "Users found" });
    } catch (error) {
        res.status(400).json({ message: error.message || "An error occurred" });
    }
}