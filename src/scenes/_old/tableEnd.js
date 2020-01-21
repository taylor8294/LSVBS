export function tableEnd() {
  // Init vars
  var tl = new TimelineLite({ id: "tableEnd" }),
      stage = window.VBS.pixi.app.stage,
      WIDTH = VBS.pixi.WIDTH,
      HEIGHT = VBS.pixi.HEIGHT;

  tl.audios = [VBS.speech.getById('tableEnd')]

  //Create values
  let rowValues = VBS.pixi.table.rowValues = [],
    whiteTextStyle = VBS.pixi.table.whiteTextStyle,
    blackTextStyle = VBS.pixi.table.blackTextStyle
  rowValues.push(new PIXI.Text('£'+VBS.user['StartBalance'].toFixedCommas(), whiteTextStyle));
  if(VBS.user['Transfers'] > 0)
    rowValues.push(new PIXI.Text('£'+VBS.user['Transfers'].toFixedCommas(), blackTextStyle));
  rowValues.push(new PIXI.Text('£'+(VBS.user['ContributionsEE']+VBS.user['ContributionsER']).toFixedCommas(), blackTextStyle));
  rowValues.push(new PIXI.Text((VBS.user['Return'] < 0 ? '–' : '')+'£'+Math.abs(VBS.user['Return']).toFixedCommas(), blackTextStyle));
  rowValues.push(new PIXI.Text('–£'+Math.abs(VBS.user['Charges']).toFixedCommas(), blackTextStyle));
  rowValues.push(new PIXI.Text('£'+VBS.user['EndBalance'].toFixedCommas(), whiteTextStyle));
  let fullRowHeight = ((6*HEIGHT/8)/rowValues.length)
  rowValues.forEach((actor,i) => {
    actor.alpha = 0
    actor.position.set(15*WIDTH/16-actor.width, HEIGHT/8+i*fullRowHeight+fullRowHeight/2-actor.height/2)
    VBS.pixi.app.stage.addChild(actor)
  });

  // Summary table in
  let tableEls = VBS.pixi.table.rowRects.concat(VBS.pixi.table.rowTexts).concat(VBS.pixi.table.rowValues)
  tl.to(tableEls, 1, {
    pixi: {alpha: 1},
    ease: Power2.easeOut
  })
  
  // Contents table out
  tl.to(tableEls, 1, {
    pixi: {alpha: 0},
    ease: Power2.easeOut
  },"+=5")
  
  return tl;
}