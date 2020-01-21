export function mouseSetup() {

    /*********
     * Setup *
     *********/

    // Vars
    window.VBS = window.VBS || {}
    var app = window.VBS.pixi.app
    
    // Event listeners
    function onMoveTouching(event) {
        var rect = app.view.getBoundingClientRect();
        if (event["changedTouches"]) {
            let touch = event["changedTouches"][0];
            window.VBS.touchX = (touch.clientX-rect.left) / rect.width * ((window.VBS.b2 && window.VBS.b2.WIDTH) || 512/30);
            window.VBS.touchY = (touch.clientY-rect.top) / rect.height * ((window.VBS.b2 && window.VBS.b2.HEIGHT) || 640/30);
        } else {
            window.VBS.touchX = (event.clientX-rect.left) / rect.width * ((window.VBS.b2 && window.VBS.b2.WIDTH) || 512/30);
            window.VBS.touchY = (event.clientY-rect.top) / rect.height * ((window.VBS.b2 && window.VBS.b2.HEIGHT) || 640/30);
        }
    }

    document.addEventListener("mousedown", function(event) {
        window.VBS.isPointerDown = true;
        onMoveTouching(event);
        document.addEventListener("mousemove", onMoveTouching, true);
    }, true);
    
    document.addEventListener("mouseup", function(event) {
        document.removeEventListener("mousemove", onMoveTouching, true);
        window.VBS.isPointerDown = false;
        window.VBS.touchX = undefined;
        window.VBS.touchY = undefined;
    }, true);
    
    document.addEventListener("touchstart", function(event) {
        window.VBS.isPointerDown = true;
        onMoveTouching(event);
        document.addEventListener("touchmove", onMoveTouching, true);
    }, true);
    
    document.addEventListener("touchend", function(event) {
        document.removeEventListener("touchmove", onMoveTouching, true);
        window.VBS.isPointerDown = false;
        window.VBS.touchX = undefined;
        window.VBS.touchY = undefined;
    }, true);
    
  }