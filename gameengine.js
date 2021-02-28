// This game shell was happily modified from Googler Seth Ladd's "Bad Aliens" game and his Google IO talk in 2011

class GameEngine {
    constructor() {
        this.entities = [];
        this.platforms = [];
        this.ctx = null;
        this.surfaceWidth = null;
        this.surfaceHeight = null;

        this.left = false;
        this.right = false;
        this.up = false;
        this.down = false;
        this.A = false;
        this.B = false;
        this.C = false;
        this.play = false;
    };

    init(ctx) { // called after page has loaded
        this.ctx = ctx;
        this.surfaceWidth = this.ctx.canvas.width;
        this.surfaceHeight = this.ctx.canvas.height;
        this.startInput();
        this.timer = new Timer();
    };

    start() {
        var that = this;
        (function gameLoop() {
            that.loop();
            requestAnimFrame(gameLoop, that.ctx.canvas);
        })();
    };

    startInput() {
        var that = this;
        //for mouse clicks

        if (PARAMS.START === false) {
            this.ctx.canvas.addEventListener("click", function (e) {
                let click = getXandY(e);
                console.log(click);
                if (click.x > 230 && click.x < 396 && click.y > 467 && click.y < 525) {
                    PARAMS.PLAY = true;
                   // ASSET_MANAGER.pauseBackGroundMusic();
                   // ASSET_MANAGER.playAsset(levelOne.music);
                } else if (click.x > 544 && click.x < 716 && click.y > 467 && click.y < 525) {
                    PARAMS.LEVELS = true;
                }
                if (PARAMS.CONTROLS && click) {
                    PARAMS.CONTROLS = false;
                    PARAMS.START = true;
                }
                if (PARAMS.PAUSE) {
                    if (click.y > 485 && click.y < 512) {
                        if (click.x > 420 && click.x < 471) {
                            PARAMS.VOLUME = 0;
                        } else if (click.x > 480 && click.x < 630) {
                            PARAMS.VOLUME = Math.floor((click.x - 480)/1.5);
                            console.log(PARAMS.VOLUME);
                        }

                    } else if (click.y > 534 && click.y < 587) {
                        if (click.x > 439 && click.x < 487) PARAMS.DIFFICULTY = PARAMS.EASY;
                        if (click.x > 500 && click.x < 544) PARAMS.DIFFICULTY = PARAMS.NORMAL;
                        if (click.x > 587 && click.x < 640) PARAMS.DIFFICULTY = PARAMS.HARD;
                    }
                }
            }, false);
        }
        var getXandY = function (e) {
            var x = e.clientX - that.ctx.canvas.getBoundingClientRect().left;
            var y = e.clientY - that.ctx.canvas.getBoundingClientRect().top;

            return { x: x, y: y };
        }


        //for key presses
        this.ctx.canvas.addEventListener("keydown", function (e) {
            //console.log(e.code);
            switch (e.code) {
                case "ArrowLeft":
                case "KeyA":
                    that.left = true;
                    break;
                case "ArrowRight":
                case "KeyD":
                    that.right = true;
                    break;
                case "ArrowUp":
                case "KeyW":
                    that.up = true;
                    break;
                case "ArrowDown":
                case "KeyS":
                    that.down = true;
                    break;
                case "KeyZ":
                case "Comma":
                    that.B = true;
                    break;
                case "KeyX":
                case "Period":
                    that.A = true;
                    break;
                case "KeyC":
                    // case "Period":
                    that.C = true;
                    break;
                case "Escape":
                    if (PARAMS.START) {
                        PARAMS.PAUSE = !PARAMS.PAUSE;
                    }

                    break;
            }
        }, false);

        this.ctx.canvas.addEventListener("keyup", function (e) {

            switch (e.code) {
                case "ArrowLeft":
                case "KeyA":
                    that.left = false;
                    break;
                case "ArrowRight":
                case "KeyD":
                    that.right = false;
                    break;
                case "ArrowUp":
                case "KeyW":
                    that.up = false;
                    break;
                case "ArrowDown":
                case "KeyS":
                    that.down = false;
                    break;
                case "KeyZ":
                case "Comma":
                    that.B = false;
                    break;
                case "KeyX":
                case "Period":
                    that.A = false;
                    break;
                case "KeyC":
                    // case "Period":
                    that.C = false;
                    break;
            }
        }, false);
    };

    addEntity(entity) {
        this.entities.push(entity);
    };

    pushEntity(entity) {
        this.entities.unshift(entity);
    };

    addPlatform(entity) {
        this.platforms.push(entity);
    };

    draw() {
        this.ctx.clearRect(0, 0, this.ctx.canvas.width, this.ctx.canvas.height);

        for (var i = 0; i < this.platforms.length; i++) {
            this.platforms[i].draw(this.ctx);
        }
        for (var i = 0; i < this.entities.length; i++) {
            this.entities[i].draw(this.ctx);
        }
        this.camera.draw(this.ctx);
    };

    update() {
        var entitiesCount = this.entities.length;

        for (var i = 0; i < entitiesCount; i++) {
            var entity = this.entities[i];

            if (!entity.removeFromWorld) {
                entity.update();
            }
        }
        this.camera.update();

        for (var i = this.entities.length - 1; i >= 0; --i) {
            if (this.entities[i].removeFromWorld) {
                this.entities.splice(i, 1);
            }
        }
    };

    loop() {
        this.clockTick = this.timer.tick();
        this.update();
        this.draw();
    };
};