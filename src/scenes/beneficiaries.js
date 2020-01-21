import { colorStringToInt } from '../utils.js'

export default function(config){
  // Init vars
  config = config || {}
  var {app, resources} = this.pixi, that = this
  var WIDTH = this.pixi.WIDTH, HEIGHT = this.pixi.HEIGHT;

  let fill = config.beneficiariesColor ? colorStringToInt(config.beneficiariesColor) : this.pixi.primaryColor

  // Build sprites
  const person = new PIXI.Container(),
        personSpriteMask = new PIXI.Sprite(resources['beneficiaries'].texture),
        personColour = new PIXI.Graphics()
  personColour.beginFill(fill);
  personColour.drawRect(0, 0, personSpriteMask.width, personSpriteMask.height);
  personColour.endFill();
  person.addChild(personColour,personSpriteMask);
  personColour.mask = personSpriteMask;
  person.pivot.set(personSpriteMask.width/2, personSpriteMask.height/2)
  let scaleTo = (WIDTH/2)/personSpriteMask.width
  person.scale.set(scaleTo)
  person.x = WIDTH/2;
  person.y = HEIGHT+person.height/2;
  person.alpha = 0;
  
  const hand = new PIXI.Container(),
        handSpriteMask = new PIXI.Sprite(resources['beneficiariesHand'].texture),
        handColour = new PIXI.Graphics()
  handColour.beginFill(fill);
  handColour.drawRect(0, 0, handSpriteMask.width, handSpriteMask.height);
  handColour.endFill();
  hand.addChild(handColour,handSpriteMask);
  handColour.mask = handSpriteMask;
  hand.pivot.set(handSpriteMask.width/2, handSpriteMask.height/2)
  scaleTo = (WIDTH/2)/handSpriteMask.width
  hand.scale.set(0.5)
  hand.x = WIDTH/2-hand.width/8;
  hand.y = HEIGHT+person.height+hand.height/2;
  hand.alpha = 0;

  app.stage.addChild(person,hand)

  return {
    id: 'beneficiaries',
    tl: function(){
        let tl = new TimelineLite({ id: "beneficiaries" })
        tl.to(person, 4, {
            pixi: {
                y: (HEIGHT-person.height-hand.height)/2+person.height/2,
                alpha: 1
            }
        }).to(hand, 4, {
            pixi: {
                y: HEIGHT-(HEIGHT-person.height-hand.height)/2-hand.height/2,
                alpha: 1
            }
        },"-=4").to(person, 2, {
            pixi: {
                y: "-="+HEIGHT/30
            },
            yoyo: true,
            repeat: 6,
            ease: Sine.easeOut
        }).to([person,hand], 2, {
            pixi: {
                alpha: 0
            }
        },"-=2")
        return tl
    },
    audio: [{
        id: 'beneficiaries1',
        text: [
            'Before we finish, we noticed that you\'re',
            'yet to provide us with information on who',
            'you\'d want to receive your pension savings if',
            'anything were to happen to you. This is really',
            'important and it will only take a minute to add this',
            'to your Account. Please make sure you go to the',
            'beneficiary nomination page to do so.'
        ]
    }]
}
  
}