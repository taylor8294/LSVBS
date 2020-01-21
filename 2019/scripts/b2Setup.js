export function b2Setup() {

  /*********
   * Setup *
   *********/

  // Aliases
  var b2Vec2 = Box2D.Common.Math.b2Vec2,
      b2BodyDef = Box2D.Dynamics.b2BodyDef,
      b2Body = Box2D.Dynamics.b2Body,
      b2FixtureDef = Box2D.Dynamics.b2FixtureDef,
      b2Fixture = Box2D.Dynamics.b2Fixture,
      b2World = Box2D.Dynamics.b2World,
      b2MassData = Box2D.Collision.Shapes.b2MassData,
      b2PolygonShape = Box2D.Collision.Shapes.b2PolygonShape,
      b2CircleShape = Box2D.Collision.Shapes.b2CircleShape,
      b2DebugDraw = Box2D.Dynamics.b2DebugDraw;
  
  // Vars
  window.VBS = window.VBS || {}
  window.VBS.b2 = {}
  var world, boundary, jar, lid, bodyDef, fixDef,
      SCALE = (window.VBS.pixi && window.VBS.pixi.SCALE) || 30,
      WIDTH = window.VBS.b2.WIDTH = ((window.VBS.pixi && window.VBS.pixi.WIDTH) || 512)/SCALE,
      HEIGHT = window.VBS.b2.HEIGHT = ((window.VBS.pixi && window.VBS.pixi.HEIGHT) || 512)/SCALE
  window.VBS.b2.mouseJoint = null;

  // create world
  var gravity = new b2Vec2(0, 15);
  var doSleep = true;
  world = window.VBS.b2.world = new b2World(gravity, doSleep);
  
  // init boundary
  bodyDef = new b2BodyDef;
  bodyDef.type = b2Body.b2_staticBody;
  bodyDef.position.x = WIDTH/2;
  bodyDef.position.y = HEIGHT/2;
  boundary = window.VBS.b2.boundary = world.CreateBody(bodyDef)

  fixDef = new b2FixtureDef;
  fixDef.shape = new b2PolygonShape;
  fixDef.density = 1;
  fixDef.friction = 0.1;
  fixDef.restitution = 0.5;
  let borderSize = 4

  // bottom
  fixDef.shape.SetAsOrientedBox(WIDTH/2+borderSize*2, borderSize/2, new b2Vec2(0, HEIGHT/2+borderSize/2));
  boundary.CreateFixture(fixDef);

  // left
  fixDef.shape.SetAsOrientedBox(borderSize/2, HEIGHT+borderSize/2, new b2Vec2(-1*WIDTH/2-borderSize/2, -HEIGHT/2+borderSize/2));
  boundary.CreateFixture(fixDef);
  
  // right
  fixDef.shape.SetAsOrientedBox(borderSize/2, HEIGHT+borderSize/2, new b2Vec2(WIDTH/2+borderSize/2, -HEIGHT/2+borderSize/2));
  boundary.CreateFixture(fixDef);

  // reset friction
  fixDef.friction = 0.5;

  // Jar body
  bodyDef.type = b2Body.b2_staticBody
  bodyDef.position.x = WIDTH/2
  bodyDef.position.y = HEIGHT-5.1
  jar = window.VBS.b2.jar = world.CreateBody(bodyDef)
  fixDef.shape = new b2PolygonShape()

  // Jar body vertices
  fixDef.shape.SetAsArray([
    new b2Vec2(-4.399415515363216,-8.424119424819946), new b2Vec2(-3.9431654661893845,-8.78661937713623), new b2Vec2(-3.50566565990448,-8.849119615554809), new b2Vec2(-3.5244128108024597,-8.48662085533142), new b2Vec2(-4.018162712454796,-8.174120259284972)
  ])
  jar.CreateFixture(fixDef);
  fixDef.shape.SetAsArray([
    new b2Vec2(-4.018162712454796,-8.174120259284972), new b2Vec2(-4.3869128450751305,-7.705370259284973), new b2Vec2(-4.799416046589613,-7.792869281768799), new b2Vec2(-4.399415515363216,-8.424119424819946)
  ])
  jar.CreateFixture(fixDef);
  fixDef.shape.SetAsArray([
    new b2Vec2(-4.3869128450751305,-7.705370259284973), new b2Vec2(-4.5806631073355675,-7.217869830131531), new b2Vec2(-4.905665805563331,-7.4491191625595095), new b2Vec2(-4.799416046589613,-7.792869281768799)
  ])
  jar.CreateFixture(fixDef);
  fixDef.shape.SetAsArray([
    new b2Vec2(-4.5806631073355675,-7.217869830131531), new b2Vec2(-4.5619141682982445,0.21963157057762128), new b2Vec2(-4.9056661035865545,0.29463075399398786), new b2Vec2(-4.905665805563331,-7.4491191625595095)
  ])
  jar.CreateFixture(fixDef);
  fixDef.shape.SetAsArray([
    new b2Vec2(-4.5619141682982445,0.21963157057762128), new b2Vec2(-4.224414154887199,0.8008816868066786), new b2Vec2(-4.593166075646877,1.0446306347846983), new b2Vec2(-4.830666463822126,0.6071307539939879), new b2Vec2(-4.9056661035865545,0.29463075399398786)
  ])
  jar.CreateFixture(fixDef);
  fixDef.shape.SetAsArray([
    new b2Vec2(-4.224414154887199,0.8008816868066786), new b2Vec2(-3.893164023756981,1.0383816093206404), new b2Vec2(-4.143165871500969,1.3883807167410849), new b2Vec2(-4.593166075646877,1.0446306347846983)
  ])
  jar.CreateFixture(fixDef);
  fixDef.shape.SetAsArray([
    new b2Vec2(-3.893164023756981,1.0383816093206404), new b2Vec2(-3.605663627386093,1.1571316450834273), new b2Vec2(-3.8369161635637283,1.5008807770907877), new b2Vec2(-4.143165871500969,1.3883807167410849)
  ])
  jar.CreateFixture(fixDef);
  fixDef.shape.SetAsArray([
    new b2Vec2(-3.605663627386093,1.1571316450834273), new b2Vec2(-2.255663573741913,1.2446317479014395), new b2Vec2(-2.09941565990448,1.613380818814039), new b2Vec2(-3.0681660771369934,1.5508808784186838), new b2Vec2(-3.8369161635637283,1.5008807770907877)
  ])
  jar.CreateFixture(fixDef);
  fixDef.shape.SetAsArray([
    new b2Vec2(-2.255663573741913,1.2446317479014395), new b2Vec2(-0.768163800239563,1.3196317508816717), new b2Vec2(-0.35566598176956177,1.67588076852262), new b2Vec2(-2.09941565990448,1.613380818814039)
  ])
  jar.CreateFixture(fixDef);
  fixDef.shape.SetAsArray([
    new b2Vec2(-0.768163800239563,1.3196317508816717), new b2Vec2(1.2068367004394531,1.3321318507194517), new b2Vec2(1.3068348169326782,1.688380905613303), new b2Vec2(-0.35566598176956177,1.67588076852262)
  ])
  jar.CreateFixture(fixDef);
  fixDef.shape.SetAsArray([
    new b2Vec2(1.2068367004394531,1.3321318507194517), new b2Vec2(3.594335913658142,1.1883819505572317), new b2Vec2(3.3818358182907104,1.5696305625140665), new b2Vec2(1.3068348169326782,1.688380905613303)
  ])
  jar.CreateFixture(fixDef);
  fixDef.shape.SetAsArray([
    new b2Vec2(3.594335913658142,1.1883819505572317), new b2Vec2(4.119336009025574,0.9446319967508314), new b2Vec2(4.413085579872131,1.257130841910839), new b2Vec2(4.000585675239563,1.4696307882666586), new b2Vec2(3.3818358182907104,1.5696305625140665)
  ])
  jar.CreateFixture(fixDef);
  fixDef.shape.SetAsArray([
    new b2Vec2(4.119336009025574,0.9446319967508314), new b2Vec2(4.431836009025574,0.5946320325136183), new b2Vec2(4.725585579872131,0.9321306675672529), new b2Vec2(4.413085579872131,1.257130841910839)
  ])
  jar.CreateFixture(fixDef);
  fixDef.shape.SetAsArray([
    new b2Vec2(4.431836009025574,0.5946320325136183), new b2Vec2(4.575585722923279,0.050881731510162176), new b2Vec2(4.894335865974426,0.307130444049835), new b2Vec2(4.725585579872131,0.9321306675672529)
  ])
  jar.CreateFixture(fixDef);
  fixDef.shape.SetAsArray([
    new b2Vec2(4.575585722923279,0.050881731510162176), new b2Vec2(4.581835865974426,-7.117868137359619), new b2Vec2(4.900585412979126,-7.192869257926941), new b2Vec2(4.894335865974426,0.307130444049835)
  ])
  jar.CreateFixture(fixDef);
  fixDef.shape.SetAsArray([
    new b2Vec2(4.581835865974426,-7.117868137359619), new b2Vec2(4.269335865974426,-7.767868113517761), new b2Vec2(4.550585746765137,-8.067867827415466), new b2Vec2(4.8255854845047,-7.561618161201477), new b2Vec2(4.900585412979126,-7.192869257926941)
  ])
  jar.CreateFixture(fixDef);
  fixDef.shape.SetAsArray([
    new b2Vec2(4.269335865974426,-7.767868113517761), new b2Vec2(3.9255857467651367,-8.130368065834045), new b2Vec2(4.075585603713989,-8.586618375778198), new b2Vec2(4.550585746765137,-8.067867827415466)
  ])
  jar.CreateFixture(fixDef);
  fixDef.shape.SetAsArray([
    new b2Vec2(3.9255857467651367,-8.130368065834045), new b2Vec2(3.4193360805511475,-8.436618518829345), new b2Vec2(3.4443360567092896,-8.817868900299072), new b2Vec2(4.075585603713989,-8.586618375778198)
  ])
  jar.CreateFixture(fixDef);


  /* Degub info
  let data = new b2MassData
  console.log('jarBody',jar)
  console.log('GetLocalCenter',jar.GetLocalCenter())
  jar.GetMassData(data)
  console.log('GetMassData',data)
  console.log('GetPosition',jar.GetPosition())
  console.log('GetTransform',jar.GetTransform())
  console.log('GetType',jar.GetType())
  console.log('GetUserData',jar.GetUserData())
  console.log('GetWorldCenter',jar.GetWorldCenter())
  let fixtures = [jar.GetFixtureList()]
  while(fixtures[fixtures.length] = fixtures[fixtures.length-1].GetNext());
  let bodyAabb = fixtures.reduce((sofar,fixt,i,arr)=>{
      if(!fixt) return sofar
      return {
          lowerBound: {x:Math.min(sofar.lowerBound.x,fixt.GetAABB().lowerBound.x),y:Math.min(sofar.lowerBound.y,fixt.GetAABB().lowerBound.y)},
          upperBound: {x:Math.max(sofar.upperBound.x,fixt.GetAABB().upperBound.x),y:Math.max(sofar.upperBound.y,fixt.GetAABB().upperBound.y)}
      }
  },{lowerBound:{x:Infinity,y:Infinity},upperBound:{x:-Infinity,y:-Infinity}})
  console.log('bodyAabb',bodyAabb)*/

  //Reset
  bodyDef.position.x = 0;
  bodyDef.position.y = 0;

  // Lid body
  bodyDef.type = b2Body.b2_staticBody
  bodyDef.position.x = WIDTH/2
  bodyDef.position.y = 2
  lid = window.VBS.b2.lid = world.CreateBody(bodyDef)
  fixDef.shape = new b2PolygonShape()
  fixDef.shape.SetAsBox(WIDTH/4, 0.2);
  lid.CreateFixture(fixDef);
  VBS.b2.lidFixture = lid.GetFixtureList()

  var listener = new Box2D.Dynamics.b2ContactListener();
  listener.BeginContact = function (contact) {
    
    //check if one of the fixtures is the lid
    var lidFixture, otherFixture
    if ( contact.GetFixtureA() === VBS.b2.lidFixture ) {
        lidFixture = contact.GetFixtureA();
        otherFixture = contact.GetFixtureB();
    }
    else if ( contact.GetFixtureB() === VBS.b2.lidFixture ) {
        lidFixture = contact.GetFixtureB();
        otherFixture = contact.GetFixtureA();
    }

    if ( !lidFixture )
        return;
    
    var lidBody = lidFixture.GetBody(), otherBody = otherFixture.GetBody(),
        numPoints = contact.GetManifold().m_pointCount, worldManifold = new Box2D.Collision.b2WorldManifold()
    contact.GetWorldManifold(worldManifold);

    //check if contact points are moving downward
    for (let i = 0; i < numPoints; i++) {
        let pointVel = otherBody.GetLinearVelocityFromWorldPoint( worldManifold.m_points[i] );
        if ( pointVel.y < 0 )
            return;//point is moving up, leave contact solid and exit
    }

    //no points are moving upward, contact should not be solid
    contact.SetEnabled(false);
  }
  listener.EndContact = function(contact) {
    //reset the default state of the contact in case it comes back for more
    contact.SetEnabled(true);
  };

  // Empty implementations for unused methods.
  // listener.PreSolve = function(contact, oldManifold) { console.log('PreSolve',arguments) };
  // listener.PostSolve = function(contact, impulse) { console.log('PostSolve',arguments) };

  world.SetContactListener( listener );

  /**********************
   * Add body functions *
   **********************/

  var setUpJoint = window.VBS.b2.setUpJoint = function(body, _force){
    let bodyPos = body.GetPosition();
    var jointDef = new Box2D.Dynamics.Joints.b2MouseJointDef();
    jointDef.bodyA = world.GetGroundBody();
    jointDef.bodyB = body;
    jointDef.target.SetV(bodyPos);
    jointDef.maxForce = _force ? _force : 400;
    var joint = world.CreateJoint(jointDef);
    body.SetAwake(true)
    return joint
  }

  var addCircle = window.VBS.b2.addCircle = function(x, y, r) {
    var b2CircleShape = Box2D.Collision.Shapes.b2CircleShape;

    bodyDef.type = b2Body.b2_dynamicBody;
    bodyDef.position.x = x;
    bodyDef.position.y = y;
    fixDef.shape = new b2CircleShape(r)
    var circle = world.CreateBody(bodyDef);
    circle.CreateFixture(fixDef);

    //Reset
    bodyDef.position.x = 0;
    bodyDef.position.y = 0;

    return circle
  }

  var addEllipse = window.VBS.b2.addEllipse = function(x,y,a,b){
      var verts = []

      bodyDef.type = b2Body.b2_dynamicBody;
      bodyDef.position.x = x;
      bodyDef.position.y = y;
      var ellipse = world.CreateBody(bodyDef);

      var thetaToX = function(t,minus){
          return (minus ? -1 : 1)*a*b/Math.sqrt(Math.pow(b,2)+Math.pow(a,2)*Math.pow(Math.tan(t),2))
      }
      let radStep = Math.PI/(2*(q+1))
      verts.push(new b2Vec2(0,-b))
      for(let t=-1*Math.PI/2+radStep;t<-1E-4;t+=radStep){
          let x = thetaToX(t)
          verts.push(new b2Vec2(x,x*Math.tan(t)))
      }
      verts.push(new b2Vec2(a,0))
      for(let t=radStep;t<Math.PI/2-1E-4;t+=radStep){
          let x = thetaToX(t)
          verts.push(new b2Vec2(x,x*Math.tan(t)))
      }
      verts.push(new b2Vec2(0,b))
      for(let t=Math.PI/2+radStep;t<Math.PI-1E-4;t+=radStep){
          let x = thetaToX(t,true)
          verts.push(new b2Vec2(x,x*Math.tan(t)))
      }
      verts.push(new b2Vec2(-a,0))
      for(let t=-1*Math.PI+radStep;t<-1*Math.PI/2-1E-4;t+=radStep){
          let x = thetaToX(t,true)
          verts.push(new b2Vec2(x,x*Math.tan(t)))
      }
      
      fixDef.shape = new b2PolygonShape()
      let cutVerts = cutIntoPieSlicesOfMaxVerts(verts)
      cutVerts.forEach((vts,i,arr)=>{
          fixDef.shape.SetAsArray(vts)
          ellipse.CreateFixture(fixDef);
      })

      //Reset
      bodyDef.position.x = 0;
      bodyDef.position.y = 0;

      return ellipse
  }

  function cutIntoPieSlicesOfMaxVerts(vertices,max){
      var b2Vec2 = Box2D.Common.Math.b2Vec2,
          cutVerts = []
      max = max || 8
      if(vertices.length > max){
          let cut = [new b2Vec2(0,0)], idx = 0,
              cutsNeeded = Math.ceil(vertices.length/(max-2)), r = ((vertices.length+cutsNeeded*2) % max)
          r = r || max
          while(cutVerts.length < cutsNeeded){
              let numInCut
              if(cutVerts.length == cutsNeeded - 2)
                  numInCut = Math.ceil((max+r)/2)
              else if(cutVerts.length == cutsNeeded - 1)
                  numInCut = Math.floor((max+r)/2)
              else
                  numInCut = max
              while(cut.length < numInCut && idx < vertices.length){
                  cut.push(vertices[idx++])
              }
              if(idx >= vertices.length)
                  cut.push(vertices[0])
              cutVerts.push(cut)
              cut = [new b2Vec2(0,0)]
              idx--
          }
      } else cutVerts = [vertices]
      return cutVerts
  }

  var addRect = window.VBS.b2.addRect = function(x,y,w,h){
      bodyDef.type = b2Body.b2_dynamicBody;
      bodyDef.position.x = x;
      bodyDef.position.y = y;
      fixDef.shape = new b2PolygonShape()
      fixDef.shape.SetAsBox(w/2, h/2);
      var rect = world.CreateBody(bodyDef);
      rect.CreateFixture(fixDef);

      //Reset
      bodyDef.position.x = 0;
      bodyDef.position.y = 0;

      return rect
  }


  /*************************
   * Query world functions *
   *************************/

  var getBodyAt = window.VBS.b2.getBodyAt = function(x,y) {
    if(x === undefined) return false
    if(y === undefined) {
      if(x.x === undefined || x.y === undefined)
        return false
      else {
        y=x.y; x=x.x
      }
    }
    var pos = new Box2D.Common.Math.b2Vec2(x, y);
    var aabb = new Box2D.Collision.b2AABB();
    var epsilon = 5/((window.VBS.pixi && window.VBS.pixi.SCALE) || 30) // Allow 5px either side
    aabb.lowerBound.Set(x - epsilon, y - epsilon);
    aabb.upperBound.Set(x + epsilon, y + epsilon);
    
    var body;
    world.QueryAABB(
        function (fixture) {
            if(fixture.GetBody().GetType() != Box2D.Dynamics.b2BodyDef.b2_staticBody) {
                if(fixture.GetShape().TestPoint(fixture.GetBody().GetTransform(), pos)) {
                    body = fixture.GetBody();
                    return false; // Can stop now
                }
            }
            return true; // Keep going
        },
        aabb
    );
    return body;
  }

  /**************
   * Debug Draw *
   **************/

  if(window.VBS.DEBUG){
      let debugView = document.createElement('canvas')
      debugView.setAttribute('width',((window.VBS.pixi && window.VBS.pixi.WIDTH) || 512))
      debugView.setAttribute('height',((window.VBS.pixi && window.VBS.pixi.HEIGHT) || 512))
      VBS.$el.find('.anim-canvas-wrap').append(debugView)
      debugView.addEventListener('contextmenu', function(e){ e.preventDefault();return false; })
      var b2DebugDraw = Box2D.Dynamics.b2DebugDraw
      var debugDraw = new b2DebugDraw();
      debugDraw.SetSprite(debugView.getContext("2d"));
      debugDraw.SetDrawScale(SCALE);
      debugDraw.SetFillAlpha(0.3);
      debugDraw.SetLineThickness(1.0);
      debugDraw.SetFlags(b2DebugDraw.e_shapeBit | b2DebugDraw.e_jointBit);
      world.SetDebugDraw(debugDraw);
  }
  
}