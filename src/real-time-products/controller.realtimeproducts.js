const { Router } = require( 'express' );
const Products   = require( '../DAOs/mongodb/products.dao')

const ProductsDao = new Products();

const router = Router();

router.get( '/', async ( req, res ) => {
    try {
        const products = await ProductsDao.findAll();
        const serializedMessages = products.map(product => product.serialize());

        res.render( 
            'realtimeproducts', 
            { 
                serializedMessages,
                style: 'home.css',
            }
        );
    } catch (error) {
        res.status(500).json({ message: error });
    }
})

module.exports = router;