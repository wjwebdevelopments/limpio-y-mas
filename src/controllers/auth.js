const bcript = require('bcryptjs');
const User = require('../models/user');

exports.getLogin = (req, res) => {

    let errorMessage = req.flash('error');
    if ( errorMessage.length > 0 ) {
        errorMessage = errorMessage[0];
    }else {
        errorMessage = null;
    }

    res.render('auth/login', {
        pageTitle: 'login',
        path: '/login',
        errorMessage
    });
}

exports.postLogin = async (req, res) => {
    const user = await User.findOne({ email: req.body.email });
    if (!user) {
        req.flash('error', 'Invalid email or password');
        return res.redirect('/auth/login');
    }
    const isValidPassword = await bcript.compare(req.body.password, user.password);
    if (!isValidPassword) {
        req.flash('error', 'Invalid email or password');
        return res.redirect('/auth/login');
    }
    req.session.isLoggedIn = true;
    req.session.user = user;
    req.session.save(err => {
       console.log(err);
       res.redirect('/');
    });
}

exports.postLogout = (req, res, next) => {
    req.session.destroy(err => {
        console.log(err);
        res.redirect('/');
    });
};
