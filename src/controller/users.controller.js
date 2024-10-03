const Users = require("../model/users.model")

const getuser = async (req, res) => {

    try {
        const users = await Users.findById(req.params.user_id)

        if (!users) {
            res.status(404).json({
                success: false,
                message: 'users not found.'
            })
        }
        res.status(200).json({
            success: true,
            message: 'users fetch successfully.',
            data: users
        })

    } catch (error) {
        res.status(500).json({
            success: false,
            message: 'Internal Server Error.' + error.message
        })
    }
}

const listuser = async (req, res) => {
    try {
        const users = await Users.find();

        if (!users || users.length === 0) {
            res.status(404).json({
                success: false,
                meassage: 'users not found.'
            })
        }
        res.status(200).json({
            success: true,
            message: 'users fetch successfully.',
            data: users
        })

    } catch (error) {
        res.status(500).json({
            success: false,
            meassage: 'Internal Server Error.' + error.meassage
        })
    }
}

const updateuser = async (req, res) => {
    try {
        const users = await Users.findByIdAndUpdate(req.params.user_id, req.body, { new: true, runValidators: true });

        if (!users) {
            res.status(400).json({
                success: false,
                message: 'users not updated.'
            })
        }
        res.status(200).json({
            success: true,
            message: 'users updated successfully.',
            data: users
        })
    } catch (error) {
        res.status(500).json({
            success: false,
            message: 'Internal Server Error.' + error.message
        })
    }
}

const adduser = async (req, res) => {
    try {
        const users = await Users.create(req.body);

        if (!users) {
            res.status(400).json({
                success: false,
                message: 'users not created.'   ``
            })
        }
        res.status(201).json({
            success: true,
            message: 'users created successfully.',
            data: users
        })
    } catch (error) {
        res.status(500).json({
            success: false,
            message: 'Internal Server Error.' + error.message
        })
    }
}

const deleteuser = async (req, res) => {

    try {
        const users = await Users.findByIdAndDelete(req.params.user_id)

        if (!users) {
            res.status(404).json({
                success: false,
                message: 'users not found',
            });
        }
        res.status(200).json({
            success: true,
            message: 'users deleted successfully',
            data: users
        })
    } catch (error) {
        res.status(500).json({
            success: false,
            message: 'Internal error' + error.message
        })
    }
}

module.exports = {
    getuser,
    listuser,
    updateuser,
    adduser,
    deleteuser
}