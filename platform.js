class Platform{
    constructor(game, x, y, w, type) {
        Object.assign(this, { game, x, y, w, type});
        this.spritesheet = ASSET_MANAGER.getAsset("./sprites/platforms.png");
        this.h = 350;
        this.BB = new BoundingBox(this.x, this.y, this.w,);

        this.animation = [];

        this.animation.push(new Animator(ASSET_MANAGER.getAsset("./sprites/platforms.png"), 51, 101, 385, 157, 1, 0, 0, false, true));
        this.animation.push(new Animator(ASSET_MANAGER.getAsset("./sprites/platforms.png"), 521, 5, 389, 260, 1, 0, 0, false, true));
        //this.leftBB = new BoundingBox(this.x, this.y, PARAMS.BLOCKWIDTH, PARAMS.BLOCKWIDTH * 2)
        //this.rightBB = new BoundingBox(this.x + this.w - PARAMS.BLOCKWIDTH, this.y, PARAMS.BLOCKWIDTH, PARAMS.BLOCKWIDTH * 2)
    };

    update() {

    };

    draw(ctx){
        ctx.drawImage(this.spritesheet, this.x, this.y, this.w, this.h);
        
        if(this.type){
            this.animation[this.type].drawFrame(this.game.clockTick, ctx, this.x, this.y);
        }
        if (PARAMS.DEBUG) {
            ctx.strokeStyle = 'Red';
            ctx.strokeRect(this.x - this.game.camera.x, this.y - this.game.camera.y, this.BB.width, this.BB.height);
        }
    };
















}