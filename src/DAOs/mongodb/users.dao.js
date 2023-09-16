const Users = require('../../models/user.model');

class UsersDao {
    async findOne(prop) {
        const user = await Users.findOne(prop)
        return user;
    }
    async findOneRaw(email) {
        return await Users.findOne({ email: email }).lean();
    }

    async insertOne(newUserInfo) {
        const newUser = await Users.create(newUserInfo);
        return newUser;
    }
}

module.exports = UsersDao;