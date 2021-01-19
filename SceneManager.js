class SceneManager {
    constructor(game) {
        this.game = game;
        this.game.camera = this;


        this.loadGame();
    };

    loadGame() {
        this.person = new Ninja(this.game, 0, 0, true);
        this.game.addEntity(this.person);
        this.person = new Ninja(this.game, 0, 300, false);
        this.game.addEntity(this.person);
    }

    clearEntities() {
        this.game.entities = [];
    };

};
