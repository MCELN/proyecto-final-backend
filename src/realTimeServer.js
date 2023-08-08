const { Server } = require( 'socket.io' );
const ProductManager = require( './products/productManager' );

const pM = new ProductManager();


const realTimeServer = ( httpServer ) => {
    const io = new Server( httpServer );

    io.on( 'connection', socket => {
        socket.on( 'addProd', async data => {
            try {
                await pM.addProduct(data);
                io.emit( 'newProduct', data.title);
            } catch (error) {
                console.log(error);
            }
        })
    })
}

module.exports = realTimeServer;