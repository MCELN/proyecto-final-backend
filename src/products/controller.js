const { Router } = require('express');
const ProductManager = require('./productManager');

const pM = new ProductManager();

const arrProducts = async () => {
    try {
        const arrProduct = await pM.getProducts();
        arrProduct.splice(0, 1);
        return arrProduct;
    } catch (error) {
        console.log(error);
    }
}


const router = Router();


router.get('/', async (req, res) => {
    try {
        const products = await arrProducts();
        const MAX_PRODUCT = products.length;
        const { limit } = req.query;
        const productFilter = products.slice(0, limit || MAX_PRODUCT);
        res.json({ message: productFilter });
        
    } catch (error) {
        res.status(500).json({error: 'Error al obtener los productos.'});
    }
})



router.get('/:pid', async (req, res) => {
    try {
        const { pid } = req.params;
        const product = pM.getProductById(Number(pid));
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
        const product = req.body;
        const answer = await pM.addProduct(product);
        res.json({ message: `${answer}`});
    } catch (error) {
        res.status(500).json({error: 'No se ha podido agregar el producto.'});
    }
})



router.put('/:pid', async (req, res) => {
    try {
        const { pid } = req.params;
        const product = pM.getProductById(Number(pid));
        const modProp = Object.keys(req.body);
        if(modProp.includes('id')) {
            res.json({ message: `La id del producto no puede ser modificada`});
        }
        if(modProp.length > 0 && product) {
            for (const prop of modProp) {
                await pM.updateProduct(Number(pid), prop, req.body[prop]);
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
        const exists = pM.getProductById(Number(pid));
        if(exists) {
            await pM.deleteProduct(Number(pid));
            res.json({ message: `${exists.title} ha sido eliminado.`})
        } else {
        res.status(404).json({ message: `El producto con id: ${pid} no existe.`})
        }
    } catch (error) {
        res.status(500).json({error: 'No se ha podido agregar el producto.'});
    }
})





module.exports = router;