const prodController = require('../products/controller.products');
const cartController = require('../cart/controller.cart');
const homeController = require('../home/controller.home');
const rtpController = require('../real-time-products/controller.realtimeproducts');
const chatController = require('../chat/controller.chat');
const prodViewsController = require('../products/controller.prodViews');
const cartVieweController = require('../cart/controller.cartViews');
const loginController = require('../login/controller.login');
const registerController = require('../register/controller.register');


const router = (app) => {
    app.use('/api/products', prodController);
    app.use('/api/carts', cartController);
    app.use('/home', homeController);
    app.use('/realtimeproducts', rtpController);
    app.use('/chat', chatController);
    app.use('/products', prodViewsController);
    app.use('/carts', cartVieweController);
    app.use('/api/session', loginController);
    app.use('/api/session/register', registerController);
    app.use('/*', (req, res) => {
        res.status(404).json({ message: 'Página no encontrada' });
    });
}

module.exports = router;