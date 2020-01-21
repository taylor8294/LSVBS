export default function(config) {
    // Only run this once, despite how many VideoStatements we create
    if(!window.videoStatementPiwikMediaAnalyticsAsyncInitSet){
        window.videoStatementPiwikMediaAnalyticsAsyncInitSet = true;
        let _originalPiwikMediaAnalyticsAsyncInit = (window.Piwik && Piwik.MediaAnalytics) ? null : window.piwikMediaAnalyticsAsyncInit;
        window.piwikMediaAnalyticsAsyncInit = function () {
            if(_originalPiwikMediaAnalyticsAsyncInit && typeof _originalPiwikMediaAnalyticsAsyncInit == 'function')
                _originalPiwikMediaAnalyticsAsyncInit()
            
            var MA = Piwik.MediaAnalytics;
        
            function VideoStatementPlayer(node, mediaType) {
                if (!node.videoStatement || node.hasVideoStatementTracker) {
                    // prevent creating multiple trackers for the same media
                    // when scanning for media multiple times
                    return;
                }
                node.hasVideoStatementTracker = true;
            
                // find the actual resource / URL of the video
                var defaultResource = window.location.href.replace(/#.*$/, '')+'#'+(node.id ? node.id : 'video-statement-'+node.videoStatement.id);
                // a user can overwrite the actual resource by defining a "data-matomo-resource" attribute. 
                // the method `getMediaResource` will detect whether such an attribute was set 
                var resource = MA.element.getMediaResource(node, defaultResource);
            
                // create an instance of the media tracker. 
                var tracker = new MA.MediaTracker(config.trackerName || 'VideoStatementTracker', mediaType, resource);
            
                // for video you should detect the width, height, and fullscreen usage, if possible
                //tracker.setWidth(node.videoStatement.pixi.app.view.clientWidth); // Handled in pixi setup
                //tracker.setHeight(node.videoStatement.pixi.app.view.clientHeight); // Handled in pixi setup
                tracker.setFullscreen(MA.element.isFullscreen(node));
            
                // the method `getMediaTitle` will try to get a media title from a
                // "data-matomo-title", "title" or "alt" HTML attribute. Sometimes it might be possible
                // to retrieve the media title directly from the video or audio player
                //var title = MA.element.getMediaTitle(node);
                var title = MA.element.getAttribute(node, "data-matomo-title") || MA.element.getAttribute(node, "data-piwik-title") || node.videoStatement.title || (node.id ? node.id.replace(/\-|_/g,' ') : false) || 'Video Statement '+node.videoStatement.id;
                tracker.setMediaTitle(title);
                
                // here we make sure to send an initial tracking request for this media. 
                // This basically tracks an impression for this media. 
                tracker.trackUpdate();

                // Submit events that would have been missed if already playing
                if(node.videoStatement.timeline.isActive()){
                    if(node.videoStatement.timeline.duration() && node.videoStatement.timeline.duration() > 29) tracker.setMediaTotalLengthInSeconds(node.videoStatement.timeline.duration());
                    // notify the tracker the media is now playing
                    tracker.play();
                }

                node.videoStatement.tracker = tracker;
            }
            VideoStatementPlayer.scanForMedia = function(documentOrElement) {
                if(!documentOrElement) documentOrElement = document;

                // find all medias for your player
                var videoStatementEls = documentOrElement.querySelectorAll('[data-video-statement-wrap],.video-statent-wrap');

                for (var i = 0; i < videoStatementEls.length; i++) {
                    // for each of the medias found, create an instance of your player as long as the media is 
                    // not supposed to be ignored via a "data-matomo-ignore" attribute
                    if (!MA.element.isMediaIgnored(videoStatementEls[i]) && !videoStatementEls[i].hasVideoStatementTracker && videoStatementEls[i].videoStatement) {
                        new VideoStatementPlayer(videoStatementEls[i], MA.mediaType.VIDEO); //sets tracker on element's VideoStatement in constructor, new player object isn't actually used
                        // there is also a MA.mediaType.AUDIO constant if you want to track audio
                    }
                }
            };
    
            // adding the newly created player constructor to the Media Analytics tracker
            MA.addPlayer('VideoStatementPlayer', VideoStatementPlayer);
            MA.players.getPlayer('VideoStatementPlayer').scanForMedia()
        };
        if(window.Piwik && Piwik.MediaAnalytics) window.piwikMediaAnalyticsAsyncInit()
    }
    if(window.Piwik && Piwik.MediaAnalytics && Piwik.MediaAnalytics.players.getPlayer('VideoStatementPlayer'))
        Piwik.MediaAnalytics.players.getPlayer('VideoStatementPlayer').scanForMedia()
    
    // Return a dummy tracker object for now, this will be overwritted with the real tracker object in scanForMedia
    return {
        play: () => { },
        pause: () => { },
        finish: () => { },
        setMediaProgressInSeconds: () => { },
        setMediaTotalLengthInSeconds: () => { },
        setWidth: () => { },
        setHeight: () => { },
        update: () => { },
        seekStart: () => { },
        seekFinish: () => { },
        trackUpdate: () => { },
        trackEvent: () => { }
    }
}