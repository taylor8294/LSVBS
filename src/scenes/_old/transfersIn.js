export function transfersIn() {
    // Init vars
    var tl = new TimelineLite({ id: "transfersIn" }),
        addB2Circle = window.VBS.pixi.addB2Circle,
        user = window.VBS.user,
        b2WIDTH = window.VBS.b2.WIDTH,
        b2HEIGHT = window.VBS.b2.HEIGHT,
        pixiWIDTH = window.VBS.pixi.WIDTH,
        pixiHEIGHT = window.VBS.pixi.HEIGHT,
        stage = VBS.pixi.app.stage;
    
    tl.audios = [window.VBS.speech.getById('transfers')]

    // Text
    let figure = VBS.pixi.makeFigure(Math.max(user['Transfers']-user['Withdrawals'],0))
    stage.addChild(figure)
    let subtitle = VBS.pixi.makeSubtitle(VBS.user["Possessive"]+' Transfers')
    stage.addChild(subtitle)
    
    //Text in
    tl.from([figure,subtitle],1,{
      y: -pixiHEIGHT/8,
      pixi: {alpha:0}
    }) //t=0

    // Squares In
    let numSquares = {num:0}
    VBS.pots.transfers = []
    tl.to(numSquares, 3, {
        num: Math.ceil(Math.max(VBS.user['Transfers']-VBS.user['Withdrawals'],0)/VBS.unit),
        ease: Power1.easeOut,
        onUpdate: function(tween){
            let shouldBe = Math.max(0,Math.round(tween.target.num))
            if(VBS.pots.transfers.length > shouldBe){
                while(VBS.pots.transfers.length > shouldBe){
                  window.VBS.pixi.remove(VBS.pots.transfers[VBS.pots.transfers.length-1])
                  VBS.pots.transfers.pop()
                }
            } else {
                while(VBS.pots.transfers.length < shouldBe){
                    let x = b2WIDTH/2 + (Math.random()-0.5)*b2WIDTH/8,
                        y = Math.random()*-b2HEIGHT/4,
                        s = 0.25//+Math.pow(Math.random(),12)*0.5
                        //colors = [0xf68121,0xffb81c,0xc010a0,0x009fd2,0x702082,0x00c389]
                    VBS.pots.transfers.push(addB2Circle(x,y,r,0xffb81c,0,'Transfers'))//colors[Math.floor(Math.random()*colors.length)]))
                }
            }
            VBS.pixi.setBalanceFigure(user['StartBalance']+Math.min(shouldBe * VBS.unit, Math.max(user['Transfers']+user['Withdrawals'],0)))
        },
        onUpdateParams: ['{self}'],
    },"+=2") //t=3
        
    if (user['StartBalance'] <= 0) {
        // Interactive icon
        tl.to(VBS.pixi.interactive, 1, {pixi:{alpha: 1}}, "-=3") //t=3
        tl.to(VBS.pixi.interactive, 0.33, {x:VBS.pixi.interactive.x+5,y:VBS.pixi.interactive.y-5}) //t=4
        tl.to(VBS.pixi.interactive, 0.33, {x:VBS.pixi.interactive.x-5,y:VBS.pixi.interactive.y+5})
        tl.to(VBS.pixi.interactive, 0.34, {x:VBS.pixi.interactive.x+5,y:VBS.pixi.interactive.y-5})
        tl.to(VBS.pixi.interactive, 0.33, {x:VBS.pixi.interactive.x-5,y:VBS.pixi.interactive.y+5}) //t=5
        tl.to(VBS.pixi.interactive, 0.33, {x:VBS.pixi.interactive.x+5,y:VBS.pixi.interactive.y-5}) 
        tl.to(VBS.pixi.interactive, 0.34, {x:VBS.pixi.interactive.x-5,y:VBS.pixi.interactive.y+5})
        tl.to(VBS.pixi.interactive, 0.33, {x:VBS.pixi.interactive.x+5,y:VBS.pixi.interactive.y-5}) //t=6
        tl.to(VBS.pixi.interactive, 0.33, {x:VBS.pixi.interactive.x-5,y:VBS.pixi.interactive.y+5})
        tl.to(VBS.pixi.interactive, 1, {pixi:{alpha: 0}},"+=0.34") //t=7
        tl.to(VBS.pixi.interactiveText, 1, {pixi:{alpha: 1}}, "-=7") //t=1? (nope 3)
        tl.to(VBS.pixi.interactiveText, 1, {pixi:{alpha: 0}}, "-=1") //t=7
    }

    //Text out
    tl.to([figure,subtitle],1,{
        pixi: {alpha:0}
    }, user['StartBalance'] <= 0 ? undefined : "+=2") //t=8
    
    return tl;
  }