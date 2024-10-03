const express = require("express")
const router = express.Router()

const bookRouter = require("./books.routes")
const userRouter = require("./users.routes")

router.use("/books",bookRouter)
router.use("/users",userRouter)

module.exports =  router