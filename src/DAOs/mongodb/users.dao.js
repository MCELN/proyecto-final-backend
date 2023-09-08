const Users = require('../../models/user.model');

class UsersDao {
    async findOne(email) {
        return await Users.findOne({ email: email })
    }
    async findOneRaw(email) {
        return await Users.findOne({ email: email }).lean();
    }

    async insertOne(newUserInfo) {
        const newUser = await Users.create(newUserInfo);
        return newUser.first_name;
    }

}

module.exports = UsersDao;