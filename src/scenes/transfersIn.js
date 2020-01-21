import { colorStringToInt, niceRound } from '../utils.js'

export default function (config) {
    // Init vars
    config = config || {}
    var that = this, { app, resources } = this.pixi
    var WIDTH = this.pixi.WIDTH, HEIGHT = this.pixi.HEIGHT;
    var b2WIDTH = this.box2d.WIDTH, b2HEIGHT = this.box2d.HEIGHT;

    // Create figure and figure label
    let figure = this.pixi.makeFigure(this.data.bulkTransfers+this.data.transfers),
        figureLabel = this.pixi.makeFigureLabel(this.pixi.tooltipLookup('transfers'))
    figure.visible = figureLabel.visible = false
    app.stage.addChild(figure,figureLabel)

    // Create transfers coins
    this.pixi.pots = this.pixi.pots || {}
    this.pixi.pots.transfers = []
    let numSquares = {num:0}, coinFill;

    // Init coin texture if present
    if(config.transfersImage && this.pixi.resources[config.transfersImage] && this.pixi.resources[config.transfersImage].texture){
        coinFill = this.pixi.resources[config.transfersImage].texture
    } else {
        coinFill = config.transfersColor ? colorStringToInt(config.transfersColor) : 0xffb81c
    }

    return {
        id: 'transfersIn',
        tl: function () {
            let tl = new TimelineLite({ id: "transfersIn" });
            tl.from([figure,figureLabel], 2, {
                y: -HEIGHT/8,
                pixi: { alpha: 0 }
            }); //t=0
            tl.to(numSquares, 3, {
                num: Math.ceil(Math.abs(that.data.bulkTransfers+that.data.transfers)/that.unit),
                ease: Power1.easeOut,
                onUpdate: function(tween){
                    let shouldBe = Math.max(0,Math.round(tween.target.num))
                    if(that.pixi.pots.transfers.length > shouldBe){
                        while(that.pixi.pots.transfers.length > shouldBe){
                            that.pixi.remove(that.pixi.pots.transfers.pop())
                        }
                    } else {
                        while(that.pixi.pots.transfers.length < shouldBe){
                            let x = b2WIDTH/2 + (Math.random()-0.5)*b2WIDTH/8,
                                y = Math.random()*-b2HEIGHT/4,
                                r = 0.25 //+Math.pow(Math.random(),12)*0.5 //TODO parameterise?
                            that.pixi.pots.transfers.push(that.pixi.addB2Circle(x,y,r,coinFill,0,'transfers'))
                        }
                    }
                    that.pixi.setBalanceFigure(that.data.startBalance+Math.min(shouldBe * that.unit, that.data.bulkTransfers+that.data.transfers))
                },
                onUpdateParams: ['{self}'],
            },"+=1") //t=3
            tl.to([figure,figureLabel],1,{
                pixi: { alpha:0 }
            },"-=1") //t=5
            //interactive icon
            if(that.data.startBalance <= 0 && that.pixi.interactive){
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
            figure.visible = figureLabel.visible = true
            return tl;
        },
        audio: [{
            id:'transfersIn1',
            text: 'You transferred in ' + niceRound(that.data.bulkTransfers+that.data.transfers, true, that.currency.symbol) + ' during the year. Let\'s add that in '+(that.data.startBalance<1?'first':'now')+'.'
        }]
    }

}