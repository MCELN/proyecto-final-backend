const { Router } = require('express');
const Users = require('../DAOs/mongodb/users.dao');
const { getHashedPassword } = require('../routes/utils/bcrypt');

const UsersDao = new Users();
const router = Router();

router.get('/', async (req, res) => {
    try {
        res.render('register', {
            style: 'home.css',
        });
    } catch (error) {
        res.status(500).json({ error: error })
    }
})

router.post('/', async (req, res) => {
    const { first_name, last_name, email, age, pass } = req.body;

    try {
        const user = await UsersDao.findOne(email)
        if (!first_name || !last_name || !email || !age || !pass) {
            res.render('register', {
                style: 'home.css',
                response: 'Todos los campos son requeridos',
            })
        } else if (user) {
            res.render('register', {
                style: 'home.css',
                response: 'El E-Mail está siendo utilizado.',
            })
        } else {
            const newUserInfo = {
                first_name,
                last_name,
                email,
                age,
                password: getHashedPassword(pass),
                status: 'user',
            }
            const newUser = await UsersDao.insertOne(newUserInfo);
            res.redirect('/api/session')
        }
    } catch (error) {
        res.status(500).json({ error: error });
    }
});

module.exports = router;