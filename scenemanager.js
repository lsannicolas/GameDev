class SceneManager {
    constructor(game) {
        this.game = game;
        this.game.camera = this;
        this.x = 0;
        this.y = 0;
        this.loadLevelOne();
    };



    clearEntities() {
        this.game.entities = [];
    };

    loadLevelOne() {
        this.x = 0;
        this.y = 0;

        let zombie = new Zombie(this.game, 0, 0, false);
        this.game.addEntity(zombie);
        this.boy = new Ninja(this.game, 0, 500, true);
        this.game.addEntity(this.boy);
        // this.girl = new Ninja(this.game, 0, 300, false);
        // this.game.addEntity(this.girl);

    };

    update() {
        PARAMS.DEBUG = document.getElementById("debug").checked;


        let midpoint = PARAMS.CANVAS_WIDTH / 2 - 60;
        let midpointY = PARAMS.CANVAS_HEIGHT / 2 - 60;

        // if (this.x < this.knight.x - midpoint) this.x = this.knight.x - midpoint;
        //always start center
        // this.x = this.CHARACTERNAME.x - midpoint;
        // this.y = this.CHARACTERNAME.y - midpointY;


    };

    draw(ctx) {

    };
};

