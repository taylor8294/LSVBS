export function titleOut() {
  // Init vars
  var tl = new TimelineLite({ id: 'titleOut' }),
      qty = 25,
      life = window.VBS.pixi.life,
      sight = window.VBS.pixi.sight,
      wtw = window.VBS.pixi.wtw;
  
  // Generate mini squares
  let miniSqs = [], WIDTH = window.VBS.pixi.WIDTH, HEIGHT = window.VBS.pixi.HEIGHT
  let logoRatio = 290/512, sqSize = (114.2/512)*WIDTH/2
  let four = {
    yellow: {
      center: [WIDTH/4+sqSize/2, HEIGHT/2-logoRatio*WIDTH/4+sqSize/2],
      x: [-sqSize*3, WIDTH/2],
      y: [-sqSize*3, HEIGHT/2],
      validEnd: (x, y) => x < -sqSize || y < -sqSize,
      hex: 0xffb81c
    },
    pink: {
      center: [WIDTH/4+3*sqSize/2, HEIGHT/2-logoRatio*WIDTH/4+sqSize/2],
      x: [WIDTH/2, WIDTH+sqSize*3],
      y: [-sqSize*3, HEIGHT/2],
      validEnd: (x, y) => x > WIDTH+sqSize || y < -sqSize,
      hex: 0xc010a0
    },
    blue: {
      center: [WIDTH/4+3*sqSize/2, HEIGHT/2-logoRatio*WIDTH/4+3*sqSize/2],
      x: [WIDTH/2, WIDTH+sqSize*3],
      y: [HEIGHT/2,HEIGHT+sqSize*3],
      validEnd: (x, y) => x > WIDTH+sqSize || y > HEIGHT+sqSize,
      hex: 0x00a0d2
    },
    purple: {
      center: [WIDTH/4+sqSize/2, HEIGHT/2-logoRatio*WIDTH/4+3*sqSize/2],
      x: [-sqSize*3, WIDTH/2],
      y: [HEIGHT/2,HEIGHT+sqSize*3],
      validEnd: (x, y) => x < -sqSize || y > HEIGHT+sqSize,
      hex: 0x702082
    }
  };
  Object.keys(four).forEach(function (cls, i, arr) {
    let sqProps = four[cls]
    for (let j = 0; j < qty; j++) {
      let x = WIDTH/2, y = HEIGHT/2,
        wh = sqSize/10 + Math.pow(Math.random(), 2) * sqSize/5;
      while (!sqProps.validEnd(x, y)) {
        x = sqProps.x[0] + (Math.random() * (sqProps.x[1] - sqProps.x[0]))
        y = sqProps.y[0] + (Math.random() * (sqProps.y[1] - sqProps.y[0]))
      }
      let sqr = window.VBS.pixi.addRect(sqProps.center[0], sqProps.center[1], wh, wh, sqProps.hex, 0, 0);
      miniSqs.push(sqr)
      sqr.pivot.set(0.5);
      // Animate mini squares
      let t = i + Math.random() * 2
      tl.to(sqr, 2, {
        x: x,
        y: y,
        pixi: {
          rotation: 720
        },
        ease: Power2.easeInOut
      }, t)
    }
  });

  // Add logo squares
  let logoSqs = []
  Object.keys(four).forEach(function (cls, i, arr) {
    logoSqs.push(window.VBS.pixi.addRect(four[cls].center[0], four[cls].center[1], sqSize, sqSize, four[cls].hex, 0, 0))
  })

  // Text out
  tl.to(life, 1, { x: WIDTH/2, ease: Power2.easeInOut }, '-=5.5') //(t~1.5)
  tl.to(sight, 1.5, { x: -WIDTH/8, ease: Power2.easeInOut }, '-=5.5') //(t~1.5)
  tl.to(wtw, 1, { pixi: {alpha:0}, ease: Power2.easeInOut }, '-=4') //(t~3)

  tl.set([life,sight], { visible: false }); //(t~7)

  // Scale out rects
  tl.staggerTo(logoSqs, 1.8, { pixi: { scale: 0 }, ease: Power1.easeOut }, 0.9, '-=6.5'); //(t~1)
  tl.set(logoSqs, { visible: false });
  
  // Check if speech files loaded by the end of this, if not pause until so (max 10 seconds)
  let waitCount = 0
  function waitForSpeechesToLoad(){
    if(waitCount++ > 200){
      VBS.tracker.trackEvent('error-tts')
      console.error('Waiting for speeches to load timed out (10 secs)')
    }
    if(window.VBS.speech.speechesLoaded < window.VBS.speech.speechesToLoad && waitCount < 100){
      console.log('Waiting for speeches to load...')
      return setTimeout(waitForSpeechesToLoad,50)
    }
    VBS.$el.find('.anim-loading').hide()
    VBS.$el.find('.anim-replay').css({display:'none'})
    VBS.$el.find('.anim-pause').css({display:'block'})
    VBS.$el.find('.anim-progress-bar').css({display:'block'})
    VBS.timeline.play()
    VBS.music.seek(VBS.timeline.time())
    VBS.musicWasPlaying = true
    VBS.music.play()
  }
  tl.eventCallback("onComplete", function(){
    if(window.VBS.speech.speechesLoaded < window.VBS.speech.speechesToLoad){
      VBS.timeline.pause()
      VBS.music.pause()
      VBS.musicWasPlaying = false
      VBS.$el.find('.anim-loading').show()
      setTimeout(waitForSpeechesToLoad,100)
      return
    } else {
      VBS.$el.find('.anim-progress-bar').css({display:'block'})
    }
  })
  
  return tl;
}