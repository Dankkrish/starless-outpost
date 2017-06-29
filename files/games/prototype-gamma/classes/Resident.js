/*
    class Resident

    inherits from Human

    used as actual playable char, which you can give orders
*/

Resident.prototype = new Human();
Resident.prototype.constructor = Resident;

/*
    CONSTRUCTOR

*/
function Resident(initPos, utils){

    //inherit variables
    Human.call(this)

    //create sprite and body
    this.setSprite(initPos, 'resident');

    //debug-text setup
    let game = initPos.gameObj;

    this.debugText = game.add.text(0, 0, "empty", 
                {font: "16px Arial", fill: "white", align: "center"})  

    this.debugText.visible = false;

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










