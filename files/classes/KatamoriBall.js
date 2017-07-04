/*
    class KatamoriBall

    inherits from PhysicalThing

    used as a dummy object, showing example of setting up
    common features of one such object
*/

KatamoriBall.prototype = new PhysicalThing();
KatamoriBall.prototype.constructor = KatamoriBall;

/*
    CONSTRUCTOR

*/
function KatamoriBall(initPos, utils){

    //inherit variables
    PhysicalThing.call(this)

    this.size = [ 80, 88 ];
    this.sizeOffset = [ 0, 0 ];

    this.stats = {
    "maxSpeed": 256,
    "mass": 0.3
}

    this.setSprite(initPos, 'katamori');
    this.sprite.body.bounce = new Phaser.Point(0.95, 0.95)

    this.thrust(30, this.stats.maxSpeed)

    //debug-text setup
    this.debugText = initPos.gameObj.add.text(0, 0, "empty", 
                {font: "16px Arial", fill: "white", align: "center"})

    this.debugText.visible = false;                  
}




/*
    common variables
*/

//class-specific physical properties
//none

/*
    METHODS
*/
//implemented (inherited, with new functionality)
KatamoriBall.prototype.onUpdate = function(){

    this.updateSelection()
    this.debugReport([Math.floor(this.sprite.body.velocity.x), Math.floor(this.sprite.body.velocity.y)])

}