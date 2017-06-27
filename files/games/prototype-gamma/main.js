const gameX = 800;
const gameY = 600;

const tilesize = 32;

const mapsizeX = 512;
const mapsizeY = mapsizeX;

/*
    The smallest unit of "flawless loading."
    In other words: if Phaser is forced to add
    more tiles to a tilemap in a single frame than
    this value, then it'll cause a visible lag.

    Planned feature for later times is to adjust
    this value to the capabilities of the device
    running it. maybe it's possible. Maybe not :'(
*/
const loadingThreshold = mapsizeX*128;

const folder = '../files/games/prototype-gamma/';
const GFX = folder + 'gfx/';

var mouse = {
    'X': -1,
    'Y': -1,
    'tileX': -1,
    'tileY': -1,
    'onTile': -1

}

var utilities = {
    "progress": 0,
    "pr_x": 0,
    "pr_y": 0,
    "game": [],
    "loadtime": 0
};

var texts = [];
var objects = [];
var map =  [];
var images = [];
var sheets = [];


var progress = [];


var loadMap = {

    preload: () => { 

        game.stage.disableVisibilityChange = true;

        utilities['game'] = game;

        game.load.image('katamori', GFX + 'katamori.png');
        game.load.spritesheet('tileset', GFX + 'tileset.png', tilesize, tilesize);

        game.renderer.renderSession.roundPixels = true

        game.time.advancedTiming = true;

        var graphics = game.add.graphics(0, 0);

        window.graphics = graphics;

        drawable = game.add.group();

    },

    create: () => {   

        map = new ConfiguredMap(mapsizeX, mapsizeY, tilesize, utilities);
        map.setGraphics()

        //titlepic.inputEnabled = true;
        //titlepic.input.useHandCursor = true;
        //titlepic.events.onInputDown.add(destroySprite, this);

        progress = game.add.text(gameX/2, gameY/2, "Map: 0% loaded.", 
                {font: "32px Arial", fill: "white", align: "center"})         
    },

    update: () => { 



        //graphics.beginFill(444444);
        //graphics.drawRect(cover.x, cover.y, gameX, gameY); 
        //graphics.endFill();    

        console.log(utilities["pr_x"]+' '+utilities["pr_y"])

        if(utilities["pr_x"] < mapsizeX){

           for(b=0;b<loadingThreshold;b++){
                map.addTile(utilities);
           }
           
            

        }else{
            game.state.start('main', false) 
        } 

    },

    render: () => {

        utilities['loadtime'] = game.time.now //Math.ceil(1/(game.time.fps+1));

        game.debug.text(utilities['loadtime'], 0, 64);
    
    }

}












var mainGame = {

    preload: () => {

        game.stage.disableVisibilityChange = true;


        
    },


    create: () => {

        progress.destroy();

        map.setGraphics()
        map.initialize()
        map.createBorders()

        //the objects
        for(d=0;d<10;d++){
            objects.push(new KatamoriBall(128+(d*48), d*32, 'katamori', game))
        }

        //keyboard control
        addKeys();

        //other shit
        cursors = game.input.keyboard.createCursorKeys();

        game.physics.startSystem(Phaser.Physics.ARCADE);

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
/*

        objects.forEach(s=>{
           s.sprite.renderable = s.sprite.inCamera
        });*/

    



    },

    render: () => {
/*
        game.debug.text(utilities['loadtime'], 0, 64);
        
        game.debug.text(objects.map(s=>s.sprite.preUpdate()), 0, 128); 

        game.debug.text("FPS: "+game.time.fps, gameX - 80, 64);

        game.debug.text("mouse: "+mouse.X+","+mouse.Y+"|"+
                                Math.floor(+mouse.tileX)+","+
                                Math.floor(mouse.tileY), gameX - 216, 96);


        game.debug.text("camera: "+game.camera.x+","+game.camera.y, gameX - 160, 128);
*/
        //for(d=0;d<20;d++){ game.debug.body(sprites.colonists[d]) };

    }
}

//the matter itself
var game = new Phaser.Game(gameX, gameY, Phaser.CANVAS, '');

game.state.add('load', loadMap);
game.state.add('main', mainGame);

game.state.start('load');
