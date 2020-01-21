export function startRenderLoop() {
    // rAF polyfill - https://gist.github.com/paulirish/1579671
    (function() {
        var lastTime = 0;
        var vendors = ['ms', 'moz', 'webkit', 'o'];
        for(var x = 0; x < vendors.length && !window.requestAnimationFrame; ++x) {
            window.requestAnimationFrame = window[vendors[x]+'RequestAnimationFrame'];
            window.cancelAnimationFrame = window[vendors[x]+'CancelAnimationFrame'] 
                                       || window[vendors[x]+'CancelRequestAnimationFrame'];
        }
        if (!window.requestAnimationFrame)
            window.requestAnimationFrame = function(callback, element) {
                var currTime = new Date().getTime();
                var timeToCall = Math.max(0, 16 - (currTime - lastTime));
                var id = window.setTimeout(function() { callback(currTime + timeToCall); }, 
                  timeToCall);
                lastTime = currTime + timeToCall;
                return id;
            };
        if (!window.cancelAnimationFrame)
            window.cancelAnimationFrame = function(id) {
                clearTimeout(id);
            };
    }());

    var frameTimes = []

    VBS.b2.doWorldStep = function(time){
        if(!time) time = (new Date()).getTime()
        let lastFrameTime = frameTimes.length ? frameTimes[frameTimes.length-1] : time - 1000/60
        let dt = Math.max(Math.min((time-lastFrameTime)/1000,1/30),1/60)
        //VBS.b2.world.Step(dt, 12, 12);
        VBS.b2.world.Step(dt/2, 6, 6);
        VBS.b2.world.Step(dt/2, 6, 6);
        if(window.VBS.DEBUG) VBS.b2.world.DrawDebugData();
        VBS.b2.world.ClearForces();
    }

    function update(time){    
        //Aliases
        var world = window.VBS.b2.world,
            stage = window.VBS.pixi.app.stage,
            MARGIN = window.VBS.pixi.MARGIN,
            SCALE = window.VBS.pixi.SCALE;
        
        if(!time) time = (new Date()).getTime()

        // Check if mouse needs updating
        if(VBS.pixi.jar.alpha > 0.5 && window.VBS.isPointerDown && !window.VBS.b2.mouseJoint) {
            var dragBody = window.VBS.b2.getBodyAt(window.VBS.touchX, window.VBS.touchY);
            if(dragBody) {
                dragBody.SetAwake(true);
                var jointDef = new Box2D.Dynamics.Joints.b2MouseJointDef();
                jointDef.bodyA = world.GetGroundBody();
                jointDef.bodyB = dragBody;
                jointDef.target.Set(window.VBS.touchX, window.VBS.touchY);
                jointDef.collideConnected = true;
                jointDef.maxForce = 1000;
                window.VBS.b2.mouseJoint = world.CreateJoint(jointDef);
            }
        }
        if(window.VBS.b2.mouseJoint) {
            if(VBS.pixi.jar.alpha > 0.5 && window.VBS.isPointerDown)
                window.VBS.b2.mouseJoint.SetTarget(new Box2D.Common.Math.b2Vec2(window.VBS.touchX, window.VBS.touchY));
            else {
                world.DestroyJoint(window.VBS.b2.mouseJoint);
                window.VBS.b2.mouseJoint = null;
            }
        }
        
        if(!window.VBS.STOP){
            // Update world
            VBS.b2.doWorldStep(time)
        }

        //Update graphics
        for (var i=0; i<stage.children.length; i++) {
            let actor = stage.children[i]
            if(!actor.body) continue;
            let bodyPos = actor.body.GetPosition();
            actor.rotation = actor.body.GetAngle();
            let marginOffsetX = actor.geometry.graphicsData[0].shape.type !== PIXI.SHAPES.RECT ? 0 : ((MARGIN/2)/(1-MARGIN))*actor.geometry.graphicsData[0].shape.width
            let marginOffsetY = actor.geometry.graphicsData[0].shape.type !== PIXI.SHAPES.RECT ? 0 : ((MARGIN/2)/(1-MARGIN))*actor.geometry.graphicsData[0].shape.height
            actor.position.set(
                bodyPos.x*SCALE + (marginOffsetX*Math.cos(actor.rotation)-marginOffsetY*Math.sin(actor.rotation)),
                bodyPos.y*SCALE + (marginOffsetX*Math.sin(actor.rotation)+marginOffsetY*Math.cos(actor.rotation))
            )
        }
        
        if(window.VBS.ABORT){
            //document.getElementById('fps').innerHTML = "-- FPS"
            window.VBS.timeline.progress(0)
            VBS.$el.find('.anim-loading').hide()
            VBS.$el.find('.anim-play').show()
            VBS.music.stop()
            VBS.musicWasPlaying = false
            if(window.VBS.speech.currentlyPlaying)
              window.VBS.speech.currentlyPlaying.stop()
            window.VBS.speech.currentlyPlayingId = null
            window.VBS.speech.currentlyPlaying = null
        } else {
            /* FPS counter
            frameTimes.push(time)
            let gtOneSec
            while(time - frameTimes[0] > 1000)
                gtOneSec = frameTimes.shift();
            if(gtOneSec)
                frameTimes.unshift(gtOneSec)
            if(frameTimes.length > 1)
                document.getElementById('fps').innerHTML = Math.round(1000*frameTimes.length/(frameTimes[frameTimes.length-1]-frameTimes[0]))+" FPS"*/
            // Loop
            window.requestAnimationFrame(update)
        }
        
    }

    window.requestAnimationFrame(update)
}