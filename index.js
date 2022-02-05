const express = require('express');
// order of require statements matter! User creates the model and passport imports it
require('./models/User');
require('./services/passport');
const mongoose = require('mongoose');
const keys = require('./config/keys');
// Creates a new express application
const app = express();

require('./routes/authRoutes')(app);

mongoose.connect(keys.mongoURI);

const PORT = process.env.PORT || 5000;

app.listen(PORT);