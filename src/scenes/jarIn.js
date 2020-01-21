import { colorStringToInt, getString } from '../utils.js'

export default function (config) {
    // Init vars
    config = config || {}
    var { app, resources } = this.pixi, that = this
    var WIDTH = this.pixi.WIDTH, HEIGHT = this.pixi.HEIGHT;

    // Create Jar Sprite
    const jar = this.pixi.jar = new PIXI.Sprite(this.pixi.resources['jar'].texture);
    jar.name = 'jar';
    jar.visible = false;
    let sfac = 10 / (this.pixi.resources['jar'].data.naturalWidth / this.pixi.SCALE); // Scale to pixel size = ~10m wide in b2World
    jar.scale.set(sfac, sfac);
    jar.position.set((WIDTH-jar.width)/2, (HEIGHT-jar.height)/2); //TODO avoid hardcoding
    app.stage.addChildAt(jar, 0);

    // Init jarLabelStyle, jarFigureStyle, and jarFigureLabelStyle
    let jarLabelStyle = this.pixi.jarFigureStyle.clone()
    if(config.jarLabelColor || config.jarLabelColor===0)
        jarLabelStyle.fill = colorStringToInt(config.jarLabelColor)
    if(config.jarLabelFont && config.jarLabelFont.length)
        jarLabelStyle.fontFamily = config.jarLabelFont
    jarLabelStyle.fontSize = config.jarLabelFontSize ? Number(config.jarLabelFontSize) : 24
    
    this.pixi.jarFigureStyle = jarLabelStyle.clone()
    if(config.jarFigureColor || config.jarFigureColor===0)
        this.pixi.jarFigureStyle.fill = colorStringToInt(config.jarFigureColor)
    if(config.jarFigureFont && config.jarFigureFont.length)
        this.pixi.jarFigureStyle.fontFamily = config.jarFigureFont
    this.pixi.jarFigureStyle.fontSize = config.jarFigureFontSize ? Number(config.jarFigureFontSize) : 48

    this.pixi.jarFigureLabelStyle = this.pixi.jarFigureStyle.clone()
    if(config.jarFigureLabelColor || config.jarFigureLabelColor===0)
        this.pixi.jarFigureLabelStyle.fill = colorStringToInt(config.jarFigureLabelColor)
    if(config.jarFigureLabelFont && config.jarFigureLabelFont.length)
        this.pixi.jarFigureLabelStyle.fontFamily = config.jarFigureLabelFont
    this.pixi.jarFigureLabelStyle.fontSize = config.jarFigureLabelFontSize ? Number(config.jarFigureLabelFontSize) : 20

    // Create the jar label
    let jarText = getString('labelJar',this),
        textMetrics = PIXI.TextMetrics.measureText(jarText, jarLabelStyle), // TODO parameterise
        labelHeight = textMetrics.height
    let jarLabel = this.pixi.jarLabel = new PIXI.Text(jarText, jarLabelStyle);
    jarLabel.visible = false;
    jarLabel.anchor.set(0.5)
    jarLabel.position.set(WIDTH/2, HEIGHT-labelHeight)
    app.stage.addChild(jarLabel)

    return {
        id: 'jarIn',
        tl: function () {
            let tl = new TimelineLite({ id: "jarIn" });
            tl.from(jar, 3, { y: -HEIGHT, ease: Power3.easeOut });
            tl.from(jarLabel,3,{
                y: -1*labelHeight,
                pixi: { alpha: 0 },
                ease: Power3.easeOut
            },"-=3");
            [jar,jarLabel].forEach(actor => actor.visible = true); //Can now make visible
            return tl;
        },
        audio: [{
            id: 'jarIn1',
            text: 'This jar represents your pension account.'
        }]
    }

}