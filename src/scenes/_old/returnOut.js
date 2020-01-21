export function returnOut() {
    // Init vars
    var tl = new TimelineLite({ id: "returnOut" }),
        addB2Rect = window.VBS.pixi.addB2Rect,
        user = window.VBS.user,
        b2WIDTH = window.VBS.b2.WIDTH,
        b2HEIGHT = window.VBS.b2.HEIGHT,
        pixiWIDTH = window.VBS.pixi.WIDTH,
        pixiHEIGHT = window.VBS.pixi.HEIGHT,
        SCALE = window.VBS.pixi.SCALE,
        MARGIN = window.VBS.pixi.MARGIN,
        stage = window.VBS.pixi.app.stage,
        world = window.VBS.b2.world,
        setUpJoint = VBS.b2.setUpJoint,
        joints = [], startPos = [];

    tl.audios = [VBS.speech.getById('return0'),VBS.speech.getById('return1')]

    // Text
    let figure = VBS.pixi.makeFigure(Math.min(user['Return'],0))
    stage.addChild(figure)
    let subtitle = VBS.pixi.makeSubtitle(VBS.user["Possessive"]+' Investments')
    stage.addChild(subtitle)

    // Random walk
    let randomWalk = VBS.pixi.randomWalk = new PIXI.Graphics(),
        randomWalkSteps = [10, -9, 5, -4, 8, -7, 6, 6, -10, 2, 4, 2, 1, 6, 3, -10, 2, -3, -8, -3, 6, -4, 2, 10, 9, -8, -1, -10, -4, -4, 8, -5, 9, -9, 6, 5, -9, 7, 10, 5, 6, -6, -4, 8, 3, 4, -8, -10, -2, -2, -2, 9, 8, 3, 6, 8, -10, -8, 6, 5, -9, -5, -4, -4, -9, -4, 7, -2, -10, 5, 2, -9, -7, 3, -1, -8, 2, 3, 0, 6, 8, -9, 8, -5, -2, -5, -2, -10, -2, -8, -1, 4, 3, 5, -6, 3, -6, -1, -4, -8]
        //[-7.0,-2.4,6.8,2.7,-6.1,9.4,-3.3,-7.8,2.1,0.9,-0.9,2.9,-9.6,-0.2,2.1,0.4,-7.6,1.2,5.6,8.9,0.1,-2.6,-5.6,0.3,6.9,-6.6,-3.3,9.2,1.9,-5.9,-1.1,-0.9,-4.9,0.2,-8.8,-6.1,-9.1,4.9,3.9,-7.5,0.3,-4.4,3.6,5.8,-3.3,2.2,-8.5,-8.1,5.7,8.7,9.1,-7.7,4.3,-1.5,5.8,3.9,-6.1,-8.5,8.2,-6.5,-1.7,5.0,6.0,-5.0,-8.4,7.2,8.7,-3.9,4.6,-9.3,3.0,-6.2,-5.4,0.7,-3.1,-6.0,2.9,-2.1,-1.0,-8.2,0.0,-3.5,-9.9,7.0,-8.9,4.6,-7.0,5.0,-7.5,4.7,3.7,-7.6,0.6,-6.8,9.5,0.1,-7.9,-7.5,-1.7]
    // for(let i=0;i<100;i++){
    //   randomWalkSteps.push(Math.round((Math.random() < 0.45 ? 1 : -1)*Math.random()*10,1))
    // }
    // console.log(randomWalkSteps)
    let drawRandomWalk = VBS.pixi.drawRandomWalk = function(numSteps){
      randomWalk.clear()
      randomWalk.lineStyle(4, 0x666666);
      let currPos = {x:-pixiWIDTH/4,y:0}, step = (pixiWIDTH/2)/100
      randomWalk.moveTo(currPos.x,currPos.y)
      for(let i = 0; i<numSteps && i<randomWalkSteps.length;i++){
        currPos.x += step
        currPos.y += randomWalkSteps[i]
        randomWalk.lineTo(currPos.x,currPos.y)
      }
    }
    randomWalk.position.set(pixiWIDTH/2, pixiHEIGHT/3)
    stage.addChild(randomWalk)
    
    //Text in
    tl.from([figure,subtitle],1,{
      y: -pixiHEIGHT/8,
      pixi: {alpha:0}
    }) //t=0

    // Grow shrink
    let scaleRect = window.VBS.pixi.scaleRect = function(actor,scale){
      if(!actor.body) return;
      let fill = actor.geometry.graphicsData[0].fillStyle.color
      let verts = actor.body.GetFixtureList().GetShape().GetVertices().reduce((obj,v)=>{
        return {
          min: {
            x: Math.min(obj.min.x, v.x),
            y: Math.min(obj.min.y, v.y)
          },
          max: {
            x: Math.max(obj.max.x, v.x),
            y: Math.max(obj.max.y, v.y)
          }
        }
      },{min:{x:Infinity,y:Infinity},max:{x:-Infinity,y:-Infinity}})
      let wWas = verts.max.x - verts.min.x,
          hWas = verts.max.y - verts.min.y
      actor.clear()
      actor.beginFill(fill);
      actor.drawRect(
          -1*SCALE*wWas*scale/2,
          -1*SCALE*hWas*scale/2,
          SCALE*wWas*scale*(1-MARGIN),
          SCALE*hWas*scale*(1-MARGIN)
      )
      actor.endFill()
    }
    let obj = {s:1}
    /*TweenMax.to(obj,2,{
      s:1.33,
      ease: Power1.easeInOut,
      onUpdate: function(tween){
        VBS.pots.start.forEach(actor => {
          VBS.pixi.scaleRect(actor,tween.target.s,tween.target.s)
        })
      },
      onUpdateParams: ['{self}'],
      onComplete: function(){
        TweenMax.to(obj,2,{
          s:0.5,
          ease: Power1.easeInOut,
          onUpdate: function(tween){
            VBS.pots.start.forEach(actor => {
              VBS.pixi.scaleRect(actor,tween.target.s,tween.target.s)
            })
          },
          onUpdateParams: ['{self}'],
          onComplete: function(){
            TweenMax.to(obj,2,{
              s:1,
              ease: Power1.easeInOut,
              onUpdate: function(tween){
                VBS.pots.start.forEach(actor => {
                  VBS.pixi.scaleRect(actor,tween.target.s,tween.target.s)
                })
              },
              onUpdateParams: ['{self}']
            })
          }
        })
      }
    })*/
    for(let i=0;i<2;i++){
      tl.to(obj,1,{
        s:0.67,
        ease: Power1.easeInOut,
        onUpdate: function(tween){
          Object.keys(VBS.pots).forEach(key => {
            VBS.pots[key].forEach(actor => {
              VBS.pixi.scaleRect(actor,tween.target.s,tween.target.s)
            })
          })
        },
        onUpdateParams: ['{self}']
      }) //t=0-1
      tl.to(obj,2,{
        s:1,
        ease: Power1.easeInOut,
        onUpdate: function(tween){
          Object.keys(VBS.pots).forEach(key => {
            VBS.pots[key].forEach(actor => {
              VBS.pixi.scaleRect(actor,tween.target.s,tween.target.s)
            })
          })
        },
        onUpdateParams: ['{self}']
      }) //t=1-3
      tl.to(obj,1,{
        s:0.67,
        ease: Power1.easeInOut,
        onUpdate: function(tween){
          Object.keys(VBS.pots).forEach(key => {
            VBS.pots[key].forEach(actor => {
              VBS.pixi.scaleRect(actor,tween.target.s,tween.target.s)
            })
          })
        },
        onUpdateParams: ['{self}']
      }) //t=3-4
      let finalScale = 1-Math.abs(VBS.user['Return'])/(VBS.user['EndBalance']-VBS.user['Return'])
      tl.to(obj,2,{
        s:finalScale,
        ease: Power1.easeInOut,
        onUpdate: function(tween){
          Object.keys(VBS.pots).forEach(key => {
            VBS.pots[key].forEach(actor => {
              VBS.pixi.scaleRect(actor,tween.target.s,tween.target.s)
            })
          })
        },
        onUpdateParams: ['{self}']
      }) //t=4-6
    }
    
    /* Squares Out - joint method
    tl.to({prog:0}, 4, {
      prog: 1,
      ease: Power1.easeInOut,
      onUpdate: function(tween){
        //if at the start
        if(tween.target.prog < 0.025){
          VBS.pots.return.forEach((actor,i) => { // destroy joints if they exists & change to dynamic bodies
            actor.body.SetType(Box2D.Dynamics.b2Body.b2_dynamicBody)
            if(joints.length > i) world.DestroyJoint(joints[i])
            actor.body.SetAwake(true)
          })
          joints = []
          VBS.pots.return = [] //reset squares
          return; //do nothing else
        }
        // if at the end
        if(tween.target.prog > 0.975){
          VBS.pots.return.forEach((actor,i) => { // destroy joints if they exists & change to kinematic bodies ready for fade out
            actor.body.SetType(Box2D.Dynamics.b2Body.b2_kinematicBody)
            actor.body.SetLinearVelocity(new Box2D.Common.Math.b2Vec2(0,0))
            if(joints.length > i) world.DestroyJoint(joints[i])
          })
          joints = []
          return; //do nothing else
        }
        //if in the middle
        if(!VBS.pots.return.length){ //init actors to remove if not done so already
          let numToRemove = Math.max(Math.round(Math.abs(VBS.user['Return'])/VBS.unit),1)
          VBS.pots.return = VBS.pixi.gimme(numToRemove, true)
        }
        if(!joints.length){ //if joints dont exist, create them
          startPos = []
          VBS.pots.return.forEach((actor,i) => {
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
          VBS.pots.return[i].body.SetAwake(true)
        })
      },
      onUpdateParams: ['{self}']
    },"-=6") //t=6
    tl.to({a:1}, 1, {
        a: 0,
        ease: Power2.easeOut,
        onUpdate: function(tween){
          if(VBS.pots.return.length && !VBS.pots.return[0].body){ //add kinematic bodies back in if they don't exist
            VBS.pots.return.forEach((actor,i) => {
              if(!actor.body){
                actor.body = window.VBS.b2.addRect(actor.x/SCALE,actor.y/SCALE,1/(1-MARGIN)*actor.width/SCALE,1/(1-MARGIN)*actor.height/SCALE)
                actor.body.SetType(Box2D.Dynamics.b2Body.b2_kinematicBody)
              }
              VBS.pixi.app.stage.addChild(actor)
            })
          }
          VBS.pots.return.forEach((actor,i) => { // fade out kinematic bodies
            actor.alpha = tween.target.a
          })
          VBS.pixi.setBalanceFigure(user['StartBalance']+user['Transfers']+user['Withdrawals']+user['ContributionsEE']+user['ContributionsER']+Math.max((tween.target.a-1)*VBS.pots.return.length * VBS.unit, user['Return']))
          if(tween.target.a < 0.025){ // if at end, destory body from world
            VBS.pots.return.forEach((actor,i) => {
              world.DestroyBody(actor.body)
              actor.body = null
              VBS.pixi.app.stage.removeChild(actor)
            })
          }
        },
        onUpdateParams: ['{self}']
    },"-=1") //t=11*/

    // Random walk in
    tl.to({numSteps:0}, 8, {
      numSteps: randomWalkSteps.length,
      ease: Power0.easeNone,
      onUpdate: function(tween){
        drawRandomWalk(tween.target.numSteps)
      },
      onUpdateParams: ['{self}']
    }, 0) //t=

    //Text out
    tl.to([figure,subtitle,randomWalk],1,{
      pixi: {alpha:0}
    },"+=4") //t=12
    
    return tl;
  }