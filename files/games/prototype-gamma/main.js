/* 

    In the beginning, God created the heavens and the earth. 

    The earth was without form and void, and darkness was over the face of the deep. 
    And the Spirit of God was hovering over the face of the waters.

*/

var gameX = 800;
var gameY = 600;

var game = new Phaser.Game(gameX, gameY, Phaser.CANVAS, '');

const tilesize = 32;

const mapsizeX = 16;
const mapsizeY = 16;

//The smallest unit of "flawless loading."
//2^15 is the best I could achieve for seamlessness

const loadingThreshold = Math.pow(2, 15);  

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
    "game": "",
};

var sets = {
    "texts": [],
    "images": [],
    "sheets": [],
}

var objects = []; //also a set, but very frequently accessed

var map =  [];
var progress = [];

/*

    And God said, “Let the waters under the heavens be gathered together 
    into one place, and let the dry land appear.” And it was so. 
    
    God called the dry land Earth, and the waters that were gathered 
    together he called Seas. And God saw that it was good.   

*/

var loadMap = {

    preload: () => { 

        game.stage.disableVisibilityChange = true;

        utilities['game'] = game;

        game.load.image('katamori', GFX + 'katamori.png');
        game.load.image('resident', GFX + 'resident.png');

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

    }

}



/*

    And God said, “Let the earth bring forth living creatures according to their kinds—livestock 
    and creeping things and beasts of the earth according to their kinds.” And it was so. 
    
    And God made the beasts of the earth according to their kinds and the livestock according to 
    their kinds, and everything that creeps on the ground according to its kind. 
    
    And God saw that it was good.
    
*/



var mainGame = {

    preload: () => {

        progress.destroy();

        game.stage.disableVisibilityChange = true;

        game.physics.startSystem(Phaser.Physics.ARCADE);

        //control
        addKeys();

        cursors = game.input.keyboard.createCursorKeys();

    },


    create: () => {

        /*

            ...the map

        */

        map.initialize();

        /*

            ...the objects

        */
        
        for(d=0;d<3;d++){

            objects.push(
                new Resident({
                    'x': Math.floor(Math.random()*tilesize*(mapsizeX-8)) + tilesize*4, 
                    'y': Math.floor(Math.random()*tilesize*(mapsizeY-8)) + tilesize*4,
                    'gameObj': game 
                }))

            objects[d].setOrder("simple_move", { destination: [
                Math.floor(Math.random()*tilesize*(mapsizeX-8)) + tilesize*4, 
                Math.floor(Math.random()*tilesize*(mapsizeX-8)) + tilesize*4
            ], speed: objects[d].stats.maxSpeed}) 

            objects[d].setName(Math.random()) 

        } 

        //let k = new KatamoriBall({'x': 64, 'y': 64, 'gameObj': game })
        //k.thrust(Math.random()*90, 100)

        //objects.push(k) 

        //objects[0].setName("Jebediah")
        //objects[1].setName("Katamori")             

    },

    update: () => {

        game.physics.arcade.collide(objects.map((e)=>e.sprite), map.layer);

        //sortedCollide(game, objects.map((e)=>e.sprite))

        objects.forEach(s=>{
            //s.sprite.renderable = s.sprite.inCamera
            s.onUpdate();
        });
               


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

/*

        game.debug.bodyInfo(objects[0].sprite, 32, 32)

        game.debug.cameraInfo(game.camera, 0, 32)

        game.debug.text(utilities['loadtime'], 0, 64);
        
        game.debug.text(objects.map(s=>s.sprite.preUpdate()), 0, 128); 

        game.debug.text("mouse: "+mouse.X+","+mouse.Y+"|"+
                                Math.floor(+mouse.tileX)+","+
                                Math.floor(mouse.tileY), gameX - 216, 96);


        game.debug.text("camera: "+game.camera.x+","+game.camera.y, gameX - 160, 128);
*/
        //for(d=0;d<20;d++){ game.debug.body(sprites.colonists[d]) };

    }
}

//the matter itself
game.state.add('load', loadMap);
game.state.add('main', mainGame);

game.state.start('load');
