import { createLinearGradient } from '../utils.js'

export default function(config){
    // Init vars
    config = config || {}
    var {app, resources} = this.pixi, that = this
    var WIDTH = this.pixi.WIDTH, HEIGHT = this.pixi.HEIGHT,
        videoTexture, videoControler, videoSprite;

    // resources.video.data.preload = 'auto';
    // resources.video.data.autoload = true;
    // resources.video.data.autoplay = false;
    
    /*var waitForVideo = function(timeout) {
        let timeSpent = 0
        if(!timeout) timeout = 30
        return new Promise(function (resolve, reject) {
            var waitForVideoInner = function(){
                if(!resources.video) return reject();
                if(resources.video.data && resources.video.data.readyState == 4){
                    return resolve();
                } else {
                    timespent += 100
                    if(timeout && timespent >= timeout) return reject(new Error('Waiting for video to load timed out ('+(Math.round(timeout/100)/10)+'secs)'))
                    else setTimeout(waitForVideoInner, 100);
                }
            }
            waitForVideoInner()
        });
    }*/

    
    videoTexture = PIXI.Texture.from(resources.video.data,{resourceOptions:{autoPlay:false}});
    videoControler = this.pixi.videoControler = videoTexture.baseTexture.resource.source;
    videoControler.muted = true;
    videoSprite = new PIXI.Sprite(videoTexture);
    videoSprite.name = 'videoSprite';

    let videoSize = ['cover','fit'].includes(typeof config.videoSize === 'string' ? config.videoSize.toLowerCase() : '') ? config.videoSize.toLowerCase() : 'cover',
        ar = app.screen.height/app.screen.width, vr=videoControler.videoHeight/videoControler.videoWidth
    if(videoSize == 'fit'){
        // Fit to screen
        if(ar<vr){
            videoSprite.height = app.screen.height;
            videoSprite.width = app.screen.height/vr;
            videoSprite.x = (app.screen.width - videoSprite.width) / 2;
            videoSprite.y = 0;
        } else {
            videoSprite.width = app.screen.width;
            videoSprite.height = app.screen.width*vr;
            videoSprite.x = 0
            videoSprite.y = (app.screen.height - videoSprite.height) / 2;
        }
    } else {
        // Cover screen
        if(ar<vr){
            videoSprite.width = app.screen.width;
            videoSprite.height = app.screen.width*vr;
            videoSprite.x = 0
            videoSprite.y = (app.screen.height - videoSprite.height) / 2;
        } else {
            videoSprite.height = app.screen.height;
            videoSprite.width = app.screen.height/vr;
            videoSprite.x = (app.screen.width - videoSprite.width) / 2;
            videoSprite.y = 0;
        }
    }
    //videoSprite.visible = false;
    app.stage.addChild(videoSprite);

    // Safely add text since we know font is loaded
    let skyText = new PIXI.Text('My Sky Rewards', this.pixi.baseTextStyle);
    skyText.name = 'text';
    let textMetrics = PIXI.TextMetrics.measureText('My Sky Rewards', this.pixi.baseTextStyle);
    skyText.position.set((app.screen.width-textMetrics.width)/2,app.screen.height-textMetrics.height*2)
    
    //Create mask for text wipe
    let cnv = createLinearGradient(
            app.screen.width*3,
            app.screen.height,
            {   // These are the gradients stops, starting at the beginning (0.0) with white and ending with black at the end (1.0).
                0.45: 'white',
                0.55: 'black', // black color will make pixels transparent.
            },
            30
        ),
        skyTextMask = new PIXI.Sprite(PIXI.Texture.from(cnv))
    skyTextMask.name = 'skyTextMask';
    skyTextMask.position.set(-2*app.screen.width,0);
    skyText.mask = skyTextMask;
    
    app.stage.addChild(skyTextMask, skyText);

    return {
        id: 'videoStart',
        tl: function(){
            let tl = new TimelineLite({ id: "videoStart" })
            tl.add(function(){
                videoControler.play() //TODO allow to start any time?
            }).to(skyTextMask, 6, {
                x: 0
            }, "+=11")
            return tl
        },
        audio: [{
            id: 'hello1',
            ssml: '<speak>Some intro <break time="2s"/></speak>',
            text: 'Hello'
        },{
            id: 'hello2',
            ssml: '<speak>More speech here</speak>',
            text: 'Hello'
        }]
    }
    
}