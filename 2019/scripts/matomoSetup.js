export function matomoSetup() {
    window.VBS = window.VBS || {}
 
    //mock analytics object until loaded so no exceptions cause on early play
    VBS.tracker = {
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
   
    window.piwikMediaAnalyticsAsyncInit = function () {
        var MA = Piwik.MediaAnalytics;
       
        function VBSPlayer(node, mediaType) {
            if (node.hasPlayerInstance) {
              // prevent creating multiple trackers for the same media
              // when scanning for media multiple times
              return;
            }
            node.hasPlayerInstance = true;
            window.VBS.tracker = new MA.MediaTracker('VBSTracker', mediaType, document.location.href);
            VBS.tracker.setMediaTitle('Video Statement 2019');
            VBS.tracker.setFullscreen(false)
            VBS.tracker.trackUpdate();
            // Submit events that would have been missed if already playing
            if(VBS.timeline.isActive()){
              VBS.tracker.setMediaTotalLengthInSeconds(VBS.timeline.duration());
              VBS.tracker.play()
            }
        }
        VBSPlayer.scanForMedia = function(documentOrElement) {
            if(!documentOrElement) documentOrElement = document;
            // find all medias for your player
            var vbsPanel = documentOrElement.getElementById('panelBodyPNL_BENSTAT_ANIM');
 
            if (vbsPanel) {
                // for each of the medias found, create an instance of your player
                new VBSPlayer(vbsPanel, MA.mediaType.VIDEO);
            }
        };
 
        // adding the newly created player to the Media Analytics tracker
        MA.addPlayer('VBSPlayer', VBSPlayer);
    };
    if(window.Piwik && Piwik.MediaAnalytics) window.piwikMediaAnalyticsAsyncInit()
}