class StartMenu {
    constructor(game) {
        Object.assign(this, { game });
        this.spritesheet = ASSET_MANAGER.getAsset("./sprites/start.png");
        this.exists = true;
        this.playClicked = false;
        this.levelsClicked = false;
        this.playCounter = 0;
        this.levelCounter = 0;
        this.startCounter = 0;


    };


    update() {

        if (this.exists) {
            if (PARAMS.PLAY) {
                this.playCounter++;
                if (this.playCounter > 5) {
                    //PARAMS.START = true;
                    PARAMS.PLAY = false;
                }
            } else if (PARAMS.LEVELS) {
                this.levelCounter++;
                if (this.levelCounter > 5) {
                    PARAMS.LEVELS = false;
                }
            }
            if (this.playCounter > 5) {
                this.startCounter++;
                if (this.startCounter > 5) {
                    PARAMS.START = true;
                }
            }
        }
    };
    draw(ctx) {
        if (this.exists) {
            if (!PARAMS.PLAY && !PARAMS.LEVELS) {
                ctx.drawImage(this.spritesheet, 0, 0, 950, 750, 0, 0, 950, 750);
            } else if (PARAMS.PLAY) {
                ctx.drawImage(this.spritesheet, 0, 765, 950, 750, 0, 0, 950, 750);
            } else if (PARAMS.LEVELS) {
                ctx.drawImage(this.spritesheet, 0, 1528, 950, 750, 0, 0, 950, 750);

            }

        }

    };

}
