import mongoose from "mongoose"

export const dbConnection = async () => {
    try {
        if (!process.env.MONGODB_URL) {
            throw new Error("MONGODB_URL is not set")
        }
        await mongoose.connect(process.env.MONGODB_URL)
        console.log("Database connected");
    } catch (error) {
        console.error(error);
        throw error;
    }
}

