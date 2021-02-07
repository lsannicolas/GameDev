class Brick{
    constructor(game, x, y) {
        Object.assign(this, { game, x, y});
        this.spritesheet = ASSET_MANAGER.getAsset("./sprites/layers/land.png");
         
    };

    update() {

    };

    draw(ctx){
        ctx.drawImage(this.spritesheet, 0, this.y - this.game.camera.y, 950, 2470);
    };

}

class Decor{
    constructor(game, x, y){
        Object.assign(this, {game, x, y});
        this.spritesheet = ASSET_MANAGER.getAsset("./sprites/layers/decor.png");

    };
    update(){

    };

    draw(ctx){
        ctx.drawImage(this.spritesheet, 0, this.y - this.game.camera.y, 950, 2470);
    };
}