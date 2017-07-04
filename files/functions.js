var myRandom = (min, max) => Math.floor(Math.random()*(max-min)) + min;

var bindRect = (g, rect, hexColor) => {
        g.lineStyle(2, "0x"+hexColor)
        g.drawRect(rect.x, rect.y, rect.width, rect.height)
        g.graphicsData[graphics.graphicsData.length-1].shape = rect
}