const prodController = require('../products/controller')


const router = (app) => {
    app.use('/api/products', prodController);
    //app.use('/api/carts', cartController);
}

module.exports = router;