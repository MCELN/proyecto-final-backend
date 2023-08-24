const Products = require( '../../models/products.model' );

class ProductsDao {
    async findAll() {
        return await Products.find();
    };

    async findId( id ) {
        return await Products.findOne({ _id: id });
    }

    async insertOne( newProductInfo ) {
        const newProduct = await Products.create( newProductInfo );
        return newProduct._id;
    };

    async updateOne( id, prop, value ) {
        const upQuery = {};
        upQuery[prop] = value;
        const productUpdate = await Products.updateOne({ _id: id}, { $set: upQuery });
        return productUpdate;
    }

    async deleteOne( id ) {
        await Products.deleteOne({ _id: id })
    }
};

module.exports = ProductsDao;
