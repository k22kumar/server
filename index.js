const express = require('express');
// Creates a new express application
// Sets up configs with app
const app = express();

app.get('/', (req, res) => {
    res.send({hi: 'there'});
});

const PORT = process.env.PORT || 5000;

app.listen(PORT);