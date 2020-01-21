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

    // Create pot to hold coins to remove
    this.pixi.pots = this.pixi.pots || {}
    this.pixi.pots.investmentReturn = {}
    var tweenObj = {x:0}

    return {
        id: 'returnOut',
        tl: function () {
            let tl = new TimelineLite({ id: "returnOut" });
            tl.from([figure,figureLabel], 2, {
                y: HEIGHT/2,
                pixi: { alpha: 0 }
            }); //t=0
            tl.to(tweenObj, 2, {
                x: 1,
                ease: Power1.easeOut,
                onStart: function(){
                    let n = Math.ceil(Math.abs(that.data.investmentReturn+(that.showCharges?0:that.data.charges))/that.unit)
                    that.pixi.pots.investmentReturn = that.pixi.gimme(n)
                },
                onUpdate: function(tween){
                    Object.keys(that.pixi.pots.investmentReturn).forEach(key => {
                        that.pixi.pots.investmentReturn[key].forEach(coin => coin.alpha = 1-tween.target.x)
                    })
                    that.pixi.setBalanceFigure(that.data.startBalance+that.data.bulkTransfers+that.data.transfers+(that.data.bulkTransfers+that.data.transfers>0?that.data.withdrawals:0)+that.data.employeeContributions+that.data.employerContributions+Math.round((that.data.investmentReturn+(that.showCharges?0:that.data.charges))*tween.target.x))
                },
                onUpdateParams: ['{self}'],
                onComplete: function(){
                    let toRemove = []
                    Object.keys(that.pixi.pots.investmentReturn).forEach(key => {
                        toRemove = toRemove.concat(that.pixi.pots.investmentReturn[key])
                    })
                    that.box2d.toRemove = that.box2d.toRemove.concat(toRemove); // Removal handled in update step for stability
                    that.pixi.pots.investmentReturn = {}
                    that.pixi.setBalanceFigure(that.data.startBalance+that.data.bulkTransfers+that.data.transfers+(that.data.bulkTransfers+that.data.transfers>0?that.data.withdrawals:0)+that.data.employeeContributions+that.data.employerContributions+that.data.investmentReturn+(that.showCharges?0:that.data.charges))
                },
            }) //t=2
            tl.to([figure,figureLabel],1,{
                pixi: { alpha:0 }
            },"-=1") //t=3
            figure.visible = figureLabel.visible = true
            return tl;
        },
        audio: [{
            id:'returnOut1',
            text: [
                'Over the year, your investments have decreased in value,',
                'reducing your pension account. But remember,',
                'this is just a snapshot, and pension savings are',
                'long term investments. Their value is expected to',
                'go up, and down, over time.'
            ],
            ssml: '<speak>Over the year, your investments have decreased in value, reducing your pension account. But remember, this is just a snapshot, and pension savings are long term investments. Their value is expected to go up. <emphasis level="strong">and down.</emphasis> Over time.</speak>'
        }]
    }

}