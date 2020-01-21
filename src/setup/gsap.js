export default function(){

  // Create
  var that = this, _timeline = new TimelineMax({
    id: "Master "+this.id,
    paused: true
  })
  if(this.DEBUG && typeof GSDevTools !== 'undefined') GSDevTools.create({id:"Master "+this.id+" Dev",paused:true})

  /* hacky onStart fix - removed
  _timeline.to({x:0},0.1,{
    x:1
  })*/

  // Events
  _timeline.eventCallback('onUpdate', function () {
    that.updateProgress()
    that.tracker.setMediaProgressInSeconds(_timeline.time())
    //that.tracker.setMediaTotalLengthInSeconds(_timeline.duration);
    that.tracker.update()
  })
  _timeline.eventCallback('onComplete', function () {
    if(that.DEBUG) console.log('Video Statement '+that.id+': timeline complete')
    that.pause()
    that.tracker.finish(); //if(_timeline.duration() > 30) TODO include build check
    if(that.audio.music) that.audio.music.stop()
    VideoStatement.dimOut(that.$el);
    if(that.audio.speech && that.audio.speech.currentlyPlaying){
      that.audio.speech.currentlyPlaying.stop()
      that.audio.speech.currentlyPlaying = null
      that.audio.speech.currentlyPlayingId = null
    }
    that.wasPlaying = false
  });

  return _timeline;
}