import { colorStringToInt, niceRound } from '../utils.js'

export default function (config) {
    // Init vars
    config = config || {}
    var that = this, { app, resources } = this.pixi
    var WIDTH = this.pixi.WIDTH, HEIGHT = this.pixi.HEIGHT;
    var b2WIDTH = this.box2d.WIDTH, b2HEIGHT = this.box2d.HEIGHT;

    // Create figure and figure label
    let figure = this.pixi.makeFigure(this.data.employeeContributions),
        figureLabel = this.pixi.makeFigureLabel(this.pixi.tooltipLookup('eeConts'))
    figure.visible = figureLabel.visible = false
    app.stage.addChild(figure,figureLabel)

    // Create transfers coins
    this.pixi.pots = this.pixi.pots || {}
    this.pixi.pots.eeConts = []
    let numSquares = {num:0}, coinFill;

    // Init coin texture if present
    if(config.employeeContsImage && this.pixi.resources[config.employeeContsImage] && this.pixi.resources[config.employeeContsImage].texture){
        coinFill = this.pixi.resources[config.employeeContsImage].texture
    } else {
        coinFill = config.employeeContsColor ? colorStringToInt(config.employeeContsColor) : 0x00c389
    }

    let audioText = ['Over the course of the year, '+that.user.forename+', you contributed']
    if(config.taxRelief || config.taxRelief===undefined){
        audioText.push(niceRound(that.data.employeeContributions, true, that.currency.symbol) + '. And don\'t forget, because you benefit from')
        audioText.push('tax relief on your contributions, the actual cost to you is lower than this.')
    } else
        audioText.push(niceRound(that.data.employeeContributions, true, that.currency.symbol) + '.')

    return {
        id: 'eeContsIn',
        tl: function () {
            let tl = new TimelineLite({ id: "eeContsIn" });
            tl.from([figure,figureLabel], 2, {
                y: -HEIGHT/8,
                pixi: { alpha: 0 }
            }); //t=0
            tl.to(numSquares, 3, {
                num: Math.ceil(Math.abs(that.data.employeeContributions)/that.unit),
                ease: Power1.easeOut,
                onUpdate: function(tween){
                    let shouldBe = Math.max(0,Math.round(tween.target.num))
                    if(that.pixi.pots.eeConts.length > shouldBe){
                        while(that.pixi.pots.eeConts.length > shouldBe){
                            that.pixi.remove(that.pixi.pots.eeConts.pop())
                        }
                    } else {
                        while(that.pixi.pots.eeConts.length < shouldBe){
                            let x = b2WIDTH/2 + (Math.random()-0.5)*b2WIDTH/8,
                                y = Math.random()*-b2HEIGHT/4,
                                r = 0.25 //+Math.pow(Math.random(),12)*0.5 //TODO parameterise?
                            that.pixi.pots.eeConts.push(that.pixi.addB2Circle(x,y,r,coinFill,0,'eeConts'))
                        }
                    }
                    that.pixi.setBalanceFigure(that.data.startBalance+that.data.bulkTransfers+that.data.transfers+(that.data.bulkTransfers+that.data.transfers>0?that.data.withdrawals:0)+Math.min(shouldBe * that.unit, that.data.employeeContributions))
                },
                onUpdateParams: ['{self}'],
            },"+=1") //t=3
            tl.to([figure,figureLabel],1,{
                pixi: { alpha:0 }
            },"-=1") //t=5
            //interactive icon
            if(that.data.startBalance+that.data.bulkTransfers+that.data.transfers <= 0 && that.pixi.interactive){
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
            id:'eeContsIn1',
            text: audioText
        }]
    }

}