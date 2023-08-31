const Cart = require( '../../models/cart.model' );
const Products = require( './products.dao' );

const ProductsDao = new Products();

class CartDao {

    async findAll() {
        return await Cart.find();
    };

    async findId( id ) {
        return await Cart.findOne({ _id: id }).lean();
    };

    async createCart(){
        const newCart = await Cart.create({ products: []});
        return newCart._id;
    }

    async updateOne( cid ) {
        try {
            await Cart.updateOne({ _id: cid })
            return 'Actualización completa';
        } catch (error) {
            return (error, 'No se pudo actualizar')
        };
    };

    async insertOne( cid, pid, qty ) {
        try {
            const exists = await Cart.exists({ _id: cid })
            const product = await ProductsDao.findId( pid );
    
            if( !product ) {
                return 'El producto que desea agregar, no existe.';
            } else if( !exists ) {
                return 'El carrito no existe.';
            } else {
                const productCart = await Cart.findById({ _id: cid });
                const existsIndex = productCart.products.findIndex( p => p.product.equals(pid) );
                if(existsIndex >= 0) {
                    const oldQty = productCart.products[existsIndex].quantity;
                    product.stock += oldQty;
                }
                if( product.stock >= qty ) {                    
                    if( existsIndex >= 0 ) {
                        productCart.products[existsIndex].quantity = qty;
                    } else {
                        const newProduct = {
                            product: pid,
                            quantity: qty,
                        };
                        productCart.products.push( newProduct );
                    }

                    await productCart.save();
                    await ProductsDao.updateOne( pid, 'stock', product.stock - qty );

                    return 'El producto se ha agregado a su carrito.';

                } else {
                    return 'Lo sentimos. No disponemos de ese stock.';
                };
            }  

        } catch (error) {
            return `${ error } Error al agregar el producto.`;
        }
        
    }

    async deleteOne( cid, pid ) {
        try {
            const productCart = await Cart.findById({ _id: cid });
            const existsIndex = productCart.products.findIndex( p => p.product.equals(pid) );
            const product = await ProductsDao.findId( pid );
    
            if( existsIndex >= 0 ) {
                const oldQty = productCart.products[existsIndex].quantity;
                product.stock += oldQty;

                productCart.products.splice(existsIndex, 1);
                
                await productCart.save();
                await ProductsDao.updateOne( pid, 'stock', product.stock );
                
                return `El producto ${ product.title } ha sido eliminado del carrito.`;
            } else {
                return `El producto con id ${ pid }, no existe en el carrito.`;
            }            
        } catch (error) {
            return `${error}.- El producto no se ha podido eliminar.`;
        }
    }

    async deleteAllProducts( cid ) {
        try {
            const productCart = await Cart.findById({ _id: cid });

            productCart.products.forEach(async p => {
                const prodMod = await ProductsDao.findId( p.product._id )
                await ProductsDao.updateOne( p.product._id, 'stock', prodMod.stock + p.quantity )
            })

            const allProducts = productCart.products.length;
            productCart.products.splice(0, allProducts);
            await productCart.save();
            return `Todos los productos del carrito ${ cid }, han sido quitados.`;
        } catch (error) {
            return `${error}.- El carrito no se ha podido vaciar.`;
        }
    }
}

module.exports = CartDao;