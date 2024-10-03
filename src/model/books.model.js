const mongoose = require('mongoose');

const booksSchema = new mongoose.Schema(
    {
        name: {
            type: String,
            required: true,
            trim: true,
            unique: true,
            lowercase: true
        },
        categories: {
            type: String,
            required: true,
            trim: true
        },
        rent: {
            type: Number,
            trim: true,
            required: true
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

const Books = mongoose.model('books', booksSchema);

module.exports = Books;