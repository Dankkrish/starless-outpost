/*
this functions goes through every element of keyTable array which
contains every action appearing in-game and heir corresponding key
*/

function addKeys(){

    for(f=0;f<keyTable.length;f++){

        //the first line defines a PhaserJS Key object in "customKeys"
        //the second line defined a "happens only once" callback to that key
        customKeys[keyTable[f][0]] = game.input.keyboard.addKey(Phaser.Keyboard[keyTable[f][1]]);
        customKeys[keyTable[f][0]].onDown.add(keyAction[keyTable[f][0]], this);
    }
}

var keyAction = {

    "scrollRight": function(){
            game.camera.x += 1;
    },

    "scrollLeft": function(){
            game.camera.x -= 1;
    },

    "scrollDown": function(){
            game.camera.y += 1;
    },

    "scrollUp": function(){
            game.camera.y -= 1;
    }

}


//key bindings
var customKeys = { "scrollUp": "a", "scrollDown": "b", "scrollLeft": "c", "scrollRight": "d" }

var keyTable = [
    ["scrollUp", "W"],
    ["scrollDown", "S"],   
    ["scrollLeft", "A"],
    ["scrollRight", "D"]

]
