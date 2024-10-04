const express = require('express');
const { transactionsController } = require('../../../controller');
const router = express.Router();

// router.post(
//     '/add-transaction',
//     transactionsController.addtransaction
// )

router.get(
    '/get-transaction/:transaction_id',
    transactionsController.gettransaction
)

router.get(
    '/list-transaction',
    transactionsController.listtransaction
)

router.put(
    '/update-transaction/:transaction_id',
    transactionsController.updatetransaction
)

router.delete(
    '/delete-transaction/:transaction_id',
    transactionsController.deletetransactions
)

router.post(
    '/book-issue',
    transactionsController.issue_date
)

router.put(
    '/return-date/:transaction_id',
    transactionsController.return_date
)



module.exports = router;    