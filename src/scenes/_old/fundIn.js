export function fundIn() {
    // Init vars
    var tl = new TimelineLite({ id: "fundIn" }),
        addB2Circle = window.VBS.pixi.addB2Circle,
        user = window.VBS.user,
        b2WIDTH = window.VBS.b2.WIDTH,
        b2HEIGHT = window.VBS.b2.HEIGHT,
        pixiWIDTH = window.VBS.pixi.WIDTH,
        pixiHEIGHT = window.VBS.pixi.HEIGHT,
        stage = VBS.pixi.app.stage;
    
    if (user['StartBalance'] > 0) 
        tl.audios = [VBS.speech.getById('fundIn')]
    else
        tl.audios = []
    
    // Subtitle added in jarIn
    // Interactive icon & text added in pixiSetup
    
    if (user['StartBalance'] > 0) {
        // Squares In
        let numSquares = {num:0}
        VBS.pots.start = []
        tl.to(numSquares, 3, {
            num: Math.ceil(Math.abs(VBS.user['StartBalance'])/VBS.unit),
            ease: Power1.easeOut,
            onStart: function(){ VBS.pixi.app.renderer.plugins.interaction.autoPreventDefault = true },
            onUpdate: function(tween){
                let shouldBe = Math.max(0,Math.round(tween.target.num))
                if(VBS.pots.start.length > shouldBe){
                    while(VBS.pots.start.length > shouldBe){
                    VBS.pixi.remove(VBS.pots.start[VBS.pots.start.length-1])
                    VBS.pots.start.pop()
                    }
                } else {
                    while(VBS.pots.start.length < shouldBe){
                        let x = b2WIDTH/2 + (Math.random()-0.5)*b2WIDTH/8,
                            y = Math.random()*-b2HEIGHT/4,
                            r = 0.25//+Math.pow(Math.random(),12)*0.5
                            //colors = [0xf68121,0xffb81c,0xc010a0,0x009fd2,0x702082,0x00c389]
                        VBS.pots.start.push(addB2Circle(x,y,r,0xf68121,0,'Starting Balance'))//colors[Math.floor(Math.random()*colors.length)]))
                    }
                }
                VBS.pixi.setBalanceFigure(Math.min(shouldBe * VBS.unit, user['StartBalance']))
            },
            onUpdateParams: ['{self}'],
        },"+=2") //t=2
        
        // Interactive icon
        tl.to(VBS.pixi.interactive, 1, {pixi:{alpha: 1}}, "-=3") //t=2
        tl.to(VBS.pixi.interactive, 0.33, {x:VBS.pixi.interactive.x+5,y:VBS.pixi.interactive.y-5}) //t=3
        tl.to(VBS.pixi.interactive, 0.33, {x:VBS.pixi.interactive.x-5,y:VBS.pixi.interactive.y+5})
        tl.to(VBS.pixi.interactive, 0.34, {x:VBS.pixi.interactive.x+5,y:VBS.pixi.interactive.y-5})
        tl.to(VBS.pixi.interactive, 0.33, {x:VBS.pixi.interactive.x-5,y:VBS.pixi.interactive.y+5}) //t=4
        tl.to(VBS.pixi.interactive, 0.33, {x:VBS.pixi.interactive.x+5,y:VBS.pixi.interactive.y-5}) 
        tl.to(VBS.pixi.interactive, 0.34, {x:VBS.pixi.interactive.x-5,y:VBS.pixi.interactive.y+5})
        tl.to(VBS.pixi.interactive, 0.33, {x:VBS.pixi.interactive.x+5,y:VBS.pixi.interactive.y-5}) //t=5
        tl.to(VBS.pixi.interactive, 0.33, {x:VBS.pixi.interactive.x-5,y:VBS.pixi.interactive.y+5})
        tl.to(VBS.pixi.interactive, 1, {pixi:{alpha: 0}},"+=1.34") //t=7
        tl.to(VBS.pixi.interactiveText, 1, {pixi:{alpha: 1}}, "-=8") //t=0? (nope 2)
        tl.to(VBS.pixi.interactiveText, 1, {pixi:{alpha: 0}}, "-=1") //t=7
    }

    //Text out
    let subtitle = VBS.pixi.startSubtitle;
    tl.to(VBS.pixi.balanceFigure,1,{
        pixi: {scale:1.2}
    },user['StartBalance'] > 0 ? "-=4" : undefined) //t=4 or 0
    tl.to(VBS.pixi.balanceFigure,1,{
        pixi: {scale:1}
    },user['StartBalance'] > 0 ? "-=3" : undefined) //t=5 or 1
    tl.to(subtitle,1,{
        pixi: { alpha:0 }
    },user['StartBalance'] > 0 ? "-=2" : undefined) //t=6 or 2
    tl.to(VBS.pixi.balanceFigure,3,{
        y: 7*pixiHEIGHT/8-VBS.pixi.balanceFigure.height/2,
        ease: Power2.easeOut
    }, "-=1") //t=6 or 2
    
    return tl;
  }