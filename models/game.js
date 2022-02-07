class Game {
    static id = 0;

    constructor(title, releaseDate) {
        this.title = title;
        this.releaseDate = releaseDate;
        this.id = Game.id++;
    }
}

module.exports = Game;