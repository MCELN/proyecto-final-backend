const mongoose = require( 'mongoose' );

const messagesCollection = 'message';

const messagesSchema = new mongoose.Schema({
    user: String,
    message: String,
});

const Chat = mongoose.model( messagesCollection, messagesSchema );

module.exports = Chat;
