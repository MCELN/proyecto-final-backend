const mongoose = require( 'mongoose' );
const mongoosePaginate = require('mongoose-paginate-v2');

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

productSchema.plugin(mongoosePaginate);

const Products = mongoose.model( productCollection, productSchema );

module.exports = Products;