//meta-objects
function ConfiguredMap(x, y, tilesize, utils){

    const self = this;

    /*
        PROPERTIES
    */
    this.tilemap = game.add.tilemap();
    this.layer = this.tilemap.create(utils['game'], x, y, tilesize, tilesize);

    const mapW = self.tilemap.width;
    const mapH = self.tilemap.height;

    /*
        METHODS
    */

    //getters
    this.getSize = function(){ return [self.tilemap.width, self.tilemap.height] }


    //setters


    //others
    this.addTile = function(){
        const full = mapW*mapH;

        self.tilemap.putTile(0, utils['pr_x'], utils['pr_y'], self.layer)

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


    //will be replaced later
    this.createBorders = function(){

        //self.tilemap.putTile(3, 10, 10, self.layer)

        self.tilemap.swap(0, 1, 10, 10, 5, 5, self.layer)

        //self.tilemap.shuffle(0,0, 0, mapH-1, self.layer)
        //self.tilemap.shuffle(1,0, mapW-1, 0, self.layer)
        //self.tilemap.shuffle(mapW-1, 1, mapW-1, mapH-1, self.layer)
        //self.tilemap.shuffle(1,mapH-1, mapW-1, mapH-1, self.layer)        

    }

    this.setGraphics = function(){
        self.tilemap.addTilesetImage('tileset');

        self.layer.autoCull = true;
        drawable.add(self.layer);
        self.layer.resizeWorld();

        
    }

    this.initialize = function(){

        this.tilemap.setCollision([1,3]);

        //performance improvement theoretically
        this.layer.renderSettings.enableScrollDelta = false;

    }

    /*
        THE CONSTRUCTOR
    */
    
    //important performance update
    this.tilemap.setPreventRecalculate(true);




}



/*

    GAME OBJECTS

*/
function PhysicalThing(x, y, id, arr){

    var self = this;

    //properties
    this.spriteID = id;

    this.x = x;
    this.y = y;

    this.sizeX = 32*2;
    this.sizeY = 32*2;
    this.motion = [(Math.random()-0.5)*1000, (Math.random()-0.5)*1000];

    /*
    coming soon: object defines a sprite with methods
    */ 

    this.setInitPost = function(){
        arr[id].x = self.x;
        arr[id].y = self.y;        
    }

}

function KatamoriBall(x, y, sh, g){

    var self = this;

    /*
        PROPERTIES
    */

    this.sprite = g.add.sprite(x,y,sh)

    //class-specific physical properties
    this.sizeX = 32*2;
    this.sizeY = 32*2;
    this.initMotion = [(Math.random()-0.5)*1000, (Math.random()-0.5)*1000]; 

    /*
        METHODS
    */
    this.set_initMove = function(){ 
        self.sprite.body.velocity.setTo(
            Math.cos(game.rnd.angle()) * this.initMotion[0], 
            Math.sin(game.rnd.angle()) * this.initMotion[1])    
    }


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