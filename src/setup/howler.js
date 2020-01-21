/*Howl.prototype.initPlayingEvent = function(intervalTime) {
  intervalTime = intervalTime ? intervalTime : 1000/60
  var self = this;
  self._onplaying = [];
  self.on('play', function (soundId) {
    self._onplayingInterval = setInterval(function () {
      self._emit('playing', soundId, [self.seek(soundId),self.duration(soundId)]);
    }, intervalTime);
  });
  self.on('end', function(){
    clearInterval(self._onplayingInterval);
  });
  self.on('pause', function(){
    clearInterval(self._onplayingInterval);
  });
  self.on('stop', function(){
    clearInterval(self._onplayingInterval);
  });
}*/
Howl.prototype.hasNext = function() {
  return this._next ? true : false
}
Howl.prototype.getNext = function(n) {
  if(n === undefined || Number.isNaN(+n) || n < 1) n = 1
  let result = false
  if(this.hasNext()){
    result = this._next, n--
    while(n>0 && result.hasNext()){
      result = result._next
      n--
    }
  }
  return result
}
Howl.prototype.hasPrev = function() {
  return this._prev ? true : false
}
Howl.prototype.getPrev = function(n) {
  if(n === undefined || Number.isNaN(+n) || n < 1) n = 1
  let result = false
  if(this.hasPrev()){
    result = this._prev, n--
    while(n>0 && result.hasPrev()){
      result = result._prev
      n--
    }
  }
  return result
}
Howl.prototype.getLast = function(n) {
  if(!this.hasNext()) return this
  else return this.getNext(Infinity)
}
Howl.prototype.getFirst = function(n) {
  if(!this.hasPrev()) return this
  else return this.getPrev(Infinity)
}
Howl.prototype.getIndex = function() {
  return this._index
}

// Was needed since
// desktop => use html5 for better preload
// mobile => iOS volume breaks if html5, don't use... now removed
function isMobile() {
  return /Android|webOS|iPhone|iPad|iPod|BlackBerry|IEMobile|Opera Mini/i.test(window.navigator.userAgent);
}

export default function(config){
  
  this.audio.music = new Howl({
      src: config.music || "./static/WA8/vbs/audio/music.mp3",
          // "//music.wixstatic.com/mp3/b29e13_181d749818af4a46b35d5db7ef245112.mp3",
          // "//music.wixstatic.com/mp3/b29e13_cfc1f0ad6c044412a30f728ddc687656.mp3",
          // "https://www.bensound.org/bensound-music/bensound-inspire.mp3",
      volume: parseFloat(config.musicVolume) || 0.04,
      //html5: !isMobile(), // Removed since seeking didn't work for HTML5
      preload: true
  })
  this.audio.musicInTime = Math.max(0,parseFloat(config.musicInTime)) || 0
  this.audio.musicOutTime = parseFloat(config.musicOutTime) || Infinity

  // _howler.music.initPlayingEvent()
  // _howler.music.on('playing', function(soundId, data){
  //   console.log('playing')
  // });

  // return audio;
  
}