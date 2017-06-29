//meta-objects
function ConfiguredMap(x, y, tilesize){

    var self = this;

    /*
        PROPERTIES
    */
    this.tilemap = game.add.tilemap();
    this.layer = this.tilemap.create('level', x, y, tilesize, tilesize);

    /*
        METHODS
    */

    //getters
    this.getSize = function(){ return [self.tilemap.width, self.tilemap.height] }


    //setters


    //others
    this.createBorders = function(){

        for(i=0;i<self.tilemap.width;i++){
            for(j=0;j<self.tilemap.height;j++){

                self.tilemap.putTile(0, i, j, self.layer)

                if(i==0 || j==0 || i==self.tilemap.width-1 || j==self.tilemap.height-1){
                    if(i%10 == 1){ 
                        self.tilemap.putTile(3, i, j, self.layer) 
                    }else{ 
                        self.tilemap.putTile(1, i, j, self.layer) }
            }
            };
        };

    }

    /*
        THE CONSTRUCTOR
    */
    this.tilemap.addTilesetImage('tileset');
    this.tilemap.setCollision([1,3]);

    drawable.add(this.layer);
    this.layer.resizeWorld();

    //performance improvement theoretically
    this.layer.renderSettings.enableScrollDelta = false;

    //add borders
    this.createBorders();


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


function KatamoriBall(spriteID, spArr){

    var self = this;

    //properties
    this.spriteID = spriteID;

    this.x = spArr[spriteID].x;
    this.y = spArr[spriteID].y;

    this.sizeX = 32*2;
    this.sizeY = 32*2;
    this.motion = [(Math.random()-0.5)*1000, (Math.random()-0.5)*1000]; 




    //methods
    this.setter_dummyMove = function(){ 
        spArr[self.spriteID].body.velocity.setTo(
            Math.cos(game.rnd.angle()) * this.motion[0], 
            Math.sin(game.rnd.angle()) * this.motion[1])    
    }


    //the constructor

    /*
    player.animations.add('run right', [1,2], 3, true, true);
    player.animations.add('run left', [4, 5], 3, true, true);
    */
    
    spArr[self.spriteID].bindedObjType = "KatamoriBall";

    //physical properties
    game.physics.arcade.enable(spArr[self.spriteID], Phaser.Physics.ARCADE);

    spArr[self.spriteID].body.bounce = new Phaser.Point(1,1)
    spArr[self.spriteID].body.collideWorldBounds = true;
    spArr[self.spriteID].body.setSize(this.sizeX, this.sizeY, this.sizeX/4, this.sizeY/4);

    self.setter_dummyMove();
}