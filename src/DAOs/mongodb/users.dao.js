const Users = require('../../models/user.model');

class UsersDao {
    async findOne(email) {
        return await Users.findOne({ email: email })
    }
    async findOne(email) {
        return await Users.findOneRaw({ email: email }).lean();
    }

    async insertOne(newUserInfo) {
        const newUser = await Users.create(newUserInfo);
        return newUser.first_name;
    }

}

module.exports = UsersDao;