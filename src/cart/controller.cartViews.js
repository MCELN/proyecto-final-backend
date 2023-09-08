const { Router } = require('express');
const Cart = require('../DAOs/mongodb/cart.dao');

const CartDao = new Cart();

const router = Router();


router.get('/:cid', async (req, res) => {
    if (!req.session.user) {
        res.redirect('/api/session');
    } else {
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
    }
})

module.exports = router;