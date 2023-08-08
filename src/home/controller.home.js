const { Router } = require( 'express' );
const ProductManager = require( '../products/productManager' );

const pM = new ProductManager();

const router = Router();

router.get( '/', async ( req, res ) => {
    try {
        const products = await pM.getProducts();
        res.render( 
            'home', 
            { 
                products,
                style: 'home.css',
            } 
        );       
    } catch (error) {
        res.status(500).json({error: 'Error al obtener los productos.'});
    }
})

module.exports = router;