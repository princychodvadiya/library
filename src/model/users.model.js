const mongoose = require('mongoose');

const usersSchema = new mongoose.Schema(
    {
        user_name: {
            type: String,
            required: true,
            trim: true,
            unique: true,
            lowercase: true
        },
        address: {
            type: String,
            required: true,
            trim: true
        },
        mobile_no: {
            type: Number,
            trim: true,
            required: true
        },
        email: {
            type: String,
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

const Users = mongoose.model('users', usersSchema);

module.exports = Users;