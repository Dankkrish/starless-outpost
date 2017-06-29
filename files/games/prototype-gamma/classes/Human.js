/*
    class Human

    inherits from PhysicalThing

    base objects for human characters, defining human-specific characteristics
*/

Human.prototype = new PhysicalThing();

Human.prototype.size = [ 64, 24 ];
Human.prototype.sizeOffset = [ 0, 40 ];

/*
    CONSTRUCTOR

    ...meaning input-dependent and/or object-unique properties 
    and other actions if necessary
*/
function Human(){

}

/*
    common variables
*/
Human.prototype.stats.maxSpeed = 128;

//stats
Human.prototype.humanStats = { 
    name: "new", 
    gender: "male", 
    age: 0
};

//current order
Human.prototype.order = { 
    task: "idle", 
    params: null, 
    inProgress: true 
};

/*
    METHODS
*/
//unique: none

//implemented (inherited, with new functionality)
Human.prototype.onUpdate = function(){
    this.implementOrder();

    this.debugReport(["alive", "well"])
} 

//getters
//none

//setters
Human.prototype.setName = function(str){

    this.humanStats.name = str;
}

Human.prototype.setOrder = function(task, params){

    this.order = {};

    this.order.task = task;
    this.order.params = params;   
    this.order.inProgress = false;
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
                    Math.abs(this.order.params.destination[0] - this.sprite.body.x) < 1*tilesize &&
                    Math.abs(this.order.params.destination[1] - this.sprite.body.y) < 1*tilesize)
                {
                    //this.sprite.body.velocity.setTo(0, 0);
                    this.order.inProgress = false;   
                    this.setOrder("idle"); 
                    console.log("simple_move: destination reached; now idle")              
                }else{
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

                let deltaY = this.order.params.destination[1] - this.sprite.body.y
                let deltaX = this.order.params.destination[0] - this.sprite.body.x      

                let signX = deltaX <= 0 ? -1 : 1;
                let signY = deltaY <= 0 ? -1 : 1;

                let tan = Math.abs(deltaY) / Math.abs(deltaX);

                let angle = Math.atan(tan)

                //set motion
                this.sprite.body.velocity.setTo(
                    Math.cos(angle) * this.order.params.speed * signX, 
                    Math.sin(angle) * this.order.params.speed * signY
                );

                break;
        }

        this.order.inProgress = true;
       
    }

}















