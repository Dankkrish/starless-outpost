/* 

    In the beginning, God created the heavens and the earth. 

    The earth was without form and void, and darkness was over the face of the deep. 
    And the Spirit of God was hovering over the face of the waters.

*/

var gameX = 1024;
var gameY = 600;

var game = new Phaser.Game(gameX, gameY, Phaser.CANVAS, '');

var tilesize = 32;

var mapsizeX = 32;
var mapsizeY = 24;

//The smallest unit of "flawless loading."
//2^15 is the best I could achieve for seamlessness

const loadingThreshold = Math.pow(2, 15);  

const folder = './files/';
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
    "game": game,
};

var sets = {
    "texts": [],
    "images": [],
    "sheets": [],
}

var objects; //also a set, but very frequently accessed

var map;
var progress = [];

var drawable;

var scenario;





var GUI = [
    { "x": 0, "y": 0, "w": 800, "h": 128 }
]

var HUDtop = [];

var offset = tilesize/2

function moveCam(axis, val){

    
    game.camera[axis] += val;

}

function setGUI(axis, extra){
    GUI[0][axis] = game.camera[axis] + extra;
}

/*

    And God said, “Let the waters under the heavens be gathered together 
    into one place, and let the dry land appear.” And it was so. 
    
    God called the dry land Earth, and the waters that were gathered 
    together he called Seas. And God saw that it was good.   

*/

var scenarioCase = (type) => {

    map = [];  
    objects = [];

    utilities = {
        "progress": 0,
        "pr_x": 0,
        "pr_y": 0,
        "game": game,
    };

    scenario = new Scenario(type); 
    
    game.state.start('load')
}

var scenarioInit = {
    "followTest":   { preload: () => { scenarioCase("followTest") }},
    "crowdTest":    { preload: () => { scenarioCase("crowdTest") }},    
}

var loadMap = {

    preload: () => { 

        drawable = game.add.group();   

        /*
            loading images and spritesheets
        */
        game.load.image('katamori', GFX + 'katamori.png');

        game.load.image('resident_male', GFX + 'resident_m.png');
        game.load.image('resident_female', GFX + 'resident_f.png');
        game.load.image('resident_transgender', GFX + 'resident_t.png');        

        game.load.image('HUDtop', GFX + 'HUDtop.png');

        game.load.spritesheet('tileset', GFX + 'tileset.png', tilesize, tilesize);

        /*
            set some useful props
        */
        game.renderer.renderSession.roundPixels = true
        game.time.advancedTiming = true;

        game.camera.bounds = null

    },

    create: () => {   

        HUDtop = game.add.sprite(0,0,'HUDtop')

        scenario.setMap()

        progress = game.add.text(gameX/2, gameY/2, "Map: 0% loaded.", 
                {font: "32px Arial", fill: "white", align: "center"})         
    },

    update: () => { 

        if(utilities["pr_x"] < mapsizeX){

           for(b=0;b<loadingThreshold;b++){
                map.addTile(utilities);
           }

        }else{
            game.state.start('main', false) 
        } 

    },

    render: () => { }

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

        //gfx
        var graphics = game.add.graphics(100, 100);

        window.graphics = graphics;

    },


    create: () => {

        scenario.load()         

    },

    update: () => {

        /*
            calculate physics
        */
        game.physics.arcade.collide(objects.map((e)=>e.sprite), map.layer);

        sortedCollide(game, objects.map((e)=>e.sprite))



        /*
            update objects
        */
        objects.forEach(s=>{
            //s.sprite.renderable = s.sprite.inCamera
            s.onUpdate();
        });



        /*
            REASSING FREQUENTLY CHANGING VARS
        */
        mouse.X = game.input.mousePointer.x;
        mouse.Y = game.input.mousePointer.y;
        mouse.tileX = Math.floor(game.input.mousePointer.x/tilesize);
        mouse.tileY = Math.floor(game.input.mousePointer.y/tilesize);

        /*
            keyboard listening
        */




        if(game.input.keyboard.isDown(Phaser.Keyboard["W"])){ moveCam("y", -offset) };
        if(game.input.keyboard.isDown(Phaser.Keyboard["S"])){ moveCam("y", +offset) };

        if(game.input.keyboard.isDown(Phaser.Keyboard["A"])){ moveCam("x", -offset) };
        if(game.input.keyboard.isDown(Phaser.Keyboard["D"])){ moveCam("x", +offset) };
    

        if(game.input.keyboard.isDown(Phaser.Keyboard["X"])){ 
            game.camera.focusOnXY(tilesize*mapsizeX/2, tilesize*mapsizeY/2)};




        if(game.input.keyboard.isDown(Phaser.Keyboard["ESC"])){ 
            objects[3].deselectMe()};

        if(game.input.keyboard.isDown(Phaser.Keyboard["E"])){ 
            objects[3].selectMe("init")};            

        if(game.input.keyboard.isDown(Phaser.Keyboard["C"])){ 
            game.state.start("crowdTest")};

        if(game.input.keyboard.isDown(Phaser.Keyboard["F"])){ 
            game.state.start("followTest")};

        

            


        /*
            display gfx
        */

        setGUI("x")
        setGUI("y")

        HUDtop.x = GUI[0].x;
        HUDtop.y = GUI[0].y;

    },

    render: () => {

        if(game.input.keyboard.isDown(Phaser.Keyboard["B"])){ 
            objects.forEach(s=>game.debug.body(s.sprite))};    

        drawable.sort('y', Phaser.Group.SORT_ASCENDING)

        if(
            game.camera.x < tilesize-gameX ||
            game.camera.y < tilesize-gameY ||     
            game.camera.x > (tilesize*mapsizeX) ||
            game.camera.y > (tilesize*mapsizeY)
        ){
            game.debug.text("Got lost? Press X to reset camera", gameX/2, 64); 
        }

        game.debug.text("FPS: "+game.time.fps, 80, 64);    

        game.debug.cameraInfo(game.camera, 0, 256)
/*

        game.debug.bodyInfo(objects[0].sprite, 32, 32)

        

        game.debug.text(utilities['loadtime'], 0, 64);
        
        game.debug.text(objects.map(s=>s.sprite.preUpdate()), 0, 128); 

        game.debug.text("mouse: "+mouse.X+","+mouse.Y+"|"+
                                Math.floor(+mouse.tileX)+","+
                                Math.floor(mouse.tileY), gameX - 216, 96);


        
*/
        //for(d=0;d<20;d++){ game.debug.body(sprites.colonists[d]) };

    }
}

//the matter itself
game.state.add('followTest', scenarioInit.followTest);
game.state.add('crowdTest', scenarioInit.crowdTest);

game.state.add('load', loadMap);
game.state.add('main', mainGame);

game.state.start('followTest');