const protectedRoute = (req, res, next) => {
    if (!req.session.user) {
        res.redirect('/api/session');
    };

    next();
}

module.exports = protectedRoute;