const bcrypt = require('bcrypt');

const getHashedPassword = (password) => {
    const salt = bcrypt.genSaltSync(10);
    return bcrypt.hashSync(password, salt);
};

const comparePassword = (password, passwordHash) => {
    return bcrypt.compareSync(password, passwordHash);
};

module.exports = {
    getHashedPassword,
    comparePassword,
};