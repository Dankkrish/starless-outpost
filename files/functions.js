var myRandom = (min, max) => Math.floor(Math.random()*(max-min)) + min;

var bindRect = (g, rect, hexColor, width) => {
        g.lineStyle(width, "0x"+hexColor)
        g.drawRect(rect.x, rect.y, rect.width, rect.height)
        g.graphicsData[graphics.graphicsData.length-1].shape = rect
}

var mouseBeta = (pointer) => {
    if (pointer.justPressed()){
        if (currentObject !== null && 
            currentObject instanceof Human &&
            !game.input.hitTest(currentObject.sprite, pointer, new Phaser.Point(mouse.X+game.camera.x, mouse.Y+game.camera.y))   
            ){



            currentObject.setOrder("simple_move", 
                { 
                    destination: [ 
                        mouse.X+game.camera.x, 
                        mouse.Y+game.camera.y
                    ], 
                    speed: currentObject.stats.maxSpeed
                })
        }
    }
}