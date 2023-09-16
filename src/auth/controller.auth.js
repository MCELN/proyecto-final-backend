const { Router } = require('express');
const passport = require('passport');

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

router.get('/github', passport.authenticate('github', { scope: ['user: email'] }), async (req, res) => {

})


router.get('/githubcallback', (req, res) => {

})

//Owned by: @cristianlanza

//App ID: 390989

//Client ID: Iv1.2eadc843dd68aadc

//secret: 2e67a585cf186d89c0a1cf9e5272515fe4019503

module.exports = router;