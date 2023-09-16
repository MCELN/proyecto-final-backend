const passport = require("passport");
const local = require('passport-local');
const Users = require('../DAOs/mongodb/users.dao');
const { getHashedPassword, comparePassword } = require('../utils/bcrypt');

const LocalStrategy = local.Strategy;
const UsersDao = new Users();

const initializePassport = () => {
    passport.use('register', new LocalStrategy(
        { passReqToCallback: true, usernameField: 'email' },
        async (req, username, password, done) => {
            const { first_name, last_name, email, age } = req.body;

            if (!first_name || !last_name || !email || !password) return done(null, false)


            try {
                const user = await UsersDao.findOne({ email: username });
                if (user) {
                    console.log('User exists');
                    return done(null, false);
                }

                const userInfo = {
                    first_name,
                    last_name,
                    email,
                    age,
                    password: getHashedPassword(password),
                    status: 'user',
                }

                const newUser = await UsersDao.insertOne(userInfo);

                done(null, newUser);

            } catch (error) {
                done(`Error al crear al usuario: ${error}`)
            }
        }
    ))

    passport.use('login', new LocalStrategy(
        { usernameField: 'email' },
        async (username, password, done) => {
            try {
                if (!username || !password) return done(null, false);

                const user = await UsersDao.findOne({ email: username });

                if (!user) {
                    console.log("User doesn't exist");
                    return done(null, false);
                }

                if (!comparePassword(password, user.password)) {
                    console.log('Contraseña o usuario incorrecto');
                    return done(null, false);
                }

                return done(null, user);
            } catch (error) {
                return done(error, 'error');
            }


        }
    ))

    passport.serializeUser((user, done) => {
        done(null, user._id);
    });

    passport.deserializeUser(async (id, done) => {
        try {
            const user = await Users.findById(id);
            done(null, user);
        } catch (error) {

        }
    })
}

module.exports = initializePassport;