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

    this.setSprite(initPos, 'katamori');
    this.sprite.body.bounce = new Phaser.Point(1,1)

    this.thrust(30, 1000)
}

KatamoriBall.prototype.size = [ 64, 64 ];
KatamoriBall.prototype.sizeOffset = [ 32, 32 ];

KatamoriBall.prototype.stats.maxSpeed = 500;

/*
    common variables
*/

//class-specific physical properties
//none

/*
    METHODS
*/
//none 