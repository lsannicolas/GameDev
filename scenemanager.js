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
        this.x = 0;
        this.zombie = new Zombie(this.game, this.x , this.y, false);
        this.game.addEntity(this.zombie);
        this.boy = new Ninja(this.game, 0, 0, true);
        this.game.addEntity(this.person);
        this.girl = new Ninja(this.game, 0, 300, false);
        this.game.addEntity(this.person);

    };

    update() {
        PARAMS.DEBUG = document.getElementById("debug").checked;


        let midpoint = PARAMS.CANVAS_WIDTH/2 - 60;
        let midpointY = PARAMS.CANVAS_HEIGHT/2 - 60;

        // if (this.x < this.knight.x - midpoint) this.x = this.knight.x - midpoint;
        //always start center
        // this.x = this.CHARACTERNAME.x - midpoint;
        // this.y = this.CHARACTERNAME.y - midpointY;


    };

    draw(ctx) {

    };
};

