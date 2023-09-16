const { Router } = require('express');
const Users = require('../DAOs/mongodb/users.dao');
const { compareSync } = require('bcrypt');
const passport = require('passport');

const UsersDao = new Users();

const router = Router();

router.post('/register', passport.authenticate('register', { failureRedirect: '/failregister' }), async (req, res) => {
    try {
        res.status(201).json({ status: 'success', payload: req.user });
    } catch (error) {
        res.status(500).json({ status: 'error', error: 'Internal Server Error' });
    }
})

router.get('/failregister', (req, res) => {
    res.json({ status: 'error', error: 'Failed register' });
})

router.post('/login', passport.authenticate('login', { failureRedirect: '/faillogin' }), async (req, res) => {
    try {
        if (!req.user) return res.status(400).json({ status: 'error', error: 'Invalid credentials' });

        req.session.user = {
            name: req.user.first_name,
            email: req.user.email,
            status: req.user.status,
        };

        res.status(201).json({ status: 'success', payload: req.session.user })
    } catch (error) {
        res.status(500).json({ status: 'error', error: 'Internal Server Error' });
    }
})

router.get('/faillogin', (req, res) => {
    res.json({ status: 'error', error: 'Failed login' });
});

module.exports = router;