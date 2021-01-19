class Ninja {
    constructor(game, x, y, isBoy) {
        Object.assign(this, { game, x, y, isBoy });

        this.facing = 0; //0: right, 1: left
        this.state = 0;//0: idle, 1: running, 2: jumping, 3: attacking
        this.animations = [];
        if (!isBoy) {
            this.spritesheet = ASSET_MANAGER.getAsset('./sprites/ninjaGirl.png');
            this.loadGirlAnimations();
        } else {
            this.spritesheet = ASSET_MANAGER.getAsset('./sprites/BoyNinja.png');
            this.loadBoyAnimations();
        }
    }

    fillAnimations() {
        //Load the animations from here
        for (var i = 0; i < 4; i++) { //0: idle, 1: running, 2: jumping, 3: attacking
            this.animations.push([])
            for (var j = 0; j < 2; j++) {
                this.animations[i].push([]);
            }
        }
    }

    loadBoyAnimations() {
        this.fillAnimations();
        //Idle right
        this.animations[0][0] = new Animator(this.spritesheet, 11, 521, 250 - 11, 974 - 521, 9, .05, 3, false, true);
        //Idle Left

        // running right
        this.animations[1][0] = new Animator(this.spritesheet, 16, 1494, 385 - 16, 1954 - 1494, 10, .05, 5, false, true);

        // jumping right
        this.animations[2][0] = new Animator(this.spritesheet, 30, 1000, 395 - 45, 1476 - 1000, 10, .05, 21, false, true);

        // attacking right
        this.animations[3][0] = new Animator(this.spritesheet, 25, 30, 595 - 60, 484 - 30, 10, .05, 11, false, true);

        // Death right
        this.deathAnimation = new Animator(this.spritesheet, 18, 1985, 505 - 18, 2470 - 1985, 10, .05, 5, false, true);
    }


    loadGirlAnimations() {
        this.fillAnimations();

        //Idle right
        this.animations[0][0] = new Animator(this.spritesheet, 11, 521, 250 - 11, 974 - 521, 9, .05, 3, false, true);
        //Idle Left

        // running right
        this.animations[1][0] = new Animator(this.spritesheet, 16, 1494, 385 - 16, 1954 - 1494, 10, .05, 5, false, true);

        // jumping right
        this.animations[2][0] = new Animator(this.spritesheet, 30, 1000, 395 - 45, 1476 - 1000, 10, .05, 21, false, true);

        // attacking right
        this.animations[3][0] = new Animator(this.spritesheet, 25, 30, 550 - 60, 484 - 30, 10, .05, 95, false, true);

        // Death right
        this.deathAnimation = new Animator(this.spritesheet, 18, 1985, 505 - 18, 2470 - 1985, 10, .05, 5, false, true);
    }

    update() {
    }

    draw(ctx) {
        this.animations[0][0].drawFrame(this.game.clockTick, ctx, 0, this.y, .5);
        this.animations[1][0].drawFrame(this.game.clockTick, ctx, 100, this.y, .5);
        this.animations[2][0].drawFrame(this.game.clockTick, ctx, 250, this.y, .5);
        this.animations[3][0].drawFrame(this.game.clockTick, ctx, 400, this.y, .5)
        this.deathAnimation.drawFrame(this.game.clockTick, ctx, 600, this.y, .5)
    }
}