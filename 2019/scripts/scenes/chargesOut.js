export function chargesOut() {
    // Init vars
    var tl = new TimelineLite({ id: "chargesOut" }),
        world = window.VBS.b2.world,
        user = window.VBS.user,
        b2WIDTH = window.VBS.b2.WIDTH,
        b2HEIGHT = window.VBS.b2.HEIGHT,
        SCALE = window.VBS.pixi.SCALE,
        MARGIN = window.VBS.pixi.MARGIN,
        pixiWIDTH = window.VBS.pixi.WIDTH,
        pixiHEIGHT = window.VBS.pixi.HEIGHT,
        stage = window.VBS.pixi.app.stage,
        joints = [], startPos = [],
        setUpJoint = VBS.b2.setUpJoint;
    
    VBS.pots.charges = []
    
    tl.audios = [VBS.speech.getById('charges')]

    // Text
    let figure = VBS.pixi.makeFigure(Math.min(user['Charges'],0))
    stage.addChild(figure)
    let subtitle = VBS.pixi.makeSubtitle('Annual Member Fee')
    stage.addChild(subtitle)
    
    //Text in
    tl.from([figure,subtitle],1,{
      y: -pixiHEIGHT/8,
      pixi: {alpha:0}
    }) //t=0
    
    // Squares Out - joint method
    tl.to({prog:0}, 2, {
      prog: 1,
      ease: Power1.easeInOut,
      onUpdate: function(tween){
        //if at the start
        if(tween.target.prog < 0.025){
          VBS.pots.charges.forEach((actor,i) => { // destroy joints if they exists & change to dynamic bodies
            actor.body.SetType(Box2D.Dynamics.b2Body.b2_dynamicBody)
            if(joints.length > i) world.DestroyJoint(joints[i])
            actor.body.SetAwake(true)
          })
          joints = []
          VBS.pots.charges = [] //reset squares
          return; //do nothing else
        }
        // if at the end
        if(tween.target.prog > 0.975){
          VBS.pots.charges.forEach((actor,i) => { // destroy joints if they exists & change to kinematic bodies ready for fade out
            actor.body.SetType(Box2D.Dynamics.b2Body.b2_kinematicBody)
            actor.body.SetLinearVelocity(new Box2D.Common.Math.b2Vec2(0,0))
            if(joints.length > i) world.DestroyJoint(joints[i])
          })
          joints = []
          return; //do nothing else
        }
        //if in the middle
        if(!VBS.pots.charges.length){ //init actors to remove if not done so already
          let numToRemove = Math.ceil(Math.max(Math.abs(VBS.user['Charges']),1)/VBS.unit)
          VBS.pots.charges = VBS.pixi.gimme(numToRemove)
        }
        if(!joints.length){ //if joints dont exist, create them
          startPos = []
          VBS.pots.charges.forEach((actor,i) => {
            actor.body.SetType(Box2D.Dynamics.b2Body.b2_dynamicBody)
            startPos.push({x:actor.body.GetPosition().x,y:actor.body.GetPosition().y})
            joints.push(setUpJoint(actor.body))
            actor.body.SetAwake(true)
          })
        }
        joints.forEach((joint,i) => { // update joint target
          let x = startPos[i].x+(tween.target.prog*(b2WIDTH/2-startPos[i].x))
          let y = startPos[i].y+(tween.target.prog*(b2HEIGHT/4-startPos[i].y))
          joint.SetTarget(new Box2D.Common.Math.b2Vec2(x, y))
          VBS.pots.charges[i].body.SetAwake(true)
        })
      },
      onUpdateParams: ['{self}']
    })
    tl.to({a:1}, 1, {
        a: 0,
        ease: Power2.easeOut,
        onUpdate: function(tween){
          if(VBS.pots.charges.length && !VBS.pots.charges[0].body){ //add kinematic bodies back in if they don't exist
            VBS.pots.charges.forEach((actor,i) => {
              if(!actor.body){
                actor.body = window.VBS.b2.addRect(actor.x/SCALE,actor.y/SCALE,1/(1-MARGIN)*actor.width/SCALE,1/(1-MARGIN)*actor.height/SCALE)
                actor.body.SetType(Box2D.Dynamics.b2Body.b2_kinematicBody)
              }
              VBS.pixi.app.stage.addChild(actor)
            })
          }
          VBS.pots.charges.forEach((actor,i) => { // fade out kinematic bodies
            actor.alpha = tween.target.a
          })
          VBS.pixi.setBalanceFigure(user['StartBalance']+user['Transfers']+user['Withdrawals']+user['ContributionsEE']+user['ContributionsER']+user['Return']+Math.max((tween.target.a-1)*VBS.pots.charges.length * VBS.unit, user['Charges']))
          if(tween.target.a < 0.025){ // if at end, destory body from world
            VBS.pots.charges.forEach((actor,i) => {
              world.DestroyBody(actor.body)
              actor.body = null
              VBS.pixi.app.stage.removeChild(actor)
            })
          }
        },
        onUpdateParams: ['{self}']
    },"+=0.67")

    //Text out
    tl.to([figure,subtitle],1,{
      pixi: {alpha:0}
    }) //t=
    
    return tl;
  }