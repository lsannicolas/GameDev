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
       // this.ninja.y = y;
       // this.ninja.x = x;
        this.game.addEntity(this.ninja);
        // this.girl = new Ninja(this.game, 0, 300, false);
        // this.game.addEntity(this.girl);
        

    };


  
    update() {
        PARAMS.DEBUG = document.getElementById("debug").checked;
        let midpointY = PARAMS.CANVAS_HEIGHT / 2 - 60;
        /*this.x = 0;
        if (this.yFlag) {
            this.y = this.ninja.y - midpointY;
            this.yFlag = false;
        }
        // if (this.ninja.y - midpointY < this.y) {
        //     this.y -=2;
        // } else {
        //     this.y--;
        // }
        this.y--;

       */ let midpointY = PARAMS.CANVAS_WIDTH/2 - PARAMS.BLOCKWIDTH / 2;

        if (this.x < this.ninja.x - midpointY) this.x = this.ninja.x - midpointY;
    
        if (this.ninja.dead && this.ninja.y > PARAMS.BLOCKWIDTH * 16) {
            this.ninja.dead = false;
            this.loadLevel();
        };
    };

    draw(ctx) {

    };
};

