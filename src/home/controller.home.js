const { Router } = require( 'express' );
const Products = require( '../DAOs/mongodb/products.dao' );

const ProductsDao = new Products;

const router = Router();

router.get( '/', async ( req, res ) => {
    try {
        const products = await ProductsDao.findAllRaw();

        
        res.render( 
            'home', 
            { 
                products,
                style: 'home.css',
            } 
        )      
    } catch (error) {
        res.status(500).json({error: 'Error al obtener los productos.'});
    }
})

module.exports = router;
