const Product = require('../models/product');

exports.getIndex = async (req, res) => {
    const products = await Product.find({});
    res.render('shop/index', {
        pageTitle: 'shop',
        path: '/',
        products
    });
}
