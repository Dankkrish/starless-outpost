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

        case "crowdTest":

            this.objectAmounts.Resident = 500;
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

        case "crowdTest":

            mapsizeX = Math.ceil(gameX/tilesize)
            mapsizeY = Math.ceil(gameY/tilesize)
            break;

    }

    map = new ConfiguredMap(mapsizeX, mapsizeY, tilesize);
    map.setGraphics();

}

// in mainGame ~ create
Scenario.prototype.load = function(){

    //initialize map
    map.initialize()

    //load objects
    let pack = { 'x': 0, 'y': 0, 'gameObj': game };

    for(d=0;d<this.objectAmounts.KatamoriBall;d++){

        pack.x = myRandom(tilesize*3, tilesize*(mapsizeX-6))
        pack.y = myRandom(tilesize*3, tilesize*(mapsizeY-6))
        
        objects.push( new KatamoriBall(pack) )
    }

    for(d=0;d<this.objectAmounts.Resident;d++){

        pack.x = myRandom(tilesize*3, tilesize*(mapsizeX-6))
        pack.y = myRandom(tilesize*3, tilesize*(mapsizeY-6))

        objects.push(new Resident(pack))
    }  

    
    switch(this.type){

        case "followTest":

            objects[0].selectMe("init"); 

            objects.forEach(s=>{
                if (typeof s.order != "undefined"){

                    //setting up a simple "move" order
                    s.setOrder("simple_move", { destination: [
                        myRandom(tilesize*3, tilesize*(mapsizeX-6)),
                        myRandom(tilesize*3, tilesize*(mapsizeY-6))
                    ], speed: s.stats.maxSpeed})  

                }
            })

            break;

        case "crowdTest":


            objects.forEach(s=>{
                if (typeof s.order != "undefined"){

                    //setting up a simple "move" order
                    s.setOrder("simple_move", { destination: [
                        myRandom(tilesize*3, tilesize*(mapsizeX-6)),
                        myRandom(tilesize*3, tilesize*(mapsizeY-6))
                    ], speed: s.stats.maxSpeed})  

                }
            })

            break;
            

    }

    

   



}