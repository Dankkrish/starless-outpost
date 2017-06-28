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
    s.body.setSize(this.size[0], this.size[1], this.sizeOffset[0], this.sizeOffset[1]); 

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

PhysicalThing.prototype.thrust = function(angle, speed){ 

    this.sprite.body.velocity.setTo(
        Math.cos(angle*(Math.PI/180)) * speed, 
        Math.sin(angle*(Math.PI/180)) * speed)    
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