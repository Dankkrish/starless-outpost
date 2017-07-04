/*

    class PhysicalThing()

    superclass, inherits from nothing

    made for meaning a base for every displayed AND 
    interactable environment object of the map

    CONSTRUCTOR

*/
function PhysicalThing(){

    /*
        constants
    */ 
    this.sprite;
    this.debugText;    

    this.size;
    this.sizeOffset;

    this.stats = {
        "maxSpeed": null,
        "mass": null
    }

    this.selected = false;

}



/*

    METHODS

*/ 

//setters

//set sprite AND its physics
PhysicalThing.prototype.setSprite = function(pack, spritesheet){

    let s = drawable.create(pack.x,pack.y, spritesheet);


    pack.gameObj.physics.arcade.enable(s, Phaser.Physics.ARCADE);

    s.body.collideWorldBounds = true;
    s.body.setSize(this.size[0], this.size[1], this.sizeOffset[0], this.sizeOffset[1]); 

    if (this.stats.maxSpeed != -1){
        s.body.maxVelocity = this.stats.maxSpeed; 
    }
     
    s.body.mass = this.stats.mass; 


    this.sprite = s;
    
    this.sprite.inputEnabled = true;
    this.sprite.input.enabled = true;

    /*
        event listeners
    */
    this.sprite.events.onInputDown.add(
        ( ) => { this.selectMe() }, this)

    this.sprite.events.onInputOver.add(
        ( ) => { 
            if ( !this.selected ){
                GUI[1].setTo(this.sprite.x-100, this.sprite.y-100, this.sprite.width, this.sprite.height)
                this.debugText.visible = true;
            }
        }, 
        this)

    this.sprite.events.onInputOut.add(
        ( ) => { 
            GUI[1].setTo(0, 0, 0, 0)
            this.debugText.visible = false;
        }, 
        this)       

       

}

//others




PhysicalThing.prototype.selectMe = function(){

    if(currentObject !== null){ 
        currentObject.deselectMe();
    }

    this.selected = true;

    currentObject = this;

    GUI[2].setTo(this.sprite.x-100, this.sprite.y-100, this.sprite.width, this.sprite.height)
    this.debugText.visible = true;



}

PhysicalThing.prototype.deselectMe = function(){

    this.selected = false;

    GUI[2].setTo(0, 0, 0, 0)    
    this.debugText.visible = false;

}











PhysicalThing.prototype.thrust = function(angle, speed){ 

    this.sprite.body.velocity.setTo(
        Math.cos(angle*(Math.PI/180)) * speed, 
        Math.sin(angle*(Math.PI/180)) * speed)    
}

PhysicalThing.prototype.onUpdate = function(){
    return "onUpdate() not set! Please implement to this method"
}

PhysicalThing.prototype.updateSelection = function(){
    if (this.selected){
        GUI[2].x = this.sprite.x-100
        GUI[2].y = this.sprite.y-100     
    }
}









PhysicalThing.prototype.attachText = function(textObj){
    textObj.x = this.sprite.body.x
    textObj.y = this.sprite.body.y+this.size[1]+4

    this.debugText.setText("")
};

PhysicalThing.prototype.debugReport = function(params){

    if(this.debugText != null && this.debugText.visible){

        this.attachText(this.debugText)

        params.forEach(p=>{
            this.debugText.setText(this.debugText.text.concat(" | ", p))
        })

    }



};
