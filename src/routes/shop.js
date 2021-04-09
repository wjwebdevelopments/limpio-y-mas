const express = require('express');
const router = express.Router();

const {
    getIndex,
    getProducts,
    getProductDetail
} = require('../controllers/shop');

router.get('/', getIndex);
router.get('/products', getProducts);
router.get('/products/:slugTitle', getProductDetail);

module.exports = router;
