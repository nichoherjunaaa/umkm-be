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
                    min: 0,
                },
                name: {
                    type: String,
                    required: true
                }
            },
        ],
        amount: {
            type: Number,
            required: true,
            min: 0,
        },
        discount: {
            type: Number,
            default: 0,
        },
        totalAmount: {
            type: Number,
            required: true,
        },
        status: {
            type: String,
            enum: ['pending', 'paid', 'shipped', 'completed', 'cancelled', 'refunded'],
            default: 'pending',
        },
        paymentMethod: {
            type: String,
            enum: ['credit_card', 'bank_transfer', 'e_wallet', 'cash_on_delivery'],
            required: true,
        },
        paymentDetails: {
            paymentId: String,
            paymentDate: Date,
            paymentStatus: String,
        },
        shippingAddress: {
            street: String,
            city: String,
            state: String,
            postalCode: String,
            country: String,
            phone: String,
        },
        shippingStatus: {
            type: String,
            enum: ['pending', 'processing', 'shipped', 'delivered', 'returned'],
            default: 'pending',
        },
        courier: {
            type: String,
            enum: ['jne', 'tiki', 'pos', 'jnt', 'sicepat', 'other'],
            required: true,
        },
        referenceNumber: {
            type: String,
            unique: true,
        },
        notes: {
            type: String,
            default: '',
        },
    },
    {
        timestamps: true,
    }
);

transactionSchema.pre('save', async function (next) {
    if (!this.referenceNumber) {
        this.referenceNumber = `TRX-${Date.now()}-${Math.floor(Math.random() * 1000)}`;
    }
    next();
});

export default mongoose.model('Transaction', transactionSchema);