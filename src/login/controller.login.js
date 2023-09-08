const { Router } = require('express');
const Users = require('../DAOs/mongodb/users.dao');

const UsersDao = new Users();

const router = Router();

const userAdmin = {
    first_name: 'Coder',
    last_name: 'House',
    email: 'adminCoder@coder.com',
    age: 12,
    password: 'adminCod3r123',
    status: 'admin',
}

router.get('/', async (req, res) => {
    if (req.session.user) {
        res.redirect('/products');
    } else {
        res.render('login', {
            style: 'home.css',
        });
    }
});

router.post('/', async (req, res) => {
    const { email, pass } = req.body;

    try {
        let user = await UsersDao.findOne(email);

        if (!user) {
            if (userAdmin.email === email) {
                user = userAdmin;
            }
        }

        if (!user) {
            res.render('login', {
                style: 'home.css',
                response: 'Usuario o contraseña incorrectos',
            });
        } else if (user.email === email && user.password === pass) {
            req.session.user = email;
            res.redirect('/products')
        } else {
            res.render('login', {
                style: 'home.css',
                response: 'Usuario o contraseña incorrectos',
            });
        }
    } catch (error) {
        res.status(500).json({ error: error });
    };

});

router.delete('/logout', (req, res) => {
    req.session.destroy(error => {
        if (!error) {
            res.redirect('/api/session')
        } else {
            res.send({ status: 'Logout ERROR', body: error })
        }
    })
})

module.exports = router;