export function speechSetup() {

  window.VBS.speech.howls = window.VBS.speech.howls || []

  var user = window.VBS.user

  window.VBS.speech.howls.push({
    id: 'intro0',
    index: 0,
    howl: new Howl({
      src: ['./static/LIF/vbs/audio/intro0.mp3'],
      volume: 0.45,
      preload: true
    }).on('loaderror', function (soundId) { console.error('speech load error', 0); }),
    ssml: '<speak>Take a look around. <break time="1000ms" /> </speak>',
    text: 'Take a look around.'
  })

  window.VBS.speech.howls.push({
    id: 'intro1',
    index: 1,
    ssml: '<speak>' + user['Forename'] + '. <break time="400ms" /> This, is your Life Sight Dashboard.</speak>',
    text: user['Forename'] + '. This is your LifeSight Dashboard'
  })

  window.VBS.speech.howls.push({
    id: 'intro2',
    index: 2,
    howl: new Howl({
      src: ['./static/LIF/vbs/audio/intro2.mp3'],
      volume: 0.45,
      preload: true
    }).on('loaderror', function (soundId) { console.error('speech load error', 2); }),
    ssml: '<speak>It contains all the key information about your Life Sight account, right now. All in one place.</speak>',
    text: 'It contains all the key information about your LifeSight account right now. All in one place.'
  })

  window.VBS.speech.howls.push({
    id: 'tableStart',
    index: 3,
    howl: new Howl({
      src: ['./static/LIF/vbs/audio/tableStart.mp3'],
      volume: 0.45,
      preload: true
    }).on('loaderror', function (soundId) { console.error('speech load error', 3); }),
    ssml: '<speak>However, it\'s always good to take a look back at how you got to where you are. This 2 minute video is personal to you, and will walk you through what\'s happened to your Account over the last tax year to ' + user['EndDate'].toFormattedString() + '.</speak>',
    text: 'However, it\'s always good to take a look back at how you got to where you are. This 2 minute video is personal to you, and will walk you through what\'s happened to your Account over the last tax year to ' + user['EndDate'].toFormattedString() + '.'
  })

  if (user['StartBalance'] > 0)
    window.VBS.speech.howls.push({
      id: 'jar',
      index: 4,
      howl: new Howl({
        src: ['./static/LIF/vbs/audio/jarIn.mp3'],
        volume: 0.45,
        preload: true
      }).on('loaderror', function (soundId) { console.error('speech load error', 4); }),
      ssml: '<speak>This jar represents your Life Sight account.</speak>',
      text: 'This jar represents your LifeSight account.'
    })
  else
    window.VBS.speech.howls.push({
      id: 'jar',
      index: 4,
      // howl: new Howl({
      //   src: ['./static/LIF/vbs/audio/jar0.mp3'],
      //   volume: 0.45,
      //   preload: true
      // }).on('loaderror', function (soundId) { console.error('speech load error', 4); }),
      ssml: '<speak>This jar represents your Life Sight account. As it was at ' + user['StartDate'].toFormattedString() + '.</speak>',
      text: 'This jar represents your LifeSight account as it was at ' + user['StartDate'].toFormattedString() + '.'
    })

  if (user['StartBalance'] > 0)
    window.VBS.speech.howls.push({
      id: 'fundIn',
      index: 5,
      // howl: new Howl({
      //   src: ['./static/LIF/vbs/audio/fundIn.mp3'],
      //   volume: 0.45,
      //   preload: true
      // }).on('loaderror', function (soundId) { console.error('speech load error', 5); }),
      text: 'Let\'s fill it up to show your balance, as it was at ' + user['StartDate'].toFormattedString() + '.'
    })


  if (user['Transfers'] > 0)
    window.VBS.speech.howls.push({
      id: 'transfers',
      index: 6,
      text: 'You transferred in ' + niceRound(user['Transfers'], true) + ' during the year. Let\'s add that in now.'
    })

  if (user['ContributionsEE'] > 0) {
    window.VBS.speech.howls.push({
      id: 'contsEe0',
      index: 7,
      ssml: '<speak>Over the course of the year ' + user['Forename'] + ', you contributed ' + niceRound(user['ContributionsEE'], true) + ' to your Life Sight account.</speak>',
      text: 'Over the course of the year ' + user['Forename'] + ', you contributed ' + niceRound(user['ContributionsEE'], true) + ' to your LifeSight account.'
    })
    window.VBS.speech.howls.push({
      id: 'contsEe1',
      index: 8,
      howl: new Howl({
        src: ['./static/LIF/vbs/audio/contsEe1.mp3'],
        volume: 0.45,
        preload: true
      }).on('loaderror', function (soundId) { console.error('speech load error', 8); }),
      ssml: '<speak>Don\'t forget. Because you benefit from tax relief on your contributions, the actual cost to you is lower than this.</speak>',
      text: 'Don\'t forget, because you benefit from tax relief on your contributions, the actual cost to you is lower than this.'
    })
  } else {
    window.VBS.speech.howls.push({
      id: 'contsEe',
      index: 7,
      howl: new Howl({
        src: ['./static/LIF/vbs/audio/contsEe0.mp3'],
        volume: 0.45,
        preload: true
      }).on('loaderror', function (soundId) { console.error('speech load error', 8); }),
      ssml: '<speak>It looks like this year you didn\'t contribute anything into your Life Sight Account.</speak>',// You should consider if you are on track to meet your needs without any contributions from yourself. We\'ll look more at this at the end of this video.</speak>',
      text: 'It looks like this year you didn\'t contribute anything into your LifeSight Account.'// You should consider if you are on track to meet your needs without any contributions from yourself. We\'ll look more at this at the end of this video.'
    })
  }

  if (user['ContributionsER'] > 0) {
    if (user['ContributionsEE'] > 0) {
      window.VBS.speech.howls.push({
        id: 'contsEr',
        index: 9,
        text: 'On top of this, ' + user['Employer'] + ' contributed another ' + niceRound(user['ContributionsER']) + '.'
      })
    } else {
      window.VBS.speech.howls.push({
        id: 'contsEr',
        index: 9,
        ssml: '<speak>' + user['Employer'] + ' did contribute into your Life Sight Account though, adding ' + niceRound(user['ContributionsER'], true) + ' over the year.</speak>',
        text: user['Employer'] + ' did contribute into your LifeSight Account though, adding ' + niceRound(user['ContributionsER'], true) + ' over the year.'
      })
    }
  }

  if (user['Return'] > 0)
    window.VBS.speech.howls.push({
      id: 'return',
      index: 10,
      howl: new Howl({
         src: ['./static/LIF/vbs/audio/return.mp3'],
      volume: 0.45,
         preload: true
      }).on('loaderror',function (soundId) { console.error('speech load error', 10); }),
      text: 'Positive investment returns on your savings, also added to your Account.'
    })
  else if (user['Return'] <= 0) {
    window.VBS.speech.howls.push({
      id: 'return0',
      index: 10,
      howl: new Howl({
        src: ['./static/LIF/vbs/audio/return0.mp3'],
        volume: 0.45,
        preload: true
      }).on('loaderror', function (soundId) { console.error('speech load error', 10); }),
      ssml: '<speak>Negative investment returns on your savings resulted in a decrease in value over the past year. <break time="300ms"/> But remember that this is just a snapshot, and pension savings are long term investments. They will go up. <emphasis level="strong">And. Down.</emphasis> Over time.',
      text: 'Negative investment returns on your savings resulted in a decrease in value over the past year. But remember that this is just a snapshot, and pension savings are long term investments. They will go up, and down, over time.'
    })
    let mySavings = Array.from(jQuery('#form-PNL_FUND_BALANCE .value').map((i, node) => $(node).text())),
      mySavingsVal = mySavings.map(val => val.split('').filter(c => !Number.isNaN(+c)).join('')).map(v => +v / 100),
      pc = -1
    if (mySavingsVal && mySavingsVal.length > 1 && mySavingsVal[1] > 0 && mySavingsVal[0] > mySavingsVal[1])
      pc = Math.round(100 * (mySavingsVal[0] / mySavingsVal[1] - 1))
    if (pc > 0 && pc < 50)
      window.VBS.speech.howls.push({
        id: 'return1',
        index: 11,
        ssml: '<speak>You can see in the My Savings panel below, that, overall, your savings have still grown by around ' + pc + '% since you joined LifeSight.</speak>',
        text: 'You can see in the My Savings panel below that, overall, your savings have still grown by around ' + pc + '% since you joined LifeSight.'
      })
    else
      window.VBS.speech.howls.push({
        id: 'return1',
        index: 11,
        howl: new Howl({
          src: ['./static/LIF/vbs/audio/savings.mp3'],
          volume: 0.45,
          preload: true
        }).on('loaderror', function (soundId) { console.error('speech load error', 11); }),
        ssml: '<speak>You can use the My Savings panel below, to see how the value of your savings compares to the total amount paid in.</speak>',
        text: 'You can use the My Savings panel below to see how the value of your savings compares to the total amount paid in.'
      })
  }

  window.VBS.speech.howls.push({
    id: 'charges',
    index: 12,
    howl: new Howl({
      src: ['./static/LIF/vbs/audio/charges.mp3'],
      volume: 0.45,
      preload: true
    }).on('loaderror', function (soundId) { console.error('speech load error', 12); }),
    ssml: '<speak>Lastly, this represents the member fee that you paid to Life Sight to help manage your investments, and the running of your Account.</speak>',
    text: 'Lastly, this represents the member fee that you paid to LifeSight to help manage your investments, and the running of your Account.'
  })

  let closingAudio = 'Meaning the closing balance on your Account, as at ' + user['EndDate'].toFormattedString() + ', was ' + niceRound(user['EndBalance'], true) + '.'
  if (user['StartBalance'] > 0 && user['EndBalance'] - user['StartBalance'] > 900) {
    closingAudio += ' That\'s ' + niceRound(user['EndBalance'] - user['StartBalance']) + ' up on the year before.'
  }
  window.VBS.speech.howls.push({
    id: 'end',
    index: 13,
    text: closingAudio
  })

  window.VBS.speech.howls.push({
    id: 'tableEnd',
    index: 14,
    howl: new Howl({
      src: ['./static/LIF/vbs/audio/tableEnd.mp3'],
      volume: 0.45,
      preload: true
    }).on('loaderror', function (soundId) { console.error('speech load error', 14); }),
    ssml: '<speak>Here\'s that information again. <break time="2000ms"/> So. What could this mean for your future?</speak>',
    text: 'Here\'s that information again. So, what could this mean for your future?'
  })

  if(user['Balance']){
    if (user['Scheme']==5 && user['Category']==5001 && user['Balance']>user['EndBalance']) {
      window.VBS.speech.howls.push({
        id: 'todayTWPS0',
        index: 15,
        // howl: new Howl({
        //   src: ['./static/LIF/vbs/audio/TWPS.mp3'],
        //   volume: 0.45,
        //   preload: true
        // }).on('loaderror', function (soundId) { console.error('speech load error', 15); }),
        ssml: '<speak>Well, since April the transfer of your previous pension savings from the Towers Watson Pension Scheme has been completed.</speak>',
        text: 'Well since April the transfer of your previous pension savings from the Towers Watson Pension Scheme has been completed.'
      })
      window.VBS.speech.howls.push({
        id: 'todayTWPS1',
        index: 16,
        ssml: '<speak>Bringing your Life Sight Account up to ' + niceRound(user['Balance']) + ' today.</speak>',
        text: 'Bringing your Life Sight Account up to ' + niceRound(user['Balance']) + ' today.'
      })
    } else {
      window.VBS.speech.howls.push({
        id: 'today',
        index: 15,
        ssml: '<speak>Well, today the balance of your Life Sight Account '+(user['Balance']-user['EndBalance'] > 999 ? 'has increased to' : 'is') + ' ' + niceRound(user['Balance']) + '.</speak>',
        text: 'Well today the balance of your Life Sight Account '+(user['Balance']-user['EndBalance'] > 999 ? 'has increased to' : 'is') + ' ' + niceRound(user['Balance']) + '.'
      })
    }
  }

  if (isFinite(user['LSAge']) && +user['LSAge'] > 54) {
    if (+user['LSAge'] < 75) {
      window.VBS.speech.howls.push({
        id: 'lsAge',
        index: 17,
        ssml: '<speak>From this, we think the age you may be able to afford to retire, is currently ' + user['LSAge'] + ' years old. We call this your Life Sight Age. <break time="500ms"/></speak>',
        text: 'From this we think the age you may be able to afford to retire is currently ' + user['LSAge'] + ' years old - we call this your LifeSight age.'
      })
      window.VBS.speech.howls.push({
        id: 'lsAge2',
        index: 18,
        howl: new Howl({
          src: ['./static/LIF/vbs/audio/lsAge2.mp3'],
          volume: 0.45,
          preload: true
        }).on('loaderror', function (soundId) { console.error('speech load error', 17); }),
        ssml: '<speak>How does this sound. <break time="1000ms"/> Use the Age Ometer tool to find out how you can improve your Life Sight Age. And don’t forget to check this regularly to stay on track.</speak>',
        text: 'How does this sound? Use the ageOmeter tool to find out how you can improve your LifeSight Age. And don’t forget to check this regularly to stay on track.'
      })
    } else {
      window.VBS.speech.howls.push({
        id: 'lsAge',
        index: 17,
        howl: new Howl({
          src: ['./static/LIF/vbs/audio/lsAge1.mp3'],
          volume: 0.45,
          preload: true
        }).on('loaderror', function (soundId) { console.error('speech load error', 16); }),
        ssml: '<speak>Use the Age Ometer tool to find out how to improve your Life Sight age. Ensure you have entered all other retirement savings you may have, to best understand when you may be able to afford to retire. And don\'t forget to check this regularly to stay on track.</speak>',
        text: 'Use the ageOmeter tool to find out how to improve your Life Sight age. Ensure you have entered all other retirement savings you may have to best understand when you may be able to afford to retire, and don\'t forget to check this regularly to stay on track.'
      })
    }
  } else
    window.VBS.speech.howls.push({
      id: 'lsAge',
      index: 17,
      howl: new Howl({
        src: ['./static/LIF/vbs/audio/lsAge0.mp3'],
        volume: 0.45,
        preload: true
      }).on('loaderror', function (soundId) { console.error('speech load error', 16); }),
      ssml: '<speak>It looks like you are yet to find out your Life Sight Age. The age at which you may be able to afford to retire. Click through to the Age Ometer tool to explore how your current decisions could affect your future plans.</speak>',
      text: 'It looks like you are yet to find out your LifeSight Age - the age at which you may be able to afford to retire. Click through to the ageOmeter tool to explore how your current decisions could affect your future plans.'
    })

  if (!Number.isNaN(user['Beneficiaries']) && user['Beneficiaries'] == 0)
    window.VBS.speech.howls.push({
      id: 'bene',
      index: 19,
      howl: new Howl({
        src: ['./static/LIF/vbs/audio/bene.mp3'],
        volume: 0.45,
        preload: true
      }).on('loaderror', function (soundId) { console.error('speech load error', 18); }),
      ssml: '<speak>Before we finish. We noticed that you\'re yet to provide us with information on who you\'d want to receive your pension savings if anything were to happen to you. This is really important and it will only take a minute to add this to your Account. You can click the empty beneficiaries bar in your tasks panel to do so.</speak>', // at the end of the video
      text: 'Before we finish, we noticed that you\'re yet to provide us with information on who you\'d want to receive your pension savings if anything were to happen to you. This is really important and it will only take a minute to add this to your Account. You can click the empty beneficiaries bar in your tasks panel to do so.' // at the end of the video
    })

  window.VBS.speech.howls.push({
    id: 'finish',
    index: 20,
    howl: new Howl({
      src: ['./static/LIF/vbs/audio/finish.mp3'],
      volume: 0.45,
      preload: true
    }).on('loaderror', function (soundId) { console.error('speech load error', 19); }),
    ssml: '<speak>Finally. This video is just a summary. So it\'s important to read your full statement too. You can do so, by clicking here. <break time="1000ms" /> Thanks for taking the time to catch up on your savings. We look forward to helping you save for another year.</speak>',
    text: 'Finally, this video is just a summary, so it\'s important to read your full statement too. You can do so by clicking here. Thanks for taking the time to catch up on your savings. We look forward to helping you save for another year.'
  })

  console.log('built script')

  function niceRound(num, incWord) {
    let rounded = Math.abs(num)
    if (rounded >= 995000) rounded = Math.round(rounded / 5000) * 5000
    else if (rounded >= 9500) rounded = Math.round(rounded / 1000) * 1000
    else if (rounded >= 950) rounded = Math.round(rounded / 100) * 100
    else if (rounded >= 102.5) rounded = Math.round(rounded / 10) * 10
    let word = ''
    if (incWord) {
      let under = ['almost ', 'nearly ']
      word = Math.abs(num) > 100 ? (rounded < Math.abs(num) ? 'over ' : (rounded > Math.abs(num) ? under[Math.floor(Math.random() * under.length)] : 'exactly ')) : '';
    }
    return word + '£' + rounded.toFixedCommas()
  }

  window.VBS.speech.speechesToLoad = window.VBS.speech.howls.filter(obj => !obj.howl).length
  //window.VBS.speech.speechesLoaded = -1 Moved to index

  var wavenetRequest = window.VBS.speech.wavenetRequest = function (ssml) {
    return gapi.client.request({
      'path': 'https://texttospeech.googleapis.com/v1/text:synthesize',
      'method': 'POST',
      'body': {
        input: {
          ssml: ssml
        },
        voice: {
          languageCode: "en-GB",
          name: "en-GB-Wavenet-A",
          ssmlGender: "FEMALE"
        },
        audioConfig: {
          audioEncoding: "MP3",
          speakingRate: 1,
          pitch: 0,
          volumeGainDb: 0,
          effectsProfileId: [
            //"handset-class-device"
            "headphone-class-device"
            //"small-bluetooth-speaker-class-device"
          ]/*,
          sampleRateHertz: number*/
        }
      }
    })
  }

  /**
   * Create Howler objects
   */
  var getWavenet = window.VBS.speech.getWavenet = async function () {
    return new Promise(function (resolve, reject) {
      let toLoad = window.VBS.speech.howls.filter(obj => !obj.howl)
      if (!toLoad.length)
        return resolve(0)
      var gapiBatch = gapi.client.newBatch();
      toLoad.forEach(obj => {
        if (obj.ssml)
          gapiBatch.add(wavenetRequest(obj.ssml),{id:obj.id})
        else
          gapiBatch.add(wavenetRequest('<speak>' + obj.text + '</speak>'),{id:obj.id})
      })
      gapiBatch.then(
        response => {
          let ids = Object.keys(response.result)
          ids.forEach(id => {
            let idx = VBS.speech.howls.findIndex(obj => obj.id === id)
            if(idx > -1){
              let dataSrc = 'data:audio/mp3;base64,'+response.result[id].result.audioContent;
              VBS.speech.howls[idx].howl = new Howl({
                src: [dataSrc],
                volume: 0.45,
                preload: true
              }).on('load', function (soundId) { window.VBS.speech.speechesLoaded++; })
                .on('loaderror', function (soundId) { console.error('getWavenet howl load error', id); })
              // let snd      = document.createElement('audio');
              // snd.controls = 'controls';
              // snd.src      = src;
              // snd.type     = 'audio/mpeg';
              // document.body.appendChild(snd)
            }
          })
          resolve(window.VBS.speech.speechesToLoad)
        },
        reason => {
          console.error('TTS Error: '+reason.result.error.message)
          reject(reason.result.error)
        }
      );
    })
  }

  var getSpeeches = window.VBS.speech.getSpeeches = async function () {
    /*if(!window.VBS.speech.gapi_loaded){
      setTimeout(function(){
        VBS.speech.getSpeeches();
      },200)
      return false
    }*/
    window.VBS.speech.speechesLoaded = 0
    return new Promise(function (resolve, reject) {
      VBS.speech.getWavenet().then((numLoading) => {
        VBS.speech.howls = VBS.speech.howls.sort((a, b) => a.index < b.index ? -1 : a.index > b.index ? 1 : 0)
        // Add event to automatically play next track if one has been set
        VBS.speech.howls.forEach((obj, i, arr) => {
          arr[i].howl.on('end', function () {
            if (this.hasNext()) {
              window.VBS.speech.currentlyPlaying = this.getNext()
              window.VBS.speech.currentlyPlayingId = this.getNext().play()
            } else {
              window.VBS.speech.currentlyPlaying = null
              window.VBS.speech.currentlyPlayingId = null
            }
          })
        })
        resolve(numLoading)
      }).catch((err)=>{
        reject(err)
      })
    })
  }

  window.VBS.speech.getById = function (id) {
    return VBS.speech.howls.find(obj => obj.id == id)
  }

  window.VBS.speech.getIndexById = function (id) {
    return VBS.speech.howls.findIndex(obj => obj.id == id)
  }

  window.VBS.speech.getByIndex = function (idx) {
    return VBS.speech.howls[idx]
  }

  window.VBS.speech.getHowlById = function (id) {
    return VBS.speech.howls.find(obj => obj.id == id).howl
  }

  window.VBS.speech.getHowlByIndex = function (idx) {
    return VBS.speech.howls[idx].howl
  }

  window.VBS.speech.getByTime = function (time) {
    return VBS.speech.howls.find(obj => obj.startTime <= time && obj.startTime + obj.howl.duration() > time)
  }

}