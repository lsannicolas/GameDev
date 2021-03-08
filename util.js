// returns a random integer between 0 and n-1
function randomInt(n) {
    return Math.floor(Math.random() * n);
};

function randomInRange(i, j) {
    let min = Math.ceil(i);
    let max = Math.floor(j);
    return Math.floor(Math.random() * (max - min + 1)) + min;
}

// returns a string that can be used as a rgb web color
function rgb(r, g, b) {
    return "rgb(" + r + "," + g + "," + b + ")";
};

// returns a string that can be used as a hsl web color
function hsl(h, s, l) {
    return "hsl(" + h + "," + s + "%," + l + "%)";
};

// creates an alias for requestAnimationFrame for backwards compatibility
window.requestAnimFrame = (function () {
    return window.requestAnimationFrame ||
        window.webkitRequestAnimationFrame ||
        window.mozRequestAnimationFrame ||
        window.oRequestAnimationFrame ||
        window.msRequestAnimationFrame ||
        function (/* function */ callback, /* DOMElement */ element) {
            window.setTimeout(callback, 1000 / 60);
        };
})();

// add global parameters here

const PARAMS = {
    DEBUG: true,
    STARTMENU: true,
    PLAY: false,
    LEVELMENU: false,
    CONTROLS: false,
    SETTINGS: false,
    VOLUME: 20,
    PAUSE: false,
    BOY: true,
    LEVEL: 1,
    SCALE: 1,
    BITWIDTH: 16,
    SCORE: 0,
    DIFFICULTY: .75,
    EASY: .5,
    NORMAL: .75,
    HARD : 1.25,
    POWERUP_COLLECTED: 0,
    STARS: 3
    //VOLUME: 30,
};