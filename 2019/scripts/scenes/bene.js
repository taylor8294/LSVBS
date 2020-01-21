export function bene() {
    // Init vars
    var tl = new TimelineLite({ id: "bene" }),
        stage = window.VBS.pixi.app.stage,
        WIDTH = VBS.pixi.WIDTH,
        HEIGHT = VBS.pixi.HEIGHT,
        user = VBS.user;
  
    tl.audios = [VBS.speech.getById('bene')]
    
    // let audioDur = 0
    // for(let i=0;i<tl.audios.length;i++){
    //     audioDur += tl.audios[i].howl.duration()
    // }
    
    let $tasksPanelBody = $('#panelBodyPNL_ENGJMNT_TRACKER'),
        $tasksPanel = $tasksPanelBody.parents('.panel').eq(0)
    $tasksPanel.css('position','relative')
    $tasksPanel.css('zIndex',98)
    // tl.to({prog:0},audioDur+1,{
    //     prog: 1,
    //     ease: Power0.easeNone,
    //     onUpdate: function(tween){
    //         if(
    //             (tween.target.prog < 0.1 || tween.target.prog > 0.9) &&
    //             (Number.isNaN(+$tasksPanel.css('zIndex')) || parseInt($tasksPanel.css('zIndex')) > 98)
    //         ){
    //             $tasksPanel.css('zIndex',98)
    //         } else if(
    //             tween.target.prog > 0.1 && tween.target.prog < 0.9 &&
    //             (Number.isNaN(+$tasksPanel.css('zIndex')) || parseInt($tasksPanel.css('zIndex')) < 99)
    //         ){
    //             if(!$tasksPanelBody.hasClass('open')) $tasksPanelBody.prev().children().eq(0).click()
    //             $tasksPanel.css('zIndex',99)
    //         }
    //     },
    //     onUpdateParams: ['{self}']
    // })

  /* Look to task list
  tl.to(VBS.pixi.eyeState, 1.5, {
    angle: $(window).width() < 600 ? 90 : $(window).width() < 1200 ? 150 : 0,
    ease: Power1.easeInOut,
    onUpdate: function(tween){
      if(tween.ratio < 0.1) $tasksPanel.css('zIndex',98)
      else if(!$tasksPanelBody.hasClass('open')) $tasksPanelBody.prev().children().eq(0).click()
      else $tasksPanel.css('zIndex',99)
      if(VBS.pixi.eyes.alpha != 1) VBS.pixi.eyes.alpha = 1
      VBS.pixi.drawEyes(tween.target)
    },
    onUpdateParams: ['{self}']
  }) //t=3.4

  // Fade out eyes and remove tasks highlight
  tl.to({a:1}, 1, {
      a:0,
      ease: Power1.easeOut,
      onUpdate: function(tween){
        VBS.pixi.eyes.alpha = tween.target.a
        $tasksPanel.css('zIndex',99)
        if(tween.ratio > 0.95) $tasksPanel.css('zIndex',98)
      },
      onUpdateParams: ['{self}']
  },audioDur)*/

  // Build text
  let subtitleStyle = VBS.pixi.baseTextStyle.clone()
  subtitleStyle.fontSize = 28
  subtitleStyle.fontWeight = '400'
  subtitleStyle.align = 'center'
  let subtitleText = 'Remember to provide details',
    textMetrics = PIXI.TextMetrics.measureText(subtitleText, subtitleStyle)
  let firstSubtitle = new PIXI.Text(subtitleText, subtitleStyle);
  firstSubtitle.anchor.set(0.5)
  firstSubtitle.position.set(WIDTH/2, 2*textMetrics.height)
  firstSubtitle.scale.set(0)
  subtitleText = 'of your beneficiaries'
  textMetrics = PIXI.TextMetrics.measureText(subtitleText, subtitleStyle)
  let secondSubtitle = new PIXI.Text(subtitleText, subtitleStyle);
  secondSubtitle.anchor.set(0.5)
  secondSubtitle.position.set(WIDTH/2, 2*textMetrics.height)
  secondSubtitle.scale.set(0)
  stage.addChild(firstSubtitle,secondSubtitle)

  // Point to task list
  let pointer = VBS.pixi.pointer,
      degrees = $(window).width() < 600 ? -180 : $(window).width() < 1200 ? -120 : 80,
      radians = degrees*Math.PI/180
  
  tl.to(pointer, 1, {
    pixi: {
      rotation: degrees
    },
    ease: Power1.easeInOut,
    onUpdate: function(tween){
      if(tween.ratio < 0.25)
        $tasksPanel.css('zIndex',98)
      else if(tween.ratio > 0.75){
        if(!$tasksPanelBody.hasClass('open')) $tasksPanelBody.prev().children().eq(0).click()
        $tasksPanel.css('zIndex',99)
      }
    },
    onUpdateParams: ['{self}']
  }) //t=0
  tl.to(firstSubtitle, 4, {
    pixi: {scale:1.5},
    ease: Power0.easeNone
  }) //t=1
  tl.to(firstSubtitle, 2, {
    pixi: {alpha: 0},
    ease: Power1.easeOut
  },'-=2') //t=3
  tl.to(secondSubtitle, 4, {
    pixi: {scale:1.5},
    ease: Power0.easeNone
  },"-=1") //t=4
  tl.to(secondSubtitle, 2, {
    pixi: {alpha: 0},
    ease: Power1.easeOut
  },'-=2') //t=6
  tl.to(pointer, 1, {
    x:"+="+(40*Math.sin(radians)),
    y:"-="+(40*Math.cos(radians)),
    yoyo:true,
    repeat:15
  },'-=7')//t=1
  tl.to(pointer, 1, {
    pixi: {alpha:0},
    onStart: function(){
      $tasksPanel.css('zIndex',98)
    }
  })//t=16
    
    return tl;
  }