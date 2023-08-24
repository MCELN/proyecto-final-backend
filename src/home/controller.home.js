const { Router } = require( 'express' );
const Products = require( '../DAOs/mongodb/products.dao' );

const ProductsDao = new Products;

const router = Router();

const probando = [
    {
        title: 'prueba',
        description: 'pruebaD',
        price: 234,
        id: 'kasjdjfweoih'
    },
    {
        title: 'prueba2',
        description: 'pruebaD2',
        price: 2342,
        id: 'alskdjfl;aj'
    }
]

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
