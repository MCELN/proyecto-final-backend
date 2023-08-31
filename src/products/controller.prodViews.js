const { Router } = require( 'express' );
const Products = require( '../DAOs/mongodb/products.dao' );

const ProductsDao = new Products();

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
        
        const products = await ProductsDao.paginate(filter, queryOption );
        const prod = products.docs;
        const serializedMessages = prod.map(product => product.serialize());

        const { prevPage, nextPage, hasPrevPage, hasNextPage } = products;

        const prevLink = hasPrevPage ? `/products?limit=${limit}&page=${prevPage}${sort ? "&sort="+sort : ""}${query ? "&query="+query : ""}` : null;
        const nextLink = hasNextPage ? `/products?limit=${limit}&page=${nextPage}${sort ? "&sort="+sort : ""}${query ? "&query="+query : ""}` : null;

        const cid = "64f07221d6f0ab5437910714";

        res.render( 
            'products', 
            { 
                serializedMessages,
                cid,
                prevLink,
                nextLink,
                style: 'home.css',
            } 
        )      
    } catch (error) {
        res.status(500).json({error: 'Error al obtener los productos.'});
    }
})

module.exports = router;