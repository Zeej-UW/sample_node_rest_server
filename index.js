const express = require('express');
const games = require('./routes/games')

const app = express();
const port = 3000;

app.use('/', games)

app.listen(port, () => {
    console.log(`Server listening on port ${port}`);
});

module.exports = app;