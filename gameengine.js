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