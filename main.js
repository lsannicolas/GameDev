

var ASSET_MANAGER = new AssetManager();

ASSET_MANAGER.queueDownload("./sprites/start_menu.png");
ASSET_MANAGER.queueDownload("./sprites/intro_menu.png");
ASSET_MANAGER.queueDownload("./sprites/pause_menu.png");
ASSET_MANAGER.queueDownload("./sprites/settings_menu.png");
ASSET_MANAGER.queueDownload("./sprites/levels_menu.png");


ASSET_MANAGER.queueDownload("./sprites/zombieboynew.png");
ASSET_MANAGER.queueDownload("./sprites/zombiegirlnew.png");
ASSET_MANAGER.queueDownload('./sprites/BoyNinja.png');
ASSET_MANAGER.queueDownload('./sprites/BoyNinjaLeft.png');
ASSET_MANAGER.queueDownload('./sprites/ninjaGirl.png');
ASSET_MANAGER.queueDownload('./sprites/ninjaGirlLeft.png');

ASSET_MANAGER.queueDownload('./sprites/throwRight.png');
ASSET_MANAGER.queueDownload('./sprites/throwLeft.png');
ASSET_MANAGER.queueDownload('./sprites/throwRightGirl.png');
ASSET_MANAGER.queueDownload('./sprites/throwLeftGirl.png');

ASSET_MANAGER.queueDownload('./sprites/Kunai.png');
ASSET_MANAGER.queueDownload('./sprites/Kunai_left.png');

ASSET_MANAGER.queueDownload('./sprites/slimeLeft.png');
ASSET_MANAGER.queueDownload('./sprites/slimeRight.png');

ASSET_MANAGER.queueDownload('./sprites/thumb.png');
ASSET_MANAGER.queueDownload('./sprites/up.png');
ASSET_MANAGER.queueDownload('./sprites/heart.png');
ASSET_MANAGER.queueDownload('./sprites/wings.png');
ASSET_MANAGER.queueDownload('./sprites/star.png');

ASSET_MANAGER.queueDownload("./sprites/levelone/platform_one.png");
ASSET_MANAGER.queueDownload("./sprites/levelone/land_one.png");
ASSET_MANAGER.queueDownload("./sprites/levelone/decor_one.png");
ASSET_MANAGER.queueDownload("./sprites/levelone/background.png");

ASSET_MANAGER.queueDownload("./sprites/leveltwo/platform_two.png");
ASSET_MANAGER.queueDownload("./sprites/leveltwo/land_two.png");
ASSET_MANAGER.queueDownload("./sprites/leveltwo/background_two.png");

ASSET_MANAGER.queueDownload("./sprites/levelthree/platform_three.png");
ASSET_MANAGER.queueDownload("./sprites/levelthree/land_three.png");
ASSET_MANAGER.queueDownload("./sprites/levelthree/decor_three.png");
ASSET_MANAGER.queueDownload("./sprites/levelthree/background_three.png");

ASSET_MANAGER.queueDownload("./sprites/levelfour/platform_four.png");
ASSET_MANAGER.queueDownload("./sprites/levelfour/land_four.png");
ASSET_MANAGER.queueDownload("./sprites/levelfour/background_four.png");



//Music
ASSET_MANAGER.queueDownload("./music/backgroundVinyl.mp3");

//audio
ASSET_MANAGER.queueDownload("./audio/swingSword.wav");
ASSET_MANAGER.queueDownload("./audio/kunai.wav");
ASSET_MANAGER.queueDownload("./audio/zombieHit.wav");
ASSET_MANAGER.queueDownload("./audio/zombieDie.mp3");




ASSET_MANAGER.downloadAll(function () {
	var gameEngine = new GameEngine();

	ASSET_MANAGER.autoRepeat("./music/backgroundVinyl.mp3");

	PARAMS.BLOCKWIDTH = PARAMS.BITWIDTH * PARAMS.SCALE;

	let canvas = document.getElementById('gameWorld');

	let ctx = canvas.getContext('2d');

	PARAMS.CANVAS_WIDTH = canvas.width;
	PARAMS.CANVAS_HEIGHT = canvas.height;

	gameEngine.init(ctx);

	new SceneManager(gameEngine);

	gameEngine.start();
});

