const prodController = require('../products/controller');
const cartController = require('../cart/controller');


const router = (app) => {
    app.use('/api/products', prodController);
    app.use('/api/carts', cartController);
    app.use('/*', (req, res) => {
        res.status(404).json({ message: 'Página no encontrada' })
    });
}

module.exports = router;