var gameX = 1024;
var gameY = 720;

var tilesize = 32;

var mapsizeX = 96;
var mapsizeY = 96;

var mouse = {
    'X': -1,
    'Y': -1,
    'tileX': -1,
    'tileY': -1,
    'onTile': -1

}

var utilities = {
    "progress": 0,
};

var folder = '../files/games/prototype-gamma/';
var GFX = folder + 'gfx/';

var texts = [];
var objects = [];
var progress = [];
var map =  [];

var bootGame = {
 
    preload: () => { 

        game.renderer.renderSession.roundPixels = true

        game.load.image('katamori', GFX + 'katamori.png');

        game.load.spritesheet('tileset', GFX + 'tileset.png', tilesize, tilesize);

        game.time.advancedTiming = true;

        progress = game.add.text(gameX/2, gameY/2, "Map: 0% loaded.", 
                {font: "32px Arial", fill: "white", align: "center"})

        
    },

    update: () => { game.state.start('load') }

   
}

var loadMap = {

    create: () => {   
        console.log(utilities)
        //generalizations
        var graphics = game.add.graphics(0, 0);
        window.graphics = graphics;

        

        //titlepic.inputEnabled = true;
        //titlepic.input.useHandCursor = true;
        //titlepic.events.onInputDown.add(destroySprite, this);

        game.physics.startSystem(Phaser.Physics.ARCADE);
        drawable = game.add.group();

            map = new ConfiguredMap(mapsizeX, mapsizeY, tilesize, utilities);
            map.initialize()            

    },

    update: () => { 



        progress.setText(utilities['progress'])    
        //game.state.start('main')    
    }


}

var mainGame = {

    preload: () => {},


    create: () => {

        //the objects
        for(d=0;d<5;d++){
            objects.push(new KatamoriBall(128+(d*48), d*32, 'katamori', game))
        }

        //keyboard control
        addKeys();

        //other shit
        cursors = game.input.keyboard.createCursorKeys();

    },

    update: () => {

        game.physics.arcade.collide(objects.map((e)=>e.sprite), map.layer);

        sortedCollide(game, objects.map((e)=>e.sprite))

        mouse.X = game.input.mousePointer.x;
        mouse.Y = game.input.mousePointer.y;
        mouse.tileX = Math.floor(game.input.mousePointer.x/tilesize);
        mouse.tileY = Math.floor(game.input.mousePointer.y/tilesize);


        if(game.input.keyboard.isDown(Phaser.Keyboard["W"])){ game.camera.y-=tilesize/4 };
        if(game.input.keyboard.isDown(Phaser.Keyboard["S"])){ game.camera.y+=tilesize/4 };

        if(game.input.keyboard.isDown(Phaser.Keyboard["A"])){ game.camera.x-=tilesize/4 };
        if(game.input.keyboard.isDown(Phaser.Keyboard["D"])){ game.camera.x+=tilesize/4 }; 






    },

    render: () => {

        game.debug.text("FPS: "+game.time.fps, gameX - 80, 64);

        game.debug.text("mouse: "+mouse.X+","+mouse.Y+"|"+
                                Math.floor(+mouse.tileX)+","+
                                Math.floor(mouse.tileY), gameX - 216, 96);


        game.debug.text("camera: "+game.camera.x+","+game.camera.y, gameX - 160, 128);

        //for(d=0;d<20;d++){ game.debug.body(sprites.colonists[d]) };

    }
}

//the matter itself
var game = new Phaser.Game(gameX, gameY, Phaser.CANVAS, '');

game.state.add('boot', bootGame);
game.state.add('load', loadMap);
game.state.add('main', mainGame);

game.state.start('boot');
