const express = require('express');
// Creates a new express application
// Sets up configs with app
const app = express();

app.get('/', (req, res) => {
    res.send({hi: 'change 1'});
});

const PORT = process.env.PORT || 5000;

app.listen(PORT);