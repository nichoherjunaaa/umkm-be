import express from "express";
import { createProduct, getProductById, getProducts, updateProduct } from "../controllers/productController.js";
import { authorize, protect } from "../middleware/jwt.js";
const router = express.Router();

router.get('/', getProducts);
router.get('/:id', getProductById);

router.use(protect);

router.post('/', authorize('admin'), createProduct);
router.route('/:id')
    .put(authorize('admin'), updateProduct);
export default router;