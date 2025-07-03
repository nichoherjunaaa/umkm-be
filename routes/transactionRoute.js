import express from 'express';
import { createTransaction } from '../controllers/TransactionController.js';

const router = express.Router();

router.post('/create', createTransaction);

export default router;