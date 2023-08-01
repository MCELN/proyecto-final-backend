const { Router } = require('express');
const CartManager = require('./cartManager');
const ProductManager = require('../products/productManager');

const cM = new CartManager;
const pM = new ProductManager;

const router = Router();

router.get('/:cid', async ( req, res ) => {
    try {
        const { cid } = req.params;
        const cartProducts = await cM.getCartById(Number(cid));
        res.json({ message: cartProducts });
    } catch (error) {
        res.status(500).json({error: 'Error al obtener los productos.'});        
    }
})

router.post('/', async (req, res) => {
    try {
        const answer = await cM.createCart();
        res.json({ message: `${answer}`});
    } catch (error) {
        res.status(500).json({error: 'No se ha podido crear el carrito.'});        
    }
}) 

router.post('/:cid/product/:pid', async (req, res) => {
    try {
        const { cid, pid } = req.params;
        const answer = await cM.addCart(Number(cid), Number(pid));
        if(answer === 'El producto se ha agregado exitosamente.') {
            res.json({ message: `${answer}`});
        } else {
            res.status(404).json({ message: answer })
        }
        
    } catch (error) {
        res.status(500).json({error: 'No se ha podido agregar el producto.'});        
    }
}) 



module.exports = router;