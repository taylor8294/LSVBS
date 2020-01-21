export default function(config) {

  var that = this, audio = this.audio;
  
  this.audio.speech = []
  this.audio.speechVolume = config.speechVolume || 0.45

  this.audio.queueSpeech = function (speech) {
    let obj = {}
    if(typeof speech === 'string'){
      if(speech.replace(/\s/g,'').substr(0,6)==='<speak'){
        obj.ssml = speech
        obj.text = speech.replace(/<[^>]*>/g, '').replace(/ +/g,' ').replace('Life Sight','LifeSight')
      } else {
        obj.text = speech
        obj.ssml = '<speak>'+speech.replace('LifeSight','Life Sight').replace(' 2019',' 20 19').replace(' 2020',' 20 20')+'</speak>'
      }
    } else obj = speech //must pass ssml and/or text, index, and ID
    if(obj.url && !obj.howl){
      obj.howl = new Howl({
        src: Array.isArray(obj.url) ? obj.url : [obj.url],
        volume: obj.volume || audio.speechVolume,
        preload: true
      }).on('loaderror', function (soundId) { console.error('speech load error', obj.id); })
    }
    delete obj.url
    delete obj.volume
    obj.index = obj.index === 0 ? 0 : (obj.index || audio.speech.length)
    obj.id = obj.id || 'speech'+obj.index
    audio.speech.push(obj)
    return obj
  }

  var wavenetRequest = function (ssml) {
    return gapi.client.request({
      'path': 'https://texttospeech.googleapis.com/v1/text:synthesize',
      'method': 'POST',
      'body': {
        input: {
          ssml: ssml
        },
        voice: {
          languageCode: config.gapi.languageCode || "en-GB",
          name: config.gapi.voice || "en-GB-Wavenet-A",
          ssmlGender: config.gapi.gender || "FEMALE"
        },
        audioConfig: {
          audioEncoding: "MP3",
          speakingRate: parseFloat(config.gapi.speakingRate) || 1,
          pitch: parseFloat(config.gapi.pitch) || 0,
          volumeGainDb: parseFloat(config.gapi.volumeGainDb) || 0,
          effectsProfileId: typeof config.gapi.effectsProfileId === 'string' && config.gapi.effectsProfileId ? [config.gapi.effectsProfileId] : (
            config.gapi.effectsProfileId || [
              "headphone-class-device"
              //"handset-class-device"
              //"small-bluetooth-speaker-class-device"
            ]
          )
          //sampleRateHertz: config.gapi.sampleRateHertz || undefined
        }
      }
    })
  }

  /**
   * Funcion to create Howler objects
   */
  this.audio.getWavenet = function () {
    return new Promise(function (resolve, reject) {
      let toLoad = audio.speech.filter(obj => !obj.howl)
      audio.speechesToLoad = toLoad.length
      if (!toLoad.length) return resolve(0)
      var gapiBatch = gapi.client.newBatch();
      toLoad.forEach(obj => {
        if (obj.ssml)
          gapiBatch.add(wavenetRequest(obj.ssml),{id:obj.id})
        else if(Array.isArray(obj.text))
          gapiBatch.add(wavenetRequest('<speak>' + obj.text.join(' ') + '</speak>'),{id:obj.id})
        else
          gapiBatch.add(wavenetRequest('<speak>' + obj.text + '</speak>'),{id:obj.id})
      })
      gapiBatch.then(response => {
          let ids = Object.keys(response.result)
          ids.forEach(id => {
            let idx = audio.speech.findIndex(obj => obj.id === id)
            if(idx > -1 && response.result[id].result.audioContent){
              let dataSrc = 'data:audio/mp3;base64,'+response.result[id].result.audioContent;
              audio.speech[idx].howl = new Howl({
                src: [dataSrc],
                volume: config.speechVolume || 0.45,
                preload: true
              }).on('load', function (soundId) { audio.speechesLoaded++; })
                .on('loaderror', function (soundId) { console.error('getWavenet howl load error', id); })
              // let snd      = document.createElement('audio');
              // snd.controls = 'controls';
              // snd.src      = src;
              // snd.type     = 'audio/mpeg';
              // document.body.appendChild(snd)
            } else if(that.DEBUG){
              console.warn('SpeechError: No id?')
            }
          })
          resolve(audio.speechesToLoad)
        },
        reason => {
          console.error('TTS Error: '+reason.result.error.message)
          reject(reason.result.error)
        }
      );
    })
  }

  audio.getSpeech = function() {
    audio.speechesLoaded = 0
    if(that.DEBUG) console.log('Video Statement '+that.id+': fetching speech')
    return new Promise(function (resolve, reject) {
      var waitForGapi = function(timeout) {
        let timespent = 0
        if(!timeout) timeout = 10*1000
        return new Promise(function (resolveGapi, rejectGapi) {
            var waitForGapiInner = function(){
                if(audio.speech.gapi_loaded) return resolveGapi();
                else {
                    timespent += 100
                    if(timeout && timeout>0 && timespent >= timeout) return rejectGapi(new Error('Waiting for google API client to load timed out ('+(Math.round(timeout/100)/10)+'secs)'))
                    else setTimeout(waitForGapiInner, 100);
                }
            }
            waitForGapiInner()
        });
      }
      waitForGapi().then(audio.getWavenet).then(() => {
        // Sort by index
        audio.speech = audio.speech.sort((a, b) => a.index < b.index ? -1 : a.index > b.index ? 1 : 0)
        // Add event to automatically play next track if one has been set
        audio.speech.forEach((obj, i, arr) => {
          arr[i].howl.on('end', function () {
            if (this.hasNext()) { //_next audio files are added in build.js
              audio.speech.currentlyPlaying = this.getNext()
              audio.speech.currentlyPlayingId = this.getNext().play()
            } else {
              audio.speech.currentlyPlaying = null
              audio.speech.currentlyPlayingId = null
            }
          })
        })
        function allSpeechesLoaded() {
          return new Promise(function (res, rej) {
              let waited = 0;
              (function waitForAllSpeechesToLoad(){
                  if (audio.speechesLoaded == audio.speechesToLoad) return res(audio.speechesLoaded);
                  else if(waited > 10000) return rej(audio.speechesLoaded)
                  else {
                    waited += 100
                    setTimeout(waitForAllSpeechesToLoad, 100);
                  }
              })();
          });
        }
        allSpeechesLoaded().then(function(numLoaded){
          if(that.DEBUG) console.log('Video Statement '+that.id+': speech loaded')
          resolve(numLoaded)
        }).catch((err)=>{
          console.error('Video Statement '+that.id+': waiting for speech to load timed out (10 sec)')
          reject(err)
        });
      }).catch((err)=>{
        reject(err)
      })
    })
  }

  audio.getById = function (id) {
    return audio.speech.find(obj => obj.id == id)
  }

  audio.getIndexById = function (id) {
    return audio.speech.findIndex(obj => obj.id == id)
  }

  audio.getByIndex = function (idx) {
    return audio.speech[idx]
  }

  audio.getHowlById = function (id) {
    return audio.speech.find(obj => obj.id == id).howl
  }

  audio.getHowlByIndex = function (idx) {
    return audio.speech[idx].howl
  }

  audio.getByTime = function (time) {
    return audio.speech.find(obj => obj.startTime <= time && obj.startTime + obj.howl.duration() > time)
  }

}