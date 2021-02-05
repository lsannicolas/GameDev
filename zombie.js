class Zombie {
    constructor(game, x, y, isBoy) {
        Object.assign(this, {game, x, y, isBoy});
        //spritesheets
        if (!this.isBoy) {
            this.spritesheet = ASSET_MANAGER.getAsset("./sprites/zombiegirlnew.png");
            this.width = 170;
            this.height = 220;
        } else {
            this.spritesheet = ASSET_MANAGER.getAsset("./sprites/zombieboynew.png");
            this.width = 160;
            this.height = 220;
        }
        //state variables
        this.facing = 1; //0 for right, 1 for left
        this.state = 0;  //0 for idle, 1 for walking
        this.dead = false;
        this.velocity = { x: 0, y: 0 };
        this.canFall = true;
        this.leftBound = 0;
        this.rightBound = 0;
        this.initialMove = true;
        this.updateBB();
        this.animations = [];
        this.loadAnimations();


    }

    loadAnimations() {
        //initialize
        for (var i = 0; i < 4; i++) { //0 = idle, 1 = walking, 2 = attacking, 3 = dead
            this.animations.push([]);
            for (var j = 0; j < 2; j++) { //2 directions, 0 for right, 1 for left
                this.animations[i].push([]);
            }
        }

        //store various states for animations
        if (!this.isBoy){
            //idle - girl
            this.animations[0][0] = new Animator(this.spritesheet, 25, 493, this.width, this.height, 12, 0.07, 66.5, false, true);
            this.animations[0][1] = new Animator(this.spritesheet, 25, 752, this.width, this.height, 12, 0.07, 66.5, true, true);
            //walking - girl
            this.animations[1][0] = new Animator(this.spritesheet, 20, 20, this.width, this.height, 10, .07, 50, false, true);
            this.animations[1][1] = new Animator(this.spritesheet, 20, 260, this.width, this.height, 10, 0.07, 50, true, true);

            //attack - girl - done for now
            this.animations[2][0] = new Animator(this.spritesheet, 30, 1010, this.width + 30, this.height, 8, 0.07, 22, false, true);
            this.animations[2][1] = new Animator(this.spritesheet, 20, 1247, this.width + 30, this.height, 8, 0.07, 22, true, true);

            //dead - girl
            this.animations[3][0] = new Animator(this.spritesheet, 30, 1495, this.width + 100, this.height, 11, 0.09, 25, false, false);
            this.animations[3][1] = new Animator(this.spritesheet, 65, 1740, this.width + 100, this.height, 11, 0.09, 25, true, false);
        } else {
            //idle
            this.animations[0][0] = new Animator(this.spritesheet, 50, 535, this.width - 20, this.height, 12, 0.05, 61.5, false, true);
            this.animations[0][1] = new Animator(this.spritesheet, 45, 792, this.width - 20, this.height, 12, 0.05, 61.5, true, true);

            //walking
            this.animations[1][0] = new Animator(this.spritesheet, 20, 10, this.width, this.height, 10, 0.07, 42, false, true);
            this.animations[1][1] = new Animator(this.spritesheet, 20, 276, this.width, this.height, 10, 0.07, 42, true, true);

            //attack
            this.animations[2][0] = new Animator(this.spritesheet, 20, 10, this.width, this.height, 10, 0.07, 42, false, true);
            this.animations[2][1] = new Animator(this.spritesheet, 20, 276, this.width, this.height, 10, 0.07, 42, true, true);

            //dead
            this.animations[3][0] = new Animator(this.spritesheet, 20, 10, this.width, this.height, 10, 0.07, 42, false, true);
            this.animations[3][1] = new Animator(this.spritesheet, 20, 276, this.width, this.height, 10, 0.07, 42, true, true);
        }

    }

    updateBB() {
        this.lastBB = this.BB;
        //incase you want to change based on direction facing
        let bHeight = 80;
        let bWidth = 50;
        if (this.facing === 0) {
            this.BB = new BoundingBox(this.x, this.y, bWidth, bHeight);
        } else {
            this.BB = new BoundingBox(this.x + 8, this.y, bWidth, bHeight);
        }
    }

    die() {
        this.dead = true;
        //do something?
    }

    update() {
        const TICK = this.game.clockTick;
        const MAX_WALK = 100;
        const MAX_FALL = 100;
        const FALL_ACC = .5;
        let that = this;
        //collision system
        this.game.entities.forEach( function (entity) {
            if (entity.BB && that.BB.collide(entity.BB)) {
                if (entity instanceof Platform) {
                    that.canFall = false;
                    if (that.BB.bottom - entity.BB.top >  0 && that.BB.bottom - entity.BB.bottom < 50) { //if on top/falling
                        that.velocity.y = 0;
                        that.y = entity.BB.top - that.BB.height;
                        that.leftBound = entity.BB.left;
                        that.rightBound = entity.BB.right;
                    }

                }
            }
        });
        //platform walking physics
        if (this.dead) {
            //TODO
        } else {
            if (!this.canFall) {
                if (this.leftBound > this.x) {
                    this.state = 3; // should be 1 (all of them)
                    this.facing = 0;
                    //this.velocity.x += MAX_WALK;
                    this.initialMove = false;
                } else if (this.rightBound - this.x < 70) {
                    this.state = 3;
                    this.facing = 1 // should be 1
                    //this.velocity.x -= MAX_WALK;
                    this.initialMove = false;
                } else if (this.initialMove) {
                    this.state = 3;
                    this.facing = 1; // should be 1
                    //this.velocity.x -= MAX_WALK;
                }
            }
        }

        // update position
        if (this.canFall) { //this makes sure we aren't applying velocity if we are on ground/platform
            //console.log("CANFALL");
            this.velocity.y += FALL_ACC;
            if (this.velocity.y >= MAX_FALL) this.velocity.y = MAX_FALL;
            //if (this.velocity.y <= -MAX_FALL) this.velocity.y = -MAX_FALL;
            this.y += this.velocity.y;

        }
        if (this.velocity.x >= MAX_WALK) this.velocity.x = MAX_WALK;
        if (this.velocity.x <= -MAX_WALK) this.velocity.x = -MAX_WALK;
        this.x += this.velocity.x * TICK * PARAMS.SCALE;
        this.updateBB();



    }

    draw(ctx) {
        if (this.dead) {

        } else {
            this.animations[this.state][this.facing].drawFrame(this.game.clockTick, ctx, this.x, this.y - this.game.camera.y - 10, PARAMS.SCALE/2.5);
        }
        if (PARAMS.DEBUG) {
            ctx.strokeStyle = 'Red';
            ctx.strokeRect(this.BB.x, this.BB.y - this.game.camera.y, this.BB.width, this.BB.height);
        }

    }


}
