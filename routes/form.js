const express = require('express');

const router = express.Router();

const formController = require('../controllers/form');

router.post('/', formController.postUser);

router.get('/', formController.getUser);

router.delete('/delete/:userId', formController.deleteUser);

module.exports = router;