function Scenario(type){

    this.type = type;

    this.objectAmounts = {
        "KatamoriBall": 0,
        "Resident": 0
    }

    this.setAmounts()

}

// to be called on creation
Scenario.prototype.setAmounts = function (){

    switch(this.type){

        case "followTest":

            this.objectAmounts.KatamoriBall = 2;
            this.objectAmounts.Resident = 10;

            break;


    }

}

// in loadMap ~ create
Scenario.prototype.setMap = function(){

    switch(this.type){

        case "followTest":

            mapsizeX = 48;
            mapsizeY = 48;

            break;


    }

    map = new ConfiguredMap(mapsizeX, mapsizeY, tilesize, utilities);
    map.setGraphics();

}

// in mainGame ~ create
Scenario.prototype.load = function(){

    //initialize map
    map.initialize()

    //set objects and their amounts
    let pack = { 'x': 0, 'y': 0, 'gameObj': game };

    
    switch(this.type){

        case "followTest":




            for(d=0;d<this.objectAmounts.KatamoriBall;d++){

                pack.x = myRandom(tilesize*4, tilesize*(mapsizeX-8))
                pack.y = myRandom(tilesize*4, tilesize*(mapsizeY-8))
                
                objects.push( new KatamoriBall(pack) )
            }

            for(d=0;d<this.objectAmounts.Resident;d++){

                pack.x = myRandom(tilesize*4, tilesize*(mapsizeX-8))
                pack.y = myRandom(tilesize*4, tilesize*(mapsizeY-8))

                let obj = new Resident(pack)

                

                //setting up a simple "move" order
                obj.setOrder("simple_move", { destination: [
                    myRandom(tilesize*4, tilesize*(mapsizeX-8)),
                    myRandom(tilesize*4, tilesize*(mapsizeY-8))
                ], speed: obj.stats.maxSpeed})  

                objects.push(obj)
            }    

            objects[0].selectMe("init"); 



            break;

    }

    

   



}