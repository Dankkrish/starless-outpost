/*
    CONSTRUCTOR
*/
function ConfiguredMap(x, y, tilesize){

    x > mapMax ? x = mapMax : x = x;
    y > mapMax ? y = mapMax : y = y;    


    this.tilemap = game.add.tilemap();
    this.layer = this.tilemap.create(game, x, y, tilesize, tilesize);

    this.mapW = this.tilemap.width;
    this.mapH = this.tilemap.height;

    mapsizeX = this.mapW;
    mapsizeY = this.mapH;

    this.collisionTiles = [1, 3, 5]

    //important performance update
    this.tilemap.setPreventRecalculate(true);

}

/*
    METHODS
*/

//getters
ConfiguredMap.prototype.getSize = function(){ 
    return [self.tilemap.width, self.tilemap.height]
 }


//setters
//none yet

//others
ConfiguredMap.prototype.fillArea = function(to, startx, starty, width, height){

    this.tilemap.fill(to, startx, starty, width, height, this.layer)
    this.tilemap.setCollision(this.collisionTiles);

}

ConfiguredMap.prototype.addTile = function(utils){

    let full = this.mapW*this.mapH;

    let p = myRandom(0, 100)
    let t = 0

    if ( p >= 0 && p < 67){
        t = 0
    } else if ( p >=67 && p < 70 ){
        t = 1
    } else if ( p >=70 && p < 85 ){
        t = 2
    } else if ( p >=85 && p < 90 ){
        t = 3
    } else if ( p >=90 && p < 100 ){
        t = 4
    }       

    this.tilemap.putTile(t, utils['pr_x'], utils['pr_y'], this.layer)

    if(utils['pr_x']<this.mapW){
        if(utils['pr_y'] == this.mapH){
            utils['pr_x']++;
            utils['pr_y'] = 0;
        }else{
            utils['pr_y']++ 
        }            
    }

    utils['progress'] = Math.ceil((((utils['pr_x']*this.mapH)+utils['pr_y'])/full)*100);

    progress.setText("Map: "+utils['progress']+"% loaded. \n ("+((utils['pr_x']*this.mapH)+utils['pr_y'])+"/"+full+")") 

}


ConfiguredMap.prototype.createBorders = function(){


    this.tilemap.fill(1, 0,             0,              this.mapW-1, 1, this.layer)
    this.tilemap.fill(1, 0,             0,              1, this.mapH-1, this.layer)
    this.tilemap.fill(1, this.mapW-1,   0,              1, this.mapH-1, this.layer)
    this.tilemap.fill(1, 0,             this.mapH-1,    this.mapW-0, 1, this.layer)

    this.tilemap.setCollision(this.collisionTiles);

}

ConfiguredMap.prototype.setGraphics = function(){
    this.tilemap.addTilesetImage('tileset');

    this.layer.autoCull = true;
    drawable.add(this.layer);
    this.layer.resizeWorld();

    
}

ConfiguredMap.prototype.initialize = function(){

    this.setGraphics();

    this.tilemap.setCollision(this.collisionTiles);

    //performance improvement theoretically
    this.layer.renderSettings.enableScrollDelta = false;

    this.createBorders();

}


