class SceneManager {
    constructor(game) {
        this.game = game;
        this.game.camera = this;
        this.x = 0;
        this.y = 0;
        this.yFlag = true;
        //this.ninja = new Ninja(this.game, 0 * PARAMS.BLOCKWIDTH, 2.5 * PARAMS.BLOCKWIDTH, true);
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
        platform = new Platform(this.game, 200, -250, 150);
        this.game.addEntity(platform);
        platform = new Platform(this.game, 500, -500, 250);
        this.game.addEntity(platform);
        platform = new Platform(this.game, 180, -750, 75);
        this.game.addEntity(platform);
        platform = new Platform(this.game, 400, -900, 75);
        this.game.addEntity(platform);
        platform = new Platform(this.game, 600, -1200, 100);
        this.game.addEntity(platform);
        platform = new Platform(this.game, 170, -1400, 75);
        this.game.addEntity(platform);
        platform = new Platform(this.game, 350, -1600, 250);
        this.game.addEntity(platform);

        //made ground below for testing
        platform = new Platform(this.game, 170, 200, 600);
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
        let midpointY = PARAMS.CANVAS_HEIGHT / 2 - 60;
        this.x = 0;
        if (this.yFlag) {
            this.y = this.ninja.y - midpointY;
            this.yFlag = false;
        }
        // if (this.ninja.y - midpointY < this.y) {
        //     this.y -=2;
        // } else {
        //     this.y--;
        // }
        this.y-=.5;

    };

    draw(ctx) {

    };
};