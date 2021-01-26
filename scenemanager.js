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


        let platform = new Platform(this.game, 500, 0, 128);
        this.game.addEntity(platform);
        platform = new Platform(this.game, 200, -200, 128);
        this.game.addEntity(platform);
        platform = new Platform(this.game, 600, -400, 128);
        this.game.addEntity(platform);
        platform = new Platform(this.game, 200, -600, 128);
        this.game.addEntity(platform);
        platform = new Platform(this.game, 600, -800, 128);
        this.game.addEntity(platform);
        // platform = new Platform(this.game, 450, 850, 128);
        // this.game.addEntity(platform);
        // platform = new Platform(this.game, 200, 1000, 128);
        // this.game.addEntity(platform);

        //made ground below for testing
        platform = new Platform(this.game, 170, 200, 128);
        this.game.addEntity(platform);
        platform = new Platform(this.game, 298, 200, 128);
        this.game.addEntity(platform);
        platform = new Platform(this.game, 426, 200, 128);
        this.game.addEntity(platform);
        platform = new Platform(this.game, 554, 200, 128);
        this.game.addEntity(platform);
        platform = new Platform(this.game, 682, 200, 110);
        this.game.addEntity(platform);








        //let zombie = new Zombie(this.game, 0 , 0, false);
        //this.game.addEntity(zombie);
        this.ninja = new Ninja(this.game, 250, 0, true);
        this.game.addEntity(this.ninja);
        // this.girl = new Ninja(this.game, 0, 300, false);
        // this.game.addEntity(this.girl);


    };

    update() {
        PARAMS.DEBUG = document.getElementById("debug").checked;


        // let midpoint = PARAMS.CANVAS_WIDTH / 2 - 60;
        let midpointY = PARAMS.CANVAS_HEIGHT / 2 - 60;
        //if you want x side scrolling
        // this.x = this.ninja.x - midpoint;
        this.x = 0;
        this.y = this.ninja.y - midpointY;

    };

    draw(ctx) {

    };
};

