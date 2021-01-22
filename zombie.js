class Zombie {
    constructor(game, x, y, isGirl) {
        Object.assign(this, {game, x, y, isGirl});
        //spritesheets
        if (this.isGirl) {
            this.spritesheet = ASSET_MANAGER.getAsset("./sprites/zombiegirl2.png");
            this.width = 360;
            this.height = 540;
        } else {
            this.spritesheet = ASSET_MANAGER.getAsset("./sprites/zombieboy2.png");
            this.width = 338;
            this.height = 475;
        }
        //state variables
        this.facing = 0; //0 for right, 1 for left
        this.state = 0;  //0 for idle, 1 for walking
        this.dead = false;

        this.updateBB();
        this.animations = [];
        this.loadAnimations();

    }

    loadAnimations() {
        //initialize
        for (var i = 0; i < 2; i++) { //2 states for now, 0=idle, 1=walking, may put in attack later
            this.animations.push([]);
            for (var j = 0; j < 2; j++) { //2 directions, 0 for right, 1 for left
                this.animations[i].push([]);
            }
        }

        //store various states for animations
        if (this.isGirl){
            //idle - girl
            this.animations[0][0] = new Animator(this.spritesheet, 25, 615, this.width, this.height, 6, 0.07, 163, false, true);
            this.animations[0][1] = new Animator(this.spritesheet, 50, 1802, this.width, this.height, 6, 0.07, 163, true, true);
            //walking - girl
            this.animations[1][0] = new Animator(this.spritesheet, 30, 50, this.width, this.height, 7, .07, 162, false, true);
            this.animations[1][1] = new Animator(this.spritesheet, 30, 1210, 360, 540, 7, 0.07, 163, true, true);
        } else {
            //idle
            this.animations[0][0] = new Animator(this.spritesheet, 27, 557, this.width, this.height, 5, 0.07, 94, false, true);
            this.animations[0][1] = new Animator(this.spritesheet, 75, 1704, this.width, this.height, 5, 0.07, 94, true, true);

            //walking
            this.animations[1][0] = new Animator(this.spritesheet, 22, 18, this.width, this.height, 7, 0.07, 94, false, true);
            this.animations[1][1] = new Animator(this.spritesheet, 52, 1168, this.width, this.height, 7, 0.07, 94, true, true);


        }

    }

    updateBB() {
        this.lastBB = this.BB;
        //incase you want to change based on direction facing
        if (this.facing === 0) {
            this.BB = new BoundingBox(this.x, this.y, this.width, this.height);
        } else {
            this.BB = new BoundingBox(this.x, this.y, this.width, this.height);
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
        if (this.dead) {

        } else {
            this.animations[this.state][this.facing].drawFrame(this.game.clockTick, ctx, this.x - this.game.camera.x,
                this.y - this.game.camera.y, PARAMS.SCALE);
        }
        if (PARAMS.DEBUG) {
            ctx.strokeStyle = 'Red';
            ctx.strokeRect(this.BB.x - this.game.camera.x, this.BB.y, this.BB.width, this.BB.height);
        }
    }


}