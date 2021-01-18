class SceneManager {
    constructor(game) {
        this.game = game;
        this.game.camera = this;


        this.loadGame();
    };

    loadGame() {
        this.person = new Person(this.game, 2.5, 0);
        this.game.addEntity(this.person);
    }

    clearEntities() {
        this.game.entities = [];
    };

};
