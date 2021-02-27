var levelOne = {
    music: "./music/backgroundVinyl.mp3",
    bricks: [
        { x: 0, y: -2000 },
        { x: 0, y: -4100 },
        { x: 0, y: -6200 },
    ],
    decor: [
        { x: 0, y: -1500 },
        { x: 0, y: -4250 },
        { x: 0, y: -6150 }
    ],
    platforms: [
        // Min width 50 with a jump span of 400 px height ~ 200
        // Max width 250 with a jump span of ~300 height
        { x: 170, y: 300, width: 600 },
        { x: 170, y: 100, width: 75 },
        { x: 500, y: -100, width: 250 },
        { x: 200, y: -300, width: 100 },
        { x: 500, y: -500, width: 250 },
        { x: 180, y: -700, width: 50 },
        { x: 400, y: -900, width: 50 },
    ],
    powerUps: [
        { x: 650, y: -150, name: "thumb" },
        { x: 200, y: -375, name: "up" },
        { x: 500, y: -550, name: "wings" },
        { x: 400, y: -950, name: "heart" },
    ],
    enemies: [
        { x: 500, y: -150, isBoy: true },
        { x: 650, y: -550, isBoy: true },
    ],
}