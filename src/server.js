const { port } = require('./config/index.config');
const app = require('./app');
const realTimeServer = require('./realTimeServer');

const httpServer = app.listen( port, () => {
    console.log( `Server running at port ${ port }` );
})

realTimeServer( httpServer );