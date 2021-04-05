const Product = require('../models/product');
const Category = require('../models/category');

const slug = require('slug');
const { nanoid } = require('nanoid');

exports.getAddProduct = async (req, res, next) => {
    const categories = await Category.find({});
    res.render('admin/edit-product', {
        pageTitle: 'Add Product',
        path: '/admin/add-product',
        categories,
        editing: false
    });
};

exports.postAddProduct = async (req, res, next) => {
    const product = new Product(req.body);
    const slugTitle = slug(`${product.title}-${nanoid(10)}`);
    product.imagesUrl = [];
    product.slugTitle = slugTitle;
    await product.save();
    res.redirect('/admin/products');
};

exports.getProducts = async (req, res, next) => {
    const products = await Product.find({})
        .populate('category', 'name');
    res.render('admin/products', {
        pageTitle: 'Admin Products',
        path: '/admin/products',
        products
    });
}
