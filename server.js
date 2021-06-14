require('dotenv').config();
const path = require('path');
const express = require('express');
const exphbs = require('express-handlebars');
const helpers = require('./utils/helpers');
const routes = require('./controllers');
const sequelize = require('./config/connection');
const session = require('express-session');

const sessionStore = session.Store;
const sequelizeStoreCreater = require('connect-session-sequelize');
const SequelizeStore = sequelizeStoreCreater(sessionStore);

const app = express();
const PORT = process.env.PORT || 3001;

const mySession = {
  secret: process.env.SESSION_SECRET,
  cookie: {},
  resave: false,
  saveUninitialized: true,
  store: new SequelizeStore({
    db: sequelize,
  }),
};

app.use(session(mySession));

const handleBars = exphbs.create({ helpers });

app.engine('handlebars', handleBars.engine);
app.set('view engine', 'handlebars');
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(express.static(path.join(__dirname, 'public')));

app.use(routes);

// sync sequelize models to the database, then turn on the server
sequelize.sync({ force: false }).then(() => {
  app.listen(PORT, () => console.log('Now listening', PORT));
});