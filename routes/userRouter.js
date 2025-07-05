import express from "express";
import {
  authLogin,
  authLogout,
  authRegister,
  deleteUser,
  getUsers,
} from "../controllers/userController.js";
import { authorize, protect } from "../middleware/jwt.js";

const router = express.Router();

router.post("/login", authLogin);
router.post("/register", authRegister);
router.delete("/delete/:id", protect, deleteUser);
router.post("/logout", protect, authLogout);
router.get("/", protect, authorize('admin'), getUsers);

export default router;
