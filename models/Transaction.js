import mongoose from 'mongoose';

const transactionSchema = new mongoose.Schema(
    {
        user: {
            type: mongoose.Schema.Types.ObjectId,
            ref: 'User',
            required: true,
        },
        products: [
            {
                product: {
                    type: mongoose.Schema.Types.ObjectId,
                    ref: 'Product',
                    required: true,
                },
                quantity: {
                    type: Number,
                    required: true,
                    min: 1,
                },
                price: {
                    type: Number,
                    required: true,
                },
            },
        ],
        amount: {
            type: Number,
            required: true,
        },
        status: {
            type: String,
            enum: ['pending', 'paid', 'shipped', 'completed', 'cancelled'],
            default: 'pending',
        },
        paymentMethod: {
            type: String,
            required: true,
        },
        shippingAddress: {
            type: String,
            required: true,
        },
        shippingStatus: {
            type: String,
            enum: ['pending', 'shipped', 'delivered'],
            default: 'pending',
        },
        courier: {
            type: String,
            required: true,
        },
    },
    {
        timestamps: true, // adds createdAt and updatedAt
    }
);

export default mongoose.model('Transaction', transactionSchema);
