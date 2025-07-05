import express from 'express';
import { createTransaction, getAllTransactions, getTransactionById, getTransactionsByUser } from '../controllers/TransactionController.js';
import { protect } from '../middleware/jwt.js';

const router = express.Router();

router.use(protect);
router.route('/').post(createTransaction).get(getAllTransactions);
router.get('/user/:id', getTransactionsByUser);
router.get('/detail/:id', getTransactionById);

export default router;
