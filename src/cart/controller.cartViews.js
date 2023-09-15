const { Router } = require('express');
const Cart = require('../DAOs/mongodb/cart.dao');
const protectedRoute = require('../middlewares/protected-route');

const CartDao = new Cart();

const router = Router();


router.get('/:cid', protectedRoute, async (req, res) => {
    try {
        const { cid } = req.params;
        const cartProducts = await CartDao.findId(cid);
        const products = cartProducts.products;

        res.render(
            'cart',
            {
                products,
                style: "home.css",
            });
    } catch (error) {
        res.status(500).json({ error: 'Error al obtener los productos.' });
    }
})

module.exports = router;