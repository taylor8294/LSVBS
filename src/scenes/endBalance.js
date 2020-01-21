import { colorStringToInt, niceRound } from '../utils.js'

export default function (config) {
    // Init vars
    config = config || {}
    var { app, resources } = this.pixi, that = this
    var WIDTH = this.pixi.WIDTH, HEIGHT = this.pixi.HEIGHT;

    // Create end date figure label
    let figureLabel = this.pixi.balanceFigureLabelEnd = this.pixi.makeFigureLabel(this.data.endDate.toFormattedString())
    figureLabel.visible = false
    app.stage.addChild(figureLabel)

    // Create audio
    let closingAudio = [
        'Meaning the closing balance on your Account,',
        'as at ' + this.data.endDate.toFormattedString() + ', was ' + niceRound(this.data.endBalance, true, this.currency.symbol) + '.'
    ]
    if (this.data.startBalance > 0 && this.data.endBalance - this.data.startBalance > 900) {
        closingAudio.push('That\'s ' + niceRound(this.data.endBalance - this.data.startBalance) + ' up on the year before.')
    }

    return {
        id: 'endBalance',
        tl: function () {
            let tl = new TimelineLite({ id: "endBalance" });
            tl.to(that.pixi.balanceFigure, 3, {
                y: that.pixi.balanceFigure.height/2
            }); //t=0
            tl.to(that.pixi.jarLabel,1,{
                pixi: { alpha: 0 }
            },"-=3")//t=0
            tl.from(figureLabel, 2, {
                y: -HEIGHT/8,
                pixi: { alpha: 0 }
            },"-=2"); //t=1
            tl.to(that.pixi.balanceFigure,1,{
                pixi: {scale:1.2}
            })
            tl.to(that.pixi.balanceFigure,1,{
                pixi: {scale:1}
            })
            tl.to({x:0},2,{ //dummy transition to delay
                x:1
            })
            figureLabel.visible = true; //Can now make visible
            return tl;
        },
        audio: [{
            id: 'endBalance1',
            text: closingAudio
        }]
    }

}