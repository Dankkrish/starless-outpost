/*
    class Human

    inherits from Vulnerable

    base objects for human characters, defining human-specific characteristics
*/

Human.prototype = new Vulnerable();
Human.prototype.constructor = Human;



/*
    CONSTRUCTOR

*/
function Human(){

    //inherit variables
    Vulnerable.call(this)

    /*
        constants
    */
    this.size = [ 32, 24 ];
    this.sizeOffset = [ 8, 24 ];

    this.HP = 100;
    this.maxHP = 100;

    this.stats = {
        "maxSpeed": 128,
        "mass": 1
    }

    //stats
    this.humanStats = { 
        name: "new", 
        gender: "male", 
        age: 0,
        weight: "80"
    };

    //current order
    this.order = { 
        task: "idle", 
        params: null, 
        inProgress: true 
    };

    this.setStatsAuto()

}

/*
    METHODS
*/
//unique
//none

//implemented (inherited, with new functionality)
Human.prototype.onUpdate = function(){
    this.implementOrder();

    this.debugReport([this.humanStats.name, this.humanStats.gender, this.humanStats.age])

    this.updateSelection();

}

//getters"
//none

//setters
Human.prototype.setStatsAuto = function(){

    this.setGender("random")
    this.setName("random")
    this.setAge(myRandom(15, 90))
    this.setWeight(myRandom(50, 120))

}

Human.prototype.setAge = function(num){

    this.humanStats.age = num;

}

Human.prototype.setName = function(str){

    if ( str === "random" ){
        this.humanStats.name = "A random "+this.humanStats.gender 

        switch ( this.humanStats.gender ){

            case "male": 
                this.humanStats.name = names.first[0][myRandom(0, names.first[0].length-1)]
                break;

            case "female":
                this.humanStats.name = names.first[1][myRandom(0, names.first[1].length-1)]
                break;

            case "transgender":
                let p = myRandom(0, 1)
                this.humanStats.name = names.first[p][myRandom(0, names.first[p].length-1)]
                break;

        }

    } else {
        this.humanStats.name = str;
    }
}

Human.prototype.setWeight = function(num){

    this.humanStats.weight = num;
    this.stats.mass = num/80
}




Human.prototype.setOrder = function(task, params){

    this.order.task = task;
    this.order.params = params;   
    this.order.inProgress = false;
}

Human.prototype.setGender = function(g){

    let options = ["male", "female", "transgender"];

    if (options.indexOf(g) === -1){
        if (g === "random"){

            let gend = 0;
            let rand = Math.random()*100;

            if(rand <= 49){
                gend = 0;
            }else if(rand > 49 && rand <= 98){
                gend = 1;
            }else if(rand > 98 && rand <= 100){
                gend = 2;
            }

            this.humanStats.gender = options[gend];
        }
    }else{
        this.humanStats.gender = g;
    }

} 








//others
Human.prototype.implementOrder = function(){

    //if an order is in progress, but not done
    if(this.order.inProgress){

        switch(this.order.task){
            case "idle":
                this.sprite.body.velocity.setTo(0,0)
                this.sprite.body.stopMovement()
                break;

            case "simple_move":

                

                if(                
                    Math.abs(this.order.params.destination[0] - this.sprite.body.x) < tilesize &&
                    Math.abs(this.order.params.destination[1] - this.sprite.body.y) < tilesize)
                {
                    //this.sprite.body.velocity.setTo(0, 0);
                    this.order.inProgress = false;   
                    this.setOrder("idle"); 

                }else{

                    //set motion again in case of being pushed away
                    //this.setMotionTowards(this.order.params.destination, this.order.params.speed)

                    this.destination.setTo(
                        this.sprite.body.x + this.middle.x,
                        this.sprite.body.y + this.middle.y,
                        this.order.params.destination[0],
                        this.order.params.destination[1]) 
                    }

                break;
        }
    
    //if every other order is finished
    }else{

        switch(this.order.task){
            case "idle":
                this.sprite.body.velocity.setTo(0,0)
                this.sprite.body.stopMovement()
                break;

            case "simple_move":

                this.setMotionTowards(this.order.params.destination, this.order.params.speed)
                break;
        }

        this.order.inProgress = true;
       
    }

}

Human.prototype.setMotionTowards = function(coords, spd){

    let deltaY = coords[1] - this.sprite.body.y
    let deltaX = coords[0] - this.sprite.body.x      

    let signX = deltaX <= 0 ? -1 : 1;
    let signY = deltaY <= 0 ? -1 : 1;

    let tan = Math.abs(deltaY) / Math.abs(deltaX);

    let angle = Math.atan(tan)

    let vector = [
        Math.cos(angle) * spd * signX, 
        Math.sin(angle) * spd * signY
    ]

    //set motion, if it has a different value
    this.sprite.body.velocity.setTo(vector[0], vector[1]);

}














