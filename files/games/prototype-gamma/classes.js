//meta-objects
function ConfiguredMap(x, y, tilesize, utils){

    /*
        PROPERTIES
    */
    this.tilemap = game.add.tilemap();
    this.layer = this.tilemap.create(utils['game'], x, y, tilesize, tilesize);

    /*
        THE CONSTRUCTOR
    */
    
    //important performance update
    this.tilemap.setPreventRecalculate(true);

}

/*
    METHODS
*/

//getters
ConfiguredMap.prototype.getSize = function(){ return [self.tilemap.width, self.tilemap.height] }


//setters
ConfiguredMap.prototype.swapArea = function(from, to, startx, starty, width, height){

    this.tilemap.swap(from, to, startx, starty, width, height, this.layer)

}

//others
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

    utils['progress'] = Math.ceil((((utils['pr_x']*mapW)+utils['pr_y'])/full)*100);

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
function PhysicalThing(x, y, id, arr){

    //dependent properties
    this.spriteID = id;

    this.x = x;
    this.y = y;

}

//independent properties
    PhysicalThing.prototype.sizeX = 32*2;
    PhysicalThing.prototype.sizeY = 32*2;
    PhysicalThing.prototype.motion = [(Math.random()-0.5)*1000, (Math.random()-0.5)*1000];

/*

    METHODS

    coming soon: object defines a sprite with methods

*/ 

PhysicalThing.prototype.setInitPost = function(){
    arr[id].x = this.x;
    arr[id].y = this.y;        
}






































function KatamoriBall(x, y, sh, g){

    var self = this;

    /*
        PROPERTIES
    */

    //dependent properties
    this.sprite = g.add.sprite(x,y,sh)

    /*
        THE CONSTRUCTOR
    */

    /*
    player.animations.add('run right', [1,2], 3, true, true);
    player.animations.add('run left', [4, 5], 3, true, true);
    */

    //set sprite physics
    game.physics.arcade.enable(self.sprite, Phaser.Physics.ARCADE);

    self.sprite.body.bounce = new Phaser.Point(1,1)
    self.sprite.body.collideWorldBounds = true;
    self.sprite.body.setSize(this.sizeX, this.sizeY, this.sizeX/4, this.sizeY/4);

    self.set_initMove();
}

/*
    independent variables
*/

//class-specificphysical properties
KatamoriBall.prototype.sizeX = 32*2;
KatamoriBall.prototype.sizeY = 32*2;
KatamoriBall.prototype.initMotion = [(Math.random()-0.5)*1000, (Math.random()-0.5)*1000]; 

/*
    METHODS
*/
KatamoriBall.prototype.set_initMove = function(){ 
    this.sprite.body.velocity.setTo(
        Math.cos(game.rnd.angle()) * this.initMotion[0], 
        Math.sin(game.rnd.angle()) * this.initMotion[1])    
}















