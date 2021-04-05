const express = require('express');
const path = require('path');
require('dotenv').config({
    path: path.join(__dirname, '../config/config.env')
});

// Routes
const shopRoutes = require('../routes/shop');
const adminRoutes = require('../routes/admin');
const categoriesRoutes = require('../routes/category');
const authRoutes = require('../routes/auth');

module.exports = (app) => {

    app.set('view engine', 'ejs');
    app.set('views', path.resolve(__dirname, '../views'));

    app.use(express.urlencoded({ extended:false }));
    app.use(express.json());
    app.use('/public', express.static(path.join(__dirname, '../public')));

    app.use('/', shopRoutes);
    app.use('/admin', adminRoutes);
    app.use('/categories', categoriesRoutes);
    app.use('/auth', authRoutes);

    return app;
}
