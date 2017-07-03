/*
    1: action name
    2: default key for that action
    3: is it continuous? (or happens once per down)
*/
var defaultKeys = [
    ["scrollUp", "W", true],
    ["scrollDown", "S", true], 
    ["scrollLeft", "A", true],
    ["scrollRight", "D", true],
    ["resetCamera", "X", true],

    ["selectObject", "E", false],
    ["deselectObject", "ESC", false],

    ["startScenario_1", "F", false],
    ["startScenario_2", "C", false],
    ["startScenario_3", "G", false],

]

function addKeys(){

    for(f=0;f<defaultKeys.length;f++){

        //the first line defines a PhaserJS Key object in "customKeys"
        //the second line defines a callback to that key (either one-time or continuous)
        customKeys[defaultKeys[f][0]] = game.input.keyboard.addKey(Phaser.Keyboard[defaultKeys[f][1]]);

        if ( defaultKeys[f][2] ) {
            customKeys[defaultKeys[f][0]].onHoldCallback = keyAction[defaultKeys[f][0]];
        } else {
            customKeys[defaultKeys[f][0]].onDown.add( keyAction[defaultKeys[f][0]] );
        }

    }
}

var keyAction = {

    "scrollRight": () => {
        moveCam("x", +offset)
    },

    "scrollLeft": () => {
        moveCam("x", -offset)
    },

    "scrollDown": () => {
        moveCam("y", +offset)
    },

    "scrollUp": () => {
        moveCam("y", -offset)
    },

    "resetCamera": () => {
        game.camera.focusOnXY(tilesize*mapsizeX/2, tilesize*mapsizeY/2)
    },




    "deselectObject": () => {
        objects[3].deselectMe()
    },

    "selectObject": () => {
        objects[3].selectMe("init")
    },





    "startScenario_1": () => { 
        game.state.start("followTest")
    },

    "startScenario_2": () => { 
        game.state.start("crowdTest")
    },

    "startScenario_3": () => { 
        game.state.start("giantMap")
    },



}

var customKeys = {  }