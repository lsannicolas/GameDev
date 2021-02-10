class Item {
    constructor(game, x, y, name) {
        Object.assign(this, { game, x, y, name });

        this.floatY = 0;
        this.step = .1;

        switch (this.name) {
            case "thumb":
                this.sprite = ASSET_MANAGER.getAsset('./sprites/thumb.png');
                this.width = 139;
                this.height = 140;
                break;
            case "heart":
                this.width = 160;
                this.height = 143;
                this.sprite = ASSET_MANAGER.getAsset('./sprites/heart.png');
                break;
            case "up":
                this.width = 196;
                this.height = 218;
                this.sprite = ASSET_MANAGER.getAsset('./sprites/up.png');
                break;
            case "wings":
                this.width = 279;
                this.height = 143;
                this.sprite = ASSET_MANAGER.getAsset('./sprites/wings.png');
                break;
        }
        this.loadAnimations();
        this.updateBB();
    }

    loadAnimations() {
        this.spriteAnimation = new Animator(this.sprite, 0, 0, this.width, this.height, 1, .5, 0, false, true);
    }



    updatePos() {
        this.floatY += this.step;
    }

    updateBB() {
        this.BB = new BoundingBox(this.x, this.y, this.width / PARAMS.SCALE / 3, (this.height / PARAMS.SCALE / 3));
    }

    update() {
    }

    draw(ctx) {
        if (Math.round(parseFloat(this.floatY) * 10) > 50) {
            this.step = -.1
        }
        else if (Math.round(parseFloat(this.floatY) * 10) < -50) {
            this.step = +.1
        }
        this.updatePos();
        this.spriteAnimation.drawFrame(this.game.clockTick, ctx, this.x, this.y + this.floatY - this.game.camera.y, PARAMS.SCALE / 3);
        if (PARAMS.DEBUG) {
            ctx.strokeStyle = 'yellow';
            ctx.strokeRect(this.BB.x, this.BB.y - this.game.camera.y, this.BB.width, this.BB.height);
        }
    }
}
