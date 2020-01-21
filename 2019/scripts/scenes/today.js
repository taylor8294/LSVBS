export function today() {
    // Init vars
    var tl = new TimelineLite({ id: "today" }),
        stage = window.VBS.pixi.app.stage,
        arrow = window.VBS.pixi.arrow,
        WIDTH = VBS.pixi.WIDTH,
        HEIGHT = VBS.pixi.HEIGHT,
        user = VBS.user;
    
    if (user['Scheme']==5 && user['Category']==5001)
      tl.audios = [VBS.speech.getById('todayTWPS0'),VBS.speech.getById('todayTWPS1')]
    else
      tl.audios = [VBS.speech.getById('today')]
    
    // let audioDur = 0
    // for(let i=0;i<tl.audios.length;i++){
    //     audioDur += tl.audios[i].howl.duration()
    // }

    let $headlineBalance = $('.summary-bar .column-2').eq(0)
    $headlineBalance.css({
      position:'relative',
      zIndex:98,
      backgroundColor: '#ededed'
    })
  
  // Build text
  let subtitleStyle = VBS.pixi.baseTextStyle.clone()
  subtitleStyle.fontSize = 28
  subtitleStyle.fontWeight = '400'
  subtitleStyle.align = 'center'
  let subtitleText = 'Your LifeSight Account today',
    textMetrics = PIXI.TextMetrics.measureText(subtitleText, subtitleStyle)
  let subtitle = new PIXI.Text(subtitleText, subtitleStyle);
  subtitle.anchor.set(0.5)
  subtitle.position.set(WIDTH/2, 2*textMetrics.height)
  subtitle.scale.set(0)
  stage.addChild(subtitle)

  // Point to balance
  let pointer = VBS.pixi.pointer //built in pixi setup
  tl.to(pointer, 1, {
    pixi: {
      alpha: 1,
      rotation: 0
    },
    ease: Power1.easeInOut,
    onUpdate: function(tween){
      if(tween.ratio < 0.25)
        $headlineBalance.css('zIndex',98)
      else if(tween.ratio > 0.75)
        $headlineBalance.css('zIndex',99)
    },
    onUpdateParams: ['{self}']
  }) //t=
  tl.to(subtitle, 4, {
    pixi: {scale:1.5},
    ease: Power0.easeNone
  }) //t=
  tl.to(subtitle, 2, {
    pixi: {alpha: 0},
    ease: Power1.easeOut
  },'-=2') //t=
  tl.to(pointer, 1, {
    y:"-=40",
    yoyo:true,
    repeat: user['Scheme']==5 && user['Category']==5001 && user['Balance']>user['EndBalance'] ? 8 : 4,
    onComplete: function(){
      $headlineBalance.css('zIndex',98)
    }
  },'-=4')
    
  return tl;
}