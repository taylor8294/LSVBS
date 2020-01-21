import { colorStringToInt, niceRound } from '../utils.js'

export default function (config) {
    // Init vars
    config = config || {}
    var that = this, { app, resources } = this.pixi
    var WIDTH = this.pixi.WIDTH, HEIGHT = this.pixi.HEIGHT;
    var b2WIDTH = this.box2d.WIDTH, b2HEIGHT = this.box2d.HEIGHT;

    // Create figure and figure label
    let figure = this.pixi.makeFigure(this.data.investmentReturn+(this.showCharges?0:this.data.charges)),
        figureLabel = this.pixi.makeFigureLabel(this.pixi.tooltipLookup('investmentReturn'))
    figure.visible = figureLabel.visible = false
    app.stage.addChild(figure,figureLabel)

    // Create transfers coins
    this.pixi.pots = this.pixi.pots || {}
    this.pixi.pots.investmentReturn = []
    let numSquares = {num:0}, coinFill;

    // Init coin texture if present
    if(config.investmentReturnImage && this.pixi.resources[config.investmentReturnImage] && this.pixi.resources[config.investmentReturnImage].texture){
        coinFill = this.pixi.resources[config.investmentReturnImage].texture
    } else {
        coinFill = config.investmentReturnColor ? colorStringToInt(config.investmentReturnColor) : 0x702082
    }

    // Create speech
    let audioObjs = []
    if(this.data.employerContributions<=0){
        // Deferred
        audioObjs.push({
            id:'returnIn1',
            text: [
                'Although you are no longer actively contributing to your account,',
                'your account still grew by '+niceRound(this.data.investmentReturn+(this.showCharges?0:this.data.charges),true,this.currency.symbol)+', thanks to positive investment returns.'
            ]
        })
    } else {
        audioObjs.push({
            id:'returnIn1',
            text: 'Positive investment returns on your savings, also added to your account.'
        })
    }

    return {
        id: 'returnIn',
        tl: function () {
            let tl = new TimelineLite({ id: "returnIn" });
            tl.from([figure,figureLabel], 2, {
                y: -HEIGHT/8,
                pixi: { alpha: 0 }
            }); //t=0
            tl.to(numSquares, 3, {
                num: Math.ceil(Math.abs(that.data.investmentReturn+(that.showCharges?0:that.data.charges))/that.unit),
                ease: Power1.easeOut,
                onUpdate: function(tween){
                    let shouldBe = Math.max(0,Math.round(tween.target.num))
                    if(that.pixi.pots.investmentReturn.length > shouldBe){
                        while(that.pixi.pots.investmentReturn.length > shouldBe){
                            that.pixi.remove(that.pixi.pots.investmentReturn.pop())
                        }
                    } else {
                        while(that.pixi.pots.investmentReturn.length < shouldBe){
                            let x = b2WIDTH/2 + (Math.random()-0.5)*b2WIDTH/8,
                                y = Math.random()*-b2HEIGHT/4,
                                r = 0.25 //+Math.pow(Math.random(),12)*0.5 //TODO parameterise?
                            that.pixi.pots.investmentReturn.push(that.pixi.addB2Circle(x,y,r,coinFill,0,'investmentReturn'))
                        }
                    }
                    that.pixi.setBalanceFigure(that.data.startBalance+that.data.bulkTransfers+that.data.transfers+(that.data.bulkTransfers+that.data.transfers>0?that.data.withdrawals:0)+that.data.employeeContributions+that.data.employerContributions+Math.min(shouldBe * that.unit, that.data.investmentReturn+(that.showCharges?0:that.data.charges)))
                },
                onUpdateParams: ['{self}'],
            },"+=1") //t=3
            tl.to([figure,figureLabel],1,{
                pixi: { alpha:0 }
            },"-=1") //t=5
            figure.visible = figureLabel.visible = true
            return tl;
        },
        audio: audioObjs
    }

}