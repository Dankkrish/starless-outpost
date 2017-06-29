/*
    class KatamoriBall

    inherits from PhysicalThing

    used as a dummy object, showing example of setting up
    common features of one such object
*/

KatamoriBall.prototype = new PhysicalThing();
KatamoriBall.prototype.constructor = KatamoriBall;

function KatamoriBall(initPos, utils){

    /*
        CONSTRUCTOR

        ...meaning input-dependent and/or 
        object-unique properties and 
        other actions if necessary
    */

    this.sprite = this.setSprite(initPos, 'katamori');

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