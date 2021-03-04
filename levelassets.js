class Platform {
    constructor(game, x, y, w) {
        Object.assign(this, {game, x, y, w});
        switch(PARAMS.LEVEL) {
            case 1:
                this.spritesheet = ASSET_MANAGER.getAsset("./sprites/levelone/platform_one.png");
                break;
            case 2:
                this.spritesheet = ASSET_MANAGER.getAsset("./sprites/leveltwo/platform_two.png");
                break;
            case 3:
                this.spritesheet = ASSET_MANAGER.getAsset("./sprites/levelthree/platform_three.png");
                break;
            default:
                this.spritesheet = ASSET_MANAGER.getAsset("./sprites/levelfour/platform_four.png");
                break;
        }

        this.h = 40;
        this.BB = new BoundingBox(this.x, this.y + 10, this.w, this.h - 10); //offset so were into platform a bit
    };

    update() {

    };

    draw(ctx) {
        ctx.drawImage(this.spritesheet, this.x - this.game.camera.x, this.y - this.game.camera.y, this.w, this.h);
    };
}

class Brick{
    constructor(game, x, y) {
        Object.assign(this, { game, x, y});
        switch(PARAMS.LEVEL) {
            case 1:
                this.spritesheet = ASSET_MANAGER.getAsset("./sprites/levelone/land_one.png");
                break;
            case 2:
                this.spritesheet = ASSET_MANAGER.getAsset("./sprites/leveltwo/land_two.png");
                break;
            case 3:
                this.spritesheet = ASSET_MANAGER.getAsset("./sprites/levelthree/land_three.png");
                break;
            default:
                this.spritesheet = ASSET_MANAGER.getAsset("./sprites/levelfour/land_four.png");
                break;
        }

    };

    update() {

    };

    draw(ctx){
        ctx.drawImage(this.spritesheet, 0, this.y - this.game.camera.y, 950, 2470);
    };

}

class Decor {
    constructor(game, x, y){
        Object.assign(this, {game, x, y});
        switch(PARAMS.LEVEL) {
            case 1:
                this.spritesheet = ASSET_MANAGER.getAsset("./sprites/levelone/decor_one.png");
                break;
            case 3:
                this.spritesheet = ASSET_MANAGER.getAsset("./sprites/levelthree/decor_three.png");
                break;
        }

    };
    update(){

    };

    draw(ctx){
        if (PARAMS.LEVEL === 1 || PARAMS.LEVEL === 3) {
            ctx.drawImage(this.spritesheet, 0, this.y - this.game.camera.y, 950, 2470);
        }

    };
}

class Background {
    constructor(game){
        Object.assign(this, {game});
        switch(PARAMS.LEVEL) {
            case 1:
                this.spritesheet = ASSET_MANAGER.getAsset("./sprites/levelone/background.png");
                break;
            case 2:
                this.spritesheet = ASSET_MANAGER.getAsset("./sprites/leveltwo/background_two.png");
                break;
            case 3:
                this.spritesheet = ASSET_MANAGER.getAsset("./sprites/levelthree/background_three.png");
                break;
            default:
                this.spritesheet = ASSET_MANAGER.getAsset("./sprites/levelfour/background_four.png");
                break;
        }
    };
    update(){

    };

    draw(ctx){
        ctx.drawImage(this.spritesheet, 0, 0, 1000, 750);
    };
}

