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
            this.objectAmounts.Resident = 50;
            break;

        case "crowdTest":

            this.objectAmounts.Resident = 500;
            break;

        case "giantMap":

            this.objectAmounts.KatamoriBall = 1000;        
            this.objectAmounts.Resident = 1000;
            break; 

        case "strandedPeople":
      
            this.objectAmounts.Resident = 7;
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

        case "giantMap":

            mapsizeX = 10000;
            mapsizeY = 10000;

            break;

        case "strandedPeople":

            mapsizeX = 96;
            mapsizeY = 96;

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


    switch(this.type){

        case "followTest":

            for(d=0;d<this.objectAmounts.KatamoriBall;d++){

                pack.x = myRandom(tilesize*2, tilesize*(mapsizeX-4))
                pack.y = myRandom(tilesize*2, tilesize*(mapsizeY-4))
                
                objects.push( new KatamoriBall(pack) )
            }

            for(d=0;d<this.objectAmounts.Resident;d++){

                pack.x = myRandom(tilesize*2, tilesize*(mapsizeX-4))
                pack.y = myRandom(tilesize*2, tilesize*(mapsizeY-4))

                objects.push(new Resident(pack))
            }  

            map.fillArea(1, Math.floor(mapsizeX/3), Math.floor(mapsizeY/3), Math.floor(mapsizeX/2), 4)

            objects[0].selectMe("init"); 

            objects.forEach(s=>{
                if (typeof s.order != "undefined"){

                    //setting up a simple "move" order
                    s.setOrder("idle", { })  

                }
            })

            break;

        case "crowdTest":

            for(d=0;d<this.objectAmounts.KatamoriBall;d++){

                pack.x = myRandom(tilesize*2, tilesize*(mapsizeX-4))
                pack.y = myRandom(tilesize*2, tilesize*(mapsizeY-4))
                
                objects.push( new KatamoriBall(pack) )
            }

            for(d=0;d<this.objectAmounts.Resident;d++){

                pack.x = myRandom(tilesize*2, tilesize*(mapsizeX-4))
                pack.y = myRandom(tilesize*2, tilesize*(mapsizeY-4))

                objects.push(new Resident(pack))
            } 

            objects.forEach(s=>{
                if (typeof s.order != "undefined"){

                    //setting up a simple "move" order
                    s.setOrder("simple_move", { destination: [
                        myRandom(tilesize*2, tilesize*(mapsizeX-4)),
                        myRandom(tilesize*2, tilesize*(mapsizeY-4))
                    ], speed: s.stats.maxSpeed})  

                }
            })

            break;
            
        case "giantMap":

            for(d=0;d<this.objectAmounts.KatamoriBall;d++){

                pack.x = myRandom(tilesize*2, tilesize*(mapsizeX-4))
                pack.y = myRandom(tilesize*2, tilesize*(mapsizeY-4))
                
                objects.push( new KatamoriBall(pack) )
            }

            for(d=0;d<this.objectAmounts.Resident;d++){

                pack.x = myRandom(tilesize*2, tilesize*(mapsizeX-4))
                pack.y = myRandom(tilesize*2, tilesize*(mapsizeY-4))

                objects.push(new Resident(pack))
            } 

            objects.forEach(s=>{
                if (typeof s.order != "undefined"){

                    //setting up a simple "move" order
                    s.setOrder("simple_move", { destination: [
                        myRandom(tilesize*1, tilesize*(mapsizeX-2)),
                        myRandom(tilesize*2, tilesize*(mapsizeY-2))
                    ], speed: s.stats.maxSpeed})  

                }
            })

            break;

        case "strandedPeople":

            keyAction.resetCamera();

            map.fillArea(4, 
            Math.ceil(game.camera.x/tilesize) + 2,
            Math.ceil(game.camera.y/tilesize) + 4,
            Math.ceil(gameX/tilesize) - 4,
            Math.ceil(gameY/tilesize) - 6)

            for(d=0;d<this.objectAmounts.Resident;d++){

                pack.x = tilesize*(2*(d+2+Math.floor(mapsizeX/5)))
                pack.y = Math.floor(mapsizeY/2*tilesize)

                objects.push(new Resident(pack))
            } 

            

            break;              


    }

    

   



}