const express = require('express');
const router = express.Router();

const {
    getCategories,
    postCategories
} = require('../controllers/category');

router.get('/', getCategories);
router.post('/', postCategories);

module.exports = router;
