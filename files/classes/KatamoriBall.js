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

    /*
    player.animations.add('run right', [1,2], 3, true, true);
    player.animations.add('run left', [4, 5], 3, true, true);
    */

    this.thrust(30, 3000)
}

KatamoriBall.prototype.size = [ 64, 64 ];
KatamoriBall.prototype.sizeOffset = [ 32, 32 ];

/*
    common variables
*/

//class-specific physical properties
//none

/*
    METHODS
*/
//none 