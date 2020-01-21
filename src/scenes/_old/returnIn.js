export function returnIn() {
    // Init vars
    var tl = new TimelineLite({ id: "returnIn" }),
        addB2Circle = window.VBS.pixi.addB2Circle,
        user = window.VBS.user,
        b2WIDTH = window.VBS.b2.WIDTH,
        b2HEIGHT = window.VBS.b2.HEIGHT,
        pixiWIDTH = window.VBS.pixi.WIDTH,
        pixiHEIGHT = window.VBS.pixi.HEIGHT,
        stage = window.VBS.pixi.app.stage;
    
    tl.audios = [VBS.speech.getById('return')];

    // Text
    let figure = VBS.pixi.makeFigure(Math.max(user['Return'],0))
    stage.addChild(figure)
    let subtitle = VBS.pixi.makeSubtitle(VBS.user["Possessive"]+' Investments')
    stage.addChild(subtitle)
    
    //Text in
    tl.from([figure,subtitle],1,{
      y: -pixiHEIGHT/8,
      pixi: {alpha:0}
    }) //t=0
    
    // Squares In
    let numSquares = {num:0}, afterCharges = VBS.user['Return']+VBS.user['Charges'] > 0 ? Math.ceil((VBS.user['Return']+VBS.user['Charges'])/VBS.unit) : 0
    VBS.pots.return = []
    tl.to(numSquares, 3, {
        num: afterCharges+1,
        ease: Power1.easeOut,
        onUpdate: function(tween){
            let shouldBe = Math.max(0,Math.round(tween.target.num))
            if(VBS.pots.return.length > shouldBe){
                while(VBS.pots.return.length > shouldBe){
                  window.VBS.pixi.remove(VBS.pots.return[VBS.pots.return.length-1])
                  VBS.pots.return.pop()
                }
            } else {
                while(VBS.pots.return.length < shouldBe){
                    let x = b2WIDTH/2 + (Math.random()-0.5)*b2WIDTH/8,
                        y = Math.random()*-b2HEIGHT/4,
                        r = 0.25//+Math.pow(Math.random(),12)*0.5
                        //colors = [0xf68121,0xffb81c,0x009fd2,0xc010a0,0x702082,0x00c389]
                    VBS.pots.return.push(addB2Circle(x,y,r,0xc010a0,0,'Investments'))//colors[Math.floor(Math.random()*colors.length)]))
                }
            }
            VBS.pixi.setBalanceFigure(user['StartBalance']+user['Transfers']+user['Withdrawals']+user['ContributionsEE']+user['ContributionsER']+Math.min(shouldBe * VBS.unit, user['Return']))
        },
        onUpdateParams: ['{self}'],
    })

    //Text out
    tl.to([figure,subtitle],1,{
      pixi: {alpha:0}
    },"+=2") //t=8
    
    return tl;
  }