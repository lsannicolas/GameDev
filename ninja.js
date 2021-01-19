class Ninja {
    constructor(game, x, y, isBoy) {
        Object.assign(this, { game, x, y, isBoy });

        this.facing = 0; //0: right, 1: left
        this.state = 0;//0: idle, 1: running, 2: jumping, 3: attacking, 4: death
        this.animations = [];
        if (!isBoy) {
            this.spritesheetright = ASSET_MANAGER.getAsset('./sprites/ninjaGirl.png');
            this.spritesheetleft = ASSET_MANAGER.getAsset('./sprites/ninjaGirlLeft.png');
            this.loadGirlAnimations();
        } else {
            this.spritesheetright = ASSET_MANAGER.getAsset('./sprites/BoyNinja.png');
            this.spritesheetleft = ASSET_MANAGER.getAsset('./sprites/BoyNinjaLeft.png');
            this.loadBoyAnimations();
        }
    }

    fillAnimations() {
        //Load the animations from here
        for (var i = 0; i < 5; i++) { //0: idle, 1: running, 2: jumping, 3: attacking, 4: death
            this.animations.push([])
            for (var j = 0; j < 2; j++) { // 0: left, 1: right
                this.animations[i].push([]);
            }
        }
    }

    loadBoyAnimations() {
        this.fillAnimations();
        //Idle 
        this.animations[0][0] = new Animator(this.spritesheetright, 11, 521, 250 - 11, 974 - 521, 9, .05, 3, false, true);
        this.animations[0][1] = new Animator(this.spritesheetleft, 3045, 520, 240, 974 - 521, 9, .05, 2, true, true);


        // running 
        this.animations[1][0] = new Animator(this.spritesheetright, 16, 1494, 385 - 16, 1954 - 1494, 10, .05, 5, false, true);
        this.animations[1][1] = new Animator(this.spritesheetleft, 1740, 1490, 370, 1950 - 1490, 10, .05, 3, true, true);

        // jumping 
        this.animations[2][0] = new Animator(this.spritesheetright, 30, 1000, 395 - 45, 1476 - 1000, 10, .05, 22, false, true);
        this.animations[2][1] = new Animator(this.spritesheetleft, 1780, 1000, 395 - 45, 1476 - 1000, 10, .05, 22, true, true);

        // attacking 
        this.animations[3][0] = new Animator(this.spritesheetright, 25, 30, 595 - 60, 484 - 30, 10, .05, 11, false, true);
        this.animations[3][1] = new Animator(this.spritesheetleft, 10, 30, 595 - 60, 484 - 30, 10, .05, 11, true, true);

        // Death 
        this.animations[4][0] = new Animator(this.spritesheetright, 18, 1985, 505 - 18, 2470 - 1985, 10, .05, 5, false, true);
        this.animations[4][1] = new Animator(this.spritesheetleft, 560, 1985, 505 - 18, 2470 - 1985, 10, .05, 5, true, true);
    }


    loadGirlAnimations() {
        this.fillAnimations();

        //Idle 
        this.animations[0][0] = new Animator(this.spritesheetright, 14, 592, 310 - 14, 1115 - 592, 9, .05, 4, false, true);
        this.animations[0][1] = new Animator(this.spritesheetleft, 2875, 592, 310 - 14, 1115 - 592, 9, .05, 4, true, true);

        // running 
        this.animations[1][0] = new Animator(this.spritesheetright, 43, 1687, 400 - 43, 2204 - 1687, 10, .05, 29, false, true);
        this.animations[1][1] = new Animator(this.spritesheetleft, 2015, 1687, 400 - 43, 2204 - 1687, 10, .05, 29, true, true);

        // jumping 
        this.animations[2][0] = new Animator(this.spritesheetright, 10, 1150, 440 - 40, 1680 - 1150, 10, .05, 9, false, true);
        this.animations[2][1] = new Animator(this.spritesheetleft, 1830, 1150, 425 - 40, 1680 - 1150, 10, .05, 24, true, true);

        // attacking 
        this.animations[3][0] = new Animator(this.spritesheetright, 20, 40, 550 - 25, 565 - 40, 10, .05, 9, false, true);
        this.animations[3][1] = new Animator(this.spritesheetleft, 535, 40, 550 - 25, 565 - 40, 10, .05, 9, true, true);

        // Death 
        this.animations[4][0] = new Animator(this.spritesheetright, 30, 2250, 560 - 30, 2790 - 2250, 10, .05, 58, false, true);
        this.animations[4][1] = new Animator(this.spritesheetleft, 30, 2250, 560 - 30, 2790 - 2250, 10, .05, 58, true, true);
    }

    update() {
    }

    draw(ctx) {
        this.animations[0][0].drawFrame(this.game.clockTick, ctx, 0, this.y, .25);
        this.animations[0][1].drawFrame(this.game.clockTick, ctx, 0, this.y + 150, .25);

        this.animations[1][0].drawFrame(this.game.clockTick, ctx, 100, this.y, .25);
        this.animations[1][1].drawFrame(this.game.clockTick, ctx, 100, this.y + 150, .25);

        this.animations[2][0].drawFrame(this.game.clockTick, ctx, 200, this.y, .25);
        this.animations[2][1].drawFrame(this.game.clockTick, ctx, 200, this.y + 150, .25);

        this.animations[3][0].drawFrame(this.game.clockTick, ctx, 300, this.y, .25);
        this.animations[3][1].drawFrame(this.game.clockTick, ctx, 300, this.y + 150, .25);

        this.animations[4][0].drawFrame(this.game.clockTick, ctx, 450, this.y, .25);
        this.animations[4][1].drawFrame(this.game.clockTick, ctx, 450, this.y + 150, .25);
    }
}