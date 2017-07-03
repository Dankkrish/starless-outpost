/*

    class PhysicalThing()

    superclass, inherits from nothing

    made for meaning a base for every displayed AND 
    interactable environment object of the map

    CONSTRUCTOR

*/
function PhysicalThing(){

}

/*
    constants
*/ 
PhysicalThing.prototype.sprite = null;
PhysicalThing.prototype.debugText = null;    

PhysicalThing.prototype.size = null;
PhysicalThing.prototype.sizeOffset = null;

PhysicalThing.prototype.stats = {
    "maxSpeed": null,
    "mass": null
}

PhysicalThing.prototype.selected = false;

/*

    METHODS

*/ 

//setters

//set sprite AND its physics
PhysicalThing.prototype.setSprite = function(pack, spritesheet){

    this.sprite = drawable.create(pack.x,pack.y, spritesheet);

    
    pack.gameObj.physics.arcade.enable(this.sprite, Phaser.Physics.ARCADE);

    this.sprite.body.collideWorldBounds = true;
    this.sprite.body.setSize(this.size[0], this.size[1], this.sizeOffset[0], this.sizeOffset[1]); 

    this.sprite.body.maxVelocity = this.stats.maxSpeed;  
    this.sprite.body.mass = this.stats.mass; 

}

//others




PhysicalThing.prototype.selectMe = function(previous){

    this.selected = true;

    game.camera.follow(this.sprite) 

    if(previous !== "init"){ 
        previous.deselectMe();
    }

}

PhysicalThing.prototype.deselectMe = function(){

    this.selected = false;

    game.camera.unfollow()

}

PhysicalThing.prototype.thrust = function(angle, speed){ 

    this.sprite.body.velocity.setTo(
        Math.cos(angle*(Math.PI/180)) * speed, 
        Math.sin(angle*(Math.PI/180)) * speed)    
}

PhysicalThing.prototype.onUpdate = function(){
    return "onUpdate() not set! Please implement to this method"
}

PhysicalThing.prototype.attachText = function(textObj){
    textObj.x = this.sprite.body.x
    textObj.y = this.sprite.body.y+16

    this.debugText.setText("stats: ")
};

PhysicalThing.prototype.debugReport = function(params){

    if(this.debugText != null && this.debugText.visible){

        this.attachText(this.debugText)

        params.forEach(p=>{
            this.debugText.setText(this.debugText.text.concat(p, "|"))
        })

    }



};