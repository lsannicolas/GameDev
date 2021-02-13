class SceneManager {
    constructor(game) {
        this.game = game;
        this.game.camera = this;
        this.x = 0;
        this.y = 0;
        this.yFlag = true;
        this.bricky = 0;
        //this.ninja = new Ninja(this.game, 0 * PARAMS.BLOCKWIDTH, 2.5 * PARAMS.BLOCKWIDTH, true);
        this.loadLevelOne();
    };

    clearEntities() {
        this.game.entities = [];
    };

    loadLevelOne() {
        this.x = 0;
        this.y = 0;



        let bricks = new Brick(this.game, 0, -1000);
        this.game.addEntity(bricks);
        bricks = new Brick(this.game, 0, -3100);
        this.game.addEntity(bricks);
        bricks = new Brick(this.game, 0, -5200);
        this.game.addEntity(bricks);

        let decor = new Decor(this.game, 0, -1500);
        this.game.addEntity(decor);
        decor = new Decor(this.game, 0, -4250);
        this.game.addEntity(decor);
        decor = new Decor(this.game, 0, -6150);
        this.game.addEntity(decor);

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

        let item = new Item(this.game, 650, -100, "thumb")
        this.game.addEntity(item);

        item = new Item(this.game, 200, -325, "up")
        this.game.addEntity(item);

        item = new Item(this.game, 500, -450, "wings")
        this.game.addEntity(item);

        item = new Item(this.game, 400, -740, "heart")
        this.game.addEntity(item);





        platform = new Platform(this.game, 200, 200, 150);
        this.game.addEntity(platform);

        let zombie = new Zombie(this.game, 500, -150, true);
        this.game.addEntity(zombie);
        zombie = new Zombie(this.game, 650, -550, true);
        this.game.addEntity(zombie);
        // zombie = new Zombie(this.game, 650, 150, false);
        // this.game.addEntity(zombie);

        this.ninja = new Ninja(this.game, 500, 0, true);
        this.game.addEntity(this.ninja);
        // this.girl = new Ninja(this.game, 0, 300, false);
        // this.game.addEntity(this.girl);

        this.startMenu = new StartMenu(this.game);
        this.game.addEntity(this.startMenu);


    };



    update() {
        PARAMS.DEBUG = false;
        if (PARAMS.START === true) {
            if (this.startMenu) {
                this.startMenu.exists = false;
            }
            let midpointY = PARAMS.CANVAS_HEIGHT / 2 - 10;
            this.x = 0;
            if (this.y > this.ninja.y && this.ninja.isPoweredUp) {
                // this.y = this.ninja.y - midpointY
                this.y -= 12;
            }

            if (this.yFlag) {
                this.y = this.ninja.y - midpointY;
                this.yFlag = false;
            }
            this.y -= .75;
        }

    };

    draw(ctx) {

    };
};
