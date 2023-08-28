const Products = require( '../../models/products.model' );

class ProductsDao {
    async findAll() {
        return await Products.find();
    };

    async findAllRaw() {
        return await Products.find().collation({locale: 'en', strength: 2 }).sort({title: 1}).lean();
    };

    async findId( id ) {
        return await Products.findOne({ _id: id });
    };

    async insertOne( newProductInfo ) {
        const { title, description, price, thumbnail = [], code, status, category, stock } = newProductInfo;
        
            const productStatus = status === 'on' ? true : false;

            const product = {
                title,
                description,
                price,
                thumbnail,
                code,
                status: productStatus,
                category,
                stock,
            }; 
            
        const newProduct = await Products.create( product );
        return newProduct._id;
    };

    async updateOne( id, prop, value ) {
        const upQuery = {};
        upQuery[prop] = value;
        const productUpdate = await Products.updateOne({ _id: id}, { $set: upQuery });
        return productUpdate;
    };

    async deleteOne( id ) {
        await Products.deleteOne({ _id: id })
    };
};

module.exports = ProductsDao;
