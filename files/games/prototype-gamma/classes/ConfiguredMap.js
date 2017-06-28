function ConfiguredMap(x, y, tilesize, utils){

    /*
        CONSTRUCTOR

        ...meaning input-dependent and/or 
        object-unique properties and 
        other actions if necessary
    */

    this.tilemap = game.add.tilemap();
    this.layer = this.tilemap.create(utils['game'], x, y, tilesize, tilesize);

    this.mapW = this.tilemap.width;
    this.mapH = this.tilemap.height;

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

    for(i=0; i<this.mapW-1; i++){     
        this.tilemap.putTile(1, i, 0) 
    }

    for(i=0; i<this.mapH-1; i++){     
        this.tilemap.putTile(1, this.mapW-1, i) 
    } 

    for(i=this.mapW-1; i>0; i--){     
        this.tilemap.putTile(1, i, this.mapH-1) 
    }

    for(i=this.mapH-1; i>0; i--){     
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


