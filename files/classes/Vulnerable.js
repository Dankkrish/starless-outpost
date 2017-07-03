/*
    class Vulnerable

    inherits from PhysicalThing

    defines health and destructibility
*/
Vulnerable.prototype = new PhysicalThing();
Vulnerable.prototype.constructor = Vulnerable;

/*
    CONSTRUCTOR

*/
function Vulnerable(){

    PhysicalThing.call(this);

    this.HP;
    this.maxHP;

}



/*
    METHODS
*/
//getters
Vulnerable.prototype.getHealth = function(){

    return this.HP;
}

//setters
Vulnerable.prototype.injureMe = function(n){

    this.HP > 0 ? this.HP -= n : this.die();
}

Vulnerable.prototype.healMe = function(n){

    this.HP < this.maxHP ? this.HP += n : 1; 
}

//others
Vulnerable.prototype.die = function(){

   
}