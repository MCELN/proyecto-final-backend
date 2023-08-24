const { Server } = require( 'socket.io' );
const Products = require( './DAOs/mongodb/products.dao' );

const ProductsDao = new Products();


const realTimeServer = ( httpServer ) => {
    const io = new Server( httpServer );
    console.log( 'io connect' );
    io.on( 'connection', socket => {
        console.log( `Cliente con id ${ socket.id } conectado.`)
        socket.on( 'addProd', async data => {
            try {
                await ProductsDao.insertOne(data);
                io.emit( 'newProduct', data.title);
            } catch (error) {
                console.log(error);
            }
        })
    })
}

module.exports = realTimeServer; 