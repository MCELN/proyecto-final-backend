const app = require('./app');
const realTimeServer = require('./realTimeServer');

const PORT = 3000;

const httpServer = app.listen( PORT, () => {
    console.log( `Server running at port ${ PORT }` );
})

realTimeServer( httpServer );