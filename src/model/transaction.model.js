const mongoose = require('mongoose');

const transactionSchema = new mongoose.Schema(
    {
        
        book_id: {
            type: mongoose.Types.ObjectId,
            required: true,
            ref: 'Books'
        },
        user_id: {
            type: mongoose.Types.ObjectId,
            required: true,
            ref: 'Users'
        },
        issue_date: {
            type: String,
            required: true
        },
        return_date: {
            type: String
        },
        total_rent: {
            type: Number,
            trim: true
        },
        isActive: {
            type: Boolean,
            default: true,
            required: true
        }
    },
    {
        timestamps: true,
        versionKey: false
    }
)

const Transaction = mongoose.model('transactions', transactionSchema);

module.exports = Transaction;