const express = require( 'express' );
const handlebars = require( 'express-handlebars' );
const router = require( './routes' );

const app = express();

app.use( express.json());
app.use( express.urlencoded({ extended: true }));
app.use( express.static( __dirname + '/public' ));

app.engine( 'handlebars', handlebars.engine() );
app.set   ( 'view engine', 'handlebars' );
app.set   ( 'views', __dirname + '/views' );

router( app );

module.exports = app;