class Ninja {
    constructor(game, x, y) {
        Object.assign(this, game, x, y);

        this.spritesheet = ASSET_MANAGER.getAsset('./sprites/')
    }
}