class Menus {
    constructor(game) {
        Object.assign(this, { game });
        this.spritesheet = ASSET_MANAGER.getAsset("./sprites/start_menu.png");
        this.controls = ASSET_MANAGER.getAsset("./sprites/intro_menu.png");
        this.pause = ASSET_MANAGER.getAsset("./sprites/pause_menu.png");
        this.settings = ASSET_MANAGER.getAsset("./sprites/settings_menu.png");
        this.levels = ASSET_MANAGER.getAsset("./sprites/levels_menu.png");
    };

    update() {
    };

    draw(ctx){
        if (PARAMS.STARTMENU) {
            ctx.drawImage(this.spritesheet, 0, 0, 950, 750)
        }
        if (PARAMS.CONTROLS) {
            ctx.drawImage(this.controls, 0, 0, 950, 750);
        }
        if (PARAMS.PAUSE) {
            ctx.drawImage(this.pause, 0, 0, 950, 750);
        }
        if (PARAMS.SETTINGS) {
            ctx.drawImage(this.settings, 0, 0, 950, 750)
        }
        if (PARAMS.LEVELMENU) {
            ctx.drawImage(this.levels, 0, 0, 950, 750)
        }

    };

}

class VolumeSlider {
    constructor(game) {
        Object.assign(this, { game });
        this.exists = true;
    }

    update() {
        this.exists = PARAMS.PAUSE || PARAMS.SETTINGS;
    }

    draw(ctx) {
        if(this.exists){
            ctx.strokeStyle = "White";
            ctx.fillStyle = "Blue";
            ctx.strokeRect(422, 486, 50, 25);
            ctx.fillRect(480, 486, PARAMS.VOLUME*1.5, 25);
            ctx.strokeRect(480, 486, 150, 25);
            ctx.font = 18 + 'px "Play"';
            ctx.fillStyle = "Red";
            ctx.fillText("MUTE", 423, 505);
        }
    }
}

class Difficulty {
    constructor(game) {
        Object.assign(this, { game });
        this.exists = true;
    }

    update() {
        this.exists = PARAMS.PAUSE || PARAMS.SETTINGS;
    }

    draw(ctx) {
        if(this.exists){
            let easyColor = "Black";
            let normalColor = "Black";
            let hardColor = "Black";
            switch (PARAMS.DIFFICULTY) {
                case PARAMS.EASY:
                    easyColor = "White";
                    break;
                case PARAMS.NORMAL:
                    normalColor = "White";
                    break;
                default:
                    hardColor = "White";
                    break;
            }
            ctx.font = 18 + 'px "Play"';
            ctx.fillStyle = easyColor;
            ctx.fillText("EASY", 440, 550);
            ctx.fillStyle = normalColor;
            ctx.fillText("NORMAL", 500, 550);
            ctx.fillStyle = hardColor;
            ctx.fillText("HARD", 590, 550);
        }
    }
}



