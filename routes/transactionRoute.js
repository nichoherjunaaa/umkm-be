import express from 'express';
import { createTransaction, getTransactionsByUser } from '../controllers/TransactionController.js';

const router = express.Router();

router.get('/:id', getTransactionsByUser);
router.post('/create', createTransaction);
export default router;