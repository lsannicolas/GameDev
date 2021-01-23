class SceneManager {
    constructor(game) {
        this.game = game;
        this.game.camera = this;
        this.x = 0;
        this.y = 0;
        this.loadLevelOne();


    };



    clearEntities() {
        this.game.entities = [];
    };

    loadLevelOne() {
        this.game.entities = [];
        this.x = 0;
        this.y = 0;

        let platform = new Platform(this.game, 5 * PARAMS.BLOCKWIDTH, 5 * PARAMS.BLOCKWIDTH, 8 * PARAMS.BLOCKWIDTH);
        this.game.addEntity(platform);
        platform = new Platform(this.game, 30 * PARAMS.BLOCKWIDTH, 15 * PARAMS.BLOCKWIDTH, 8 * PARAMS.BLOCKWIDTH);
        this.game.addEntity(platform);
        platform = new Platform(this.game, 8 * PARAMS.BLOCKWIDTH, 25 * PARAMS.BLOCKWIDTH, 8 * PARAMS.BLOCKWIDTH);
        this.game.addEntity(platform);
        platform = new Platform(this.game, 14 * PARAMS.BLOCKWIDTH, 25 * PARAMS.BLOCKWIDTH, 8 * PARAMS.BLOCKWIDTH);
        this.game.addEntity(platform);
        platform = new Platform(this.game, 30 * PARAMS.BLOCKWIDTH, 50 * PARAMS.BLOCKWIDTH, 8 * PARAMS.BLOCKWIDTH);
        this.game.addEntity(platform);
        platform = new Platform(this.game, 35 * PARAMS.BLOCKWIDTH, 50 * PARAMS.BLOCKWIDTH, 8 * PARAMS.BLOCKWIDTH);
        this.game.addEntity(platform);
        platform = new Platform(this.game, 35 * PARAMS.BLOCKWIDTH, 60 * PARAMS.BLOCKWIDTH, 8 * PARAMS.BLOCKWIDTH);
        this.game.addEntity(platform);
        platform = new Platform(this.game, 14 * PARAMS.BLOCKWIDTH, 65 * PARAMS.BLOCKWIDTH, 8 * PARAMS.BLOCKWIDTH);
        this.game.addEntity(platform);
        platform = new Platform(this.game, 44 * PARAMS.BLOCKWIDTH, 70 * PARAMS.BLOCKWIDTH, 8 * PARAMS.BLOCKWIDTH);
        this.game.addEntity(platform);
        platform = new Platform(this.game, 11 * PARAMS.BLOCKWIDTH, 44* PARAMS.BLOCKWIDTH, 8 * PARAMS.BLOCKWIDTH);
        this.game.addEntity(platform);

        
        // let zombie = new Zombie(this.game, 0 , 0, false);
        // this.game.addEntity(zombie);
//         this.boy = new Ninja(this.game, 0, 0, true);
//         this.game.addEntity(this.person);
//         this.girl = new Ninja(this.game, 0, 300, false);
//         this.game.addEntity(this.person);

    };

    update() {
        PARAMS.DEBUG = document.getElementById("debug").checked;


        let midpoint = PARAMS.CANVAS_WIDTH/2 - 60;
        let midpointY = PARAMS.CANVAS_HEIGHT/2 - 60;

    };

    draw(ctx) {

    };
};

