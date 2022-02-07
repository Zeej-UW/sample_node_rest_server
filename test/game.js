process.env.NODE_ENV = 'test';

const assert = require('assert');
const ind = require('../index');

let chai = require('chai');
let chaiHttp = require('chai-http');
let server = require('../index');
const Game = require('../models/game');
let should = chai.should();

chai.use(chaiHttp);

// describe('GET a speicifc game', () => {
//     beforeEach((done) => {
        
//     });
// });

describe('Testing /Games routing', () => {
    it('should GET all games', (done) => {
        chai.request(server)
            .get('/Games')
            .end((err, res) => {
                res.should.have.status(200);
                res.body.should.be.a('array');
                res.body.length.should.not.be.eql(0);
                done();
            });
    });

    it('should POST a game', (done) => {
        const aGame = new Game('Vendetta 2', '2025-12-04');

        const gameDTO = {
            title: 'Vendetta 2',
            release_date: '2025-12-04'
        };

        chai.request(server)
            .post('/Games')
            .send(gameDTO)
            .end((err, res) => {
                res.should.have.status(201);
                console.log(res);
                res.body.should.not.be.empty;
                done();
            });
    });

    it('shouldn\'t POST a game', (done) => {
        chai.request(server)
        .post('/Games')
        .send(null)
        .end((err, res) => {
            res.should.have.status(401);
            res.body.should.be.empty;
            done();
        });
    });
});

describe('Testing /game/:id routes', () => {
    it('Should GET the game with ID = 1', (done) => {
        const id = 1;

        chai.request(server)
            .get(`/games/${id}`)
            .end((err, res) => {
                res.should.have.status(200);
                res.body.should.be.a('object');
                res.body.should.have.property('title');
                res.body.should.have.property('releaseDate');
                res.body.should.have.property('id');
                res.body.should.be.not.be.eql(0);
                done();
            });
    });

    it('Shouldn\'t GET the game with an invalid ID', (done) => {
        const id = 'A';

        chai.request(server)
            .get(`/games/${id}`)
            .end((err, res) => {
                res.should.have.status(404);
                res.body.should.be.empty;
                done();
            });
    });
    describe('Set up new Game', () => {
        const game = new Game('An Awakening', '2020-10-15');
        before( () =>{
            chai.request(server)
                .post('/games')
                .send(game);
        });

        it('Should DELETE the game with a valid ID', (done) => {
            const id = 3; // We will always have a 0th element
            
            chai.request(server)
                .delete(`/games/${id}`)
                .end((err, res) => {
                    res.should.have.status(200);
                    res.text.should.eql(`Deleted game with ID ${id}`);
                    done();
                })
        });
    })

});