const express = require('express');
require('./services/passport');
// Creates a new express application
// Sets up configs with app
const app = express();

require('./routes/authRoutes')(app);

const PORT = process.env.PORT || 5000;

app.listen(PORT);