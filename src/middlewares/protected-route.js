const protectedRoute = (req, res, next) => {
    if (!req.session.user) {
        console.log(req.session.user)
        res.redirect('/api/session');
    };

    next();
}

module.exports = protectedRoute;