import { colorStringToInt, getString } from '../utils.js'

export default function(config) {

    /*********
     * Setup *
     *********/
    let _pixi = {}, that = this

    // Vars
    var app, loader, WIDTH, HEIGHT, SCALE, MARGIN
    
    _pixi.assetsLoaded = false
    WIDTH = _pixi.WIDTH = parseFloat(config.width) || 512
    HEIGHT = _pixi.HEIGHT = parseFloat(config.height) || 640
    SCALE = _pixi.SCALE = parseFloat(config.scale) || 40
    MARGIN = _pixi.MARGIN = parseFloat(config.margin) || 0.1

    // Create a Pixi Application
    function isIE() {
        var ua = window.navigator.userAgent; //Check the userAgent property of the window.navigator object
        var msie = ua.indexOf('MSIE '); // IE 10 or older
        var trident = ua.indexOf('Trident/'); //IE 11

        return (msie > 0 || trident > 0);
    }
    _pixi.backgroundColor = config.backgroundColor === 'transparent' || config.backgroundColor === 'clear' || config.backgroundColor === 'none' ? false : (config.backgroundColor ? colorStringToInt(config.backgroundColor) : false)
    app = _pixi.app = new PIXI.Application({ 
        width: WIDTH, 
        height: HEIGHT,                    
        antialias: config.antialias !== undefined && config.antialias !== null ? !!config.antialias : true, 
        transparent: _pixi.backgroundColor === false ? true : false,
        backgroundColor: (_pixi.backgroundColor || _pixi.backgroundColor===0) ? _pixi.backgroundColor : false,
        //forceCanvas: isIE()
    });
    //_pixi.app.stage = new PIXI.display.Stage(); // pixi-layers.js
    _pixi.app.stage.sortableChildren = true // so play button and loading indicator are always on top

    _pixi.baseTextStyle = new PIXI.TextStyle({
        fontFamily: (Array.isArray(config.fontFamily) && config.fontFamily.length ? config.fontFamily : (typeof config.fontFamily === 'string' && config.fontFamily ? config.fontFamily : false)) || ['Franklin-Gothic-Demi', 'Franklin Gothic Demi', 'Franklin Gothic Medium', 'Franklin Gothic', 'ITC Franklin Gothic', 'Arial', 'ArialMT', 'sans-serif'],
        fontSize: parseFloat(config.fontSize) || 36,
        fill: Array.isArray(config.fill) ? config.fill : (config.fill===0 || config.fill) ? colorStringToInt(config.fill) : 0x575756,
        fillGradientStops: Array.isArray(config.fillGradientStops) && config.fillGradientStops.length ? config.fillGradientStops : undefined,
        fillGradientType: config.fillGradientStops && config.fillGradientStops.length ? (config.fillGradientType === 'vertical' ?  PIXI.TEXT_GRADIENT.LINEAR_VERTICAL : PIXI.TEXT_GRADIENT.LINEAR_HORIZONTAL) : undefined,
        align: 'left',
        //lineJoin: 'round'
    })
    _pixi.webfontSizeCheck = config.webfontSizeCheck || ">0"
    _pixi.primaryColor = config.primaryColor ? colorStringToInt(config.primaryColor) : 0x711984
    _pixi.secondaryColor = config.secondaryColor ? colorStringToInt(config.secondaryColor) : 0x009fd4
    
    /* For pixel art
    if (app.renderer.type !== PIXI.RENDERER_TYPE.WEBGL) {
        app.renderer.context.mozImageSmoothingEnabled = false
        app.renderer.context.webkitImageSmoothingEnabled = false
    }*/

    // Fix for iOS GPU issues
    app.view.style['transform'] = 'translatez(0)'

    // Allow scroll on canvas when not preventing default
    app.view.style['touch-action'] = 'auto'
    app.renderer.plugins.interaction.autoPreventDefault = false

    // Canvas accessability
    app.view.setAttribute('aria-label','Personalised video statement')
    app.view.setAttribute('aria-describedby',window.jQuery('[data-for-video-statement="'+this.id+'"]').length ? window.jQuery('[data-for-video-statement="'+this.id+'"]')[0] : this.$el[0].id.replace('wrap','data-table'))
    //app.view.setAttribute('tabindex','0'); // managed by 'fallback' DOM elements
    //app.view.addEventListener("keyup", function(e){ if(e.keyCode==13 || e.keyCode==32){e.preventDefault(); this.parentElement.videoStatement.toggle(); }});
    
    // Add the canvas that Pixi automatically created to the HTML document and disable context menu
    app.view.className = 'video-statement-canvas'
    this.$el.prepend(app.view)

    // Disable context menu
    app.view.addEventListener('contextmenu', function(e){ e.preventDefault();return false; })

    // Set for matomo now we know
    this.tracker.setWidth(app.view.clientWidth);
    this.tracker.setHeight(app.view.clientHeight);
    
    /***************
     * Load assets *
     ***************/
    loader = PIXI.Loader.shared //new PIXI.Loader()
    config.resources = config.resources || {}
    let resourceNames = Object.keys(config.resources).filter(name => !!config.resources[name])
    if(resourceNames.length){
        for(name of resourceNames){
            if(!loader.resources[name]) // if(!PIXI.utils.BaseTextureCache[name]) // Only add if we haven't previously in another video statement
                loader.add(name,config.resources[name])
        }
    }
    if(!resourceNames.includes('loading') && !PIXI.utils.BaseTextureCache['loading']) loader.add('loading','./static/WA8/vbs/img/loading.png')
    _pixi.loadingWidth = parseFloat(config.loadingWidth) || 0.2
    _pixi.loadingSteps = parseFloat(config.loadingSteps) || 16
    _pixi.loadingRotationTime = parseFloat(config.loadingRotationTime) || 1
    _pixi.loadingSetIntervalHandle = null
    if(this.DEBUG) console.log('Video Statement '+this.id+': Loading resources')

    if(this.DEBUG){
        loader.onLoad.add((loader,res)=>{
            console.log('Video Statement '+that.id+': \''+res.name+'\' resource loaded!')
            //console.log('Video Statement '+that.id+': '+loader.progress+'%')
        })
        loader.onError.add((err,loader,res)=>{
            console.error('Video Statement '+that.id+': '+res.name+' failed to load!')
            that.ABORT = true
        })
    }

    loader.load(onAssetsLoaded);

    var waitForWebfont = function(timeout) {
        let textStyle = _pixi.baseTextStyle.clone(),
            webFont = (Array.isArray(textStyle.fontFamily) ? textStyle.fontFamily[0] : textStyle.fontFamily.split(",")[0]).split(" !")[0],
            timespent = 0,
            checks = _pixi.webfontSizeCheck ? (Array.isArray(_pixi.webfontSizeCheck) ? _pixi.webfontSizeCheck : _pixi.webfontSizeCheck.split(',')) : []
        if(!timeout) timeout = 5*1000
        textStyle.fontFamily = [webFont, "Arial"]
        textStyle.fontSize = 300
        return new Promise(function (resolve, reject) {
            var waitForWebfontInner = function(){
                if(!checks.length || !checks[0]) return resolve();
                let w = PIXI.TextMetrics.measureText('The quick brown fox jumped over the lazy dog', textStyle).width, results = []
                checks.forEach((check)=>{
                    let operator = check.substr(0,1), num = parseFloat(check.substr(1))
                    results.push(
                        (operator === '<' && w<num) || (operator === '=' && w==num) || (operator === '>' && w>num)
                    )
                })
                if(results.every(b=>b))
                    return resolve();
                else {
                    timespent += 100
                    if(timeout && timeout>0 && timespent >= timeout) return reject(new Error('Waiting for webfont to load timed out ('+(Math.round(timeout/100)/10)+'secs)'))
                    else setTimeout(waitForWebfontInner, 100);
                }
            }
            waitForWebfontInner()
        });
    }
    
    function onAssetsLoaded(loader, resources){
        if(that.DEBUG) console.log('Video Statement '+that.id+': all resources loaded')
        _pixi.resources = resources

        // Create loading sprite
        _pixi.loading = new PIXI.Sprite(resources['loading'].texture)
        _pixi.loading.name = 'loading'
        _pixi.loading.zIndex = 9999; // Above all
        let sfac = Math.round(20*Math.min(_pixi.loadingWidth*_pixi.WIDTH,resources['loading'].data.naturalWidth)/resources['loading'].data.naturalWidth)/20 // Scale to given fraction of canvas width
        _pixi.loading.anchor.set(0.5)
        _pixi.loading.scale.set(sfac,sfac)
        _pixi.loading.position.set(_pixi.WIDTH/2,_pixi.HEIGHT/2)
        _pixi.loading.visible = false
        _pixi.app.stage.addChild(_pixi.loading)
        _pixi.showLoading = function(){
            if(_pixi.loading.visible) return;
            _pixi.app.stage.removeChild(_pixi.loading)
            _pixi.app.stage.addChildAt(_pixi.loading, _pixi.app.stage.children.length - 1) // Is this needed now making use of z-index?
            _pixi.loading.visible = true
            _pixi.loadingSetIntervalHandle = setInterval(function(){
                _pixi.loading.rotation = (_pixi.loading.rotation+2*Math.PI/_pixi.loadingSteps)%(2*Math.PI)
            },1000*_pixi.loadingRotationTime/_pixi.loadingSteps)
        }
        _pixi.hideLoading = function(){
            if(!_pixi.loading.visible) return;
            clearInterval(_pixi.loadingSetIntervalHandle)
            _pixi.loadingSetIntervalHandle = null
            _pixi.loading.visible = false
        }

        // Create play button
        // TODO allow passing an image (texture sprite) for play button, similar to loading
        _pixi.play = new PIXI.Graphics();
        _pixi.play.draw = function(){
            this.clear() // TODO new v5.2.0 graphics.geometry.invalidate() ??
              .beginFill(0x0, 0.5)
              .drawRoundedRect(0, 0, 100, 100, 10)
              .endFill()
              .beginFill(0xffffff)
              .moveTo(36, 30)
              .lineTo(36, 70)
              .lineTo(70, 50);
        }
        _pixi.play.drawFocused = function(){
            this.clear() // TODO new v5.2.0 graphics.geometry.invalidate() ??
              .lineStyle(1, 0x4D90FE)
              .drawRoundedRect(-1, -1, 102, 102, 11)
              .lineStyle(0)
              .endFill()
              .beginFill(0x0, 0.5)
              .drawRoundedRect(0, 0, 100, 100, 10)
              .endFill()
              .beginFill(0xffffff)
              .moveTo(36, 30)
              .lineTo(36, 70)
              .lineTo(70, 50);
        }
        _pixi.play.draw()
        _pixi.play.name = 'play';
        _pixi.play.zIndex = 9998; // Above all except loading
        _pixi.play.position.set((_pixi.WIDTH-_pixi.play.width)/2, (_pixi.HEIGHT-_pixi.play.height)/2);
        _pixi.play.interactive = true;
        _pixi.play.buttonMode = true;
        _pixi.play.visible = false;
        _pixi.play.on('pointertap', that.play.bind(that));
        app.stage.addChild(_pixi.play);
        _pixi.play.$el = $('<button role="button" type="button" aria-pressed="false">Play</button>')
        _pixi.play.$el.on('click',function(e){_pixi.play.emit('pointertap')})
        _pixi.play.$el.on('focus',function(e){_pixi.play.drawFocused();})
        _pixi.play.$el.on('blur',function(e){_pixi.play.draw();})
        _pixi.play.$el.appendTo(app.view)

        // Create interactive hand sprite and text
        if(resources['interactive'] && resources['interactive'].texture){
            // Sprite
            _pixi.interactive = new PIXI.Sprite(resources['interactive'].texture)
            _pixi.interactive.name = 'interactive'
            let sfac = (WIDTH/8)/resources['interactive'].data.naturalWidth // Scale to 8th width
            _pixi.interactive.scale.set(sfac,sfac)
            _pixi.interactive.position.set(WIDTH/8,HEIGHT-_pixi.interactive.height*1.75)
            _pixi.interactive.rotation = 30*Math.PI/180
            _pixi.interactive.alpha = 0
            //_pixi.interactive.visible = false

            // Interactive text
            let textStyle = _pixi.baseTextStyle.clone()  // TODO parameterise font style
            textStyle.fontSize = 16
            let interactiveString = 'Interactive!'
            let textMetrics = PIXI.TextMetrics.measureText(interactiveString, textStyle)
            _pixi.interactiveText = new PIXI.Text(interactiveString, textStyle);
            _pixi.interactiveText.name = 'interactiveText'
            _pixi.interactiveText.position.set(WIDTH/8-textMetrics.width/2, HEIGHT-_pixi.interactive.height/2)
            _pixi.interactiveText.alpha = 0

            app.stage.addChild(_pixi.interactive,_pixi.interactiveText)
        }
        
        // Wait for webfont to load
        _pixi.assetsLoaded = true;
        _pixi.webfontLoaded = false;
        if(that.DEBUG) console.log('Video Statement '+that.id+': waiting for webfont')
        waitForWebfont(5000).then(function(){
            if(that.DEBUG) console.log('Video Statement '+that.id+': webfont loaded')
            _pixi.webfontLoaded = true;
        }).catch(function(){
            if(that.DEBUG) console.log('Video Statement '+that.id+': webfont loading timed out')
            _pixi.webfontLoaded = true;
        })
    }

    /***************
     * Init Shared *
     ***************/
    
    _pixi.jarFigureStyle = _pixi.baseTextStyle.clone()
    _pixi.jarFigureStyle.align = 'center'
    _pixi.jarFigureLabelStyle = _pixi.jarFigureStyle.clone()
    //TODO parameterise fontWeight? Other paramerers handled in jarIn.js

    _pixi.coinsContainer = new PIXI.Container()
    _pixi.coinsContainer.name = 'coinsContainer';
    app.stage.addChild(_pixi.coinsContainer)

    // Create tooltip
    if(this.config.scenes.showTooltip || this.config.scenes.showTooltip===undefined || this.config.scenes.showTooltip===""){
        var tooltipTextStyle = _pixi.baseTextStyle.clone()
        if(this.config.scenes.tooltipFont && this.config.scenes.tooltipFont.length)
            tooltipTextStyle.fontFamily = this.config.scenes.tooltipFont
        if(this.config.scenes.tooltipColor || this.config.scenes.tooltipColor===0)
            tooltipTextStyle.fill = colorStringToInt(this.config.scenes.tooltipColor)
        tooltipTextStyle.fontSize = this.config.scenes.tooltipFontSize ? Number(this.config.scenes.tooltipFontSize) : 18

        var tooltip = _pixi.tooltip = new PIXI.Container(),
            tooltipBg = new PIXI.Graphics(),
            tooltipTextString = "Contributions",
            tooltipTextMetrics = PIXI.TextMetrics.measureText(tooltipTextString, tooltipTextStyle),
            tooltipH = tooltipTextMetrics.height*1.5,
            tooltipW = tooltipTextMetrics.width+30,
            tooltipText = new PIXI.Text(tooltipTextString, tooltipTextStyle);
        tooltipBg.beginFill(this.config.scenes.tooltipBg ? colorStringToInt(this.config.scenes.tooltipBg) : 0xffffff, this.config.scenes.tooltipBgAlpha ? Number(this.config.scenes.tooltipBgAlpha) : 0.8)
        tooltipBg.lineStyle(this.config.scenes.tooltipBorderWidth ? Number(this.config.scenes.tooltipBorderWidth) : 1.5, this.config.scenes.tooltipBorderColor ? colorStringToInt(this.config.scenes.tooltipBorderColor) : 0x999999)
        tooltipBg.drawRect(0, 0, tooltipW, tooltipH)
        tooltipBg.endFill()
        //tooltipBg.cacheAsBitmap = true
        tooltipText.position.set(15, tooltipTextMetrics.height*0.25)
        tooltip.addChild(tooltipBg,tooltipText);
        tooltip.name = 'tooltip'
        tooltip.position.set(150, 150)
        tooltip.alpha = 0
        app.stage.addChild(tooltip)
    }

    /***********************
     * Convenience methods *
     ***********************/
    
    _pixi.makeFigure = function(num) {
        let fig = Math.abs(num) < 1 ? Math.abs(num) : Math.round(Math.abs(num))
        let txt = (num < 0 ? '–' : '')+'£'+fig.toFixedCommas()
        let textMetrics = PIXI.TextMetrics.measureText(txt, _pixi.jarFigureStyle)
        let figure = new PIXI.Text(txt, _pixi.jarFigureStyle);
        figure.anchor.set(0.5)
        figure.position.set(WIDTH/2, textMetrics.height/2)
        return figure
    }
    _pixi.makeFigureLabel = function(txt) {
        let figureTextMetrics = PIXI.TextMetrics.measureText("£000", _pixi.jarFigureStyle),
            figureLabelTextMetrics = PIXI.TextMetrics.measureText(txt, _pixi.jarFigureLabelStyle)
        let label = new PIXI.Text(txt, _pixi.jarFigureLabelStyle);
        label.position.set(WIDTH/2-figureLabelTextMetrics.width/2, figureTextMetrics.height)
        return label
    }
    
    _pixi.setTooltip = function(text){
        tooltipTextMetrics = PIXI.TextMetrics.measureText(text, tooltipTextStyle)
        _pixi.tooltip.children[1].text = text
        _pixi.tooltip.width = _pixi.tooltip.children[0].width = tooltipTextMetrics.width+30
    }
    _pixi.tooltipIn = function(duration){
        duration = duration || 0.1;
        TweenMax.to(_pixi.tooltip,duration,{
            pixi: {alpha: 1}
        });
    }
    _pixi.tooltipOut = function(duration){
        duration = duration || 0.1;
        TweenMax.to(_pixi.tooltip,duration,{
            pixi: {alpha: 0}
        });
    }
    _pixi.tooltipLookupObj = {
        'start': getString('startBalanceJar',that),
        'transfers': getString('transfersJar',that),
        'withdrawals': getString('withdrawalsJar',that),
        'eeConts': getString('employeeContributionsJar',that),
        'erConts': getString('employerContributionsJar',that),
        'investmentReturn': getString('investmentReturnJar',that),
        'charges': getString('chargesJar',that),
    }
    _pixi.tooltipLookup = function(key){
        return _pixi.tooltipLookupObj[key] ? _pixi.tooltipLookupObj[key] : 'Other'
    }
    _pixi.tooltipPointerOver = function(e) {
        if(that.pixi.jar.alpha < 1) return;
        that.pixi.setTooltip(that.pixi.tooltipLookup(this['_group']));
        if(this.position.x < WIDTH/2)
            that.pixi.tooltip.position.set(this.position.x+8,this.position.y+8);
        else
            that.pixi.tooltip.position.set(this.position.x-that.pixi.tooltip.width-2,this.position.y+2);
        that.pixi.tooltipIn();
    }
    _pixi.tooltipPointerOut = function(e) { 
        if(that.pixi.jar.alpha < 1) return;
        if(that.pixi.tooltip.alpha < 0.1) return;
        else that.pixi.tooltipOut()
    }
    
    // Get a given number of squares from the top of the jar, using given breakdown between different pots
    _pixi.gimme = function(n, potOrder){
        let result = {},
            total = 0,
            i = 0
        potOrder = potOrder ? (Array.isArray(potOrder) ? potOrder : [potOrder]) : ["transfers","start","investmentReturn","erConts","eeConts"]
        while(total < n && i<potOrder.length){
            if(that.pixi.pots[potOrder[i]] && that.pixi.pots[potOrder[i]].length){
                let ordered = that.pixi.pots[potOrder[i]].filter(actor => actor.alpha > 0.5).sort((a,b) => a.y > b.y ? 1 : a.y < b.y ? -1 : 0)
                result[potOrder[i]] = ordered.slice(0,n-total)
                total += result[potOrder[i]].length
            }
            i++
        }
        return result
    }

    PIXI.Graphics.prototype.roundLine = function(x1,y1,x2,y2,w,c){
        let adj = x2-x1, opp = y2-y1, a=Math.atan(opp/adj)
        let ax1 = x1+Math.cos(a)*w/2, ay1 = y1+Math.sin(a)*w/2,
            ax2 = x2-Math.cos(a)*w/2, ay2 = y2-Math.sin(a)*w/2
        this.lineStyle(w, c);
        this.moveTo(ax1,ay1);
        this.lineTo(ax2,ay2);
        this.lineStyle(0);
        this.beginFill(c, 1);
        this.drawCircle(ax1, ay1, w/2);
        this.drawCircle(ax2, ay2, w/2);
        this.endFill();
        this.lineStyle(w,c);
    }

    /**************************
     * Add to stage functions *
     **************************/

    _pixi.addCircle = function(x,y,r,fill,b2){
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
            graphics.body = that.box2d.addCircle(props.x,props.y,props.r)
        //graphics.cacheAsBitmap = true;
        app.stage.addChild(graphics);
        return graphics
    }

    _pixi.addB2Circle = function(x,y,r,fill,zIndex,group){
        let props
        if(typeof x === 'object') props = x
        else props = {
            x: x || 0,
            y: y || 0,
            r: r,
            fill: fill || 0x000000
        }
        if(props.r === undefined) props.r = props.s ? props.s : 1
        var coin
        if(fill.baseTexture){
            coin = new PIXI.Sprite(fill);
            coin.anchor.set(0.5);
            coin.scale.set(2*props.r*(1-that.pixi.MARGIN)*that.pixi.SCALE/fill.baseTexture.realWidth) // Scale to pixel size = ~0.5m wide in b2World
        } else {
            coin = new PIXI.Graphics();
            coin.beginFill(props.fill);
            if(props.r > 1E-4) coin.drawCircle(0, 0, props.r * SCALE * (1-MARGIN));
            coin.endFill();
        }
        coin.position.set(props.x * that.pixi.SCALE, props.y * that.pixi.SCALE);
        coin.body = that.box2d.addCircle(props.x,props.y,props.r)
        if(group) coin['_group'] = group
        else coin['_group'] = 'default'
        if(that.config.scenes.showTooltip || that.config.scenes.showTooltip===undefined){
            coin.interactive = true;
            coin.on('pointerover', that.pixi.tooltipPointerOver)
            coin.on('pointerout', that.pixi.tooltipPointerOut)
        }
        if(zIndex !== undefined){
            //app.stage.addChildAt(coin, zIndex); // Add to a separate container so they can be easily faded together
            that.pixi.coinsContainer.addChildAt(coin, zIndex);
        } else {
            //app.stage.addChild(coin);
            that.pixi.coinsContainer.addChild(coin);
        }
        return coin
    }

    _pixi.addEllipse = function(x,y,a,b,fill,zIndex,b2,group,tooltip){
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
            graphics.body = that.box2d.addEllipse(props.x,props.y,props.a,props.b)
        //graphics.cacheAsBitmap = true;
        app.stage.addChild(graphics);
        return graphics
    }

    _pixi.addRect = function(x,y,w,h,fill,r,zIndex){
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
        if(zIndex !== undefined) app.stage.addChildAt(graphics, zIndex);
        else app.stage.addChild(graphics);
        return graphics
    }

    _pixi.addB2Rect = function(x,y,w,h,fill,r,zIndex,group){
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
        graphics.body = that.box2d.addRect(props.x,props.y,props.w,props.h)
        if(group) graphics['_group'] = group
        else graphics['_group'] = 'default'
        if(that.config.scenes.showTooltip || that.config.scenes.showTooltip===undefined){
            graphics.interactive = true;
            graphics.on('pointerover', that.pixi.tooltipPointerOver)
            graphics.on('pointerout', that.pixi.tooltipPointerOut)
        }
        if(zIndex !== undefined)
            app.stage.addChildAt(graphics, zIndex);
        else
            app.stage.addChild(graphics);
        return graphics
    }
    
  
    /**************
     * Remove Fns *
     **************/
    _pixi.remove = function(graphics){
        if(graphics.body)
            that.box2d.world.DestroyBody(graphics.body)
        graphics.parent ? graphics.parent.removeChild(graphics) : app.stage.removeChild(graphics)
        return 1
    }
    _pixi.removeAll = function(reallyAll){
        let n = 0
        for(let i=app.stage.children.length-1;i>=0;i--){
            let c = app.stage.children[i]
            if(c.body) that.box2d.world.DestroyBody(c.body)
            else if(!reallyAll) continue;
            n++
            app.stage.removeChild(c)
        }
        return n
    }
    
    /**********
     * Return *
     **********/
    return _pixi;
}