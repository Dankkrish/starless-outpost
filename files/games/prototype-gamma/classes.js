//meta-objects
function ConfiguredMap(x, y, tilesize, utils){

    /*
        CONSTRUCTOR

        ...meaning input-dependent properties 
        and other actions if necessary
    */
    
    //dependent properties
    this.tilemap = game.add.tilemap();
    this.layer = this.tilemap.create(utils['game'], x, y, tilesize, tilesize);

    //important performance update
    this.tilemap.setPreventRecalculate(true);

}

/*
    METHODS
*/

//getters
ConfiguredMap.prototype.getSize = function(){ return [self.tilemap.width, self.tilemap.height] }


//setters
//none yet

//others
ConfiguredMap.prototype.swapArea = function(from, to, startx, starty, width, height){

    this.tilemap.swap(from, to, startx, starty, width, height, this.layer)

}

ConfiguredMap.prototype.addTile = function(utils){
    const mapW = this.tilemap.width;
    const mapH = this.tilemap.height;
    const full = mapW*mapH;

    this.tilemap.putTile(0, utils['pr_x'], utils['pr_y'], this.layer)

    if(utils['pr_x']<mapW){
        if(utils['pr_y']<mapH){
            utils['pr_y']++

        }else{
            utils['pr_x']++;
            utils['pr_y'] = 0; 
        }            
    }

    utils['progress'] = Math.ceil((((utils['pr_x']*mapW)+utils['pr_y'])/full)*100)/2;

    progress.setText("Map: "+utils['progress']+"% loaded.") 

}


ConfiguredMap.prototype.createBorders = function(){

    const mapW = this.tilemap.width;
    const mapH = this.tilemap.height;


    for(i=0; i<mapW-1; i++){     
        this.tilemap.putTile(1, i, 0) 
    }

    for(i=0; i<mapH-1; i++){     
        this.tilemap.putTile(1, mapW-1, i) 
    } 

    for(i=mapW-1; i>0; i--){     
        this.tilemap.putTile(1, i, mapH-1) 
    }

    for(i=mapH-1; i>0; i--){     
        this.tilemap.putTile(1, 0, i) 
    }         

}

ConfiguredMap.prototype.setGraphics = function(){
    this.tilemap.addTilesetImage('tileset');

    this.layer.autoCull = true;
    drawable.add(this.layer);
    this.layer.resizeWorld();

    
}

ConfiguredMap.prototype.initialize = function(){

    this.tilemap.setCollision([1,3]);

    //performance improvement theoretically
    this.layer.renderSettings.enableScrollDelta = false;

}


























/*

    GAME OBJECTS

*/
function PhysicalThing(){

    /*
        CONSTRUCTOR

        ...meaning input-dependent properties 
        and other actions if necessary
    */


}

//independent properties
PhysicalThing.prototype.sprite = null;

PhysicalThing.prototype.sizeX = 32*2;
PhysicalThing.prototype.sizeY = 32*2;

/*

    METHODS

*/ 

//setters
PhysicalThing.prototype.setSprite = function(pack){
    return pack.game.add.sprite(pack.x,pack.y,pack.spritesheet);
}

//others
PhysicalThing.prototype.thrust = function(vector){ 
    this.sprite.body.velocity.setTo(
        Math.cos(game.rnd.angle()) * vector[0], 
        Math.sin(game.rnd.angle()) * vector[1])    
}

































KatamoriBall.prototype = new PhysicalThing();
KatamoriBall.prototype.constructor = KatamoriBall;
KatamoriBall.prototype.parent = PhysicalThing.prototype;

function KatamoriBall(spriteDefPack){

    /*
        CONSTRUCTOR

        ...meaning input-dependent properties 
        and other actions if necessary
    */

    this.sprite = this.setSprite(spriteDefPack);




    //set sprite physics
    game.physics.arcade.enable(this.sprite, Phaser.Physics.ARCADE);

    this.sprite.body.bounce = new Phaser.Point(1,1)
    this.sprite.body.collideWorldBounds = true;
    this.sprite.body.setSize(this.sizeX, this.sizeY, this.sizeX/4, this.sizeY/4);

    /*
    player.animations.add('run right', [1,2], 3, true, true);
    player.animations.add('run left', [4, 5], 3, true, true);
    */

    //this.thrust();
}

/*
    independent variables
*/

//class-specific physical properties
//none

/*
    METHODS
*/
//none 















