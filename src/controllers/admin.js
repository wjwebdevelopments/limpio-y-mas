const Product = require('../models/product');
const Category = require('../models/category');

const slug = require('slug');
const { nanoid } = require('nanoid');

exports.getAddProduct = async (req, res, next) => {
    const categories = await Category.find({});
    const products = await Product.find({})
        .populate('userId')
        .populate('category');
    res.render('admin/edit-product', {
        pageTitle: 'agregar producto',
        path: '/admin/add-product',
        categories,
        editing: false,
        products
    });
};

exports.postAddProduct = async (req, res, next) => {
    const product = new Product(req.body);
    const slugTitle = slug(`${product.title}-${nanoid(10)}`);
    product.imagesUrl = [];
    product.userId = req.user;
    product.slugTitle = slugTitle;
    await product.save();
    res.redirect('/admin/products');
};

exports.getProducts = async (req, res, next) => {
    const products = await Product.find({ userId: req.user._id })
        .populate('category', 'name');
    res.render('admin/products', {
        pageTitle: 'mis productos',
        path: '/admin/products',
        products
    });
}
