class HPBar {
    constructor(ninja) {
        Object.assign(this, {ninja});
        this.exists = true; 
        this.health = 1000;
    }
    
        update() {
    
        }

        draw(ctx) {
            if(this.exists){
                var ratio = this.ninja.hp / this.ninja.maxHP;
                ctx.strokeStyle = "Black";
                ctx.fillStyle = ratio < 0.2 ? "Red" : ratio < 0.5 ? "Yellow" : "Green";
                ctx.fillRect(30, 20, this.ninja.radius * 2 * ratio, 20);
                ctx.strokeRect(30, 20, this.ninja.radius * 2, 20);
            }         
        }
}
