const express = require('express');
const path = require('path');
const errorhandler = require('errorhandler');
const session = require('express-session');
const flash = require('connect-flash');
const MongoDBStore = require('connect-mongodb-session')(session);
require('dotenv').config({
    path: path.join(__dirname, '../config/config.env')
});
const errorController = require('../controllers/error');
const User = require('../models/user');
const MONGODB_URI = process.env.MONGO_URI;

// Routes
const shopRoutes = require('../routes/shop');
const adminRoutes = require('../routes/admin');
const categoriesRoutes = require('../routes/category');
const authRoutes = require('../routes/auth');
const userRoutes = require('../routes/user');
const store = new MongoDBStore({
    uri: MONGODB_URI,
    collection: 'sessions'
});

module.exports = (app) => {

    app.set('view engine', 'ejs');
    app.set('views', path.resolve(__dirname, '../views'));

    app.use(express.urlencoded({ extended:false }));
    app.use(express.json());
    app.use('/public', express.static(path.join(__dirname, '../public')));
    app.use(session({
        secret: process.env.SESSION_SECRET,
        resave: false,
        saveUninitialized: false,
        store
    }));
    app.use(flash());
    app.use((req, res, next) => {
        if ( !req.session.user ) return next();
        User.findById(req.session.user._id)
            .then(user => {
                req.user = user;
                next();
            })
            .catch(err => console.log(err));
    });
    app.use((req, res, next) => {
        res.locals.isAuthenticated = req.session.isLoggedIn;
        res.locals.user = req.user;
        next();
    });

    if ( process.env.NODE_ENV === 'development' ) {
        app.use(errorhandler());
    }

    app.use('/', shopRoutes);
    app.use('/admin', adminRoutes);
    app.use('/categories', categoriesRoutes);
    app.use('/auth', authRoutes);
    app.use('/users', userRoutes);
    app.use(errorController.get404);

    return app;
}
