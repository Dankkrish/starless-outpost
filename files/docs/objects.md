This doc contains an explained definition of each custom-made objects used within the game.

The ToC here functions as an inheritance tree - currently, that is the most important feature of this file.

* [Definition template](#definition-template)

* [ConfiguredMap](#configuredmap)
* [Scenario](#scenario)

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

*/

function Name(inputs){

    Parent.call(this, inputs)

    this.var = "value";

}

/*
    common variables
*/

/*
    METHODS
*/
//overridden


//getters


//setters


//others


```

# ConfiguredMap

WIP

# Scenario

`Scenario` objects contain parameters of the initial states of a map. By triggering its `load()` function, it's easier to create certain use cases.

WIP

# PhysicalThing
        
WIP  

## KatamoriBall

WIP

## Human
        
WIP 

### Resident
        
WIP        