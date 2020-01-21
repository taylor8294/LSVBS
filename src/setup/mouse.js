export default function(config) {

    /*********
     * Setup *
     *********/

    // Vars
    var that = this
    this.mouse = {}
    
    // Event listeners
    function onMoveTouching(event) {
        var rect = that.pixi.app.view.getBoundingClientRect();
        if (event['changedTouches']) {
            let touch = event['changedTouches'][0];
            that.mouse.touchX = (touch.clientX-rect.left) / rect.width * (that.box2d.WIDTH || 512/40);
            that.mouse.touchY = (touch.clientY-rect.top) / rect.height * (that.box2d.HEIGHT || 640/40);
        } else {
            that.mouse.touchX = (event.clientX-rect.left) / rect.width * (that.box2d.WIDTH || 512/40);
            that.mouse.touchY = (event.clientY-rect.top) / rect.height * (that.box2d.HEIGHT || 640/40);
        }
    }

    document.addEventListener('mousedown', function(event) {
        that.mouse.isPointerDown = true;
        onMoveTouching(event);
        document.addEventListener('mousemove', onMoveTouching, true);
    }, true);
    
    document.addEventListener('mouseup', function(event) {
        document.removeEventListener('mousemove', onMoveTouching, true);
        that.mouse.isPointerDown = false;
        that.mouse.touchX = undefined;
        that.mouse.touchY = undefined;
    }, true);
    
    document.addEventListener('touchstart', function(event) {
        that.mouse.isPointerDown = true;
        onMoveTouching(event);
        document.addEventListener('touchmove', onMoveTouching, true);
    }, true);
    
    document.addEventListener('touchend', function(event) {
        document.removeEventListener('touchmove', onMoveTouching, true);
        that.mouse.isPointerDown = false;
        that.mouse.touchX = undefined;
        that.mouse.touchY = undefined;
    }, true);

  }