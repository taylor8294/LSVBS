import { startRenderLoop } from "./loop";
import { buildTimeline } from './build';
import { speechSetup } from './speechSetup'

export function makeUI() {
  /*********
   * Init  *
   *********/
  /*let slider = VBS.slider = VBS.$el.find('.anim-ctrl-slider"),
    sliderValue = { value: 0 }*/
  let $progressBarBlue = VBS.$el.find('.anim-progress-bar-blue'),
    $progressBarTime = VBS.$el.find('.anim-progress-bar span'),
    lastCheckState = 0
  VBS.wasPlaying = false

  let dimmer = $('<div class="anim-dimmer" style="opacity:0;display:none;"></div>')
  $('body').append(dimmer)
  VBS.$el.parents('.panel').eq(0).css({position:'relative',zIndex:99})

  /**********
   * Slider *
   **********/
  let lastSrubPosition = 0
  /*slider.slider({
    range: false,
    min: 0,
    max: 100,
    step: .05,
    start: function (event, ui) {
      if(window.VBS.speech.speechesLoaded < 0){
        slider.slider(sliderValue);
        return false
      }
      VBS.$el.find('.anim-play").hide()
      VBS.$el.find('.anim-replay").css({visibility:'hidden'})
      VBS.timeline.pause()
      VBS.music.pause()
      if(window.VBS.speech.currentlyPlaying){
        window.VBS.speech.currentlyPlaying.stop()
        window.VBS.speech.currentlyPlaying = null
      }
      VBS.wasPlaying = false
      VBS.scrubbingDir = -1
      lastSrubPosition = ui.value
    },
    slide: function (event, ui) {
      VBS.timeline.progress(ui.value / 100);
      VBS.music.seek(VBS.timeline.time())
      VBS.scrubbingDir = Math.sign(ui.value - lastSrubPosition)
      lastSrubPosition = ui.value
      if((new Date()) - lastCheckState > 100){
        checkState()
        lastCheckState = new Date()
      }
    },
    stop: function (event, ui) {
      VBS.music.seek(VBS.timeline.time())
      let speechObj = VBS.speech.getByTime(VBS.timeline.time())
      if(speechObj){
        window.VBS.speech.currentlyPlaying = speechObj.howl
        speechObj.howl.seek(VBS.timeline.time()-speechObj.startTime).play()
      }
      VBS.timeline.play()
      VBS.dimIn()
      VBS.music.play()
      VBS.wasPlaying = true
      VBS.$el.find('.anim-pause").css({visibility:'visible'})
      VBS.scrubbingDir = 0
      lastSrubPosition = ui.value
    }
  });*/

  VBS.dimIn = function(duration){
    duration = (duration < 10 ? duration*1000 : duration) || 500
    dimmer.css({display:'block'})
    dimmer.animate({
      opacity: 1
    }, duration, function() {
      // Animation complete.
    });
  }
  VBS.dimOut = function(duration){
    duration = (duration < 10 ? duration*1000 : duration) || 500
    dimmer.animate({
      opacity: 0
    }, duration, function() {
      // Animation complete.
      dimmer.css({display:'none'})
    });
  }
  
  /********
   * Play *
   ********/
  let $play = VBS.$el.find('.anim-play')
  $play.on('click', function () {
    // Fail safe
    if(window.VBS.ABORT){
      alert('This feature isn\'t currently available - check back soon')
      VBS.tracker.trackEvent('Play-error')
      return false;
    }
    $(this).hide();
    // Fetch Google MP3 files and build rest of timeline, if not already done so
    if(window.VBS.speech.speechesLoaded < 0){
      if($('#LS_AGE_ACTUAL').text())
        VBS.user["LSAge"] = $('#LS_AGE_ACTUAL').text()
      else if($('#LS_AGE_BAR').text())
        VBS.user["LSAge"] = $('#LS_AGE_BAR').text()
      else
        VBS.user["LSAge"] = $('.lifeSight-age').text().replace($('.lifeSight-age p').text() ? $('.lifeSight-age p').text() : 'years old', '').trim()
      speechSetup();
      VBS.speech.getSpeeches().then(numLoading => {
        console.log('all speech loaded')
        // Add events
        VBS.speech.howls.forEach(obj => {
          obj.howl.on('playerror',function(soundId){ console.error('play error',obj.id); })
        })
        buildTimeline()
        startRenderLoop() //Might as well only start this here
      }).catch((err)=>{
        console.error(JSON.stringify(err))
      })
    }
    // Hide/show buttons, start music and start logo animation while speech files load
    function go(){
      $replay.css({display:'none'})
      VBS.$el.find('.anim-pause').css({display:'block'})
      if(VBS.timeline.getLabelTime('tableStart') > 0 && VBS.timeline.time() >= VBS.timeline.getLabelTime('tableStart'))
        VBS.dimIn();
      VBS.music.seek(VBS.timeline.time())
      VBS.timeline.play()
      VBS.tracker.play()
      VBS.music.play()
      if(window.VBS.speech.currentlyPlaying && VBS.speech.currentlyPlayingId && (VBS.speech.currentlyPlayingTime || VBS.speech.currentlyPlayingTime===0)){
        window.VBS.speech.currentlyPlaying.seek(VBS.speech.currentlyPlayingTime, VBS.speech.currentlyPlayingId)
        window.VBS.speech.currentlyPlaying.play(VBS.speech.currentlyPlayingId)
      }
      VBS.wasPlaying = true
    }
    if(VBS.music.state() == 'loaded'){
      go()
    } else{
      VBS.$el.find('.anim-loading').show()
      var waitedForMusic = 0;
      var waitForMusic = function(){
        if(VBS.music.state() == 'loaded'){
          VBS.$el.find('.anim-loading').hide()
          go()
        } else {
          waitedForMusic += 100;
          if(waitedForMusic < 3000)
            setTimeout(waitForMusic, 100);
          else {
            console.error('music failed to load, continuing without')
            VBS.$el.find('.anim-loading').hide()
            go();
          }
        }
      }
      waitForMusic()
    }
  })

  /******************
   * Pause & Replay *
   ******************/
  let $pause = VBS.$el.find('.anim-pause'),
      $pauseIcon = VBS.$el.find('.anim-pause-icon'),
      $replay = VBS.$el.find('.anim-replay'),
      $replayIcon = VBS.$el.find('.anim-replay-icon'),
      replayAnimating = false;
  
  function doPause(isBlur){
    $pause.css({display:'none'})
    if(!VBS.$el.find('.anim-loading').is(':visible') && VBS.timeline.isActive()){
      VBS.$el.find('.anim-play').show()
      if(VBS.timeline.time() > 1 && !replayAnimating){
        replayAnimating = true;
        $replay.css({display:'block'});
        TweenMax.from($replay, 0.5, { autoAlpha: 0, scale: 2 });
        TweenMax.from($replayIcon, 0.5, { rotation: '360_ccw' });
        setTimeout(function(){replayAnimating=false},501)
      }
    }
    VBS.music.stop()
    VBS.timeline.pause();
    VBS.tracker.pause()
    VBS.dimOut();
    if(VBS.speech.currentlyPlaying){
      VBS.speech.currentlyPlaying.pause()
      VBS.speech.currentlyPlayingTime = VBS.speech.currentlyPlaying.seek(VBS.speech.currentlyPlayingId)
    }
    if(!isBlur) VBS.wasPlaying = false
  }
  
  $pause.mouseenter(function () {
      TweenLite.to($pauseIcon, 0.4, { scale: 1.2 });
    }).mouseleave(function () {
      TweenLite.to($pauseIcon, 0.4, { scale: 1 });
    }).click(function(){
      doPause();
    });
  
  $replay.mouseenter(function () {
      TweenLite.to($replayIcon, 0.4, { rotation: '+=360' });
      TweenLite.to($replay, 0.4, { opacity: 1 });
    }).mouseleave(function () {
      TweenLite.to($replay, 0.4, { opacity: 0.65 });
    }).click(function () {
      // Do reset
      window.VBS.pixi.removeAll()
      Object.keys(window.VBS.pots).forEach(key => {
        window.VBS.pots[key] = []
      })
      VBS.pixi.jar.alpha = 1
      /*VBS.pixi.eyeState = {w:0,h:0.05,alpha:0,angle:30}
      VBS.pixi.drawEyes(VBS.pixi.eyeState)
      VBS.pixi.eyes.alpha = 1*/
      if(VBS.pixi.drawRandomWalk)
        VBS.pixi.drawRandomWalk(0)
      VBS.pixi.setBalanceFigure(0)
      lastTrackedProgress = 0;

      if(window.VBS.speech.currentlyPlaying)
        window.VBS.speech.currentlyPlaying.stop()
      window.VBS.speech.currentlyPlaying = null
      window.VBS.speech.currentlyPlayingId = null
      /*if((new Date()) - lastCheckState > 100){
        checkState()
        lastCheckState = 0
      }*/

      $(this).css({display:'none'})
      $play.hide()
      $pause.css({display:'block'})
      VBS.timeline.restart();
      VBS.music.seek(0)
      VBS.music.play()
      VBS.tracker.trackEvent('Replay')
      VBS.tracker.seekStart();
      VBS.tracker.setMediaProgressInSeconds(0);
      VBS.tracker.setMediaTotalLengthInSeconds(VBS.timeline.duration());
      VBS.tracker.seekFinish();
      VBS.wasPlaying = true
    });

  /*******************
   * Timeline Events *
   *******************/
  var lastTrackedProgress = 0
  VBS.timeline.eventCallback('onUpdate', function () {
    // sliderValue.value = VBS.timeline.progress() * 100;
    // slider.slider(sliderValue);
    $progressBarBlue.css('width',Math.round(VBS.timeline.progress() * 1000)/10+'%')
    let m = Math.floor(VBS.timeline.time()/60), s = Math.floor(VBS.timeline.time()-m*60)
    $progressBarTime.html(((m<10?'0':'')+m)+':'+((s<10?'0':'')+s))
    VBS.tracker.setMediaProgressInSeconds(VBS.timeline.time())
    //VBS.tracker.setMediaTotalLengthInSeconds(node.duration);
    VBS.tracker.update()
  })
  VBS.timeline.eventCallback('onComplete', function () {
    if(!replayAnimating){
      replayAnimating = true
      $pause.css({display:'none'})
      $replay.css({display:'block'})
      TweenMax.from($replay, 0.5, { autoAlpha: 0, scale: 2 });
      TweenMax.from($replayIcon, 0.5, { rotation: '360_ccw' });
      setTimeout(function(){replayAnimating=false},501)
    }
    if(VBS.timeline.duration() > 30)
      VBS.tracker.finish();
    VBS.music.stop()
    VBS.dimOut();
    if(window.VBS.speech.currentlyPlaying){
      window.VBS.speech.currentlyPlaying.stop()
      window.VBS.speech.currentlyPlaying = null
      window.VBS.speech.currentlyPlayingId = null
    }
    VBS.wasPlaying = false
  });

  /*******************
   * Window Events *
   *******************/
  window.addEventListener('blur', function () {
    doPause(); //doPause(true); if want wasPlaying to stay true - causes problem with iPhone even thought no used??
  }, false);
  /*window.addEventListener('focus', function () {
    if(VBS.wasPlaying){
      $play.hide()
      $pause.css({visibility:'visible'})
      VBS.music.seek(window.VBS.timeline.time())
      window.VBS.timeline.play()
      VBS.music.play()
      if(window.VBS.speech.currentlyPlaying)
        window.VBS.speech.currentlyPlaying.play()
    }
  }, false);*/


  /*********
   * State * TODO
   *********
  let timelines = []  
  function checkState(){
    if(VBS.scrubbingDir != -1) return
    if(!timelines.length)
      timelines = VBS.timeline.getChildren(false,false,true)
    let currentTime = VBS.timeline.time()
    //let startTime = timelines[0].startTime() //title
    //let startTime = timelines[1].startTime() //starting balance
    /*===========*
     * Transfers *
     *===========*
    //let startTime = timelines[2].startTime()
    /*=======*
     * Conts *
     *=======*
    //startTime = timelines[3].startTime()
    /*===================*
     * Investment return *
     *===================*
    //startTime = timelines[4].startTime()
    /*=========*
     * Charges *
     *=========*
    //startTime = timelines[5].startTime()
    /*================*
     * Ending balance *
     *================*
    //startTime = timelines[6].startTime()
  }*/

  /***********************************************************
   *  Turns off the track click for the given slider control *
   ***********************************************************
  function disableSliderTrack($slider) {
    let orig_md_hnd = $._data($('.ui-slider')[0], 'events').mousedown[0].handler
    $slider.off('mousedown')
    $slider.bind('mousedown', function (event) {
      if(isTouchInSliderHandle($(this), event))
        orig_md_hnd(event)
    });
    let orig_ts_hnd = $._data($('.ui-slider')[0], 'events').mousedown[0].handler
    $slider.bind('touchstart', function (event) {
      if(isTouchInSliderHandle($(this), event.originalEvent.touches[0]))
        orig_ts_hnd(event)
    });
  }
  function isTouchInSliderHandle($slider, coords) {
    let x = coords.pageX;
    let y = coords.pageY;
    let $handle = $slider.find('.ui-slider-handle');
    let left = $handle.offset().left;
    let right = (left + $handle.outerWidth());
    let top = $handle.offset().top;
    let bottom = (top + $handle.outerHeight());
    return (x >= left && x <= right && y >= top && y <= bottom);
  }
  disableSliderTrack(slider);*/
}