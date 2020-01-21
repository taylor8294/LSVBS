export function tableStart() {
  // Init vars
  var tl = new TimelineLite({ id: "tableStart" }),
      stage = window.VBS.pixi.app.stage,
      WIDTH = VBS.pixi.WIDTH,
      HEIGHT = VBS.pixi.HEIGHT;

  tl.audios = [VBS.speech.getById('tableStart')]

  // Build contents table
  let blackTextStyle = new PIXI.TextStyle({fontFamily : ['Franklin-Gothic-Demi', 'Franklin Gothic Demi', 'Franklin Gothic Medium', 'Franklin Gothic', 'ITC Franklin Gothic', 'Arial', 'ArialMT', 'sans-serif'], fontSize: 20, fontWeight: '400', fill : 0x575756, align : 'left'}),
      whiteTextStyle = blackTextStyle.clone(),
      rowTexts = [],
      rowRects = []
  whiteTextStyle.fill = 0xffffff
  rowTexts.push(new PIXI.Text('My balance at '+VBS.user['StartDate'].toFormattedString(), whiteTextStyle));
  if(VBS.user['Transfers'] > 0)
    rowTexts.push(new PIXI.Text('My Transfers', blackTextStyle));
  rowTexts.push(new PIXI.Text('My Contributions', blackTextStyle));
  rowTexts.push(new PIXI.Text('My Investments', blackTextStyle));
  rowTexts.push(new PIXI.Text('Charges & Fees', blackTextStyle));
  rowTexts.push(new PIXI.Text('My balance at '+VBS.user['EndDate'].toFormattedString(), whiteTextStyle));
  let fullRowHeight = ((6*HEIGHT/8)/rowTexts.length),
      rowHeight = fullRowHeight*0.8
  rowTexts.forEach((actor,i) => {
      if(i==0 || i==rowTexts.length-1)
        rowRects.push(VBS.pixi.addRect(WIDTH/2,HEIGHT/8+i*fullRowHeight+fullRowHeight/2,30*WIDTH/32,rowHeight,0x702082));
      else
        rowRects.push(VBS.pixi.addRect(WIDTH/2,HEIGHT/8+i*fullRowHeight+fullRowHeight/2,30*WIDTH/32,rowHeight,0xeeeeee));
      actor.position.set(WIDTH/16, HEIGHT/8+i*fullRowHeight+fullRowHeight/2-actor.height/2)
      VBS.pixi.app.stage.addChild(actor) 
  });
  VBS.pixi.table = {blackTextStyle, whiteTextStyle, rowRects, rowTexts}

  // Build text
  let subtitleStyle = VBS.pixi.baseTextStyle.clone()
  subtitleStyle.fontSize = 28
  subtitleStyle.fontWeight = '400'
  subtitleStyle.align = 'center'
  let subtitleText = 'Let\'s take a look back...',
    textMetrics = PIXI.TextMetrics.measureText(subtitleText, subtitleStyle)
  let subtitle = new PIXI.Text(subtitleText, subtitleStyle);
  subtitle.anchor.set(0.5)
  subtitle.position.set(WIDTH/2, 2*textMetrics.height)
  subtitle.scale.set(0)
  stage.addChild(subtitle)
  
  //Rewind hands
  let minuteHand = VBS.pixi.minuteHand,
  hourHand = VBS.pixi.hourHand

  tl.to(subtitle, 4, {
    pixi: {scale:1.5},
    ease: Power0.easeNone
  }) //t=
  tl.to(subtitle, 2, {
    pixi: {alpha: 0},
    ease: Power1.easeOut
  },'-=2') //t=
  tl.to(minuteHand, 5, {
    pixi: {rotation: -480},
    ease: Power2.easeIn
  },'-=3') //t=
  tl.to(hourHand, 5, {
    pixi: {rotation: -70},
    ease: Power2.easeIn
  },"-=5") //t=
  
  // Fade out hands
  tl.to(minuteHand, 2, {
    pixi: {rotation: -2000, alpha:0 },
    ease: Power0.easeNone,
    onStart: function(){
      VBS.dimIn(2000);
    }
  }) //t=
  tl.to(hourHand, 2, {
    pixi: {rotation: -197, alpha:0 },
    ease: Power0.easeNone
  },"-=2") //t=

  // Contents table in
  tl.add("tableIn")
  tl.from(rowRects[0], 1, {
    x: -WIDTH/2,
  },"tableIn")
  tl.from(rowTexts[0], 1, {
    x:-15*WIDTH/16,
  },"tableIn")
  tl.from(rowRects[rowRects.length-1], 1, {
    x: 3*WIDTH/2,
  },"tableIn")
  tl.from(rowTexts[rowTexts.length-1], 1, {
    x: WIDTH+WIDTH/16
  },"tableIn")
  let greyRects = rowRects.slice(1,rowRects.length-1),
      greyTexts = rowTexts.slice(1,rowTexts.length-1)
  tl.staggerFrom(greyTexts, 1, {
    x: -15*WIDTH/16,
    ease: Power2.easeOut
  },0.5,"tableIn+=1") //(t=12)
  tl.staggerFrom(greyRects, 1, {
    x: -WIDTH/2,
    ease: Power2.easeOut
  },0.5,"tableIn+=1") //(t=12)
  
  // Contents table out
  tl.to(rowRects.concat(rowTexts), 1, {
    pixi: {alpha: 0},
    ease: Power2.easeOut
  },"+=3")
  
  return tl;
}