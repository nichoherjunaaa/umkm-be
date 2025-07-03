import express from "express";
import dotenv from "dotenv";
import cookieParser from "cookie-parser";
import { dbConnection } from "./config/Connection.js";

// Route
import userRouter from "./routes/userRouter.js";
import productRouter from "./routes/productRoute.js";
import transactionRouter from "./routes/transactionRoute.js";

dotenv.config();
const app = express();
app.use(express.json());
app.use(cookieParser());
app.use(express.urlencoded({ extended: true }));
dbConnection();

app.get('/', (req, res) => {
    res.send('api ready!')
})

app.use("/api/product", productRouter);
app.use("/api/user", userRouter);
app.use("/api/transaction", transactionRouter);


app.use((err, req, res, next) => {
    console.error(err.stack);
    res.status(500).json({ message: 'Something went wrong!' });
});

app.listen(3000, () => {
    console.log('Example app listening on port 3000!')
})