require('dotenv').config();

module.exports = {
    port: process.env.PORT || 3000,
    db: {
        user: process.env.DB_USER,
        pass: process.env.DB_PASS,
        host: process.env.DB_HOST,
        name: process.env.DB_NAME,
    },
    github: {
        clientid: process.env.CLIENTID,
        clientSecret: process.env.CLIENT_SECRET,
        callbackURL: process.env.CALLBACKURL,
    },
};