/*
    class Resident

    inherits from PhysicalThing

    used as actual playable char, which you can give orders
*/

Resident.prototype = new PhysicalThing();
Resident.prototype.constructor = Resident;
Resident.prototype.parent = PhysicalThing.prototype;

PhysicalThing.prototype.size = [ 64, 24 ];
PhysicalThing.prototype.sizeOffset = [ 0, 40 ];

/*
    CONSTRUCTOR

    ...meaning input-dependent and/or object-unique properties 
    and other actions if necessary
*/
function Resident(spriteDefPack, utils){

    this.sprite = this.setSprite(utils["game"], spriteDefPack);

    this.debugText = utils["game"].add.text(0, 0, "empty", 
                {font: "16px Arial", fill: "white", align: "center"})  

    this.debugText.destroy()

    this.testAngle = 0;

    //game properties
    this.order = { 
        task: "idle", 
        params: null, 
        inProgress: true 
    };

    this.humanStats = { 
        name: "new", 
        gender: "male", 
        age: "0" 
    }; 

    //setting values

    /*
    player.animations.add('run right', [1,2], 3, true, true);
    player.animations.add('run left', [4, 5], 3, true, true);
    */
}

/*
    common variables
*/
Resident.prototype.stats.maxSpeed = 128;









/*
    METHODS
*/
//unique: none

//implemented (inherited, with new functionality)
Resident.prototype.onUpdate = function(){
    this.implementOrder();

/*
    this.testAngle>=360 ? this.testAngle-=360 : this.testAngle += 1;
    this.thrust(this.testAngle, 50)
    console.log(this.testAngle)


    this.debugText.x = this.sprite.body.x
    this.debugText.y = this.sprite.body.y+16

    this.debugText.setText(
        Math.floor(this.sprite.body.velocity.x) + ", " +
        Math.floor(this.sprite.body.velocity.y) + "| "
    )
*/

} 

//getters
//none

//setters
Resident.prototype.setName = function(str){

    this.humanStats.name = str;
}

Resident.prototype.setOrder = function(task, params){
    this.order.task = task;
    this.order.params = params;   
    this.order.inProgress = false;
}

//others
Resident.prototype.implementOrder = function(){

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















