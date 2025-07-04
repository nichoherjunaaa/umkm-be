import express from 'express';
import { createTransaction, getTransactionById, getTransactionsByUser } from '../controllers/TransactionController.js';

const router = express.Router();

router.get('/user/:id', getTransactionsByUser);
router.get('/detail/:id', getTransactionById);
router.post('/create', createTransaction);

export default router;