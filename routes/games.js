const express = require("express");
const bodyParser = require('body-parser');
const router = express.Router();
const Game = require('../models/game');

router.use(bodyParser.json());
router.use(bodyParser.urlencoded(
    {
        extended: true
    }
));

let games = [
    new Game('Battlefield 3', '2012-10-30'),
    new Game('Game: the Game', '2014-12-31'),
    new Game('Movie: the Game', '2009-09-23')
];

router
    .route('/games')
    .get((req, res) => {
        res.json(games);
    })
    .post((req, res) => {
        let game;
        if (req.body.title && req.body.release_date)
            game = new Game(req.body.title, req.body.release_date);
        if (game) {
            games.push(game);
            res.status(201).send({id: game.id});
            return;
        }

        res.sendStatus(401);
    });

router
    .route('/games/:id')
    .get((req, res) => {
        const id = parseInt(req.params.id);
        const game = findGameById(id);
        if (game) {
            res.json(game);
            return;
        }
        res.status(404).send('Game not found.');
    })
    .delete((req, res) => {
        const id = parseInt(req.params.id);
        games = games.filter((game) => {
            if (game.id !== id) {
                return true;
            }
        return false;
    });

   res.send(`Deleted game with ID ${id}`);
});

function findGameById(id) {
    for (const game of games) {
        if (game.id === id) {
            return game;
        }
    }

    return null;
}

module.exports = router;