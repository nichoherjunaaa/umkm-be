import User from './../models/User.js';

export const authRegister = async (req, res) => {
    try {
        const body = req.body;
        if(await User.findOne({ email: body.email })) {
            throw new Error("Email already exist");
        }
        const user = new User(body);
        await user.save();
        res.json({ data: user, message: "Register success" });
    } catch (error) {
        res.status(400).json({ message: error.message });
    }
}

export const authLogin = async (req, res) => {
    try {
        const body = req.body;
        const user = await User.findOne({ email: body.email });
        if (!user) {
            throw new Error("User not found");
        }
        if (!user.comparePassword(body.password)) {
            throw new Error("Invalid password");
        }
        res.json({ data: user, message: "Login success" });
    } catch (error) {
        res.status(401).json({ message: error.message });
    }
}

