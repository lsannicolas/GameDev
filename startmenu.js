class StartMenu{
    constructor(game) {
        Object.assign(this, { game });
        this.spritesheet = ASSET_MANAGER.getAsset("./sprites/start.png");
        this.exists = true;

    };

    update() {

    };
    draw(ctx){
        if (this.exists) {
            ctx.drawImage(this.spritesheet, 0, 0, 950, 750);
        } else {
            ctx.drawImage(this.spritesheet, 0, 0, 0, 0);
        }

    };

}
