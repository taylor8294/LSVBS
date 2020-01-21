export function end() {
    // Init vars
    var tl = new TimelineLite({ id: "end" }),
        stage = window.VBS.pixi.app.stage,
        arrow = window.VBS.pixi.arrow,
        WIDTH = VBS.pixi.WIDTH,
        HEIGHT = VBS.pixi.HEIGHT,
        user = VBS.user;
  
    tl.audios = [VBS.speech.getById('finish')]
    
    let audioDur = 0
    for(let i=0;i<tl.audios.length;i++){
        audioDur += tl.audios[i].howl.duration()
    }
    
    // Button
    var button = new PIXI.Container(),
        buttonBg = new PIXI.Graphics(),
        buttonTextSize = 30,
        buttonTextStyle = new PIXI.TextStyle({fontFamily : ['Franklin-Gothic-Demi', 'Franklin Gothic Demi', 'Franklin Gothic Medium', 'Franklin Gothic', 'ITC Franklin Gothic', 'Arial', 'ArialMT', 'sans-serif'], fontSize: buttonTextSize, fill : 0xFFFFFF, align : 'left'}),
        buttonTextString = "Open my Benefit Statement",
        buttonTextMetrics = PIXI.TextMetrics.measureText(buttonTextString, buttonTextStyle),
        buttonH = buttonTextMetrics.height*1.5,
        buttonW = buttonTextMetrics.width+30,
        buttonText = new PIXI.Text(buttonTextString, buttonTextStyle);
    
    buttonBg.beginFill(0x009fd2)
    buttonBg.drawRect(0, 0, buttonW, buttonH)
    buttonBg.moveTo(buttonW, 0);
    buttonBg.lineTo(buttonW+20, buttonH/2);
    buttonBg.lineTo(buttonW, buttonH);
    buttonBg.endFill()

    buttonText.position.set(15, buttonTextMetrics.height*0.25)
    
    button.addChild(buttonBg,buttonText);
    button.interactive = true;
    button.buttonMode = true;
    button.hitArea = new PIXI.Rectangle(0, 0, buttonW, buttonH);
    button.on('click', function(e) {
        VBS.tracker.trackEvent('click-BenStat')
        VBS.tracker.finish()
        window.open(VBS.user["BenStatLink"],'_blank')
    })
    button.on('touchend', function(e) {
        VBS.tracker.trackEvent('click-BenStat')
        VBS.tracker.finish()
        window.open(VBS.user["BenStatLink"],'_blank')
    })
    button.on('pointerover', function(e) { button.scale.x *= 1.05;button.scale.y *= 1.05; })
    button.on('pointerout', function(e) { button.scale.x *= 1/1.05;button.scale.y *= 1/1.05; })
    button.pivot.set((buttonW+20)/2,buttonH/2);
    button.position.set(WIDTH/2, 9*HEIGHT/8)
    //button.cacheAsBitmap = true
    button.alpha = 0
    stage.addChild(button)

    /*tl.staggerTo(VBS.pixi.reportPages,1,{
        x: WIDTH/2
    },0.5)//t=0*/

    
    // Jar in
    tl.to({a:0},2,{
        a: 1,
        onStart: function(){ VBS.pixi.app.renderer.plugins.interaction.autoPreventDefault = true },
        onUpdate: function(tween){
            for(let key of Object.keys(VBS.pots)){
                for(let sq of VBS.pots[key])
                    sq.alpha = tween.target.a
            }
            VBS.pixi.jar.alpha = tween.target.a
        },
        onUpdateParams: ['{self}']
    }) //t=

    //Button in
    tl.to(button,1,{
        y: 7*HEIGHT/8,
        pixi: {alpha: 1},
        ease: Power2.easeOut
    },'+=3')//t=5
    tl.to({delayEnd:0},Math.max(audioDur-4,2),{
        delayEnd: 1,
        ease: Power0.easeNone
    })
    
    return tl;
  }