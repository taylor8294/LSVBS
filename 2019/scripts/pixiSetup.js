export function pixiSetup() {

    /*********
     * Setup *
     *********/

    // Aliases
    let { Application, resources, Sprite, Grapghics } = PIXI;

    // Vars
    window.VBS = window.VBS || {}
    window.VBS.pixi = {}
    var app, stage, loader, WIDTH, HEIGHT, SCALE, MARGIN,
        life, sight, wtw, arrow, jar, interactive
    
    WIDTH = window.VBS.pixi.WIDTH = 512
    HEIGHT = window.VBS.pixi.HEIGHT = 640
    SCALE = window.VBS.pixi.SCALE = 40
    MARGIN = window.VBS.pixi.MARGIN = 0.1

    loader = PIXI.Loader.shared
    window.VBS.pixi.assetsLoaded = false

    // Create a Pixi Application
    function isIE() {
        var ua = window.navigator.userAgent; //Check the userAgent property of the window.navigator object
        var msie = ua.indexOf('MSIE '); // IE 10 or older
        var trident = ua.indexOf('Trident/'); //IE 11

        return (msie > 0 || trident > 0);
    }
    app = window.VBS.pixi.app = new Application({ 
        width: WIDTH, 
        height: HEIGHT,                    
        antialias: true, 
        transparent: true,
        //backgroundColor: 0xffffff,
        //forceCanvas: isIE()
    });
    stage = app.stage

    let baseTextStyle = VBS.pixi.baseTextStyle = new PIXI.TextStyle({fontFamily : ['Franklin-Gothic-Demi', 'Franklin Gothic Demi', 'Franklin Gothic Medium', 'Franklin Gothic', 'ITC Franklin Gothic', 'Arial', 'ArialMT', 'sans-serif'], fontSize: 36, fill : 0x575756, align : 'left'})
    
    if (app.renderer.type !== PIXI.RENDERER_TYPE.WEBGL) {
        app.renderer.context.mozImageSmoothingEnabled = false
        app.renderer.context.webkitImageSmoothingEnabled = false
    }

    // Fix for iOS GPU issues
    app.view.style['transform'] = 'translatez(0)'
    // Allow scroll on canvas when not preventing default
    app.view.style['touch-action'] = 'auto'
    app.renderer.plugins.interaction.autoPreventDefault = false
    
    // Add the canvas that Pixi automatically created to the HTML document and disable context menu
    VBS.$el.find('.anim-canvas-wrap').append(app.view);
    app.view.addEventListener('contextmenu', function(e){ e.preventDefault();return false; })
    VBS.tracker.setWidth(app.view.clientWidth);
    VBS.tracker.setHeight(app.view.clientHeight);
    
    // Load assets
    loader.add('life','./static/LIF/vbs/img/life.png')
        .add('sight','./static/LIF/vbs/img/sight.png')
        .add('wtw','./static/LIF/vbs/img/wtw.png')
        .add('freq','./static/LIF/vbs/audio/freq.json')
        .add('jar','./static/LIF/vbs/img/jar.png')
        .add('interactive','./static/LIF/vbs/img/interactive.png')
        .load(onAssetsLoaded);

    /*loader.onProgress.add((loader,res)=>{
        console.log(loader.progress+"%")
    })*/
    loader.onError.add((err,loader,res)=>{
        console.error(res.name+" failed to load!")
        window.VBS.ABORT = true
    })
    
    function onAssetsLoaded(){
        window.VBS.pixi.assetsLoaded = true;

        life = window.VBS.pixi.life = new PIXI.Sprite(PIXI.Loader.shared.resources['life'].texture)
        let ratio = 290/512,
            sfac = (WIDTH/2)/512, // Scale to half pixi width
            x = WIDTH/4,
            y = HEIGHT/2-(ratio*(WIDTH/4))
        
        life.scale.set(sfac,sfac)
        life.position.set(x,y)
        stage.addChild(life)
        var lifeMask = new PIXI.Graphics();
        lifeMask.position.x = 0;
        lifeMask.position.y = 0;
        lifeMask.beginFill(0xffffff);
        lifeMask.drawRect(0, 0, WIDTH/4+(230/512)*(WIDTH/2), HEIGHT);
        lifeMask.cacheAsBitmap = true;
        stage.addChild(lifeMask);
        life.mask = lifeMask

        sight = window.VBS.pixi.sight = new PIXI.Sprite(PIXI.Loader.shared.resources['sight'].texture)
        sight.scale.set(sfac,sfac)
        sight.position.set(x,y)
        stage.addChild(sight)
        var sightMask = new PIXI.Graphics();
        sightMask.position.x = 0;
        sightMask.position.y = 0;
        sightMask.beginFill(0xffffff);
        sightMask.drawRect(WIDTH/4+(230/512)*(WIDTH/2), 0, WIDTH, HEIGHT);
        sightMask.cacheAsBitmap = true;
        stage.addChild(sightMask);
        sight.mask = sightMask

        wtw = window.VBS.pixi.wtw = new PIXI.Sprite(PIXI.Loader.shared.resources['wtw'].texture)
        wtw.scale.set(sfac,sfac)
        wtw.position.set(x,y)
        stage.addChild(wtw)

        // arrow = window.VBS.pixi.arrow = new PIXI.Sprite(PIXI.Loader.shared.resources['arrow'].texture)
        // //ratio = PIXI.Loader.shared.resources['arrow'].data.naturalHeight/PIXI.Loader.shared.resources['arrow'].data.naturalWidth
        // sfac = (WIDTH/2)/PIXI.Loader.shared.resources['arrow'].data.naturalWidth // Scale to half width
        // arrow.scale.set(sfac,sfac)
        // arrow.position.set(WIDTH/4,-HEIGHT/2)
        // arrow.rotation = 60*Math.PI/180
        // //arrow.visible = false
        // stage.addChild(arrow)
        
        var pointer = window.VBS.pixi.pointer = new PIXI.Graphics();
        let pointerLength = 3*Math.min(WIDTH,HEIGHT)/4,
            pointerWidth = 45;
        pointer.beginFill(0x009fd2)
        pointer.drawRect(0, 20, pointerWidth, pointerLength-20)
        pointer.moveTo(0, 20);
        pointer.lineTo(pointerWidth/2, 0);
        pointer.lineTo(pointerWidth, 20);
        pointer.endFill()
        pointer.pivot.set(pointerWidth/2,pointerLength/2)
        pointer.position.set(WIDTH/2,HEIGHT/2)
        pointer.alpha = 0
        stage.addChild(pointer)

        window.VBS.pixi.freq = PIXI.Loader.shared.resources['freq'].data

        jar = window.VBS.pixi.jar = new PIXI.Sprite(PIXI.Loader.shared.resources['jar'].texture)
        sfac = 10/(PIXI.Loader.shared.resources['jar'].data.naturalWidth/SCALE) // Scale to pixel size = ~10m wide in b2World
        jar.scale.set(sfac,sfac)
        jar.position.set(56,80) //TODO avoid hardcoding?
        jar.visible = false
        stage.addChildAt(jar,0)

        interactive = window.VBS.pixi.interactive = new PIXI.Sprite(PIXI.Loader.shared.resources['interactive'].texture)
        //ratio = PIXI.Loader.shared.resources['interactive'].data.naturalHeight/PIXI.Loader.shared.resources['interactive'].data.naturalWidth
        sfac = (WIDTH/8)/PIXI.Loader.shared.resources['interactive'].data.naturalWidth // Scale to 8th width
        interactive.scale.set(sfac,sfac)
        interactive.position.set(WIDTH/8,HEIGHT-interactive.height*2)
        interactive.rotation = 30*Math.PI/180
        interactive.alpha = 0
        //interactive.visible = false
        stage.addChild(interactive)

        // Interactive text
        let textStyle = baseTextStyle.clone()
        textStyle.fontSize = 16
        let interactiveString = 'Interactive!'
        let textMetrics = PIXI.TextMetrics.measureText(interactiveString, textStyle)
        let interactiveText = VBS.pixi.interactiveText = new PIXI.Text(interactiveString, textStyle);
        interactiveText.position.set(WIDTH/8-textMetrics.width/2, HEIGHT-interactive.height/2)
        interactiveText.alpha = 0
        stage.addChild(interactiveText)

        /*report pages
        VBS.pixi.reportPages = []
        VBS.pixi.reportPages.push(new PIXI.Sprite(PIXI.Loader.shared.resources['report'].texture))
        VBS.pixi.reportPages.push(new PIXI.Sprite(PIXI.Loader.shared.resources['report'].texture))
        VBS.pixi.reportPages.push(new PIXI.Sprite(PIXI.Loader.shared.resources['report'].texture))
        VBS.pixi.reportPages[0].scale.set(0.4, 0.4)
        VBS.pixi.reportPages[1].scale.set(0.4, 0.4)
        VBS.pixi.reportPages[2].scale.set(0.4, 0.4)
        VBS.pixi.reportPages[0].anchor.set(0.5)
        VBS.pixi.reportPages[1].anchor.set(0.5)
        VBS.pixi.reportPages[2].anchor.set(0.5)
        VBS.pixi.reportPages[0].rotation = 6*Math.PI/180
        VBS.pixi.reportPages[1].rotation = 2*Math.PI/180
        VBS.pixi.reportPages[2].rotation = -2*Math.PI/180
        VBS.pixi.reportPages[0].position.set(-WIDTH/2-VBS.pixi.reportPages[0].width/2, HEIGHT/2-VBS.pixi.reportPages[0].height/2)
        VBS.pixi.reportPages[1].position.set(3*WIDTH/2-VBS.pixi.reportPages[1].width/2, HEIGHT/2-VBS.pixi.reportPages[1].height/2)
        VBS.pixi.reportPages[2].position.set(-WIDTH/2-VBS.pixi.reportPages[2].width/2, HEIGHT/2-VBS.pixi.reportPages[2].height/2)
        stage.addChild(VBS.pixi.reportPages[0],VBS.pixi.reportPages[1],VBS.pixi.reportPages[2])*/
    }
  
    /*******************
     * Create elements *
     *******************/

    // Create ongoing balance figure
    VBS.pixi.balanceFigureStyle = baseTextStyle.clone()
    VBS.pixi.balanceFigureStyle.fontSize = 48
    VBS.pixi.balanceFigureStyle.fontWeight = '400'
    VBS.pixi.balanceFigureStyle.align = 'center'
    let balanceFigureTextMetrics = PIXI.TextMetrics.measureText('£0', VBS.pixi.balanceFigureStyle)
    VBS.pixi.balanceFigure = new PIXI.Text('£0', VBS.pixi.balanceFigureStyle);
    VBS.pixi.balanceFigure.anchor.set(0.5)
    VBS.pixi.balanceFigure.position.set(WIDTH/2, balanceFigureTextMetrics.height)
    //VBS.pixi.balanceFigure.pivot = {x: balanceFigureTextMetrics.width/2, y: balanceFigureTextMetrics.height/2}
    VBS.pixi.balanceFigure.alpha = 0
    stage.addChild(VBS.pixi.balanceFigure)

    // Create tooltip
    var tooltip = VBS.pixi.tooltip = new PIXI.Container(),
        tooltipBg = new PIXI.Graphics(),
        tooltipTextSize = 18,
        tooltipTextStyle = new PIXI.TextStyle({fontFamily : ['Franklin-Gothic-Demi', 'Franklin Gothic Demi', 'Franklin Gothic Medium', 'Franklin Gothic', 'ITC Franklin Gothic', 'Arial', 'ArialMT', 'sans-serif'], fontSize: tooltipTextSize, fill : 0x333333, align : 'left'}),
        tooltipTextString = "Contributions",
        tooltipTextMetrics = PIXI.TextMetrics.measureText(tooltipTextString, tooltipTextStyle),
        tooltipH = tooltipTextMetrics.height*1.5,
        tooltipW = tooltipTextMetrics.width+30,
        tooltipText = new PIXI.Text(tooltipTextString, tooltipTextStyle);
    
    tooltipBg.beginFill(0xFFFFFF,0.8)
    tooltipBg.lineStyle(1.5, 0x999999)
    tooltipBg.drawRect(0, 0, tooltipW, tooltipH)
    tooltipBg.endFill()
    //tooltipBg.cacheAsBitmap = true

    tooltipText.position.set(15, tooltipTextMetrics.height*0.25)
    
    tooltip.addChild(tooltipBg,tooltipText);
    tooltip.position.set(150, 150)
    tooltip.alpha = 0
    stage.addChild(tooltip)
    
    VBS.pixi.setTooltip = function(text){
        tooltipTextMetrics = PIXI.TextMetrics.measureText(text, tooltipTextStyle)
        VBS.pixi.tooltip.children[1].text = text
        VBS.pixi.tooltip.width = VBS.pixi.tooltip.children[0].width = tooltipTextMetrics.width+30
    }
    VBS.pixi.tooltipIn = function(duration){
        duration = duration || 0.1;
        TweenMax.to(VBS.pixi.tooltip,duration,{
            pixi: {alpha: 1}
        });
    }
    VBS.pixi.tooltipOut = function(duration){
        duration = duration || 0.1;
        TweenMax.to(VBS.pixi.tooltip,duration,{
            pixi: {alpha: 0}
        });
    }
  
    /***********************
     * Convenience methods *
     ***********************/

    // Set the ongoing balance figure
    VBS.pixi.setBalanceFigure = function(num) {
        let fig = Math.abs(num)
        VBS.pixi.balanceFigure.text = (num < 0 ? '-' : '')+'£'+fig.toFixedCommas()
        //VBS.pixi.balanceFigure.position.set(WIDTH/2, VBS.pixi.balanceFigure.y)
    }
    
    // Convenience methods to make the figure and subtitles for each scene
    VBS.pixi.makeFigure = function(num) {
        let fig = Math.abs(num) < 1 ? Math.abs(num) : Math.round(Math.abs(num))
        let txt = (num < 0 ? '–' : '')+'£'+fig.toFixedCommas()
        let figureStyle = baseTextStyle.clone()
        figureStyle.fontSize = 48
        figureStyle.fontWeight = '400'
        figureStyle.align = 'center'
        let textMetrics = PIXI.TextMetrics.measureText(txt, figureStyle)
        let figure = new PIXI.Text(txt, figureStyle);
        figure.position.set(WIDTH/2-textMetrics.width/2, textMetrics.height/2)
        return figure
    }
    VBS.pixi.makeSubtitle = function(txt) {
        let subtitleStyle = baseTextStyle.clone()
        subtitleStyle.fontSize = 24
        subtitleStyle.fontWeight = '400'
        subtitleStyle.align = 'center'
        let textMetrics = PIXI.TextMetrics.measureText(txt, subtitleStyle)
        let subtitle = new PIXI.Text(txt, subtitleStyle);
        subtitle.position.set(WIDTH/2-textMetrics.width/2, 3*textMetrics.height)
        return subtitle
    }

    // Convenience method to get a given number of squares from the top of the jar
    VBS.pixi.gimme = function(n,isReturn){
      let result = [], tmp
      if(!isReturn){
        tmp = VBS.pots.return.filter(actor => actor.alpha > 0.5).sort((a,b) => a.y > b.y ? 1 : a.y < b.y ? -1 : 0)
        for (let i = 0; result.length < n && i < tmp.length; i++) {
            result.push(tmp[i])
        }
      }
      if (result.length < n) {
        tmp = VBS.pots.start.filter(actor => actor.alpha > 0.5).sort((a,b) => a.y > b.y ? 1 : a.y < b.y ? -1 : 0)
        for(let i=0;result.length<n && i<tmp.length;i++){
          result.push(tmp[i])
        }
        if (result.length < n) {
          tmp = VBS.pots.transfers.filter(actor => actor.alpha > 0.5).sort((a,b) => a.y > b.y ? 1 : a.y < b.y ? -1 : 0)
          for (let i = 0; result.length < n && i < tmp.length; i++) {
            result.push(tmp[i])
          }
          if (result.length < n) {
            tmp = VBS.pots.contsEr.filter(actor => actor.alpha > 0.5).sort((a,b) => a.y > b.y ? 1 : a.y < b.y ? -1 : 0)
            for (let i = 0; result.length < n && i < tmp.length; i++) {
              result.push(tmp[i])
            }
            if (result.length < n) {
              tmp = VBS.pots.contsEe.filter(actor => actor.alpha > 0.5).sort((a,b) => a.y > b.y ? 1 : a.y < b.y ? -1 : 0)
              for (let i = 0; result.length < n && i < tmp.length; i++) {
                result.push(tmp[i])
              }
            }
          }
        }
      }
      return result
    }
  
    /***********************
     * Add actor functions *
     ***********************/

    var addCircle = window.VBS.pixi.addCircle = function(x,y,r,fill,b2){
        let props
        if(typeof x === 'object') props = x
        else props = {
            x: x || 0,
            y: y || 0,
            r: r || 1,
            fill: fill || 0x000000
        }
        if(b2 === undefined) b2 = true
        var graphics = new PIXI.Graphics();
        graphics.beginFill(props.fill);
        graphics.drawCircle(0, 0, props.r * SCALE * (1-MARGIN));
        graphics.endFill();
        graphics.x = props.x * SCALE;
        graphics.y = props.y * SCALE;
        if(b2)
            graphics.body = window.VBS.b2.addCircle(props.x,props.y,props.r)
        //graphics.cacheAsBitmap = true;
        stage.addChild(graphics);
        return graphics
    }

    var addEllipse = window.VBS.pixi.addEllipse = function(x,y,a,b,fill,b2){
        let props
        if(typeof x === 'object') props = x
        else props = {
            x: x || 0,
            y: y || 0,
            a: a || 1,
            b: b || 1,
            fillStyle: fill || 0x000000
        }
        if(props.w && !props.a) props.a = props.w/2
        if(props.h && !props.b) props.b = props.h/2
        if(b2 === undefined) b2 = true
        var graphics = new PIXI.Graphics();
        graphics.beginFill(props.fillStyle);
        graphics.drawEllipse(0, 0, props.a * SCALE * (1-MARGIN), props.b * SCALE * (1-MARGIN));
        graphics.endFill();
        graphics.x = props.x * SCALE;
        graphics.y = props.y * SCALE;
        if(b2)
            graphics.body = window.VBS.b2.addEllipse(props.x,props.y,props.a,props.b)
        //graphics.cacheAsBitmap = true;
        stage.addChild(graphics);
        return graphics
    }

    var addRect = window.VBS.pixi.addRect = function(x,y,w,h,fill,r,zIndex){
        let props
        if(typeof x === 'object') props = x
        else props = {
            x: x || 0,
            y: y || 0,
            w: w,
            h: h,
            fillStyle: fill || 0x000000,
            r: r
        }
        if(props.w === undefined && props.h === undefined){
            props.h = props.w = props.s ? props.s : 1
        } else {
            if(props.w === undefined && props.h) props.w = props.h
            else if(props.h === undefined && props.w) props.h = props.w
        }
        var graphics = new PIXI.Graphics();
        graphics.beginFill(props.fillStyle);
        if(props.r > 1E-4)
            graphics.drawRoundedRect(
                -1*props.w/2*props.w/2,
                -1*props.h/2*props.h/2,
                props.w,
                props.h,
                props.r
            );
        else
            graphics.drawRect(
                -1*props.w/2,
                -1*props.h/2,
                props.w,
                props.h
            )
        graphics.endFill();
        graphics.position.set(props.x, props.y);
        //graphics.cacheAsBitmap = true;
        if(zIndex !== undefined) stage.addChildAt(graphics, zIndex);
        else stage.addChild(graphics);
        return graphics
    }

    var addB2Rect = window.VBS.pixi.addB2Rect = function(x,y,w,h,fill,r,zIndex,group){
        let props
        if(typeof x === 'object') props = x
        else props = {
            x: x || 0,
            y: y || 0,
            w: w,
            h: h,
            fillStyle: fill || 0x000000,
            r: r
        }
        if(props.w === undefined && props.h === undefined){
            props.h = props.w = props.s ? props.s : 1
        } else {
            if(props.w === undefined && props.h) props.w = props.h
            else if(props.h === undefined && props.w) props.h = props.w
        }
        var graphics = new PIXI.Graphics();
        graphics.beginFill(props.fillStyle);
        if(props.r > 1E-4)
            graphics.drawRoundedRect(
                -1*SCALE*props.w/2+(1-MARGIN)*props.w/2,
                -1*SCALE*props.h/2+(1-MARGIN)*props.h/2,
                SCALE*props.w*(1-MARGIN),
                SCALE*props.h*(1-MARGIN),
                SCALE*props.r
            );
        else
            graphics.drawRect(
                -1*SCALE*props.w/2,
                -1*SCALE*props.h/2,
                SCALE*props.w*(1-MARGIN),
                SCALE*props.h*(1-MARGIN)
            )
        graphics.endFill();
        graphics.position.set(props.x * SCALE, props.y * SCALE);
        graphics.body = window.VBS.b2.addRect(props.x,props.y,props.w,props.h)
        if(group) graphics['_group'] = group
        else graphics['_group'] = 'default'
        graphics.interactive = true;
        graphics.on('pointerover', function(e) {
            if(VBS.pixi.jar.alpha < 1) return;
            VBS.pixi.setTooltip(this['_group']);
            if(this.position.x < WIDTH/2)
                VBS.pixi.tooltip.position.set(this.position.x+8,this.position.y+8);
            else
                VBS.pixi.tooltip.position.set(this.position.x-VBS.pixi.tooltip.width-2,this.position.y+2);
            VBS.pixi.tooltipIn();
        })
        graphics.on('pointerout', function(e) { 
            if(VBS.pixi.jar.alpha < 1) return;
            else VBS.pixi.tooltipOut()
        })
        if(zIndex !== undefined)
            stage.addChildAt(graphics, zIndex);
        else
            stage.addChild(graphics);
        return graphics
    }
    
  
    /**************
     * Remove Fns *
     **************/

    var remove = window.VBS.pixi.remove = function(graphics){
        if(graphics.body)
            window.VBS.b2.world.DestroyBody(graphics.body)
        stage.removeChild(graphics)
        return 1
    }
    var removeAll = window.VBS.pixi.removeAll = function(all){
        let n = 0
        for(let i=stage.children.length-1;i>=0;i--){
            let c = stage.children[i]
            if(c.body) window.VBS.b2.world.DestroyBody(c.body)
            else if(!all) continue;
            n++
            stage.removeChild(c)
        }
        return n
    }
    
    
  }