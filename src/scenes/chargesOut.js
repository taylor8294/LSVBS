import { colorStringToInt, niceRound } from '../utils.js'

export default function (config) {
    // Init vars
    config = config || {}
    var that = this, { app, resources } = this.pixi
    var WIDTH = this.pixi.WIDTH, HEIGHT = this.pixi.HEIGHT;
    var b2WIDTH = this.box2d.WIDTH, b2HEIGHT = this.box2d.HEIGHT;

    // Create figure and figure label
    let figure = this.pixi.makeFigure(this.data.charges),
        figureLabel = this.pixi.makeFigureLabel(this.pixi.tooltipLookup('charges'))
    figure.visible = figureLabel.visible = false
    app.stage.addChild(figure,figureLabel)

    // Create pot to hold coins to remove
    this.pixi.pots = this.pixi.pots || {}
    this.pixi.pots.charges = {}
    var tweenObj = {x:0}

    return {
        id: 'chargesOut',
        tl: function () {
            let tl = new TimelineLite({ id: "chargesOut" });
            tl.from([figure,figureLabel], 2, {
                y: HEIGHT/2,
                pixi: { alpha: 0 }
            }); //t=0
            tl.to(tweenObj, 2, {
                x: 1,
                ease: Power1.easeOut,
                onStart: function(){
                    let n = Math.ceil(Math.abs(that.data.charges)/that.unit)
                    that.pixi.pots.charges = that.pixi.gimme(n,["investmentReturn","transfers","start","erConts","eeConts"])
                },
                onUpdate: function(tween){
                    Object.keys(that.pixi.pots.charges).forEach(key => {
                        that.pixi.pots.charges[key].forEach(coin => coin.alpha = 1-tween.target.x)
                    })
                    that.pixi.setBalanceFigure(that.data.startBalance+that.data.bulkTransfers+that.data.transfers+that.data.withdrawals+that.data.employeeContributions+that.data.employerContributions+that.data.investmentReturn+Math.round(that.data.charges*tween.target.x))
                },
                onUpdateParams: ['{self}'],
                onComplete: function(){
                    let toRemove = []
                    Object.keys(that.pixi.pots.charges).forEach(key => {
                        toRemove = toRemove.concat(that.pixi.pots.charges[key])
                    })
                    that.box2d.toRemove = that.box2d.toRemove.concat(toRemove); // Removal handled in update step for stability
                    that.pixi.pots.charges = {}
                    that.pixi.setBalanceFigure(that.data.startBalance+that.data.bulkTransfers+that.data.transfers+that.data.withdrawals+that.data.employeeContributions+that.data.employerContributions+that.data.investmentReturn+that.data.charges)
                },
            }) //t=2
            tl.to([figure,figureLabel],1,{
                pixi: { alpha:0 }
            },"-=1") //t=3
            figure.visible = figureLabel.visible = true
            return tl;
        },
        audio: [{
            id:'chargesOut1',
            text: 'Lastly, this represents the member fee that you paid to help manage your investments, and the running of your Account.'
        }]
    }

}