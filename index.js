const express = require('express');
// order of require statements matter! User creates the model and passport imports it
require('./models/User');
require('./services/passport');
const cookieSession = require('cookie-session');
const passport = require('passport');
const mongoose = require('mongoose');
const keys = require('./config/keys');
// Creates a new express application
const app = express();
app.use(
    cookieSession({
        // cookie can last 30 days in miliseconds
        maxAge: 30 * 24 * 60 * 60 * 1000,
        keys: [keys.cookieKey]
    })
);

app.use(passport.initialize());
app.use(passport.session());

require('./routes/authRoutes')(app);

mongoose.connect(keys.mongoURI);

const PORT = process.env.PORT || 5000;

app.listen(PORT);