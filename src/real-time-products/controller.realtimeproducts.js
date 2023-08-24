const { Router } = require( 'express' );
const Products   = require( '../DAOs/mongodb/products.dao')

const ProductsDao = new Products();

const router = Router();

router.get( '/', async ( req, res ) => {
    try {
        const products = await ProductsDao.findAll();
        console.log(products)
        res.render( 
            'realtimeproducts', 
            { 
                products,
                style: 'home.css',
            }
        );
    } catch (error) {
        res.status(500).json({ message: error });
    }
})

module.exports = router;