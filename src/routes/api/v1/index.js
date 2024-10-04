const express = require("express")
const router = express.Router()

const bookRouter = require("./books.routes")
const userRouter = require("./users.routes")
const transactionsRouter = require("./transaction.routes")

router.use("/books", bookRouter)
router.use("/users", userRouter)
router.use("/transaction", transactionsRouter)

module.exports = router