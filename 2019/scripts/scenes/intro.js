export function intro() {
  // Init vars
  var tl = new TimelineLite({ id: "intro" }),
      stage = window.VBS.pixi.app.stage,
      //arrow = window.VBS.pixi.arrow,
      WIDTH = VBS.pixi.WIDTH,
      HEIGHT = VBS.pixi.HEIGHT;

  tl.audios = [VBS.speech.getById('intro0'), VBS.speech.getById('intro1'), VBS.speech.getById('intro2')]

  /* Mini sqs
  let miniSqs = [],
    colors=[0xffb81c,0xc010a0,0x00a0d2,0x702082],
    r = Math.sqrt(Math.pow(WIDTH/2,2)+Math.pow(HEIGHT/2,2))+30,
    sqSize = 35,
    sqDuration = [1,2],
    upToTime = 10;
  for(let i=0;i<200;i++){
    let a = Math.random()*2*Math.PI,
      endx = WIDTH/2 + Math.cos(a)*r,
      endy = HEIGHT/2 + Math.sin(a)*r,
      col = colors[Math.floor(Math.random()*colors.length)],
      sqr = window.VBS.pixi.addRect(endx, endy, sqSize, sqSize, col, 0, 0);
    miniSqs.push(sqr)
    sqr.pivot.set(0.5);
    let t = Math.random() * upToTime,
      dur = sqDuration[0]+Math.random()*(sqDuration[1]-sqDuration[0])
    tl.from(sqr, dur, {
      x: WIDTH/2,
      y: HEIGHT/2,
      pixi: {
        scale: 0,
        rotation: 720
      },
      ease: Power2.easeInOut
    }, t) //t=0 to 7
  }

  // Eyes
  VBS.pixi.eyes = new PIXI.Graphics()
  VBS.pixi.eyeState = {w:0,h:0.05,alpha:0,angle:30}
  
  VBS.pixi.drawEyes = function(state){
    VBS.pixi.eyes.clear()
    VBS.pixi.eyes.beginFill(0xffffff);
    VBS.pixi.eyes.drawEllipse(5*VBS.pixi.WIDTH/16, VBS.pixi.HEIGHT/2, state.w, state.h);
    VBS.pixi.eyes.drawEllipse(11*VBS.pixi.WIDTH/16, VBS.pixi.HEIGHT/2, state.w, state.h);
    VBS.pixi.eyes.endFill();
    VBS.pixi.eyes.lineStyle(4, 0x666666);
    VBS.pixi.eyes.drawEllipse(5*VBS.pixi.WIDTH/16, VBS.pixi.HEIGHT/2, state.w, state.h);
    VBS.pixi.eyes.drawEllipse(11*VBS.pixi.WIDTH/16, VBS.pixi.HEIGHT/2, state.w, state.h);
    if(state.alpha > 0){
      VBS.pixi.eyes.beginFill(0x666666,state.alpha);
      let r = state.w*0.6,
          x = r * Math.cos(state.angle*Math.PI/180), y = r * Math.sin(state.angle*Math.PI/180)
      VBS.pixi.eyes.drawCircle(5*VBS.pixi.WIDTH/16 + x, VBS.pixi.HEIGHT/2 + y, state.w*0.2);
      VBS.pixi.eyes.drawCircle(11*VBS.pixi.WIDTH/16 + x, VBS.pixi.HEIGHT/2 + y, state.w*0.2);
      VBS.pixi.eyes.endFill();
    }
  }
  VBS.pixi.drawEyes(VBS.pixi.eyeState)
  stage.addChild(VBS.pixi.eyes)*/

  // Build clock
  var minuteHand = VBS.pixi.minuteHand = new PIXI.Graphics(),
      hourHand = VBS.pixi.hourHand = new PIXI.Graphics(),
      fullLength = 7*Math.min(WIDTH,HEIGHT)/8,
      minuteHandLength = Math.min(WIDTH,HEIGHT)/2-20,
      hourHandLength = minuteHandLength/2,
      handWidth = 45;
  
  let drawArrow = function(graphics, length, fill){
    graphics.clear()
    graphics.beginFill(fill || 0x009fd2)
    graphics.drawRect(0, 20, handWidth, length-20)
    graphics.moveTo(0, 20)
    graphics.lineTo(handWidth/2, 0)
    graphics.lineTo(handWidth, 20)
    graphics.endFill()
  }
  drawArrow(minuteHand,fullLength)
  minuteHand.pivot.set(handWidth/2,fullLength/2)
  minuteHand.position.set(WIDTH/2,HEIGHT/2)
  minuteHand.rotation = -90*Math.PI/180
  minuteHand.alpha = 0

  drawArrow(hourHand,hourHandLength)
  hourHand.pivot.set(handWidth/2,hourHandLength)
  hourHand.position.set(WIDTH/2,HEIGHT/2)
  hourHand.alpha = 0

  stage.addChild(minuteHand,hourHand)

  // Build audio bars
  let numBars = Math.max.apply(null,window.VBS.pixi.freq.map(heights => heights.length)),
      freqBars = [],
      fullW = (6*WIDTH/8)/numBars,
      maxBarHeight = HEIGHT/8,
      w = 0.9*fullW,
      space = 0.1*w
  for(i=0;i<numBars;i++){
    let h = maxBarHeight-i*(maxBarHeight/numBars)
    let x = WIDTH/8 + i*fullW + space
    let y = 15*HEIGHT/16 - h/2
    let bar = window.VBS.pixi.addRect(x,y,w,h,0x666666)
    bar.alpha = 0
    freqBars.push(bar)
  }

  // Build bullets text
  // let bulletStyle = new PIXI.TextStyle({fontFamily : ['Franklin-Gothic-Demi', 'Franklin Gothic Demi', 'Franklin Gothic Medium', 'Franklin Gothic', 'ITC Franklin Gothic', 'Arial', 'ArialMT', 'sans-serif'], fontSize: 26, fontWeight: '400', fill : 0x575756, align : 'left'}),
  //     bulletTexts = []
  // bulletTexts.push(new PIXI.Text(VBS.user['StartDate'].toFormattedString()+' \u2014 '+VBS.user['EndDate'].toFormattedString(), bulletStyle));
  // bulletTexts.push(new PIXI.Text('   \u2022  Transfers & Withdrawals', bulletStyle));
  // bulletTexts.push(new PIXI.Text('   \u2022  Contributions', bulletStyle));
  // bulletTexts.push(new PIXI.Text('   \u2022  Investment return & charges', bulletStyle));
  // bulletTexts.push(new PIXI.Text('   \u2022  Your LifeSight Age', bulletStyle));
  // bulletTexts.forEach((actor,i) => {
  //     actor.position.set(0, (i+1)*HEIGHT/8)
  //     actor.alpha = 0
  //     VBS.pixi.app.stage.addChild(actor) 
  // });

  // Build text
  let subtitleStyle = VBS.pixi.baseTextStyle.clone()
  subtitleStyle.fontSize = 28
  subtitleStyle.fontWeight = '400'
  subtitleStyle.align = 'center'
  let subtitleText = 'This is your LifeSight Dashboard',
    textMetrics = PIXI.TextMetrics.measureText(subtitleText, subtitleStyle)
  let subtitle = new PIXI.Text(subtitleText, subtitleStyle);
  subtitle.anchor.set(0.5)
  subtitle.position.set(WIDTH/2, 3*textMetrics.height)
  subtitle.scale.set(0)
  stage.addChild(subtitle)
  
  // Arrow in
  // tl.to(arrow, 9, { x: 3*WIDTH/4, ease: Power2.easeInOut }) //(t=0)
  // tl.to(arrow, 4, { y:4*HEIGHT/5, ease: Power2.easeOut }, "-=9") //(t=0)
  // tl.to(arrow, 4, { y:-HEIGHT/2, ease: Power2.easeIn }, "-=4") //(t=5)
  // tl.to(arrow, 9, { pixi: {rotation: -240}, ease: Power0.easeNone }, "-=9") //(t=0)
  
  /*Eyes open
  tl.to(VBS.pixi.eyeState, 0.8, {
    w: VBS.pixi.WIDTH/8,
    ease: Power1.easeInOut,
    onUpdate: function(tween){
      VBS.pixi.drawEyes(tween.target)
    },
    onUpdateParams: ['{self}']
  },0) //t=0
  tl.to(VBS.pixi.eyeState, 1, {
    h: VBS.pixi.WIDTH/8,
    ease: Power1.easeInOut,
    onUpdate: function(tween){
      VBS.pixi.drawEyes(tween.target)
    },
    onUpdateParams: ['{self}']
  },0.8) //t=0.8
  tl.to(VBS.pixi.eyeState, 0.5, {
    pixi: {alpha: 1},
    ease: Power1.easeInOut,
    onUpdate: function(tween){
      VBS.pixi.drawEyes(tween.target)
    },
    onUpdateParams: ['{self}']
  },1.3) //t=1.3

  // Look around
  tl.to(VBS.pixi.eyeState, 1, {
    angle: 200,
    ease: Power1.easeInOut,
    onUpdate: function(tween){
      VBS.pixi.drawEyes(tween.target)
    },
    onUpdateParams: ['{self}']
  },1.8) //t=1.8
  tl.to(VBS.pixi.eyeState, 1.5, {
    angle: -30,
    ease: Power1.easeInOut,
    onUpdate: function(tween){
      VBS.pixi.drawEyes(tween.target)
    },
    onUpdateParams: ['{self}']
  },3.8) //t=3.8
  tl.to(VBS.pixi.eyeState, 0.5, {
    angle: 30,
    ease: Power1.easeInOut,
    onUpdate: function(tween){
      VBS.pixi.drawEyes(tween.target)
    },
    onUpdateParams: ['{self}']
  },5.3) //t=5.3
  tl.to({a:1}, 1, {
    a:0,
    ease: Power1.easeInOut,
    onUpdate: function(tween){
      VBS.pixi.eyes.alpha = tween.target.a
    },
    onUpdateParams: ['{self}']
  },7) //t=7*/

  //Bring in arrow
  tl.to(minuteHand, 2, {
    pixi: {alpha: 1},
    ease: Power1.easeOut,
    onStart: function(){
      drawArrow(minuteHand, fullLength)
    }
  }) //t=
  tl.to(minuteHand, 8, {
    pixi: {rotation: 360},
    ease: Power1.easeOut
  },"-=2") //t=
  tl.to(subtitle, 4, {
    pixi: {scale:1.33},
    ease: Power0.easeNone
  },'-=6') //t=
  tl.to(subtitle, 2, {
    pixi: {alpha: 0},
    ease: Power1.easeOut
  },'-=4') //t=
  tl.to(hourHand, 0.1, {
    pixi: {alpha: 1},
    ease: Power0.easeNone
  },"-=0.1") //t=
  tl.to({l:fullLength}, 1, {
    l: minuteHandLength,
    ease: Power1.easeOut,
    onUpdate: function(tween){
      drawArrow(minuteHand, tween.target.l)
    },
    onUpdateParams: ['{self}']
  }) //t=

  //Audio freq
  tl.to({time:0}, 8, {
    time:8,
    ease: Power0.easeNone,
    onUpdate: function(tween){
      let idx = tween.ratio === 1 ? window.VBS.pixi.freq.length - 1 : Math.floor(tween.ratio * window.VBS.pixi.freq.length)
      let freqs = window.VBS.pixi.freq[idx]
      freqBars.forEach((bar,i,arr) => {
        let level = i < freqs.length ? freqs[i] : 0
        let h = (level / 255) * maxBarHeight
        let y = 15*HEIGHT/16 - h/2
        freqBars[i].height = h
        freqBars[i].position.y = y
      })
      if(parseFloat($('.anim-dimmer').css('opacity')) == 1 && !$('.anim-dimmer').is(':animated')) VBS.dimOut();
    },
    onUpdateParams: ['{self}']
  }, 2) //(t=2)
  tl.to(freqBars,1,{pixi:{alpha:0.8}}, 2) //(t=2)
  tl.to(freqBars,1,{pixi:{alpha:0}}, 7) //(t=7)
  
  // Bullets in
  // tl.staggerTo(bulletTexts, 1, {
  //   x: WIDTH/8,
  //   pixi: {alpha: 1},
  //   ease: Power2.easeOut
  // },1.5) //(t=12)

  // Bullets out
  // tl.to(bulletTexts, 1, {
  //   pixi: {alpha: 0},
  //   ease: Power2.easeOut
  // },"+=3") //(t=20)
  
  return tl;
}