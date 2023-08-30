const { Router } = require( 'express' );
const Products = require( '../DAOs/mongodb/products.dao' );

const ProductsDao = new Products();

const router = Router();


router.get('/', async (req, res) => {
    try {
        const { limit = 10, page = 1, sort, query, category } = req.query;

        const filter = {};

        if(query){
            filter = { category: { $regex: query, $options: 'i' } };
        }

        if(category){
            filter.category = category;
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
        console.log(products.totalDocs)
        res.json({ message: products });
    } catch (error) {
        res.status(500).json({ error: 'Error al obtener los productos.' });
    }
});



router.get('/:pid', async (req, res) => {
    try {
        const { pid } = req.params;
        const product = await ProductsDao.findId( pid );
        if(product) {
            res.json({ message: product });
        } else {
            res.status(404).json({ error: `El producto con id: ${ pid } no ha sido encontrado.`});
        }
    } catch (error) {
        res.status(500).json({error: 'Error al obtener el producto.'});
    }
})



router.post('/', async (req, res) => {
    try {
        const { title, description, price, thumbnail = [], code, status, category, stock } = req.body;
        
            const productStatus = status === 'on' ? true : false;

            const newProduct = {
                title,
                description,
                price,
                thumbnail,
                code,
                status: productStatus,
                category,
                stock,
            }; 

        const response = await ProductsDao.insertOne( newProduct );
        res.redirect( '/realtimeproducts' );
    } catch (error) {
        res.status(500).json({error: 'No se ha podido agregar el producto.'});
    }
})



router.put('/:pid', async (req, res) => {
    try {
        const { pid } = req.params;
        const product = ProductsDao.findId( pid );
        const modProp = Object.keys(req.body);
        if(modProp.includes('id')) {
            res.json({ message: `La id del producto no puede ser modificada`});
        }
        if(modProp.length > 0 && product) {
            for (const prop of modProp) {
                await ProductsDao.updateOne( pid, prop, req.body[prop]);
            }
            res.json({ message: `${product.title} ha sido modificado.`});
        } else if(!product) {
            res.status(404).json({ message: `El producto con id ${ pid } no ha sido encontrado.`});
        } 
    } catch (error) {
        res.status(500).json({error: 'No se ha podido agregar el producto.'});        
    }
})



router.delete('/:pid', async (req, res) => {
    try {
        const { pid } = req.params;
        const exists = ProductsDao.findId( pid );
        if(exists) {
            await ProductsDao.deleteOne( pid );
            res.json({ message: `${exists.title} ha sido eliminado.`})
        } else {
        res.status(404).json({ message: `El producto con id: ${pid} no existe.`})
        }
    } catch (error) {
        res.status(500).json({error: 'No se ha podido agregar el producto.'});
    }
})

module.exports = router;