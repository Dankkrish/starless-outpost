

function Scenario(type){

    this.type = type;

    this.objectAmounts = {
        "KatamoriBall": 0,
        "Resident": 0
    }

    this.load(this.type)

}

Scenario.prototype.load = function(t){


    switch(t){

        case "followTest":

            //initialize map
            map.initialize()

            //create objects
            var ball = new KatamoriBall({'x': 64, 'y': 64, 'gameObj': game });

            ball.selectMe("init");

            objects.push(ball)

            break;


    }



}