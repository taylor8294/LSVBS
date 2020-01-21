import { createLinearGradient } from '../utils.js'

export default function(config){
    // Init vars
    config = config || {}
    var {app, resources} = this.pixi, that = this
    var WIDTH = this.pixi.WIDTH, HEIGHT = this.pixi.HEIGHT,
        logoSprite, subtitleText, subtitleTextMask
    
    // Make logo
    logoSprite = new PIXI.Sprite(resources.logo.texture)
    logoSprite.name = 'logoSprite'
    logoSprite.anchor.set(0.5)
    logoSprite.visible = false

    let logoSize = config.logoSize || [0.5, 'auto']
    if(typeof logoSize == 'string'){
        logoSize = logoSize.toLowerCase()
        if(!(['cover','fit'].includes(logoSize))) logoSize = [0.5, 'auto']
    }
    if(!Array.isArray(logoSize) && typeof logoSize == 'number') logoSize = [logoSize, 'auto']
    if(Array.isArray(logoSize) && !logoSize.length) logoSize = [logoSize, 'auto']
    if(Array.isArray(logoSize) && logoSize.length < 2) logoSize.push('auto')
    
    let sr = app.screen.height/app.screen.width, lr=logoSprite.height/logoSprite.width
    if(typeof logoSize == 'string'){
        if(logoSize == 'fit'){
            // Fit to screen
            if(sr<lr){
                logoSprite.height = app.screen.height;
                logoSprite.width = app.screen.height/lr;
            } else {
                logoSprite.width = app.screen.width;
                logoSprite.height = app.screen.width*lr;
            }
        } else {
            // Cover screen
            if(sr<lr){
                logoSprite.width = app.screen.width;
                logoSprite.height = app.screen.width*lr;
            } else {
                logoSprite.height = app.screen.height;
                logoSprite.width = app.screen.height/lr;
            }
        }
        logoSprite.x = app.screen.width / 2;
        logoSprite.y = app.screen.height / 2;
    } else { // logoSize is array
        let w, h
        if(logoSize[0] === 'auto' && logoSize[1] === 'auto'){
            w = Math.min(0.5 * app.screen.width, logoSprite.width)
            h = w * lr
        } else if(logoSize[0] === 'auto'){
            h = parseFloat(logoSize[1])
            if(!h || h <= 0){
                w = Math.min(0.5 * app.screen.width, logoSprite.width)
                h = w * lr
            } else {
                if(h < 1) h = h * app.screen.height
                w = h / lr
            }
        } else {
            w = parseFloat(logoSize[0])
            if(!w || w <= 0) Math.min(0.5 * app.screen.width, logoSprite.width)
            if(w < 1) w = w * app.screen.width
            if(logoSize[1] == 'auto') h = w * lr
            else h = parseFloat(logoSize[1])
            if(!h || h <= 0) h = w * lr
            if(h < 1) h = h * app.screen.height
        }
        logoSprite.width = w;
        logoSprite.height = h;
        logoSprite.x = app.screen.width / 2;
        logoSprite.y = app.screen.height / 2;
    }
    app.stage.addChild(logoSprite);

    // Make subtitle
    if(config.logoSubtitle){
        // Safely add text since we know font is loaded
        subtitleText = new PIXI.Text(config.logoSubtitle, this.pixi.baseTextStyle);
        subtitleText.name = 'logoSubtitle';
        let textMetrics = PIXI.TextMetrics.measureText(config.logoSubtitle, this.pixi.baseTextStyle),
            subtitlePos = config.logoSubtitlePosition===0 ? 'bottom' : (config.logoSubtitlePosition===1 ? 'top' : (config.logoSubtitlePosition.toString() || 'bottom').toLowerCase()),
            subtitleY = (app.screen.height-logoSprite.height)/4 > 1.5*textMetrics.height ? (app.screen.height-logoSprite.height)/4 : app.screen.height/4;
        if(subtitlePos == 'top') subtitleText.position.set((app.screen.width-textMetrics.width)/2,subtitleY-textMetrics.height/2)
        else subtitleText.position.set((app.screen.width-textMetrics.width)/2,app.screen.height-subtitleY-textMetrics.height/2)
    
        //Create mask for text wipe
        let cnv = createLinearGradient(
                app.screen.width*3,
                app.screen.height,
                {   // These are the gradients stops, starting at the beginning (0.0) with white and ending with black at the end (1.0).
                    0.4: 'white',
                    0.6: 'black', // black color will make pixels transparent.
                }
            )
        subtitleTextMask = new PIXI.Sprite(PIXI.Texture.from(cnv))
        subtitleTextMask.name = 'logoSubtitleMask';
        subtitleTextMask.position.set(-2*app.screen.width,0);
        subtitleText.mask = subtitleTextMask;
        
        app.stage.addChild(subtitleTextMask, subtitleText);
    }
    
    // Build speaker icon
    let speaker
    if(config.showSpeaker || config.showSpeaker===undefined){
        speaker = new PIXI.Container()
        let speakerFill = config.speakerColor ? colorStringToInt(config.speakerColor) : this.pixi.primaryColor,
            speakerSheet = resources.speakerSheet.spritesheet,
            animatedSpeakerSpriteMask = new PIXI.AnimatedSprite(Object.values(speakerSheet.textures)),
            speakerColor = new PIXI.Graphics()
        animatedSpeakerSpriteMask.animationSpeed = 0.05;
        animatedSpeakerSpriteMask.play()
        speakerColor.beginFill(speakerFill);
        speakerColor.drawRect(0, 0, animatedSpeakerSpriteMask.width, animatedSpeakerSpriteMask.height);
        speakerColor.endFill();
        speaker.addChild(speakerColor,animatedSpeakerSpriteMask);
        speakerColor.mask = animatedSpeakerSpriteMask;
        
        let scaleTo = (WIDTH/6)/speaker.width;
        speaker.scale.set(scaleTo)
        speaker.pivot.set(speaker.width/2,speaker.height/2)
        speaker.x = WIDTH/16+speaker.width/2;
        speaker.y = -1*speaker.height;
        app.stage.addChild(speaker);
    }

    return {
        id: 'logoStart',
        tl: function(){
            let tl = new TimelineLite({ id: "logoStart" }), origScaleX, origScaleY
            if(config.logoScale || config.logoScale===undefined){
                origScaleX = logoSprite.scale.x
                origScaleY = logoSprite.scale.y
                if(config.logoScale && Array.isArray(config.logoScale) && config.logoScale.length>0){
                    logoSprite.scale.set(
                        (config.logoScale[0] ? Number(config.logoScale[0]) : 0.8)*origScaleX,
                        (config.logoScale[0] ? Number(config.logoScale[0]) : 0.8)*origScaleY
                    )
                } else {
                    logoSprite.scale.set(
                        0.8*origScaleX,
                        0.8*origScaleY
                    )
                }
                tl.to(logoSprite, 10, {
                    pixi: {
                        scaleX: (config.logoScale && Array.isArray(config.logoScale) && config.logoScale.length>1 ? Number(config.logoScale[1]) : 1.2)*origScaleX,
                        scaleY: (config.logoScale && Array.isArray(config.logoScale) && config.logoScale.length>1 ? Number(config.logoScale[1]) : 1.2)*origScaleY
                    }
                },0)
            }
            if(config.logoSubtitle){
                tl.to(subtitleTextMask, 6, {
                    x: 0
                },2)
            }
            tl.to(config.logoSubtitle ? [subtitleText, logoSprite] : logoSprite, 2, {
                alpha: 0
            },8)
            logoSprite.visible = true
            if(config.showSpeaker || config.showSpeaker===undefined){
                tl.to(speaker, 2, {
                    y: speaker.height/2,
                    ease: Back.easeOut
                },1.5)
                tl.to(speaker, 2, {
                    y: -1*speaker.height,
                    ease: Back.easeIn
                },7)
            }
            return tl
        },
        audio: []
    }
    
}