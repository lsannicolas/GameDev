class Zombie {
    constructor(game, x, y, isGirl) {
        Object.assign(this, {game, x, y});

        this.game.mario = this;

        //spritesheets
        this.spritesheet = ASSET_MANAGER.getAsset("./sprites/zombieboy2.png");
        this.spritesheet2 = ASSET_MANAGER.getAsset("./sprites/zombiegirl2.png");

        //state variables
        this.facing = 0; //0 for right, 1 for left
        this.state = 0;  //0 for idle, 1 for walking
        this.dead = false;

        this.updateBB();
        this.animations = [];
        this.loadAnimations();

        this.animation = new Animator(this.spritesheet, 22, 18, 338, 475, 7, 0.07, 94, false, true);
        this.animation2 = new Animator(this.spritesheet, 27, 557, 338, 475, 5, 0.07, 94, false, true);
        this.animation3 = new Animator(this.spritesheet, 52, 1168, 338, 475, 7, 0.07, 94, true, true);
        this.animation4 = new Animator(this.spritesheet, 75, 1704, 338, 475, 5, 0.07, 94, true, true);

        this.animationG = new Animator(this.spritesheet2, 30, 50, 360, 540, 7, .07, 162, false, true);
        this.animation2G = new Animator(this.spritesheet2, 25, 615, 360, 540, 6, 0.07, 163, false, true);
        this.animation3G = new Animator(this.spritesheet2, 30, 1210, 360, 540, 7, 0.07, 163, true, true);
        this.animation4G = new Animator(this.spritesheet2, 50, 1802, 360, 540, 6, 0.07, 163, true, true);
        //

    }

    loadAnimations() {
        //double for loop


        //store various states for animations
    }

    updateBB() {
        this.lastBB = this.BB;
        //incase you wwant to change based on direction facing
        if (this.facing === 0) {
            this.BB = new BoundingBox(this.x, this.y, 170, 220);
        } else {
            this.BB = new BoundingBox(this.x, this.y, 400, 400);
        }
    }

    die() {
        this.dead = true;
        //do something?
    }

    update() {
        const MAX_WALK = 93.75;
        const MAX_RUN = 153.75;

        //create physics below


        //collisions below

    }

    draw(ctx) {
//         this.animation.drawFrame(this.game.clockTick, ctx, this.x, this.y, .5);
//         this.animation2.drawFrame(this.game.clockTick, ctx, this.x+200, this.y, .5);
//         this.animation3.drawFrame(this.game.clockTick, ctx, this.x+400, this.y, .5);
//         this.animation4.drawFrame(this.game.clockTick, ctx, this.x+600, this.y, .5);

//         this.animationG.drawFrame(this.game.clockTick, ctx, this.x, this.y + 400, .5);
//         this.animation2G.drawFrame(this.game.clockTick, ctx, this.x+200, this.y + 400, .5);
//         this.animation3G.drawFrame(this.game.clockTick, ctx, this.x+400, this.y + 400, .5);
//         this.animation4G.drawFrame(this.game.clockTick, ctx, this.x+600, this.y + 400, .5);

        // if (PARAMS.DEBUG) {
        //     ctx.strokeStyle = 'Red';
        //     ctx.strokeRect(this.BB.x - this.game.camera.x, this.BB.y, this.BB.width, this.BB.height);
        // }
    }


}
