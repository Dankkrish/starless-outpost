function PhysicalThing(){

    /*
        CONSTRUCTOR

        ...meaning input-dependent and/or object-unique properties 
        and other actions if necessary
    */
}

//common properties
PhysicalThing.prototype.sprite = null;

PhysicalThing.prototype.size = [ 32*2, 32*2 ];
PhysicalThing.prototype.sizeOffset = [ 0, 0 ];

PhysicalThing.prototype.stats = {
    "maxSpeed": 0,
}

PhysicalThing.prototype.selected = false;

/*

    METHODS

*/ 

//setters

//set sprite AND its physics
PhysicalThing.prototype.setSprite = function(gameObj, pack){

    var s = gameObj.add.sprite(pack.x,pack.y,pack.spritesheet);

    
    gameObj.physics.arcade.enable(s, Phaser.Physics.ARCADE);

     //s.body.bounce = new Phaser.Point(0,0)
    s.body.collideWorldBounds = true;
    s.body.setSize(this.size[0], this.size[1], this.size[0]/4, this.size[1]/4); 

    s.body.maxVelocity = this.stats.maxSpeed;   

    return s;
}

//others
PhysicalThing.prototype.selectMe = function(previous){
    this.selected = true;
    previous.deselectMe();
}

PhysicalThing.prototype.deselectMe = function(){
    this.selected = false;
}

PhysicalThing.prototype.thrust = function(vector){ 
    this.sprite.body.velocity.setTo(
        Math.cos(game.rnd.angle()) * vector[0], 
        Math.sin(game.rnd.angle()) * vector[1])    
}

PhysicalThing.prototype.onUpdate = function(){
    return "onUpdate() not set! Please implement to this method"
}













/*
    class KatamoriBall

    inherits from PhysicalThing

    used as a dummy object, showing example of setting up
    common features of one such object
*/

KatamoriBall.prototype = new PhysicalThing();
KatamoriBall.prototype.constructor = KatamoriBall;
KatamoriBall.prototype.parent = PhysicalThing.prototype;

function KatamoriBall(spriteDefPack, utils){

    /*
        CONSTRUCTOR

        ...meaning input-dependent and/or 
        object-unique properties and 
        other actions if necessary
    */

    this.sprite = this.setSprite(utils["game"], spriteDefPack);

    /*
    player.animations.add('run right', [1,2], 3, true, true);
    player.animations.add('run left', [4, 5], 3, true, true);
    */
}

/*
    common variables
*/

//class-specific physical properties
//none

/*
    METHODS
*/
//none 



















/*
    class Resident

    inherits from PhysicalThing

    used as actual playable char, which you can give orders
*/

Resident.prototype = new PhysicalThing();
Resident.prototype.constructor = Resident;
Resident.prototype.parent = PhysicalThing.prototype;

function Resident(spriteDefPack, utils){

    /*
        CONSTRUCTOR

        ...meaning input-dependent and/or object-unique properties 
        and other actions if necessary
    */

    this.sprite = this.setSprite(utils["game"], spriteDefPack);

    this.seed = Math.random()

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

//implemented
Resident.prototype.onUpdate = function(){
    this.implementOrder();
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

    console.log(this.order.inProgress)

    //if an order is in progress, but not done
    if(this.order.inProgress){

        switch(this.order.task){
            case "idle":
                this.sprite.body.velocity.setTo(0,0)
                break;

            case "simple_move":

                

                if(                
                    Math.abs(this.order.params.destination[0] - this.sprite.body.x) < 3*tilesize &&
                    Math.abs(this.order.params.destination[1] - this.sprite.body.y) < 3*tilesize)
                {
                    //this.sprite.body.velocity.setTo(0, 0);
                    this.order.inProgress = false;   
                    this.setOrder("idle");               
                }else{
                }


                break;
        }
    
    //if every other order is finished
    }else{

        switch(this.order.task){
            case "idle":
                this.sprite.body.velocity.setTo(0,0)
                break;

            case "simple_move":

                var angle = Math.atan(
                        (this.order.params.destination[1] - this.sprite.body.y)
                        /
                        (this.order.params.destination[0] - this.sprite.body.x)
                    )

                //console.log(Math.cos(angle) * this.order.params.speed+", "+Math.sin(angle) * this.order.params.speed)

                //set motion
                this.sprite.body.velocity.setTo(
                    Math.cos(angle) * this.order.params.speed, 
                    Math.sin(angle) * this.order.params.speed
                );

                break;
        }

        this.order.inProgress = true;
       
    }

}















