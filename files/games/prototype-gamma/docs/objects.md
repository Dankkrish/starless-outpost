This doc contains an explained definition of each custom-made objects used within the game.

The ToC here functions as an inheritance tree - currently, that is the most important feature of this file.

* [Definition template](#definition-template)

* [ConfiguredMap](#configuredmap)

* [PhysicalThing](#physicalthing)
    * [KatamoriBall](#katamoriball)
    * [Human](#human)
        * [Resident](#resident)

# Definition template

```
/*
    class Name

    inherits from Parent

    short description
*/

Name.prototype = new Parent();
Name.prototype.constructor = Parent;

/*
    CONSTRUCTOR

    ...meaning input-dependent and/or object-unique properties 
    and other actions if necessary
*/

function Name(inputs){

    this.var = "value";

}

/*
    common variables
*/

/*
    METHODS
*/
//unique
Name.prototype.ExampleFoo = function(){

}

//inherited


//implemented (inherited, with new functionality)


//getters


//setters


//others


```

# ConfiguredMap

WIP

# PhysicalThing
        
WIP  

## KatamoriBall

WIP

## Human
        
WIP 

### Resident
        
WIP        