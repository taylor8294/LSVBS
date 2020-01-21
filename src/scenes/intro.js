import { colorStringToInt } from '../utils.js'

export default function(config){
  // Init vars
  config = config || {}
  var {app, resources} = this.pixi, that = this
  var WIDTH = this.pixi.WIDTH, HEIGHT = this.pixi.HEIGHT;

  // Build coin
  const coinRadius = WIDTH/4,
        //Array.isArray(config.introColor) ? config.introColor.map(str => colorStringToInt(str)) : colorStringToInt(config.introColor) ////TODO gradient fill not supported for graphics objects, would have to render gradient to canvas -> create texture from it -> draw with that texture (beginTextureFill?) -> then mask with icon
        coinColor = config.introColor ? colorStringToInt(config.introColor) : this.pixi.primaryColor,
        bg = (this.pixi.backgroundColor || this.pixi.backgroundColor===0) ? this.pixi.backgroundColor : 0xffffff;
  const coinGraphics = new PIXI.Graphics();
  coinGraphics.beginFill(coinColor, 1);
  coinGraphics.drawCircle(0, 0, coinRadius);
  coinGraphics.endFill();
  coinGraphics.lineStyle(coinRadius*0.1, bg);
  coinGraphics.beginFill(coinColor, 1);
  coinGraphics.drawCircle(0, 0, coinRadius*0.8);
  coinGraphics.endFill();
  const symStyle = new PIXI.TextStyle({
      fill: bg,
      fontSize: coinRadius/Math.pow(this.currency.symbol.length,0.75)
  })
  const coinSym = new PIXI.Text(this.currency.symbol,symStyle)
  coinSym.anchor.set(0.5)

  const coin = new PIXI.Container();
  coin.addChild(coinGraphics,coinSym);
  coin.x = WIDTH/2;
  coin.y = -HEIGHT/2;

  // Build clock
  const clockFace = new PIXI.Graphics();
  clockFace.lineStyle(coinRadius*0.15, coinColor);
  clockFace.drawCircle(0, 0, coinRadius*0.925);
  clockFace.lineStyle(0);
  clockFace.beginFill(coinColor, 1);
  clockFace.drawCircle(0, 0, coinRadius*0.1);
  clockFace.endFill();
  for(let i=0; i<12;i++){
      clockFace.lineStyle(2,coinColor);
      clockFace.moveTo(coinRadius*0.75*Math.cos(i*2*Math.PI/12), coinRadius*0.75*Math.sin(i*2*Math.PI/12))
      clockFace.lineTo(coinRadius*0.8*Math.cos(i*2*Math.PI/12), coinRadius*0.8*Math.sin(i*2*Math.PI/12))
  }

  const hourHand = new PIXI.Graphics();
  hourHand.roundLine(0,0, 0, -coinRadius*0.4, coinRadius*0.1, coinColor);
  const minuteHand = new PIXI.Graphics();
  minuteHand.roundLine(0,0, 0, -coinRadius*0.7, coinRadius*0.1, coinColor);

  let d = new Date(),
    hr = ((d.getHours() % 12)+d.getMinutes()/60)*2*Math.PI/12,
    mr = d.getMinutes()*2*Math.PI/60
  hourHand.rotation = hr;
  minuteHand.rotation = mr;

  const clock = new PIXI.Container();
  clock.addChild(clockFace,hourHand,minuteHand);
  clock.width = 0;
  clock.x = WIDTH/2;
  clock.y = HEIGHT/2;
  clock.visible = false;

  app.stage.addChild(coin,clock)

  return {
    id: 'intro',
    tl: function(){
        let tl = new TimelineLite({ id: "intro" })
        tl.to(coin, 2, {
            y: HEIGHT/2,
            ease: Bounce.easeOut
        }).to(coin, 1.5, {
            width:0,
            ease: Sine.easeInOut,
            yoyo: true,
            repeat: 2
        },"+=1").to(clock, 1, {
            onStart: function(){
                clock.visible = true
            },
            width: 2*coinRadius,
            ease: Sine.easeInOut
        }).to(minuteHand, 4, {
            rotation: -8*2*Math.PI+mr,
            ease: Power1.easeIn
        },"-=0.8").to(hourHand, 4, {
            rotation: -(8/12)*2*Math.PI+hr,
            ease: Power1.easeIn
        },"-=4").to(clock, 1, {
            x: -1.5*coinRadius,
            ease: Back.easeIn
        },"-=1")
        return tl
    },
    audio: [{
        id: 'intro1',
        text: 'Hi '+this.user.forename+'. This is your Pension Dashboard.'
    },{
        id: 'intro2',
        text: ['It contains all the key information about your','pension, right now.']
    },{
        id: 'intro3',
        text: ['However, it\'s always good to take a look back','at how you got to where you are.']
    }]
}
  
}