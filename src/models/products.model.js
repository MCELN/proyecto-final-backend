const mongoose = require( 'mongoose' );

const productCollection = 'product';

const productSchema = new mongoose.Schema({
    title: {
        type: String,
        index: true,
    },
    description: String,
    price: Number,
    thumbnail: [String],
    code: String,
    status: Boolean,
    category: String,
    stock: Number,
});

const Products = mongoose.model( productCollection, productSchema );

module.exports = Products;