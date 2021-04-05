exports.getLogin = (req, res) => {
    res.render('auth/login', {
        pageTitle: 'login',
        path: '/login',
    });
}

exports.postLogin = (req, res) => {

}
