class HPBar {
    constructor(game) {
        Object.assign(this, {game});
        this.exists = true; 
        const health = 1000;
    }
    
        update() {
    
        }

        updateHealth(num) {
            this.health += num;
            console.log("current hp" + this.health);   
        }

        draw(ctx) {
            if(this.exists){
                ctx.lineWidth = 4;
                ctx.strokeStyle = "#333";
                ctx.fillStyle = "red";
                ctx.fillRect(30, 20, 100, 20);
                ctx.strokeRect(30, 20, 100, 20);
            }         
        }
}
