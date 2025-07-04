import Transaction from '../models/Transaction.js';
import Product from '../models/Product.js';

export const createTransaction = async (req, res) => {
    try {
        const {
            user,
            products,
            paymentMethod,
            shippingAddress,
            courier,
            notes,
            discount = 0,
        } = req.body;

        if (!user || !products || !paymentMethod || !shippingAddress || !courier) {
            return res.status(400).json({ message: 'Missing required fields' });
        }

        let amount = 0;
        const productDetails = [];

        console.log(products);

        for (const item of products) {
            const product = await Product.findById(item.product);
            if (!product) {
                return res.status(404).json({ message: `Product not found: ${item.productId}` });
            }

            if (product.stock < item.quantity) {
                return res.status(400).json({
                    message: `Insufficient stock for product: ${product.name}`
                });
            }

            const productTotal = product.price * item.quantity;
            amount += productTotal;

            product.stock -= item.quantity;
            await product.save();
        }

        const totalAmount = amount - discount;

        const transaction = new Transaction({
            user,
            products,
            amount,
            discount,
            totalAmount,
            paymentMethod,
            shippingAddress,
            courier,
            notes,
            status: 'pending', 
            shippingStatus: 'pending'
        });

        await transaction.save();

        res.status(201).json({
            message: 'Transaction created successfully',
            transaction: {
                id: transaction._id,
                referenceNumber: transaction.referenceNumber,
                totalAmount: transaction.totalAmount,
                status: transaction.status,
                createdAt: transaction.createdAt
            }
        });

    } catch (error) {
        console.error('Error creating transaction:', error);
        res.status(500).json({
            message: 'Failed to create transaction',
            error: error.message
        });
    }
};

export const getTransactionsByUser = async (req, res) => {
    try {
        const userId = req.params.userId;
        if (!userId) {
            return res.status(400).json({ message: 'User ID is required' });
        }

        const transactions = await Transaction.find({ user: userId })
            .populate('products.product')
            .sort({ createdAt: -1 });

        if (!transactions || transactions.length === 0) {
            return res.status(404).json({ message: 'No transactions found for this user' });
        }

        res.status(200).json({
            message: 'Transactions retrieved successfully',
            data : transactions
        });

    } catch (error) {
        console.error('Error retrieving transactions:', error);
        res.status(500).json({
            message: 'Failed to retrieve transactions',
            error: error.message
        });
    }
};

export const getTransactionById = async (req, res) => {
    try {
        const transactionId = req.params.id;
        if (!transactionId) {
            return res.status(400).json({ message: 'Transaction ID is required' });
        }

        const transaction = await Transaction.findById(transactionId)
            .populate('products.product');

        if (!transaction) {
            return res.status(404).json({ message: 'Transaction not found' });
        }

        res.status(200).json({
            message: 'Transaction retrieved successfully',
            data : transaction
        })
    } catch (error) {
        console.error('Error retrieving transaction:', error);
        res.status(500).json({
            message: 'Failed to retrieve transaction',
            error: error.message
        });
    }
};

export const getAllTransactions = async (req, res) => {
    try {
        const transactions = await Transaction.find()
            .populate('user', 'name email')
            .populate('products.product')
            .sort({ createdAt: -1 });

        if (!transactions || transactions.length === 0) {
            return res.status(404).json({ message: 'No transactions found' });
        }

        res.status(200).json({
            message: 'Transactions retrieved successfully',
            data : transactions
        });

    } catch (error) {
        console.error('Error retrieving all transactions:', error);
        res.status(500).json({
            message: 'Failed to retrieve transactions',
            error: error.message
        });
    }
};