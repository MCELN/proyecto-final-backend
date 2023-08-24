const mongoose = require( 'mongoose' );

const cartCollection = 'cart';

const cartSchema = new mongoose.Schema({
    products: [
        {
            idp: String,
            quantity: Number,
        }
    ]
})

const Cart = mongoose.model( cartCollection, cartSchema );

module.exports = Cart;