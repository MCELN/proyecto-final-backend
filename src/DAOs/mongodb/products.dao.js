const Products = require('../../models/products.model');
const { paginate } = require('mongoose-paginate-v2');

class ProductsDao {
    async findAll() {
        return await Products.find();
    };

    async findAllRaw() {
        return await Products.find().collation({ locale: 'en', strength: 2 }).sort({ title: 1 }).lean();
    };

    async findId(id) {
        return await Products.findOne({ _id: id });
    };

    async paginate(filter, queryOption) {
        return await paginate(filter, queryOption);
    }

    async insertOne(newProductInfo) {
        const newProduct = await Products.create(newProductInfo);
        return newProduct._id;
    };

    async updateOne(id, prop, value) {
        const upQuery = {};
        upQuery[prop] = value;
        const productUpdate = await Products.updateOne({ _id: id }, { $set: upQuery });
        return productUpdate;
    };

    async deleteOne(id) {
        await Products.deleteOne({ _id: id })
    };
};

module.exports = ProductsDao;
