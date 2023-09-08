const express = require('express');
const handlebars = require('express-handlebars');
const router = require('./routes');
const connectMongo = require('./db');
const session = require('express-session');
const MongoStore = require('connect-mongo');
const { db } = require('./config/index.config');

const app = express();

app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(express.static(__dirname + '/public'));

app.engine('handlebars', handlebars.engine());
app.set('view engine', 'handlebars');
app.set('views', __dirname + '/views');

connectMongo();

app.use(session({
    store: MongoStore.create({
        mongoUrl: `mongodb+srv://${db.user}:${db.pass}@${db.host}/${db.name}?retryWrites=true&w=majority`,
        mongoOptions: { useNewUrlParser: true, useUnifiedTopology: true },
        ttl: 3600,
    }),
    secret: 'secretCoder',
    resave: false,
    saveUninitialized: false,
}));

router(app);

module.exports = app;