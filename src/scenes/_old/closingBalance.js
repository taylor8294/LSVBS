export function closingBalance() {
    // Init vars
    var tl = new TimelineLite({ id: "endBalance" }),
        user = window.VBS.user,
        pixiWIDTH = window.VBS.pixi.WIDTH,
        pixiHEIGHT = window.VBS.pixi.HEIGHT,
        stage = VBS.pixi.app.stage;

    tl.audios = [VBS.speech.getById('end')]

    // Text
    let subtitle = VBS.pixi.makeSubtitle(user['EndDate'].toFormattedString())
    stage.addChild(subtitle)

    //Text in
    let textMetrics = PIXI.TextMetrics.measureText('£0', VBS.pixi.balanceFigureStyle)
    tl.to(VBS.pixi.balanceFigure,2,{
        x: pixiWIDTH/2,
        y: textMetrics.height
    }) //t=0
    tl.to(VBS.pixi.jarSubtitle,0.5,{
      pixi: {alpha:0}
    },"-=2") //t=
    tl.from(subtitle,1,{
        y: -pixiHEIGHT/8,
        pixi: {alpha:0}
    },"-=1") //t=0
    
    //Text out
    tl.to([subtitle,VBS.pixi.balanceFigure],2,{
        pixi: {alpha:0}
    },"+=8") //t=
    
    // Jar out
    tl.to({a:1},2,{
        a: 0,
        onStart: function(){
            VBS.pixi.tooltipOut()
            VBS.pixi.app.renderer.plugins.interaction.autoPreventDefault = false
        },
        onUpdate: function(tween){
            for(let key of Object.keys(VBS.pots)){
                for(let sq of VBS.pots[key])
                    sq.alpha = tween.target.a
            }
            VBS.pixi.jar.alpha = tween.target.a
        },
        onUpdateParams: ['{self}']
    }, "-=2") //t=
    
    return tl;
  }