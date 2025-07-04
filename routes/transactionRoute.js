import express from 'express';
import { createTransaction, getAllTransactions, getTransactionById, getTransactionsByUser } from '../controllers/TransactionController.js';
import { protect } from '../middleware/jwt.js';

const router = express.Router();

router.post('/', protect, createTransaction);
router.get('/', protect, getAllTransactions);
router.get('/user/:id', protect, getTransactionsByUser);
router.get('/detail/:id', protect, getTransactionById);

export default router;