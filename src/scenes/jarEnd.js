import { colorStringToInt, niceRound, getString } from '../utils.js'

export default function(config){
  // Init vars
  config = config || {}
  var {app, resources} = this.pixi, that = this
  var WIDTH = this.pixi.WIDTH, HEIGHT = this.pixi.HEIGHT;
    
  // Create button
  var button = new PIXI.Container(),
      buttonBg = new PIXI.Graphics(),
      buttonTextStyle = this.pixi.baseTextStyle.clone()
  buttonTextStyle.fontSize = config.buttonFontSize ? parseInt(config.buttonFontSize) : 24
  if(config.buttonFont){
    if(Array.isArray(config.buttonFont)){
      if(config.buttonFont.length) buttonTextStyle.fontFamily = config.buttonFont
    } else buttonTextStyle.fontFamily = [config.buttonFont]
  }
  if(config.buttonTextColor)
    buttonTextStyle.fill = colorStringToInt(config.buttonTextColor)
  
  var buttonTextString = getString('button',this),
      buttonTextMetrics = PIXI.TextMetrics.measureText(buttonTextString, buttonTextStyle),
      buttonH = buttonTextMetrics.height*1.5,
      buttonW = buttonTextMetrics.width+30,
      buttonText = new PIXI.Text(buttonTextString, buttonTextStyle),
      buttonBgFill = config.buttonBgColor ? colorStringToInt(config.buttonBgColor) : this.pixi.primaryColor,
      buttonPos = config.buttonPosition && config.buttonPosition.toLowerCase && ['top','bottom'].includes(config.buttonPosition.toLowerCase()) ? config.buttonPosition.toLowerCase() : 'top'
  
  buttonBg.beginFill(buttonBgFill)
  buttonBg.drawRect(0, 0, buttonW, buttonH)
  buttonText.position.set(15, buttonTextMetrics.height*0.25)
  button.addChild(buttonBg,buttonText);

  button.interactive = true;
  button.buttonMode = true;
  button.hitArea = new PIXI.Rectangle(0, 0, buttonW, buttonH);
  button.on('click', function(e) {
      console.log('Video Statement '+that.id+': Clicked benefit statement URL button')
      that.tracker.trackEvent('click-BenStat')
      that.tracker.finish() // record as finishing the video
      if(that.user.benefitStatementUrl) window.open(that.user.benefitStatementUrl,'_blank')
  })
  button.on('touchend', function(e) {
      console.log('Video Statement '+that.id+': Clicked benefit statement URL button')
      that.tracker.trackEvent('click-BenStat')
      that.tracker.finish() // record as finishing the video
      if(that.user.benefitStatementUrl) window.open(that.user.benefitStatementUrl,'_blank')
  })
  button.on('pointerover', function(e) { button.scale.x *= 1.05;button.scale.y *= 1.05; })
  button.on('pointerout', function(e) { button.scale.x *= 1/1.05;button.scale.y *= 1/1.05; })
  button.pivot.set(buttonW/2,buttonH/2);
  if(buttonPos == 'bottom')
    button.position.set(WIDTH/2, HEIGHT+1)
  else
    button.position.set(WIDTH/2, -buttonH-1)
  //button.cacheAsBitmap = true
  button.alpha = 0
  app.stage.addChild(button)

  return {
    id: 'jarEnd',
    tl: function(){
        let tl = new TimelineLite({ id: "jarEnd" })
        tl.to([that.pixi.jar,that.pixi.coinsContainer], 1, {
          pixi: {alpha: 1},
          ease: Power2.easeOut
        })
        if(buttonPos == 'bottom'){
          tl.to(button,2,{
              y: 7*HEIGHT/8+buttonH/2,
              pixi: {alpha: 1},
              ease: Back.easeOut
          },"+=4")
        } else {
          tl.to(button,2,{
              y: HEIGHT/8-buttonH/2,
              pixi: {alpha: 1},
              ease: Back.easeOut
          },"+=4")
        }
        return tl
    },
    audio: [{
      id: 'jarEnd1',
      text: [
        'Finally, this video is just a summary, so',
        'it\'s important to read your full statement too.',
        'You can do so by clicking here.',
        'Thanks for taking the time to catch up on your savings.',
        'We look forward to helping you save for another year.'
      ],
      ssml: '<speak>Finally, this video is just a summary, so it\'s important to read your full statement too. You can do so by clicking here. Thanks for taking the time to catch up on your savings. We look forward to helping you save for another year.<break time="1" /></speak>'
    }]
}
  
}