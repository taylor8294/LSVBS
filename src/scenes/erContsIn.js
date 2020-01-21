import { colorStringToInt, niceRound } from '../utils.js'

export default function (config) {
    // Init vars
    config = config || {}
    var that = this, { app, resources } = this.pixi
    var WIDTH = this.pixi.WIDTH, HEIGHT = this.pixi.HEIGHT;
    var b2WIDTH = this.box2d.WIDTH, b2HEIGHT = this.box2d.HEIGHT;

    // Create figure and figure label
    let figure = this.pixi.makeFigure(this.data.employerContributions),
        figureLabel = this.pixi.makeFigureLabel(this.pixi.tooltipLookup('erConts'))
    figure.visible = figureLabel.visible = false
    app.stage.addChild(figure,figureLabel)

    // Create transfers coins
    this.pixi.pots = this.pixi.pots || {}
    this.pixi.pots.erConts = []
    let numSquares = {num:0}, coinFill;

    // Init coin texture if present
    if(config.employerContsImage && this.pixi.resources[config.employerContsImage] && this.pixi.resources[config.employerContsImage].texture){
        coinFill = this.pixi.resources[config.employerContsImage].texture
    } else {
        coinFill = config.employerContsColor ? colorStringToInt(config.employerContsColor) : 0x009fd2
    }

    // Create speech
    let audioObjs = []
    if(that.data.employeeContributions <= 0){
        audioObjs.push({
            id:'erContsIn1',
            text: [
                'It looks like this year you didn\'t contribute anything into your Pension Account.',
                'However '+(that.user.employer ? that.user.employer : 'your employer')+' did contribute,',
                'adding in ' + niceRound(that.data.employerContributions, true, that.currency.symbol) + ' over the year.'
            ],
            ssml: '<speak>It looks like this year you didn\'t contribute anything into your Pension Account. However '+(that.user.employer ? that.user.employer : 'your employer')+' did con-tribute, adding in ' + niceRound(that.data.employerContributions, true, that.currency.symbol) + ' over the year.</speak>'
        })
    } else {
        audioObjs.push({
            id:'erContsIn1',
            text: [
                'On top of this, '+(that.user.employer ? that.user.employer : 'your employer')+' also contributed into your pension account.',
                'Adding in ' + niceRound(that.data.employerContributions, true, that.currency.symbol)+' through the year.'
            ]
        })
    }

    return {
        id: 'erContsIn',
        tl: function () {
            let tl = new TimelineLite({ id: "erContsIn" });
            tl.from([figure,figureLabel], 2, {
                y: -HEIGHT/8,
                pixi: { alpha: 0 }
            }); //t=0
            tl.to(numSquares, 3, {
                num: Math.ceil(Math.abs(that.data.employerContributions)/that.unit),
                ease: Power1.easeOut,
                onUpdate: function(tween){
                    let shouldBe = Math.max(0,Math.round(tween.target.num))
                    if(that.pixi.pots.erConts.length > shouldBe){
                        while(that.pixi.pots.erConts.length > shouldBe){
                            that.pixi.remove(that.pixi.pots.erConts.pop())
                        }
                    } else {
                        while(that.pixi.pots.erConts.length < shouldBe){
                            let x = b2WIDTH/2 + (Math.random()-0.5)*b2WIDTH/8,
                                y = Math.random()*-b2HEIGHT/4,
                                r = 0.25 //+Math.pow(Math.random(),12)*0.5 //TODO parameterise?
                            that.pixi.pots.erConts.push(that.pixi.addB2Circle(x,y,r,coinFill,0,'erConts'))
                        }
                    }
                    that.pixi.setBalanceFigure(that.data.startBalance+that.data.bulkTransfers+that.data.transfers+(that.data.bulkTransfers+that.data.transfers>0?that.data.withdrawals:0)+that.data.employeeContributions+Math.min(shouldBe * that.unit, that.data.employerContributions))
                },
                onUpdateParams: ['{self}'],
            },"+=1") //t=3
            tl.to([figure,figureLabel],1,{
                pixi: { alpha:0 }
            },"-=1") //t=5
            //interactive icon
            if(that.data.startBalance+that.data.bulkTransfers+that.data.transfers+that.data.employeeContributions <= 0 && that.pixi.interactive){
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
        audio: audioObjs
    }

}