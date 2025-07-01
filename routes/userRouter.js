import express from "express";
import { authLogin, authRegister } from "../controllers/userController.js";

const router = express.Router();

router.post('/login', authLogin);
router.post('/register', authRegister);

export default router