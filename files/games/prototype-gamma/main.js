var gameX = 1024;
var gameY = 720;

var tilesize = 32;

var mapsizeX = 64;
var mapsizeY = 64;

var mouse = {
    'X': -1,
    'Y': -1,
    'tileX': -1,
    'tileY': -1,
    'onTile': -1

}

var texts = [];

//the matter itself
var game = new Phaser.Game(gameX, gameY, Phaser.CANVAS, '',
    { preload: preload, create: create, update: update, render: render });



function preload(){

    game.renderer.renderSession.roundPixels = true

    var folder = '../files/games/prototype-gamma/';
    var GFX = folder + 'gfx/';

    game.load.image('katamori', GFX + 'katamori.png');

    game.load.spritesheet('tileset', GFX + 'tileset.png', tilesize, tilesize);

    game.time.advancedTiming = true;
}


var sprites = [];
var objects = [];


function create(){

    //generalizations
    var graphics = game.add.graphics(0, 0);
    window.graphics = graphics;

    //titlepic.inputEnabled = true;
    //titlepic.input.useHandCursor = true;
    //titlepic.events.onInputDown.add(destroySprite, this);

    game.physics.startSystem(Phaser.Physics.ARCADE);
    drawable = game.add.group();

    //keyboard control
    addKeys();

    //the map
    map = new ConfiguredMap(mapsizeX, mapsizeY, tilesize);

    //the objects
    for(d=0;d<5;d++){
     
        sprites.push(game.add.sprite(d*48, d*32, 'katamori'));
        drawable.add(sprites[d])

        var temp = new KatamoriBall(d, sprites);
        objects.push(temp);
        delete temp;
    }

    //other shit
    cursors = game.input.keyboard.createCursorKeys();


}

function update(){


    game.physics.arcade.collide(sprites, map.layer);

    sortedCollide(game, sprites)

    mouse.X = game.input.mousePointer.x;
    mouse.Y = game.input.mousePointer.y;
    mouse.tileX = Math.floor(game.input.mousePointer.x/tilesize);
    mouse.tileY = Math.floor(game.input.mousePointer.y/tilesize);


    if(game.input.keyboard.isDown(Phaser.Keyboard["W"])){ game.camera.y-=tilesize/4 };
    if(game.input.keyboard.isDown(Phaser.Keyboard["S"])){ game.camera.y+=tilesize/4 };

    if(game.input.keyboard.isDown(Phaser.Keyboard["A"])){ game.camera.x-=tilesize/4 };
    if(game.input.keyboard.isDown(Phaser.Keyboard["D"])){ game.camera.x+=tilesize/4 }; 






}

function render(){

    game.debug.text("FPS: "+game.time.fps, gameX - 80, 64);
    game.debug.text("mouse: "+mouse.X+","+mouse.Y+"|"+mouse.tileX+","+mouse.tileY, gameX - 216, 96);
    game.debug.text("camera: "+game.camera.x+","+game.camera.y, gameX - 160, 128);

    //for(d=0;d<20;d++){ game.debug.body(sprites.colonists[d]) };

}
