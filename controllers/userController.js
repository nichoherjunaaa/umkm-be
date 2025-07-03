import User from './../models/User.js';

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
        res.json({ data: user, message: "Register success" });
    } catch (error) {
        res.status(400).json({ message: error.message || "Registration failed" });
    }
}

export const authLogin = async (req, res) => {
    try {
        const { email, password } = req.body;
        if (!email || !password) {
            throw new Error("Email and password are required");
        }
        const user = await User.findOne({ email });
        if (!user) {
            throw new Error("Invalid credentials");
        }
        const isPasswordValid = await user.comparePassword(password);
        if (!isPasswordValid) {
            throw new Error("Invalid credentials");
        }
        res.json({ data: user, message: "Login success" });
    } catch (error) {
        res.status(401).json({ message: error.message || "Login failed" });
    }
}

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

export const getUsers = async(req, res) => {
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