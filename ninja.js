class Ninja {
    constructor(game, x, y, isBoy) {
        Object.assign(this, { game, x, y, isBoy });
        this.game.ninja = this;
        this.dead = false;
        this.updateBB();
        this.velocity = { x: 0, y: 0 };
        this.fallAcc = 2000;
        this.facing = 0; //0: right, 1: left
        this.state = 0;//0: idle, 1: running, 2: jumping, 3: attacking, 4: death, 5: throwing
        this.animations = [];
        if (!isBoy) {
            this.spritesheetright = ASSET_MANAGER.getAsset('./sprites/ninjaGirl.png');
            this.spritesheetleft = ASSET_MANAGER.getAsset('./sprites/ninjaGirlLeft.png');
            this.throwRight = ASSET_MANAGER.getAsset('./sprites/throwRightGirl.png');
            this.throwLeft = ASSET_MANAGER.getAsset('./sprites/throwLeftGirl.png');
            this.girlYOffset = 10;
            this.girlXOffset = 5;
            this.loadGirlAnimations();
        } else {
            this.spritesheetright = ASSET_MANAGER.getAsset('./sprites/BoyNinja.png');
            this.spritesheetleft = ASSET_MANAGER.getAsset('./sprites/BoyNinjaLeft.png');
            this.throwRight = ASSET_MANAGER.getAsset('./sprites/throwRight.png');
            this.throwLeft = ASSET_MANAGER.getAsset('./sprites/throwLeft.png');
            this.girlYOffset = 0;
            this.girlXOffset = 0;
            this.loadBoyAnimations();
        }
        this.isPoweredUp = false;
        this.multiplied = false;

        this.radius = 50;
        this.visualRadius = 100;
        this.hp = 1000;
        this.maxHP = 1000;
        this.elapsedTime = 0;
        this.attackTime = 0;
        this.throwTime = 0;

    }

    fillAnimations() {
        //Load the animations from here
        for (var i = 0; i < 6; i++) { //0: idle, 1: running, 2: jumping, 3: attacking, 4: death
            this.animations.push([])
            for (var j = 0; j < 2; j++) { // 0: left, 1: right
                this.animations[i].push([]);
            }
        }
    }

    loadBoyAnimations() {
        this.fillAnimations();
        //Idle
        this.animations[0][0] = new Animator(this.spritesheetright, 11, 521, 239, 453, 9, .05, 3, false, true);
        this.animations[0][1] = new Animator(this.spritesheetleft, 3045, 520, 240, 453, 9, .05, 2, true, true);


        // running
        this.animations[1][0] = new Animator(this.spritesheetright, 16, 1494, 369, 460, 10, .05, 5, false, true);
        this.animations[1][1] = new Animator(this.spritesheetleft, 1740, 1490, 370, 460, 10, .05, 3, true, true);

        // jumping
        this.animations[2][0] = new Animator(this.spritesheetright, 30, 1000, 350, 476, 10, .05, 22, false, true);
        this.animations[2][1] = new Animator(this.spritesheetleft, 1780, 1000, 350, 476, 10, .05, 22, true, true);

        // attacking
        this.animations[3][0] = new Animator(this.spritesheetright, 25, 20, 535, 454, 10, .05, 11, false, true);
        this.animations[3][1] = new Animator(this.spritesheetleft, 10, 20, 535, 454, 10, .05, 11, true, true);

        // Death
        this.animations[4][0] = new Animator(this.spritesheetright, 18, 1985, 487, 485, 10, .05, 5, false, false);
        this.animations[4][1] = new Animator(this.spritesheetleft, 560, 1985, 487, 485, 10, .05, 5, true, true);

        //Throw
        this.animations[5][0] = new Animator(this.throwRight, 25, 0, 375, 460, 9, .05, 12, false, true);
        this.animations[5][1] = new Animator(this.throwLeft, 260, 0, 375, 460, 9, .05, 12, true, true);
    }


    loadGirlAnimations() {
        this.fillAnimations();

        //Idle
        this.animations[0][0] = new Animator(this.spritesheetright, 14, 592, 296, 523, 9, .05, 4, false, true);
        this.animations[0][1] = new Animator(this.spritesheetleft, 2875, 592, 296, 523, 9, .05, 4, true, true);

        // running
        this.animations[1][0] = new Animator(this.spritesheetright, 43, 1687, 357, 517, 10, .05, 29, false, true);
        this.animations[1][1] = new Animator(this.spritesheetleft, 2015, 1687, 357, 517, 10, .05, 29, true, true);

        // jumping
        this.animations[2][0] = new Animator(this.spritesheetright, 10, 1150, 400, 530, 10, .05, 9, false, true);
        this.animations[2][1] = new Animator(this.spritesheetleft, 1830, 1150, 385, 530, 10, .05, 24, true, true);

        // attacking
        this.animations[3][0] = new Animator(this.spritesheetright, 20, 40, 525, 525, 10, .05, 9, false, true);
        this.animations[3][1] = new Animator(this.spritesheetleft, 535, 40, 525, 525, 10, .05, 9, true, true);

        // Death
        this.animations[4][0] = new Animator(this.spritesheetright, 30, 2250, 530, 540, 10, .05, 58, false, true);
        this.animations[4][1] = new Animator(this.spritesheetleft, 30, 2250, 530, 540, 10, .05, 58, true, true);

        // Throw
        this.animations[5][0] = new Animator(this.throwRight, 20, 0, 410 - 35, 524, 9, .05, 18, false, true);
        this.animations[5][1] = new Animator(this.throwLeft, 237, 0, 410 - 35, 525, 9, .05, 18, true, true);
    }

    updateBB() {
        this.lastBB = this.BB;
        this.BB = new BoundingBox(this.x, this.y, 50, 90);
        //below I tried to alter BB based on animations but it screws with collisions

        if (this.state === 3) {
            if (this.facing === 0) {
                this.ABB = new BoundingBox(this.x + 50, this.y, 55, 90);
            } else {
                this.ABB = new BoundingBox(this.x - 50, this.y, 50, 90);
            }
        }
    };

    die() {
        this.state = 4;
        this.velocity.x = 0;
        this.velocity.y = 0;
        this.dead = true;
        ASSET_MANAGER.pauseBackGroundMusic();
    };
    update() {
        this.elapsedTime += this.game.clockTick;
        this.attackTime += this.game.clockTick;
        this.throwTime += this.game.clockTick;
        const TICK = this.game.clockTick;
        //die if you fall of screen
        if (this.y - this.game.camera.y > 760) this.die();
        //adjust constants to alter physics
        //run
        const MAX_RUN = 1000; //adjust for maximum run speed
        // const ACC_RUN = 600;  //adjust for maximum acceleration
        //skids
        // const DEC_SKID = 1850;
        // const TURN_SKID = 65;
        //jump
        const JUMP_ACC = 900;  //adjust for maximum jump acc      //JUMP_ACC & MAX_JUMP
        const MAX_JUMP = 1500;  //adjust for maximum jump height   //NEED TO BOTH BE ADJUSTED
        //falling                                                  //FOR DESIRED RESULT
        const MAX_FALL = 700;  //adjust for fall speed
        const STOP_FALL = 1800;
        //in air deceleration
        // const AIR_DEC = 2;

        //SET SCREEN BOUNDS (MAYBE DO BOUNDING BOX LATER
        const SCREEN_BOUND_LEFT = 170;
        const SCREEN_BOUND_RIGHT = 720;

        //collisions
        let that = this;
        let canFall = true;


        // Ninja falls from map dies.
        if (this.y > PARAMS.BLOCKWIDTH * 16) this.die();
        //collision system needs a rework
        this.game.platforms.forEach(function (entity) {
            if ((entity.BB && that.BB.collide(entity.BB))) {
                if (that.BB.bottom - entity.BB.top < 20 && that.velocity.y >= 0) { //if on top/falling
                    that.y = entity.BB.top - that.BB.height + 1;
                    that.velocity.y = 0;
                    canFall = false;
                    if (that.isPoweredUp) {
                        that.isPoweredUp = false
                        that.state = 0;
                    }
                    that.updateBB();
                } if (that.lastBB.top >= entity.BB.bottom && !that.isPoweredUp) {
                    // that.y = that.lastBB.top;
                    // that.x = that.BB.x;
                    // that.velocity.y = 5
                    // that.updateBB();
                }
                if (that.lastBB.left >= entity.BB.right && !that.isPoweredUp) { //collisions ->
                    that.x = that.lastBB.left;
                    that.velocity.x *= .8
                    that.updateBB();
                } if (that.lastBB.right <= entity.BB.left && !that.isPoweredUp) {  //collisions <-
                    that.x = that.lastBB.left;
                    that.velocity.x *= .8
                    that.updateBB();
                }
            }
        })
        this.game.entities.forEach(function (entity) {
            // Ninja dies if the Zombie collides with it.

            if (that.state === 3 && (entity.BB && that.ABB.collide(entity.BB))
                && (entity instanceof Zombie)) {
                //entity.removeFromWorld = true;
                if (that.multiplied) {
                    entity.zombieScore = 400;
                } else {
                    entity.zombieScore = 200;
                }
                entity.die();
            }

            if (entity instanceof Zombie && that.BB.collide(entity.ABB)) {
                that.hp -= 5;
                if (that.hp <= 0) {
                    that.hp = 5;
                    //that.die();
                } else if (entity.hp > entity.maxHP) {
                    that.hp = entity.maxHP;
                }
            }

            if ((entity.BB && that.BB.collide(entity.BB))
                && (entity instanceof Item)) {
                entity.removeFromWorld = true;
                switch (entity.name) {
                    case "up":
                        that.state = 2;
                        that.isPoweredUp = true;
                        // Play with this value to adjust boost up
                        that.velocity.y = -2000
                        break;
                    case "thumb":
                        that.multiplied = true;
                }
                if (that.multiplied) {
                    that.game.camera.score += 200;
                } else if (that.elapsedTime > 15) {
                    that.elapsedTime = 0;
                    that.multiplied = false;
                    that.game.camera.score += 100;
                }
            }

            if ((entity.BB && that.BB.collide(entity.BB))
                && (entity instanceof Item)) {
                entity.removeFromWorld = true;
                switch (entity.name) {
                    case "heart":
                        that.isPoweredUp = true;
                        if (that.hp + 100 > that.maxHP) {
                            that.hp = that.maxHP;
                        }
                        if (that.hp != that.maxHP) {
                            that.hp += 100;
                        }
                        break;
                }
            }

        });

        //physics
        // let yTest = this.velocity.y;
        //this physics will need a fine tuning;

        if (this.dead) {
            this.facing = 0;
            this.state = 4;
        }
        else if (this.state === 3 && this.attackTime <= .5) {
            this.updateMovement();
        }
        else if (this.state === 5 && this.throwTime <= .45) {
            this.updateMovement();
        }
        else { //set facing state field
            this.attackTime = 0
            this.throwTime = 0
            if (this.game.right) { //face right walk right

                this.facing = 0;
                this.state = 1;
            } else if (this.game.C) {
                if (this.elapsedTime > .4) {
                    this.elapsedTime = 0
                    const isLeft = this.facing === 1;
                    this.game.addEntity(new Kunai(this.game, this.x, this.y - this.game.camera.y + 25, isLeft))
                    this.state = 5;
                }
            } else if (this.game.left) { //face left walk left
                this.facing = 1;
                this.state = 1;
            } else if (this.game.B) { //set jumping state
                this.state = 2;
            } else if (this.game.A) { //set attacking state
                this.state = 3;
            } else if (!this.game.A && !this.game.B && !this.game.right && !this.game.left) {
                this.state = 0;       //state idle if nothing pressed
            }
            //if moving right and then face left, skid
            if (this.game.B) {
                canFall = true;
                if (this.velocity.y == 0) {      // this is where you alter jump physics
                    this.velocity.y -= JUMP_ACC; //we have the option of double jumping or jumping higher
                    this.fallAcc = STOP_FALL;    //if you hold b longer
                }
                // This part makes is so that the player can gain acceleration if they press a directional key
                // at the same time as the jump key. if falling in air they can change their direction this way.
                if (canFall && this.game.right) {
                    this.velocity.x += 450 * TICK;
                }
                if (canFall && this.game.left) {
                    this.velocity.x -= 450 * TICK;
                }

            }
            this.updateMovement();
        }

        // max speed calculation
        if (this.velocity.x >= MAX_RUN) this.velocity.x = MAX_RUN;
        if (this.velocity.x <= -MAX_RUN) this.velocity.x = -MAX_RUN;

        // update position
        if (canFall) { //this makes sure we aren't applying velocity if we are on ground/platform
            this.velocity.y += this.fallAcc * TICK;
            this.y += this.velocity.y * TICK * PARAMS.SCALE;
        }

        if (this.velocity.y >= MAX_FALL) this.velocity.y = MAX_FALL;
        if (this.velocity.y <= -MAX_JUMP && !this.isPoweredUp) {
            this.velocity.y = -MAX_FALL;
            this.isPoweredUp = false;
        } else if (this.velocity.y < -MAX_JUMP && this.isPoweredUp) this.velocity.y *= .8

        this.x += this.velocity.x * TICK * PARAMS.SCALE;
        if (this.x < SCREEN_BOUND_LEFT) this.x = SCREEN_BOUND_LEFT;

        if (this.x > SCREEN_BOUND_RIGHT) this.x = SCREEN_BOUND_RIGHT;
        this.updateBB(); //Update your bounding box every tick

    };

    updateMovement() {
        const TICK = this.game.clockTick;
        let yVel = Math.abs(this.velocity.y);
        const ACC_RUN = 600;  //adjust for maximum acceleration
        //skids
        const DEC_SKID = 1850;
        const TURN_SKID = 65;
        //in air deceleration
        const AIR_DEC = 2;
        if (this.game.left && this.velocity.x > 0 && yVel < 20) {
            this.velocity.x -= TURN_SKID;
        }
        //if moving left ann then face right, skid
        if (this.game.right && this.velocity.x < 0 && yVel < 20) {
            this.velocity.x += TURN_SKID;
        }
        //if you unpress left and right while moving right
        if (!this.game.right && !this.game.left) {
            if (this.facing === 0) { //moving right
                if (this.velocity.x > 0 && yVel < 20) {
                    this.velocity.x -= DEC_SKID * TICK;
                } else if (yVel < 20) {
                    this.velocity.x = 0;
                } else if (this.velocity.x > 0) { //this is where you control horizontal deceleration when in air
                    this.velocity.x -= AIR_DEC;
                }
            } else { //if you unpress left and right while moving left
                if (this.velocity.x < 0 && yVel < 20) {
                    this.velocity.x += DEC_SKID * TICK;
                } else if (yVel < 20) {
                    this.velocity.x = 0;
                } else if (this.velocity.x < 0) { //this is where you control horizontal deceleration when in air
                    this.velocity.x += AIR_DEC;
                }
            }
        }
        //Run physics
        if (this.facing === 0) {                        //facing right
            if (this.game.right && !this.game.left) {   //and pressing right.
                if (yVel < 10 && !this.game.B) {        //makes sure you are on ground
                    this.velocity.x += ACC_RUN * TICK;
                }
            }
        }
        else if (this.facing === 1) {                  //facing left
            if (!this.game.right && this.game.left) {   //and pressing left.
                if (yVel < 10 && !this.game.B) {        //makes sure you are on ground
                    this.velocity.x -= ACC_RUN * TICK;
                }
            }
        }
    }

    draw(ctx) {
        if (this.dead === true) {
            this.animations[this.state][this.facing].drawFrame(this.game.clockTick, ctx, this.x - 0 - this.girlXOffset, this.y - this.game.camera.y - this.girlYOffset, PARAMS.SCALE / 5);
        } else if (this.state === 1 && this.facing === 1) {
            this.animations[this.state][this.facing].drawFrame(this.game.clockTick, ctx, this.x - 20 - this.girlXOffset, this.y - this.game.camera.y - this.girlYOffset, PARAMS.SCALE / 5);
        } else if (this.state === 5) { //throwing
            if (this.facing === 0) {
                let offSetThrowX = 0;
                let offSetThrowY = 0;
                if (!this.isBoy) {
                    offSetThrowX = 6
                    offSetThrowY = 2
                }
                this.animations[this.state][this.facing].drawFrame(this.game.clockTick, ctx, this.x - 12 - this.girlXOffset + offSetThrowX, this.y - this.game.camera.y - this.girlYOffset - offSetThrowY, PARAMS.SCALE / 5);
            }
            else {
                let offSetThrowY = 0;
                if (!this.isBoy) {
                    offSetThrowY = 2
                }
                this.animations[this.state][this.facing].drawFrame(this.game.clockTick, ctx, this.x - 8 - this.girlXOffset, this.y - this.game.camera.y - this.girlYOffset - offSetThrowY, PARAMS.SCALE / 5);
            }
        }
        else if (this.state === 3 && this.facing === 1) { //need to offset so our player doesn't shift when attacking left
            this.animations[this.state][this.facing].drawFrame(this.game.clockTick, ctx, this.x - 50 - this.girlXOffset, this.y - this.game.camera.y - this.girlYOffset, PARAMS.SCALE / 5);
        } else {
            this.animations[this.state][this.facing].drawFrame(this.game.clockTick, ctx, this.x - this.girlXOffset, this.y - this.game.camera.y - this.girlYOffset, PARAMS.SCALE / 5);
        }
        if (true) {
            ctx.strokeStyle = 'blue';
            ctx.strokeRect(this.BB.x, this.BB.y - this.game.camera.y, this.BB.width, this.BB.height);
            if (this.state === 3) {
                ctx.strokeRect(this.ABB.x, this.ABB.y - this.game.camera.y, this.ABB.width, this.ABB.height);
            }
        }

    };
}