const express = require('express');
const router = express.Router();

const {
    getAddProduct,
    postAddProduct,
    getProducts
} = require('../controllers/admin');

router.get('/add-product', getAddProduct)
router.post('/add-product', postAddProduct);
router.get('/products', getProducts);

module.exports = router;
