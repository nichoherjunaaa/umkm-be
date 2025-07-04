import express from 'express';
import { createTransaction, getAllTransactions, getTransactionById, getTransactionsByUser } from '../controllers/TransactionController.js';

const router = express.Router();

router.get('/user/:id', getTransactionsByUser);
router.get('/detail/:id', getTransactionById);
router.post('/create', createTransaction);
router.get('/all', getAllTransactions);

export default router;