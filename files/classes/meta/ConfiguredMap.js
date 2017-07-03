function ConfiguredMap(x, y, tilesize){

    /*
        CONSTRUCTOR

        ...meaning input-dependent and/or 
        object-unique properties and 
        other actions if necessary
    */

    this.tilemap = game.add.tilemap();
    this.layer = this.tilemap.create(game, x, y, tilesize, tilesize);

    this.mapW = this.tilemap.width;
    this.mapH = this.tilemap.height;

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
    this.tilemap.setCollision([1,3]);

}

ConfiguredMap.prototype.addTile = function(utils){

    let full = this.mapW*this.mapH;

    this.tilemap.putTile(0, utils['pr_x'], utils['pr_y'], this.layer)

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

    this.tilemap.setCollision([1,3]);

}

ConfiguredMap.prototype.setGraphics = function(){
    this.tilemap.addTilesetImage('tileset');

    this.layer.autoCull = true;
    drawable.add(this.layer);
    this.layer.resizeWorld();

    
}

ConfiguredMap.prototype.initialize = function(){

    this.setGraphics();

    this.tilemap.setCollision([1,3]);

    //performance improvement theoretically
    this.layer.renderSettings.enableScrollDelta = false;

    this.createBorders();

}


