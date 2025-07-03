import express from "express";
import dotenv from "dotenv";

import { dbConnection} from "./config/Connection.js";

// Route
import userRouter from "./routes/userRouter.js";
import productRouter from "./routes/productRoute.js";
dotenv.config();
const app = express();

dbConnection();

app.get('/', (req,res) => {
    res.send('Hello World!')
})

app.listen(3000, () => {
    console.log('Example app listening on port 3000!')
})