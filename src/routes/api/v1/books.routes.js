const express = require('express');
const { booksController } = require('../../../controller');

const router = express.Router();

router.post(
    '/add-book',
    booksController.addbook
)

router.get(
    '/get-book/:book_id',
    booksController.getbook
)

router.get(
    '/list-book',
    booksController.listbook
)

router.put(
    '/update-book/:book_id',
    booksController.updatebook
)

router.delete(
    '/delete-book/:book_id',
    booksController.deletebooks
)

router.get(
    '/list-book-with-term',
    booksController.listofallbookwithterm
)

router.get(
    '/rent-price-range',
    booksController.rent_price_range
)

router.get(
    '/matching-values',
    booksController.matchingvalues
)


module.exports = router;    