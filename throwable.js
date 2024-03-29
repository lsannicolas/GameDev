class Throwable {

    constructor(game, x, y, left, sprite, max) {
        Object.assign(this, { game, x, y, left, sprite, max });
        this.yCam = this.game.camera.y;
        this.name = this.sprite.split("/")[2].substring(0, 5);
        if (this.left) {
            this.spritesheet = ASSET_MANAGER.getAsset(this.sprite);
        } else {
            this.spritesheet = ASSET_MANAGER.getAsset(this.sprite);
        }
        this.width = this.name === "Kunai" ? 160 : 452;
        this.height = this.name === "Kunai" ? 32 : 452;
        this.size = this.name === "Kunai" ? .3 : .08;
        this.animations = new Animator(this.spritesheet, 0, 0, this.width, this.height, 1, 1, 0, true, true)

        this.maxSpeed = max; // pixels per second

        this.velocity = { x: this.maxSpeed, y: this.maxSpeed };
        this.updateBB();
    }


    updateBB() {
        let yOffset = this.name === "Kunai" ? 15 : 20
        let height = this.name === "Kunai" ? 10 : 25



        if (this.left) {
            this.BB = new BoundingBox(this.x - 40, this.y + this.game.camera.y + yOffset, this.width * this.size, height);
        } else {
            this.BB = new BoundingBox(this.x, this.y + this.game.camera.y + yOffset, this.width * this.size, height);
        }
    };


    update() {

        if (this.x < 0 || this.x > 900) this.removeFromWorld = true;
        this.updateBB();
        var that = this;
        this.game.entities.forEach(function (entity) {
            // Ninja dies if the Zombie collides with it.
            if (entity instanceof Zombie && that.BB.collide(entity.BB) && that.name === "Kunai") {
                entity.die();
                that.game.camera.score += 200;
                that.removeFromWorld = true;
            }
            else if (entity instanceof Ninja && entity.hasOwnProperty("ABB") && that.BB.collide(entity.ABB) && that.name !== "Kunai") {
                that.removeFromWorld = true;
                that.game.camera.score += 500
            }
            else if (entity instanceof Ninja && that.BB.collide(entity.BB) && that.name !== "Kunai") {
                entity.hp -= 100
                that.game.camera.score += 200;
                that.removeFromWorld = true;
            }
        });
        if (this.left) {
            this.x -= this.velocity.x * this.game.clockTick;
        } else {
            this.x += this.velocity.x * this.game.clockTick;
        }
        this.y += Math.abs(this.game.camera.y - this.yCam)
        // (this.name === "Kunai" ? .75 : .75)
        this.yCam = this.game.camera.y
    }

    draw(ctx) {
        if (this.left) {
            this.animations.drawFrame(this.game.clockTick, ctx, this.x - 40, this.y + 15, this.size)
        } else {
            this.animations.drawFrame(this.game.clockTick, ctx, this.x, this.y + 15, this.size)
        }
    }
}