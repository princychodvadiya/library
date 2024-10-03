const express = require('express');
const { usersController } = require('../../../controller');

const router = express.Router();

router.post(
    '/add-user',
    usersController.adduser
)

router.get(
    '/get-user/:user_id',
    usersController.getuser
)

router.get(
    '/list-user',
    usersController.listuser
)

router.put(
    '/update-user/:user_id',
    usersController.updateuser
)

router.delete(
    '/delete-user/:user_id',
    usersController.deleteuser
)



module.exports = router;    