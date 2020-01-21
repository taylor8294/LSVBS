export default function() {
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

    var that=this, frameTimes = []

    this.box2d.doWorldStep = function(time){
        if(!time) time = (new Date()).getTime()
        let lastFrameTime = frameTimes.length ? frameTimes[frameTimes.length-1] : time - 1000/60
        let dt = Math.max(Math.min((time-lastFrameTime)/1000,1/30),1/60)
        //that.box2d.world.Step(dt, 12, 12);
        that.box2d.world.Step(dt/2, 6, 6);
        that.box2d.world.Step(dt/2, 6, 6);
        if(that.DEBUG) that.box2d.world.DrawDebugData();
        that.box2d.world.ClearForces();
    }

    function update(time){    
        //Aliases
        var world = this.box2d.world,
            app = this.pixi.app,
            MARGIN = this.pixi.MARGIN,
            SCALE = this.pixi.SCALE;
        
        if(!time) time = (new Date()).getTime()

        // Check if mouse needs updating
        if(this.pixi.jar && this.pixi.jar.alpha > 0.5 && this.mouse.isPointerDown && !this.box2d.mouseJoint) {
            var dragBody = this.box2d.getBodyAt(this.mouse.touchX, this.mouse.touchY);
            if(dragBody) {
                dragBody.SetAwake(true);
                var jointDef = new Box2D.Dynamics.Joints.b2MouseJointDef();
                jointDef.bodyA = world.GetGroundBody();
                jointDef.bodyB = dragBody;
                jointDef.target.Set(this.mouse.touchX, this.mouse.touchY);
                jointDef.collideConnected = true;
                jointDef.maxForce = 1000;
                this.box2d.mouseJoint = world.CreateJoint(jointDef);
            }
        }
        if(this.box2d.mouseJoint) {
            if(this.pixi.jar.alpha > 0.5 && this.mouse.isPointerDown)
                this.box2d.mouseJoint.SetTarget(new Box2D.Common.Math.b2Vec2(this.mouse.touchX, this.mouse.touchY));
            else {
                world.DestroyJoint(this.box2d.mouseJoint);
                this.box2d.mouseJoint = null;
            }
        }

        // Check if any bodies need removing
        if(this.box2d.toRemove){
            while(this.box2d.toRemove.length){
                this.pixi.remove(this.box2d.toRemove.shift())
            }
        }
        
        if(!this.STOP){
            // Update world
            this.box2d.doWorldStep(time)
        }

        //Update graphics
        //for (var i=0; i<app.stage.children.length; i++) { // Coins are added to a container of their own to ease fading out
        for (var i=0; i<this.pixi.coinsContainer.children.length; i++) {
            let actor = this.pixi.coinsContainer.children[i] //app.stage.children[i]
            if(!actor.body) continue;
            let bodyPos = actor.body.GetPosition();
            actor.rotation = actor.body.GetAngle();
            let marginOffsetX = actor.body.GetFixtureList().GetType() !== Box2D.Collision.Shapes.b2Shape.e_polygonShape ? 0 : ((MARGIN/2)/(1-MARGIN))*actor.geometry.graphicsData[0].shape.width
            let marginOffsetY = actor.body.GetFixtureList().GetType() !== Box2D.Collision.Shapes.b2Shape.e_polygonShape ? 0 : ((MARGIN/2)/(1-MARGIN))*actor.geometry.graphicsData[0].shape.height
            actor.position.set(
                bodyPos.x*SCALE + (marginOffsetX*Math.cos(actor.rotation)-marginOffsetY*Math.sin(actor.rotation)),
                bodyPos.y*SCALE + (marginOffsetX*Math.sin(actor.rotation)+marginOffsetY*Math.cos(actor.rotation))
            )
        }
        
        if(this.ABORT){
            if(document.getElementById('fps')) document.getElementById('fps').innerHTML = "-- FPS"
            this.timeline.progress(0)
            VBS.$el.find('.anim-loading').hide()
            VBS.$el.find('.anim-play').show()
            VBS.music.stop()
            VBS.musicWasPlaying = false
            if(this.speech.currentlyPlaying)
              this.speech.currentlyPlaying.stop()
            this.speech.currentlyPlayingId = null
            this.speech.currentlyPlaying = null
        } else {
            // FPS counter
            if(document.getElementById('fps')){
                frameTimes.push(time)
                let gtOneSec
                while(time - frameTimes[0] > 1000)
                    gtOneSec = frameTimes.shift();
                if(gtOneSec)
                    frameTimes.unshift(gtOneSec)
                if(frameTimes.length > 1)
                    document.getElementById('fps').innerHTML = Math.round(1000*frameTimes.length/(frameTimes[frameTimes.length-1]-frameTimes[0]))+" FPS"
            }
            // Loop
            window.requestAnimationFrame(update.bind(this))
        }
        
    }

    window.requestAnimationFrame(update.bind(this))
}