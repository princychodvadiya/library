const Books = require("../model/books.model")
const Transaction = require("../model/transaction.model")

const gettransaction = async (req, res) => {

    try {
        const transaction = await Transaction.findById(req.params.transaction_id)

        if (!transaction) {
            res.status(404).json({
                success: false,
                message: 'transaction not found.'
            })
        }
        res.status(200).json({
            success: true,
            message: 'transaction fetch successfully.',
            data: transaction
        })

    } catch (error) {
        res.status(500).json({
            success: false,
            message: 'Internal Server Error.' + error.message
        })
    }
}

const listtransaction = async (req, res) => {
    try {
        const transaction = await Transaction.find();

        if (!transaction || transaction.length === 0) {
            res.status(404).json({
                success: false,
                meassage: 'transaction not found.'
            })
        }
        res.status(200).json({
            success: true,
            message: 'transaction fetch successfully.',
            data: transaction
        })

    } catch (error) {
        res.status(500).json({
            success: false,
            meassage: 'Internal Server Error.' + error.meassage
        })
    }
}

const updatetransaction = async (req, res) => {
    try {
        const transaction = await Transaction.findByIdAndUpdate(req.params.transaction_id, req.body, { new: true, runValidators: true });

        if (!transaction) {
            res.status(400).json({
                success: false,
                message: 'transaction not updated.'
            })
        }
        res.status(200).json({
            success: true,
            message: 'transaction updated successfully.',
            data: transaction
        })
    } catch (error) {
        res.status(500).json({
            success: false,
            message: 'Internal Server Error.' + error.message
        })
    }
}

// const addtransaction = async (req, res) => {
//     try {
//         const transaction = await Transaction.create(req.body);

//         if (!transaction) {
//             res.status(400).json({
//                 success: false,
//                 message: 'transaction not created.'
//             })
//         }
//         res.status(201).json({
//             success: true,
//             message: 'transaction created successfully.',
//             data: transaction
//         })
//     } catch (error) {
//         res.status(500).json({
//             success: false,
//             message: 'Internal Server Error.' + error.message
//         })
//     }
// }

const deletetransactions = async (req, res) => {

    try {
        const transaction = await Transaction.findByIdAndDelete(req.params.transaction_id)

        if (!transaction) {
            res.status(404).json({
                success: false,
                message: 'transaction not found',
            });
        }
        res.status(200).json({
            success: true,
            message: 'transaction deleted successfully',
            data: transaction
        })
    } catch (error) {
        res.status(500).json({
            success: false,
            message: 'Internal error' + error.message
        })
    }
}

const issue_date = async (req, res) => {
    try {
        const { book_name, user_id, issue_date, total_rent } = req.body;

        const book = await Books.findOne({ name: book_name });

        if (!book) {
            return res.status(404).json({
                success: false,
                message: 'Book not found.'
            });
        }

        const book_id = book._id;

        const transaction = await Transaction.create({
            book_id,
            user_id,
            issue_date,
            total_rent,
            isActive: true
        });

        if (!transaction) {
            return res.status(400).json({
                success: false,
                message: 'Transaction not created.'
            });
        }

        res.status(201).json({
            success: true,
            message: 'Transaction created successfully.',
            data: transaction
        });
    } catch (error) {
        res.status(500).json({
            success: false,
            message: 'Internal Server Error: ' + error.message
        });
    }
};

const return_date = async (req, res) => {
    try {
        const { book_name, user_id, return_date } = req.body;


        const { transaction_id } = req.params

        if (!transaction_id) {
            return res.status(400).json({
                success: false,
                message: 'Transaction ID is required.'
            });
        }

        const book = await Books.findOne({ name: book_name });
        if (!book) {
            return res.status(404).json({
                success: false,
                message: 'Book not found.'
            });
        }

        const book_id = book._id;
        const rent = book.rent

        const transaction = await Transaction.findOne({
            _id: transaction_id,
            book_id,
            user_id,
            isActive: true
        });

        if (!transaction) {
            return res.status(404).json({
                success: false,
                message: 'Transaction not found or book not issued to this user.'
            });
        }

        const issueDate = new Date(transaction.issue_date);
        const returnDate = new Date(return_date);

        if (returnDate < issueDate) {
            return res.status(400).json({
                success: false,
                message: 'Return date cannot be before the issue date.'
            });
        }

        const diffTime = Math.abs(returnDate - issueDate);
        const diffDays = Math.floor(diffTime / (1000 * 60 * 60 * 24));
        

        const DAILY_RENTAL_RATE = rent;
        const total_rent = diffDays * DAILY_RENTAL_RATE;

        transaction.return_date = return_date;
        transaction.total_rent = total_rent;
        transaction.isActive = false;

        await transaction.save();

        return res.status(200).json({
            success: true,
            message: 'Book returned successfully.',
            data: {
                book_name,
                user_id,
                return_date,
                total_rent
            }
        });
    } catch (error) {
        return res.status(500).json({
            success: false,
            message: 'Internal Server Error: ' + error.message
        });
    }
};





module.exports = {
    gettransaction,
    listtransaction,
    updatetransaction,
    // addtransaction,
    deletetransactions,
    issue_date,
    return_date
}