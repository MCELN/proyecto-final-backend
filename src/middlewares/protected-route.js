const protectedRoute = (req, res, next) => {
    console.log(req.session.user + ' middleware')
    if (!req.session.user) {
        res.redirect('/api/session');
    };

    next();
}

module.exports = protectedRoute;