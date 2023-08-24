const { Router } = require('express');
const Cart = require('../DAOs/mongodb/cart.dao')

const CartDao = new Cart();

const router = Router();

router.get('/:cid', async ( req, res ) => {
    try {
        const { cid } = req.params;
        const cartProducts = await CartDao.findId( cid );
        res.json({ message: cartProducts });
    } catch (error) {
        res.status(500).json({error: 'Error al obtener los productos.'});        
    }
})

router.post('/', async (req, res) => {
    try {
        const answer = await CartDao.createCart();
        res.json({ message: `${answer}`});
    } catch (error) {
        res.status(500).json({error: 'No se ha podido crear el carrito.'});        
    }
}) 

router.post('/:cid/product/:pid', async (req, res) => {
    try {
        const { cid, pid } = req.params;
        const answer = await CartDao.insertOne( cid, pid );
            res.json({ message: `${answer}`});
        
    } catch (error) {
        res.status(500).json({error: 'No se ha podido agregar el producto.'});        
    }
}) 



module.exports = router;