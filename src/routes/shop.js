const express = require('express');
const router = express.Router();

const {
    getIndex
} = require('../controllers/shop');

router.get('/', getIndex);

module.exports = router;
