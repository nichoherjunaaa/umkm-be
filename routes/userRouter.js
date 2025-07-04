import express from "express";
import { authLogin, authLogout, authRegister, deleteUser, getUsers } from "../controllers/userController.js";

const router = express.Router();

router.get('/', getUsers);
router.post('/login', authLogin);
router.post('/register', authRegister);
router.delete('/delete/:id', deleteUser);
router.post('/logout', authLogout);

export default router