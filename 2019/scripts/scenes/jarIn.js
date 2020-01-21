export function jarIn() {
  // Init vars
  var tl = new TimelineLite({ id: "jarIn" }),
      jar = window.VBS.pixi.jar,
      jarBody = window.VBS.b2.jar,
      pixiHEIGHT = window.VBS.pixi.HEIGHT,
      pixiWIDTH = window.VBS.pixi.WIDTH,
      stage = VBS.pixi.app.stage;

    tl.audios = [VBS.speech.getById('jar')]
  
  // Text
  VBS.pixi.balanceFigure.alpha = 1
  VBS.pixi.jarSubtitle = VBS.pixi.makeSubtitle(VBS.user["Possessive"]+' LifeSight Account')
  VBS.pixi.jarSubtitle.position.set(VBS.pixi.jarSubtitle.position.x, 7*pixiHEIGHT/8)
  VBS.pixi.startSubtitle = VBS.pixi.makeSubtitle(VBS.user["StartDate"].toFormattedString())
  stage.addChild(VBS.pixi.jarSubtitle,VBS.pixi.startSubtitle)
  
  // Jar in
  tl.from(jar, 3, { y: -pixiHEIGHT, ease: Power3.easeOut }) //t=0
  tl.from(VBS.pixi.jarSubtitle,3,{
      y: -pixiHEIGHT/8-80, //TODO avoid hardcoding 80 to match jar?
      pixi: {alpha:0},
      ease: Power3.easeOut
  },"-=3") //t=0

  // Text in
  tl.from([VBS.pixi.startSubtitle,VBS.pixi.balanceFigure],2,{
      y: -pixiHEIGHT/8,
      pixi: {alpha:0}
  },"-=1") //t=2

  jar.visible = true

  /*tl.to({g:0},0.5,{
    g:1/1000,
    onUpdate:(tween)=>{
      VBS.engine.world.gravity.scale = tween.target.g
    },
    onUpdateParams: ['{self}']
  })*/
  
  return tl;
}