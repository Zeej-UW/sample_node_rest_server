const express = require('express');
const bodyParser = require('body-parser');

const app = express();
const port = 3000;
let counter = 0;

app.use(bodyParser.json());
app.use(bodyParser.urlencoded(
    {
        extended: true
    }
));

let games = [
    {
        id: 1,
        title: 'Battlefield 3',
        release_date: '2012-10-30'
    },
    {
        id: 2,
        title: 'Game: the Game',
        release_date: '2014-12-31'
    },
    {
        id: 3,
        title: 'Movie: the Game',
        release_date: '2009-09-23'
    }
];

app.get('/games', (req, res) => {
    res.json(games);
});

app.post('/game', (req, res) => {
    const game = req.body;
    
    console.log(game);
    game.id = games[games.length - 1].id + 1;
    games.push(game);

    res.status(201).send('Game is added to the list');
});

app.get('/game/:id', (req, res) => {
    const id = parseInt(req.params.id);

    const game = findGameById(id);

    if (id)
        res.json(game);

    res.status(404).send('Game not found.');
});

app.delete('/game/:id', (req, res) => {
    const id = parseInt(req.params.id);

    games = games.filter((game) => {
        if (game.id !== id) {
            return true;
        }
       return false;
   });

   res.send(`Deleted game with ID ${id}`);
});

app.listen(port, () => {
    console.log(`Server listening on port ${port}`);
});

function findGameById(id) {
    for (const game of games) {
        if (game.id === id) {
            return game;
        }
    }

    return null;
}