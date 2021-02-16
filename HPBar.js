class HPBar {
    constructor(game) {
        Object.assign(this, {game});
        this.exists = true;
        this.health = 1000; //full health - 1 death;
        this.spritesheet = ASSET_MANAGER.getAsset("./sprites/HealthBar.png");
    }
    
        update() {
    
        }
    
        subtractHealth(num) {
            this.health -= num;
        }
        draw(ctx) {
            if(this.exists){
                ctx.drawImage(this.spritesheet,0,0,100,20,80,510,100,20);
            }         
        }
    
}
