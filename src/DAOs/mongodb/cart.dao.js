const Cart = require( '../../models/cart.model' );
const Products = require( './products.dao' );

const ProductsDao = new Products();

class CartDao {

    async findAllRaw() {
        return await Cart.find().lean();
    };

    async findId( id ) {
        return await Cart.findOne({ _id: id });
    };

    async createCart(){
        const newCart = await Cart.create({ products: []});
        return newCart._id;
    }

    async insertOne( cid, pid ) {
        const exists = await Cart.exists({ _id: cid })
        const product = await ProductsDao.findId( pid );

        if( !product ) {
            return 'El producto que desea agregar, no existe.';
        } else if( !exists ) {
            return 'El carrito no existe.';
        } else {
            try {
                const productCart = await Cart.findOne({ _id: cid });
                if( product.stock > 0 ) {                    
                    const exists = productCart.products.findIndex( p => p._id.equals(pid) );
                    if( exists >= 0 ) {
                        productCart.products[exists].quantity += 1;
                        await productCart.save();

                    } else {
                        const newProduct = {
                            _id: pid,
                            quantity: 1,
                        }
                        productCart.products.push( newProduct );
                        await productCart.save();
                    }
                    await ProductsDao.updateOne( pid, 'stock', product.stock -1 );

                    return 'El producto se ha agregado a su carrito.';

                } else {
                    return 'Lo sentimos. No disponemos de stock.';
                };    

            } catch (error) {
                return `${ error } Error al agregar el producto.`;
            }
        }
    }
}

module.exports = CartDao;