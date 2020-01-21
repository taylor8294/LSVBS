export function lsAge() {
    // Init vars
    var tl = new TimelineLite({ id: "lsAge" }),
        stage = window.VBS.pixi.app.stage,
        WIDTH = VBS.pixi.WIDTH,
        HEIGHT = VBS.pixi.HEIGHT,
        user = VBS.user;
  
    tl.audios = [VBS.speech.getById('lsAge')]
    if(isFinite(user['LSAge']) && +user['LSAge'] > 54 && +user['LSAge'] < 75)
        tl.audios.push(VBS.speech.getById('lsAge2'))
    
    
    // Create text for LifeSight Age scene
    // let lsAge = VBS.pixi.lsAge = new PIXI.Container(),
    //   lsAgeRects = new PIXI.Graphics(),
    //   lsAgeStyle = new PIXI.TextStyle({fontFamily : ['Franklin-Gothic-Demi', 'Franklin Gothic Demi', 'Franklin Gothic Medium', 'Franklin Gothic', 'ITC Franklin Gothic', 'Arial', 'ArialMT', 'sans-serif'], fontSize: 200, fill : 0xff1010, align : 'center'}),
    //   textMetrics = PIXI.TextMetrics.measureText(VBS.user['LSAge'] ? VBS.user['LSAge'] : '??', lsAgeStyle)
    // lsAgeRects.beginFill(0xffffff,0.2);
    // lsAgeRects.drawRect()
    // lsAgeRects.endFill();
    // let lsAgeText = new PIXI.Text(VBS.user['LSAge'],lsAgeStyle);
    // lsAgeText.position.set(WIDTH/2-textMetrics.width/2, HEIGHT/2-textMetrics.height/2)
    // lsAge.addChild(lsAgeRects,lsAgeText)
    // stage.addChild(lsAge)
    
    // let audioDur = 0
    // for(let i=0;i<tl.audios.length;i++){
    //     audioDur += tl.audios[i].howl.duration()
    // }

    let $lsAgePanelBody = $('#panelBodyPNL_MY_LIFESIGHT_AGE1'),
        $lsAgePanel = $lsAgePanelBody.parents('.panel').eq(0)
    $lsAgePanel.css('position','relative')
    $lsAgePanel.css('zIndex',98)
    // tl.to({prog:0},audioDur+1,{
    //     prog: 1,
    //     ease: Power0.easeNone,
    //     onUpdate: function(tween){
    //         if(
    //             (tween.target.prog < 0.1 || tween.target.prog > 0.9) &&
    //             (Number.isNaN(+$lsAgePanel.css('zIndex')) || parseInt($lsAgePanel.css('zIndex')) > 98)
    //         ){
    //             $lsAgePanel.css('zIndex',98)
    //         } else if(
    //             tween.target.prog > 0.1 && tween.target.prog < 0.9 &&
    //             (Number.isNaN(+$lsAgePanel.css('zIndex')) || parseInt($lsAgePanel.css('zIndex')) < 99)
    //         ){
    //             if(!$lsAgePanelBody.hasClass('open')) $lsAgePanelBody.prev().children().eq(0).click()
    //             $lsAgePanel.css('zIndex',99)
    //         }
    //     },
    //     onUpdateParams: ['{self}']
    // })

  /*Eyes reset
  tl.to(VBS.pixi.eyeState, 0.1, {
    w:0, h:0.05, alpha:0, angle:30,
    ease: Power0.easeNone,
    onUpdate: function(tween){
      if(tween.ratio > 0.95){
        VBS.pixi.drawEyes(VBS.pixi.eyeState)
        VBS.pixi.eyes.alpha = 1
      }
    },
    onUpdateParams: ['{self}']
  }) //t=0
  //Eyes open
  tl.to(VBS.pixi.eyeState, 0.8, {
    w: VBS.pixi.WIDTH/8,
    ease: Power1.easeInOut,
    onUpdate: function(tween){
      if(VBS.pixi.eyes.alpha != 1) VBS.pixi.eyes.alpha = 1
      VBS.pixi.drawEyes(tween.target)
    },
    onUpdateParams: ['{self}']
  }) //t=0.1
  tl.to(VBS.pixi.eyeState, 1, {
    h: VBS.pixi.WIDTH/8,
    ease: Power1.easeInOut,
    onUpdate: function(tween){
      if(VBS.pixi.eyes.alpha != 1) VBS.pixi.eyes.alpha = 1
      VBS.pixi.drawEyes(tween.target)
      $lsAgePanel.css('zIndex',98)
    },
    onUpdateParams: ['{self}']
  }) //t=0.9
  tl.to(VBS.pixi.eyeState, 0.5, {
    pixi: {alpha: 1},
    ease: Power1.easeInOut,
    onUpdate: function(tween){
      if(VBS.pixi.eyes.alpha != 1) VBS.pixi.eyes.alpha = 1
      VBS.pixi.drawEyes(tween.target)
      if(!$lsAgePanelBody.hasClass('open')) $lsAgePanelBody.prev().children().eq(0).click()
      $lsAgePanel.css('zIndex',99)
    },
    onUpdateParams: ['{self}']
  }) //t=1.9

  // Look to ageOmeter
  tl.to(VBS.pixi.eyeState, 1, {
    angle: $(window).width() < 600 ? -90 : $(window).width() < 1200 ? 210 : 180,
    ease: Power1.easeInOut,
    onUpdate: function(tween){
      $lsAgePanel.css('zIndex',99)
      if(VBS.pixi.eyes.alpha != 1) VBS.pixi.eyes.alpha = 1
      VBS.pixi.drawEyes(tween.target)
    },
    onUpdateParams: ['{self}']
  }) //t=2.4

  if(VBS.user['Beneficiaries'] == 0){
    //wait for rest of audio and remove lsage highlight
    tl.to({prog:0}, Math.max(audioDur-2.4,1), {
      prog: 1,
      ease: Power1.easeInOut,
      onUpdate: function(tween){
        $lsAgePanel.css('zIndex',99)
        if(tween.ratio > 0.95) $lsAgePanel.css('zIndex',98)
      },
      onUpdateParams: ['{self}']
    }) //t=3.4
  } else {
    // Fade out eyes and remove lsage highlight
    tl.to({a:1}, 1, {
      a:0,
      ease: Power1.easeOut,
      onUpdate: function(tween){
        VBS.pixi.eyes.alpha = tween.target.a
        $lsAgePanel.css('zIndex',99)
        if(tween.ratio > 0.95) $lsAgePanel.css('zIndex',98)
      },
      onUpdateParams: ['{self}']
    },audioDur)
  }*/
  
  // Build text
  let subtitleStyle = VBS.pixi.baseTextStyle.clone()
  subtitleStyle.fontSize = 28
  subtitleStyle.fontWeight = '400'
  subtitleStyle.align = 'center'
  let subtitleText = 'This is your LifeSight Age',
    textMetrics = PIXI.TextMetrics.measureText(subtitleText, subtitleStyle)
  let subtitle = new PIXI.Text(subtitleText, subtitleStyle);
  subtitle.anchor.set(0.5)
  subtitle.position.set(WIDTH/2, 2*textMetrics.height)
  subtitle.scale.set(0)
  stage.addChild(subtitle)

  // Point to ageOmeter
  let pointer = VBS.pixi.pointer,
      degrees = $(window).width() < 600 ? 0 : $(window).width() < 1200 ? -60 : -80,
      radians = degrees*Math.PI/180
  tl.to(pointer, 1, {
    pixi: {
      rotation: degrees,
      alpha: 1
    },
    ease: Power1.easeInOut,
    onUpdate: function(tween){
      if(tween.ratio < 0.25)
        $lsAgePanel.css('zIndex',98)
      else if(tween.ratio > 0.75){
        if(!$lsAgePanelBody.hasClass('open')) $lsAgePanelBody.prev().children().eq(0).click()
        $lsAgePanel.css('zIndex',99)
      }
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
    x:"+="+(40*Math.sin(radians)),
    y:"-="+(40*Math.cos(radians)),
    yoyo:true,
    repeat: isFinite(VBS.user['LSAge']) ? 15 : 8,
    onComplete: function(){
      $lsAgePanel.css('zIndex',98)
    }
  },'-=4')
  if(VBS.user['Beneficiaries'] !== 0){  
    tl.to(pointer, 1, {
      pixi: {alpha:0}
    })
  }
    
  return tl;
}