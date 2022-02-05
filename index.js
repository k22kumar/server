const express = require('express');
require('./services/passport');
const mongoose = require('mongoose');
const keys = require('./config/keys');
// Creates a new express application
// Sets up configs with app
const app = express();

require('./routes/authRoutes')(app);

mongoose.connect(keys.mongoURI);

const PORT = process.env.PORT || 5000;

app.listen(PORT);