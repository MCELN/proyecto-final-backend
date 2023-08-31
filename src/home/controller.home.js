const { Router } = require( 'express' );
const Products = require( '../DAOs/mongodb/products.dao' );

const ProductsDao = new Products;

const router = Router();

router.get( '/', async ( req, res ) => {
    try {
        const { limit = 10, page = 1, sort, query } = req.query;

        const pageNum = parseInt(page);

        let filter = {};

        if(query) {
            if (query === 'false' || query === 'true') {
                filter = {status: query}
            } else {
                filter = { category: query};
            }
        }

        const sortO = {};

        if(sort === 'asc') {
            sortO.price = 1;
        } else if( sort === 'desc') {
            sortO.price = -1;
        }

        const queryOption = {
            limit,
            page,
            sort: sortO,
        };       
        
        const products = await ProductsDao.findAll()
        const serializedMessages = products.map(product => product.serialize());

        res.render( 
            'home', 
            { 
                serializedMessages,
                style: 'home.css',
            } 
        )      
    } catch (error) {
        res.status(500).json({error: 'Error al obtener los productos.'});
    }
})

module.exports = router;
