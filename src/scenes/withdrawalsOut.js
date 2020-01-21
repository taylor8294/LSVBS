import { colorStringToInt, niceRound } from '../utils.js'

export default function (config) {
    // Init vars
    config = config || {}
    var that = this, { app, resources } = this.pixi
    var WIDTH = this.pixi.WIDTH, HEIGHT = this.pixi.HEIGHT;
    var b2WIDTH = this.box2d.WIDTH, b2HEIGHT = this.box2d.HEIGHT;

    // Create figure and figure label
    let figure = this.pixi.makeFigure(this.data.withdrawals),
        figureLabel = this.pixi.makeFigureLabel(this.pixi.tooltipLookup('withdrawals'))
    figure.visible = figureLabel.visible = false
    app.stage.addChild(figure,figureLabel)

    // Create pot to hold withdrawn coins
    this.pixi.pots = this.pixi.pots || {}
    this.pixi.pots.withdrawals = {}
    var tweenObj = {x:0}

    // Create speech
    let audioObjs = []
    if(this.data.bulkTransfers+this.data.transfers>0){
        audioObjs.push({
            id:'withdrawalsOut1',
            text: [
                'However, withdrawals of ' + niceRound(Math.abs(that.data.withdrawals), true, that.currency.symbol) + ' also occurred over the year,',
                'so we\'ll take that out.'
            ]
        })
    } else {
        audioObjs.push({
            id:'withdrawalsOut1',
            text: [
                'Withdrawals totaling ' + niceRound(Math.abs(that.data.withdrawals), true, that.currency.symbol) + ' were',
                'made during the year. Let\'s take that out now.'
            ]
        })
    }

    return {
        id: 'withdrawalsOut',
        tl: function () {
            let tl = new TimelineLite({ id: "withdrawalsOut" });
            tl.from([figure,figureLabel], 2, {
                y: HEIGHT/2,
                pixi: { alpha: 0 }
            }); //t=0
            tl.to(tweenObj, 2, {
                x: 1,
                ease: Power1.easeOut,
                onStart: function(){
                    let n = Math.ceil(Math.abs(that.data.withdrawals)/that.unit)
                    that.pixi.pots.withdrawals = that.pixi.gimme(n)
                },
                onUpdate: function(tween){
                    Object.keys(that.pixi.pots.withdrawals).forEach(key => {
                        that.pixi.pots.withdrawals[key].forEach(coin => coin.alpha = 1-tween.target.x)
                    })
                    that.pixi.setBalanceFigure(that.data.startBalance+that.data.bulkTransfers+that.data.transfers+(that.data.bulkTransfers+that.data.transfers<=0?that.data.employeeContributions+that.data.employerContributions+that.data.investmentReturn+(that.showCharges?0:that.data.charges):0)+Math.round(that.data.withdrawals*tween.target.x))
                },
                onUpdateParams: ['{self}'],
                onComplete: function(){
                    let toRemove = []
                    Object.keys(that.pixi.pots.withdrawals).forEach(key => {
                        toRemove = toRemove.concat(that.pixi.pots.withdrawals[key])
                    })
                    that.box2d.toRemove = that.box2d.toRemove.concat(toRemove); // Removal handled in update step for stability
                    that.pixi.pots.withdrawals = {}
                    that.pixi.setBalanceFigure(that.data.startBalance+that.data.bulkTransfers+that.data.transfers+(that.data.bulkTransfers+that.data.transfers<=0?that.data.employeeContributions+that.data.employerContributions+that.data.investmentReturn+(that.showCharges?0:that.data.charges):0)+that.data.withdrawals)
                },
            }) //t=2
            tl.to([figure,figureLabel],1,{
                pixi: { alpha:0 }
            },"-=1") //t=3
            figure.visible = figureLabel.visible = true
            return tl;
        },
        audio: audioObjs
    }

}