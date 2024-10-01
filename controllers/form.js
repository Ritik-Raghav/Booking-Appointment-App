const { response } = require('express');
const User = require('../models/user');

exports.postUser = async (req, res, next) => {
    try {
        const username = req.body.username;
        const mobile = req.body.mobile;
        const email = req.body.email;

        const newUser = await User.create({
            username: username,
            mobile: mobile,
            email: email
        })
        console.log(newUser);
        res.status(201).json(newUser);
    }
    catch(error) {
        console.log(error);
    }
}

exports.getUser = async (req, res, next) => {
    try {
        const data = await User.findAll();
        res.status(200).json(data);
    }
    catch(error) {
        console.log(error);
        res.status(500).json({ message: 'Failed to fetch users!'});
    }
}

exports.deleteUser = async (req, res, next) => {
    const userId = req.params.userId;
    console.log(userId);
    try {
        const user = await User.findByPk(userId);
        if (!user) {
            return res.status(404).json({ message: 'User not found!'});
        }

        await user.destroy();
        console.log('User Deleted');
        res.status(200).json({ message: 'User deleted successfully'});
    }
    catch(error) {
        console.log(error);
        res.status(500).json({ message: 'Failed to delete user'});
    }
}