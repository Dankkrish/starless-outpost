/*
    class Resident

    inherits from Human

    used as actual playable char, which you can give orders
*/

Resident.prototype = new Human();
Resident.prototype.constructor = Resident;

/*
    CONSTRUCTOR

    ...meaning input-dependent and/or object-unique properties 
    and other actions if necessary
*/
function Resident(initPos, utils){

    let game = initPos.gameObj;



    this.sprite = this.setSprite(initPos, 'resident');

    this.debugText = game.add.text(0, 0, "empty", 
                {font: "16px Arial", fill: "white", align: "center"})  

    this.debugText.visible = false;

    //must do something with it, or I'll go mad
    this.order = {}

}

/*
    common variables
*/
//none yet




/*
    METHODS
*/
//unique
//none

//inherited
//none

//implemented (inherited, with new functionality)
//none

//getters
//none

//setters
//none

//others
//none










