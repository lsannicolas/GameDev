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


        let platform = new Platform(this.game, 500, -50, 250);
        this.game.addEntity(platform);
        platform = new Platform(this.game, 200, -250, 100);
        this.game.addEntity(platform);
        platform = new Platform(this.game, 500, -400, 250);
        this.game.addEntity(platform);
        platform = new Platform(this.game, 180, -500, 75);
        this.game.addEntity(platform);
        platform = new Platform(this.game, 400, -690, 75);
        this.game.addEntity(platform);
        platform = new Platform(this.game, 600, -765, 100);
        this.game.addEntity(platform);
        platform = new Platform(this.game, 170, -900, 75);
        this.game.addEntity(platform);
        platform = new Platform(this.game, 350, -1100, 275);
        this.game.addEntity(platform);

        //made ground below for testing
        platform = new Platform(this.game, 170, 300, 600);
        this.game.addEntity(platform);
        //restart platform for testing death
        platform = new Platform(this.game, 170, 100, 100);
        this.game.addEntity(platform);








        let zombie = new Zombie(this.game, 500 , -150, true);
        this.game.addEntity(zombie);
        zombie = new Zombie(this.game, 650 , -550, true);
        this.game.addEntity(zombie);
        zombie = new Zombie(this.game, 650 , 150, false);
        this.game.addEntity(zombie);

        this.ninja = new Ninja(this.game, 200, 0, true);
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