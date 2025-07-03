import express from "express";
import { createProduct } from "../controllers/ProductController.js";
const router = express.Router();

router.get("/", createProduct);

export default router;