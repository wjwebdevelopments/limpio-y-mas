const Category = require('../models/category');

exports.getCategories = (req, res) => {
    res.json({ categories: 'categories' });
}

exports.postCategories = async (req, res) => {
    let category = new Category(req.body);
    category = await category.save();
    res.json({ category });
}
