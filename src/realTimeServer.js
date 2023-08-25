const { Server } = require( 'socket.io' );
const Products = require( './DAOs/mongodb/products.dao' );
const Chat = require( './DAOs/mongodb/chat.dao' );

const ProductsDao = new Products();
const ChatDao = new Chat();



const realTimeServer = ( httpServer ) => {
    const io = new Server( httpServer );
    console.log( 'io connect' );
    io.on( 'connection', socket => {
        console.log( `Cliente con id ${ socket.id } conectado.`)
        socket.on( 'addProd', async data => {
            try {            
                const { title, description, price, thumbnail = [], code, status, category, stock } = data;
        
                const productStatus = status === 'on' ? true : false;

                const product = {
                    title,
                    description,
                    price,
                    thumbnail,
                    code,
                    status: productStatus,
                    category,
                    stock,
                };    
                await ProductsDao.insertOne(product);
                
                io.emit( 'newProduct', data.title);
            } catch (error) {
                console.log(error);
            }
        })

        socket.on( 'message', async (data) => {
            await ChatDao.insertOne( data );
            const messages = await ChatDao.findAllRaw();
            
            io.emit( 'messageLogs', messages )
        })
        
        socket.on( 'auth', async (data) => {
            const messages = await ChatDao.findAllRaw();
            socket.emit( 'messageLogs', messages );

            socket.broadcast.emit( 'newUser', data );
        })
    })
}

module.exports = realTimeServer; 