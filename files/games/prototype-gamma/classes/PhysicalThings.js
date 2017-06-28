function PhysicalThing(){

    /*
        CONSTRUCTOR

        ...meaning input-dependent properties 
        and other actions if necessary
    */
}

//independent properties
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

    s.body.bounce = new Phaser.Point(1,1)
    s.body.collideWorldBounds = true;
    s.body.setSize(this.size, this.size[0]/4, this.size[0]/4); 

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

        ...meaning input-dependent properties 
        and other actions if necessary
    */

    this.sprite = this.setSprite(utils["game"], spriteDefPack);

    /*
    player.animations.add('run right', [1,2], 3, true, true);
    player.animations.add('run left', [4, 5], 3, true, true);
    */
}

/*
    independent variables
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

        ...meaning input-dependent properties 
        and other actions if necessary
    */

    this.sprite = this.setSprite(utils["game"], spriteDefPack);

    /*
    player.animations.add('run right', [1,2], 3, true, true);
    player.animations.add('run left', [4, 5], 3, true, true);
    */
}

/*
    independent variables
*/
Resident.prototype.stats.maxSpeed = 128;

//class-specific physical properties
Resident.prototype.order = { task: "idle", params: null, inProgress: true };
Resident.prototype.demography = { 
    name: "new", 
    gender: "male", 
    age: "0" };    


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
Resident.prototype.setName = function(){

}

Resident.prototype.setOrder = function(task, params){
    this.order.task = task;
    this.order.params = params;   
    this.order.inProgress = false;
}

//others
Resident.prototype.implementOrder = function(){

    if(this.order.inProgress){

        switch(this.order.task){
            case "idle":

                break;

            case "simple_move":



                break;
        }

    }else{

        switch(this.order.task){
            case "idle":

                break;

            case "simple_move":
                this.sprite.body.velocity.x = this.order.params.destX - this.sprite.body.x;
                this.sprite.body.velocity.x = this.order.params.destY - this.sprite.body.y;

                break;
        }

        this.order.inProgress = true;
       
    }

}















