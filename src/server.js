const app = require('./app');
const realTimeServer = require('./realTimeServer');

const PORT = 8080;

const httpServer = app.listen( PORT, () => {
    console.log( `Server running at port ${ PORT }` );
})

realTimeServer( httpServer );