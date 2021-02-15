class SceneManager {
    constructor(game) {
        this.game = game;
        this.game.camera = this;
        this.x = 0;
        this.y = 0;
        this.lastCamY = 0;
        this.yFlag = true;
        this.bricky = 0;
        //this.ninja = new Ninja(this.game, 0 * PARAMS.BLOCKWIDTH, 2.5 * PARAMS.BLOCKWIDTH, true);
        this.level = levelOne;
        this.platforms = levelOne.platforms
        this.loadLevel(this.level);
        this.lastCamera = Number.MAX_SAFE_INTEGER
    };

    loadLevel(level) {
        this.game.entities = [];
        this.x = 0;

        if (level.bricks) {
            for (let i = 0; i < level.bricks.length; i++) {
                let brick = level.bricks[i]
                this.game.addEntity(new Brick(this.game, brick.x, brick.y));
            }
        }

        if (level.decor) {
            for (let i = 0; i < level.decor.length; i++) {
                let decor = level.decor[i]
                this.game.addEntity(new Decor(this.game, decor.x, decor.y));
            }
        }

        if (level.platforms) {
            for (let i = 0; i < level.platforms.length; i++) {
                let platform = level.platforms[i]
                this.game.addPlatform(new Platform(this.game, platform.x, platform.y, platform.width));
            }
        }

        if (level.powerUps) {
            for (let i = 0; i < level.powerUps.length; i++) {
                let powerUp = level.powerUps[i]
                this.game.addEntity(new Item(this.game, powerUp.x, powerUp.y, powerUp.name));
            }
        }

        if (level.enemies) {
            for (let i = 0; i < level.enemies.length; i++) {
                let zombie = level.enemies[i]
                this.game.addEntity(new Zombie(this.game, zombie.x, zombie.y, zombie.isBoy));
            }
        }

        this.ninja = new Ninja(this.game, 200, 0, true);
        this.game.addEntity(this.ninja);

        console.log(this.game.entities)
    }

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
        zombie = new Zombie(this.game, 650, -550, false);
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

    generateNewPlatform() {
        let last = this.game.platforms[this.game.platforms.length - 1]
        // const CENTER = 450;


        let x = randomInRange(150, 690);
        console.log(x)
        let y = last.y - randomInRange(150, 215);

        let width = randomInRange(100, 400)

        if (x + width > 700) {
            width = Math.max(700 - x, 75)
        }

        //Place an enemy if platform is wide
        if (width > 200) {
            let chance = randomInRange(0, 100)
            if (chance > 30) {
                let gender = randomInRange(0, 100)
                let isGirl = true;
                if (gender > 50) {
                    isGirl = !isGirl
                }
                this.game.addEntity(new Zombie(this.game, x, y, isGirl))
            }
        }

        // Chance to place an item after 500px of change
        let chance = randomInRange(0, 100)
        if (Math.abs(this.game.camera.y - this.lastCamY) > 500 && chance > 50) {
            this.lastCamY = this.game.camera.y;
            let itemChance = randomInRange(0, 100);
            let itemX = randomInRange(0, width - 40)
            console.log(itemChance % 4)
            switch (itemChance % 4) {
                case 0:
                    this.game.addEntity(new Item(this.game, itemX + x, y - 50, "thumb"))
                    break;
                case 1:
                    this.game.addEntity(new Item(this.game, itemX + x, y - 75, "up"))
                    break;
                case 2:
                    this.game.addEntity(new Item(this.game, itemX + x, y - 50, "heart"))
                    break;
                case 3:
                    this.game.addEntity(new Item(this.game, itemX + x, y - 50, "wings"))
                    break;
                default:
                    break;
            }
        }

        return new Platform(this.game, x, y, width)
    }



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
        // Make it a larger window to hold more platforms 
        // Remove/Add based on distance
        let lowest = this.game.platforms[0];

        if (lowest.y - 1000 > this.game.camera.y) {
            this.game.platforms.shift();

            this.game.platforms.push(this.generateNewPlatform())
        }
    };
};
