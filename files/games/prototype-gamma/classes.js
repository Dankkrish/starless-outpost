//meta-objects
function ConfiguredMap(x, y, tilesize, utils){

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

        const mapW = self.tilemap.width;
        const mapH = self.tilemap.height;

        for(i=0;i<mapW;i++){
            for(j=0;j<mapH;j++){

                const full = mapW*mapH;
                var percent = Math.ceil((((i*mapW)+j)/full)*100);

                utils['progress'] = percent;

                console.log("inside: "+utils['progress'])
                progress.setText(utils['progress']) 

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

    this.initialize = function(){

        this.tilemap.addTilesetImage('tileset');
        this.tilemap.setCollision([1,3]);

        drawable.add(this.layer);
        this.layer.resizeWorld();

        //performance improvement theoretically
        this.layer.renderSettings.enableScrollDelta = false;

    }

    /*
        THE CONSTRUCTOR
    */

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