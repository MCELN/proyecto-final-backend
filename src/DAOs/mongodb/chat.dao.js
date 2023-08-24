const Chat = require('../../models/chat.model');

class ChatDao {

    async insertOne(newMessage) {
        await Chat.create( newMessage );
    }

    async findAllRaw() {
        return await Chat.find().lean();
    }
}

module.exports = ChatDao;