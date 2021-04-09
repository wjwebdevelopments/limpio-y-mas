const Product = require('../models/product');

exports.getIndex = async (req, res) => {
    const products = await Product.find({});
    res.render('shop/index', {
        pageTitle: 'shop',
        path: '/',
        products
    });
}

exports.getProducts = async (req, res) => {

    const busqueda = req.query.q;

    const products = await Product.find({})
        .populate('userId')
        .populate('category');

    const product = await Product.findOne({ slugTitle: busqueda })
        .populate('category');

    res.render('shop/product-list', {
        pageTitle: 'all products',
        path: '/products',
        q: product,
        products
    });
}

exports.getProductDetail = async (req, res) => {
    const products = await Product.find({}).select('slugTitle')
    const product = await Product.findOne({ slugTitle: req.params['slugTitle'] })
        .populate('userId')
        .populate('category');

    res.render('shop/product-detail', {
        pageTitle: 'detalle del producto',
        path: '/product-detail',
        product,
        products
    })
}
