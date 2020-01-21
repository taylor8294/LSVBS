import { colorStringToInt } from '../utils.js'

export default function (config) {
    // Init vars
    config = config || {}
    var that = this, { app, resources } = this.pixi
    var WIDTH = this.pixi.WIDTH, HEIGHT = this.pixi.HEIGHT;
    var b2WIDTH = this.box2d.WIDTH, b2HEIGHT = this.box2d.HEIGHT;
    
    // Create ongoing balance figure
    let textMetrics = PIXI.TextMetrics.measureText(this.currency.symbol+'0', this.pixi.jarFigureStyle)
    let balanceFigure = this.pixi.balanceFigure = new PIXI.Text(this.currency.symbol+'0', this.pixi.jarFigureStyle);
    balanceFigure.visible = false;
    balanceFigure.anchor.set(0.5)
    balanceFigure.position.set(WIDTH/2, textMetrics.height/2)
    //balanceFigure.pivot = {x: textMetrics.width/2, y: textMetrics.height/2}
    //balanceFigure.alpha = 0
    app.stage.addChild(balanceFigure)

    this.pixi.setBalanceFigure = function(num) {
        let fig = Math.abs(num)
        that.pixi.balanceFigure.text = (num < 0 ? '-' : '')+that.currency.symbol+fig.toFixedCommas()
        //that.pixi.balanceFigure.position.set(WIDTH/2, this.pixi.balanceFigure.y)
    }

    // Create balance label (the start date)
    let balanceFigureLabel = this.pixi.makeFigureLabel(this.data.startDate.toFormattedString())
    balanceFigureLabel.visible = false;
    app.stage.addChild(balanceFigureLabel)

    // Create start balance coins
    this.pixi.pots = this.pixi.pots || {}
    this.pixi.pots.start = []
    let numSquares = {num:0}, coinFill;

    // Init coin texture if present
    if(config.startBalanceImage && this.pixi.resources[config.startBalanceImage] && this.pixi.resources[config.startBalanceImage].texture){
        coinFill = this.pixi.resources[config.startBalanceImage].texture
    } else {
        coinFill = config.startBalanceColor ? colorStringToInt(config.startBalanceColor) : 0xf68121
    }

    // Create speech
    let audioObjs = []
    if(this.data.startBalance <= 0)    
        audioObjs.push({
            id: 'startingBalanceIn1',
            text: 'As it was at ' + this.data.startDate.toFormattedString() + '.'
        })
    else
        audioObjs.push({
            id: 'startingBalanceIn1',
            text: [
                'Let\'s fill it up to show your balance',
                'as it was at ' + this.data.startDate.toFormattedString() + '.'
            ]
        })

    return {
        id: 'startingBalanceIn',
        tl: function () {
            let tl = new TimelineLite({ id: "startingBalanceIn" });
            tl.from([that.pixi.balanceFigure,balanceFigureLabel], 2, {
                y: -HEIGHT/8,
                pixi: { alpha: 0 }
            });
            if(that.data.startBalance > 0){
                tl.to(numSquares, 3, {
                    num: Math.ceil(Math.abs(that.data.startBalance)/that.unit),
                    ease: Power1.easeOut,
                    onStart: function(){ that.pixi.app.renderer.plugins.interaction.autoPreventDefault = true },
                    onUpdate: function(tween){
                        let shouldBe = Math.max(0,Math.round(tween.target.num))
                        if(that.pixi.pots.start.length > shouldBe){
                            while(that.pixi.pots.start.length > shouldBe){
                                that.pixi.remove(that.pixi.pots.start[that.pixi.pots.start.length-1])
                                that.pixi.pots.start.pop()
                            }
                        } else {
                            while(that.pixi.pots.start.length < shouldBe){
                                let x = b2WIDTH/2 + (Math.random()-0.5)*b2WIDTH/8,
                                    y = Math.random()*-b2HEIGHT/4,
                                    r = 0.25 //+Math.pow(Math.random(),12)*0.5 //TODO parameterise?
                                that.pixi.pots.start.push(that.pixi.addB2Circle(x,y,r,coinFill,0,'start'))//colors[Math.floor(Math.random()*colors.length)]))
                            }
                        }
                        that.pixi.setBalanceFigure(Math.min(shouldBe * that.unit, that.data.startBalance))
                    },
                    onUpdateParams: ['{self}'],
                })
                //interactive icon
                if(that.pixi.interactive){
                    tl.to([that.pixi.interactive,that.pixi.interactiveText], 1, {pixi:{alpha: 1}}, 2)
                    tl.to(that.pixi.interactive, 0.33, {x:that.pixi.interactive.x+5,y:that.pixi.interactive.y-5},3)
                    tl.to(that.pixi.interactive, 0.33, {x:that.pixi.interactive.x-5,y:that.pixi.interactive.y+5},3.33)
                    tl.to(that.pixi.interactive, 0.34, {x:that.pixi.interactive.x+5,y:that.pixi.interactive.y-5},3.66)
                    tl.to(that.pixi.interactive, 0.33, {x:that.pixi.interactive.x-5,y:that.pixi.interactive.y+5},4)
                    tl.to(that.pixi.interactive, 0.33, {x:that.pixi.interactive.x+5,y:that.pixi.interactive.y-5},4.33)
                    tl.to(that.pixi.interactive, 0.34, {x:that.pixi.interactive.x-5,y:that.pixi.interactive.y+5},4.66)
                    tl.to(that.pixi.interactive, 0.33, {x:that.pixi.interactive.x+5,y:that.pixi.interactive.y-5},5)
                    tl.to(that.pixi.interactive, 0.33, {x:that.pixi.interactive.x-5,y:that.pixi.interactive.y+5},5.33)
                    tl.to([that.pixi.interactive,that.pixi.interactiveText], 1, {pixi:{alpha: 0}},7)
                }
            }
            tl.to(that.pixi.balanceFigure,1,{
                pixi: {scale:1.2}
            })
            tl.to(that.pixi.balanceFigure,1,{
                pixi: {scale:1}
            })
            tl.to(balanceFigureLabel,1,{
                pixi: { alpha:0 }
            },"-=2")
            tl.to(that.pixi.balanceFigure,1.75,{
                y: HEIGHT-(HEIGHT-that.pixi.jarHeight)/2+that.pixi.balanceFigure.height/2,
                ease: Power1.easeOut
            },"-=0.25");
            [balanceFigure,balanceFigureLabel].forEach(actor => actor.visible = true); //Make visible now tl state is set
            return tl;
        },
        audio: audioObjs
    }

}