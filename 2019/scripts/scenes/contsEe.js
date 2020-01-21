export function contsEe() {
    // Init vars
    var tl = new TimelineLite({ id: "contsEe" }),
        addB2Rect = window.VBS.pixi.addB2Rect,
        user = window.VBS.user,
        b2WIDTH = window.VBS.b2.WIDTH,
        b2HEIGHT = window.VBS.b2.HEIGHT,
        pixiWIDTH = window.VBS.pixi.WIDTH,
        pixiHEIGHT = window.VBS.pixi.HEIGHT,
        stage = window.VBS.pixi.app.stage;
    
    if (user['ContributionsEE'] > 0)
      tl.audios = [VBS.speech.getById('contsEe0'),VBS.speech.getById('contsEe1')]
    else
      tl.audios = [VBS.speech.getById('contsEe')];

    // Text
    let figure = VBS.pixi.makeFigure(user['ContributionsEE'])
    stage.addChild(figure)
    let subtitle = VBS.pixi.makeSubtitle(VBS.user["Possessive"]+' Contributions')
    stage.addChild(subtitle)
    
    //Text in
    tl.from([figure,subtitle],1,{
      y: -pixiHEIGHT/8,
      pixi: {alpha:0}
    }) //t=0
    
    // Squares In
    let numSquares = {num:0}
    VBS.pots.contsEe = []
    tl.to(numSquares, 3, {
        num: Math.ceil(VBS.user['ContributionsEE']/VBS.unit),
        ease: Power1.easeOut,
        onUpdate: function(tween){
            let shouldBe = Math.max(0,Math.round(tween.target.num))
            if(VBS.pots.contsEe.length > shouldBe){
                while(VBS.pots.contsEe.length > shouldBe){
                  window.VBS.pixi.remove(VBS.pots.contsEe[VBS.pots.contsEe.length-1])
                  VBS.pots.contsEe.pop()
                }
            } else {
                while(VBS.pots.contsEe.length < shouldBe){
                    let x = b2WIDTH/2 + (Math.random()-0.5)*b2WIDTH/8,
                        y = Math.random()*-b2HEIGHT/4,
                        s = 0.5//+Math.pow(Math.random(),12)*0.5
                        //colors = [0xf68121,0xffb81c,0xc010a0,0x009fd2,0x702082,0x00c389]
                    VBS.pots.contsEe.push(addB2Rect(x,y,s,s,0x009fd2,0,0,VBS.user["Possessive"]+' Contributions'))
                }
            }
            VBS.pixi.setBalanceFigure(user['StartBalance']+user['Transfers']+user['Withdrawals']+Math.min(shouldBe * VBS.unit, user['ContributionsEE']))
        },
        onUpdateParams: ['{self}'],
    },"+=3") //t=4

    //Text out
    tl.to([figure,subtitle],1,{
      pixi: {alpha:0}
    },VBS.user['ContributionsEE'] > 0 ? "+=2" : "-=1") //t=9
    
    return tl;
  }