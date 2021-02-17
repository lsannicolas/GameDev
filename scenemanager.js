class SceneManager {
    constructor(game) {
        this.game = game;
        this.game.camera = this;
        this.x = 0;
        this.y = -300;
        this.lastCamY = 0;
        this.yFlag = true;
        this.score = 0;
        this.highScore = 0;
        this.elapsedTime = 0;
        this.scrollSpeed = .75;

        this.lastBrickY = 0;

        this.level = levelOne;
        this.platforms = levelOne.platforms;
        this.loadLevel(this.level);


    };

    loadLevel(level) {
        this.game.entities = [];
        this.game.platforms = [];
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
                //works ?
                this.game.addEntity(new Zombie(this.game, zombie.x, zombie.y, zombie.isBoy));
            }
        }

        this.ninja = new Ninja(this.game, 200, 0, true);
        this.game.addEntity(this.ninja);

        this.startMenu = new StartMenu(this.game);
        this.game.addEntity(this.startMenu);
    }

    generateNewPlatform() {
        let last = this.game.platforms[this.game.platforms.length - 1]
        // const CENTER = 450;


        let x = randomInRange(150, 500);

        let y = last.y - randomInRange(150, 215);

        let width = randomInRange(125, 400)

        if (Math.abs(x - last.x) < 100) {
            if (last.x < 450) {
                x + 125
            } else {
                x - 125
            }
        }

        if (x + width > 700) {
            width = Math.max(700 - x, 100)
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


    checkBrickAndDecor() {
        if (Math.abs(this.game.camera.y - this.lastBrickY) > 2000) {
            this.lastBrickY = this.game.camera.y;
            this.game.addEntity(new Brick(this.game, 0, this.game.camera.y - 2470))
            this.game.addEntity(new Decor(this.game, 0, this.game.camera.y - 2470))
        }
    }



    update() {
        if (this.ninja.dead) {
            //set highscore on death and reset old score.
            this.highScore = Math.max(this.highScore, this.score);
            this.score = 0;

            this.ninja.dead = false;
            this.game.entities = [];
            this.game.platforms = [];
            this.loadLevel(levelOne);
            this.y = -300;
            PARAMS.START = false;
        };
        PARAMS.DEBUG = true;
        if (PARAMS.START === true) {
            if (this.startMenu) {
                this.startMenu.exists = false;
            }
            let midpointY = PARAMS.CANVAS_HEIGHT / 2 - 10;
            this.x = 0;
            if (this.y > this.ninja.y - 200) {
                // this.y = this.ninja.y - midpointY
                if (this.ninja.isPoweredUp) {
                    this.y -= 12
                } else {
                    this.y -= 3
                }
            }
            if(this.game.ninja.multiplied){
                this.elapsedTime += this.game.clockTick;
                this.score += (.1 * 2);
            }  else {
                this.score += .08;
            }
            if(this.elapsedTime > 10){
                this.elapsedTime = 0;
                this.game.ninja.multiplied = false;
            }
            if (this.yFlag) {
                this.y = this.ninja.y - midpointY;
                this.yFlag = false;
            }

            //increment score as game plays
            
            
            //scroll map
            this.y -= this.scrollSpeed; 

            //follow the player
            if (this.y > this.game.ninja.y - midpointY) this.y = this.game.ninja.y - midpointY;
        }

    };

    draw(ctx) {

        let score = "Score " + Math.ceil(this.score + " ");
        ctx.font = 30 + 'px "Play"';
        ctx.fillStyle = "White";
        ctx.fillText(score, 550, 35);

        let highscore = "High Score " + Math.ceil(this.highScore) + " ";
        ctx.font = 30 + 'px "Play"';
        ctx.fillStyle = "White";
        ctx.fillText(highscore, 700, 35);
        this.checkBrickAndDecor();

        // Make it a larger window to hold more platforms 
        // Remove/Add based on distance
        let lowest = this.game.platforms[0];

        if (lowest.y - 1000 > this.game.camera.y) {
            // we may want to clean up the entities no longer on screen
            // this.cleanUp();

            this.game.platforms.shift();

            this.game.platforms.push(this.generateNewPlatform())
        }
    };
};
