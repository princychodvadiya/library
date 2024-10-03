const Books = require("../model/books.model")

const getbook = async (req, res) => {

    try {
        const books = await Books.findById(req.params.book_id)

        if (!books) {
            res.status(404).json({
                success: false,
                message: 'books not found.'
            })
        }
        res.status(200).json({
            success: true,
            message: 'books fetch successfully.',
            data: books
        })

    } catch (error) {
        res.status(500).json({
            success: false,
            message: 'Internal Server Error.' + error.message
        })
    }
}

const listbook = async (req, res) => {
    try {
        const book = await Books.find();

        if (!book || book.length === 0) {
            res.status(404).json({
                success: false,
                meassage: 'book not found.'
            })
        }
        res.status(200).json({
            success: true,
            message: 'book fetch successfully.',
            data: book
        })

    } catch (error) {
        res.status(500).json({
            success: false,
            meassage: 'Internal Server Error.' + error.meassage
        })
    }
}

const updatebook = async (req, res) => {
    try {
        const book = await Books.findByIdAndUpdate(req.params.book_id, req.body, { new: true, runValidators: true });

        if (!book) {
            res.status(400).json({
                success: false,
                message: 'book not updated.'
            })
        }
        res.status(200).json({
            success: true,
            message: 'book updated successfully.',
            data: book
        })
    } catch (error) {
        res.status(500).json({
            success: false,
            message: 'Internal Server Error.' + error.message
        })
    }
}

const addbook = async (req, res) => {
    try {
        const book = await Books.create(req.body);

        if (!book) {
            res.status(400).json({
                success: false,
                message: 'book not created.'   ``
            })
        }
        res.status(201).json({
            success: true,
            message: 'book created successfully.',
            data: book
        })
    } catch (error) {
        res.status(500).json({
            success: false,
            message: 'Internal Server Error.' + error.message
        })
    }
}

const deletebooks = async (req, res) => {

    try {
        const book = await Books.findByIdAndDelete(req.params.book_id)

        if (!book) {
            res.status(404).json({
                success: false,
                message: 'book not found',
            });
        }
        res.status(200).json({
            success: true,
            message: 'book deleted successfully',
            data: book
        })
    } catch (error) {
        res.status(500).json({
            success: false,
            message: 'Internal error' + error.message
        })
    }
}

const listofallbookwithterm = async (req, res) => {
    try {
        const searchTerm = req.query.name;
        const skip = parseInt(req.query.skip) || 0;
        const limit = parseInt(req.query.limit) || 5;

        if (!searchTerm) {
            return res.status(400).json({
                success: false,
                message: 'Please provide a search term (name).'
            });
        }

        const books = await Books.aggregate([
            {
                $match: {
                    name: { $regex: searchTerm, $options: 'i' }
                }
            },
            {
                $skip: skip
            },
            {
                $limit: limit
            },
            {
                $project: {
                    _id: 1,
                    name: 1,
                    categories: 1,
                    rent: 1,
                    isActive: 1,
                    createdAt: 1,
                    updatedAt: 1
                }
            }
        ]);

        if (books.length === 0) {
            return res.status(404).json({
                success: false,
                message: 'No books found matching the search term.'
            });
        }

        res.status(200).json({
            success: true,
            message: 'Books fetched successfully.',
            data: books
        });

    } catch (error) {
        res.status(500).json({
            success: false,
            message: 'Internal Server Error: ' + error.message
        });
    }
};

const rent_price_range = async (req, res) => {
    try {
        const { minRent, maxRent } = req.query;

        if (!minRent || !maxRent) {
            return res.status(400).json({ message: 'Please provide both minRent and maxRent as query parameters.' });
        }

        const min = parseFloat(minRent);
        const max = parseFloat(maxRent);

        if (isNaN(min) || isNaN(max)) {
            res.status(400).json({
                message: 'Invalid rent range provided. Please provide valid numbers.'
            });
        }

        const booksInRange = await Books.aggregate([
            {
                $match: {
                    rent: { $gte: min, $lte: max },
                    isActive: true
                }
            },
            {
                $project: {
                    _id: 1,
                    name: 1,
                    rent: 1,
                    categories: 1
                }
            }
        ]);

        return res.json({ books: booksInRange });

    } catch (error) {
        res.status(500).json({
            message: 'Server error occurred.'
        });
    }
};

const matchingvalues = async (req, res) => {
    try {
        const { category, searchTerm, minRent, maxRent } = req.query;

        const min = parseFloat(minRent);
        const max = parseFloat(maxRent);

        if (isNaN(min) || isNaN(max)) {
            return res.status(400).json({ message: 'Please provide valid minRent and maxRent as numbers.' });
        }

        const books = await Books.aggregate([
            {
                $match: {
                    isActive: true,
                    categories: { $regex: category, $options: 'i' },
                    name: { $regex: searchTerm, $options: 'i' },
                    rent: { $gte: min, $lte: max }
                }
            },
            {
                $project: {
                    _id: 1,
                    name: 1,
                    rent: 1,
                    categories: 1
                }
            }
        ]);

        if (books.length === 0) {
            return res.status(404).json({ message: 'No books found matching the criteria.' });
        }

        return res.json({ books });
    } catch (error) {
        return res.status(500).json({ message: 'An error occurred while fetching books.' });
    }
};

// [
//     {
//       $match: {
//         rent: { $gte: 50, $lte: 100 },
//         isActive: true
//       }
//     },
//     {
//       $project: {
//         _id: 1,
//         name: 1,
//         rent: 1,
//         categories: 1
//       }
//     }
//   ]



// [
//     {
//       $match: {
//         name: { $regex: /hobbit/i }
//       }
//     },
//     {
//       $skip: 0
//     },
//     {
//       $limit: 5
//     },
//     {
//       $project: {
//         _id: 1,
//         name: 1,
//         categories: 1,
//         rent: 1,
//         isActive: 1,
//         createdAt: 1,
//         updatedAt: 1
//       }
//     }
//   ]

module.exports = {
    getbook,
    listbook,
    updatebook,
    addbook,
    deletebooks,
    listofallbookwithterm,
    rent_price_range,
    matchingvalues
}