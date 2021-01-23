class Platform{
    constructor(game, x, y, w) {
        Object.assign(this, { game, x, y, w});
        this.spritesheet = ASSET_MANAGER.getAsset("./sprites/brick.png");
        this.h = 4 * PARAMS.BLOCKWIDTH;
        this.BB = new BoundingBox(this.x, this.y, this.w, this.h);

        //this.leftBB = new BoundingBox(this.x, this.y, PARAMS.BLOCKWIDTH, PARAMS.BLOCKWIDTH * 2)
        //this.rightBB = new BoundingBox(this.x + this.w - PARAMS.BLOCKWIDTH, this.y, PARAMS.BLOCKWIDTH, PARAMS.BLOCKWIDTH * 2)
    };

    update() {

    };

    draw(ctx){
        ctx.drawImage(this.spritesheet, this.x, this.y, this.w, this.h);
        //ctx.drawImage(this.spritesheet, 51, 101, 385, 157, 1, 1, 0, false, true);

        // if(this.type){
        //     this.animation[this.type].drawFrame(this.game.clockTick, ctx, this.x, this.y, PARAMS.SCALE);
        // }
        if (PARAMS.DEBUG) {
            ctx.strokeStyle = 'Red';
            ctx.strokeRect(this.x - this.game.camera.x, this.y - this.game.camera.y, this.BB.width, this.BB.height);
        }
    };
















}