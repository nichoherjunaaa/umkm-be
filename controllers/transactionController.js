import Transaction from '../models/Transaction.js';
export const createTransaction = async (req, res) => {
    try {
        const body = req.body;
        if (!body || !body.userId || !body.productId || !body.quantity) {
            throw new Error("Missing required fields: userId, productId, quantity");
        }
        const transaction = new Transaction(body);
        await transaction.save();
        res.json({ data: transaction, message: "Transaction created" });
    } catch (error) {
        console.error(error);
        res.status(400).json({ message: error.message });
    }
}