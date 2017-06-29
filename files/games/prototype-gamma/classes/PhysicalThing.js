function PhysicalThing(){

    /*
        CONSTRUCTOR

        ...meaning input-dependent and/or object-unique properties 
        and other actions if necessary
    */


}

//common properties
PhysicalThing.prototype.sprite = null;
PhysicalThing.prototype.debugText = null;    

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
PhysicalThing.prototype.setSprite = function(pack, spritesheet){

    var s = pack.gameObj.add.sprite(pack.x,pack.y, spritesheet);

    
    pack.gameObj.physics.arcade.enable(s, Phaser.Physics.ARCADE);

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
/*
PhysicalThing.prototype.onUpdate = function(){
    return "onUpdate() not set! Please implement to this method"
}
*/
PhysicalThing.prototype.attachText = function(textObj){
    textObj.x = this.sprite.body.x
    textObj.y = this.sprite.body.y+16

    this.debugText.setText(
        Math.floor(this.sprite.body.velocity.x) + ", " +
        Math.floor(this.sprite.body.velocity.y) + "| "
    )
};

PhysicalThing.prototype.debugReport = function(params){

    if(this.debugText != null && this.debugText.visible){

        this.attachText(this.debugText)

        params.forEach(p=>{
            this.debugText.setText(this.debugText.text.concat(p, "|"))
        })

    }



};