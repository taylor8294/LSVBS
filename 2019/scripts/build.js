import { intro } from './scenes/intro'
import { tableStart } from './scenes/tableStart'
import { jarIn } from './scenes/jarIn'
import { fundIn } from './scenes/fundIn'
import { transfersIn } from './scenes/transfersIn'
import { contsEe } from './scenes/contsEe'
import { contsEr } from './scenes/contsEr'
import { returnIn } from './scenes/returnIn'
import { returnOut } from './scenes/returnOut'
import { chargesOut } from './scenes/chargesOut'
import { closingBalance } from './scenes/closingBalance'
import { tableEnd } from './scenes/tableEnd'
import { today } from './scenes/today'
import { lsAge } from './scenes/lsAge'
import { bene } from './scenes/bene'
import { end } from './scenes/end'

let waitCount = 0
export  function buildTimeline(){

  if(window.VBS.speech.speechesLoaded < window.VBS.speech.speechesToLoad && waitCount++ < 102){
    return setTimeout(buildTimeline,100)
  }

  var user = window.VBS.user, label, tl
  
  // Now all assets including speech are loaded
  // build master timeline with imported scenes
  // linking audio files using "_next" within each timeline

  function linkAudios(_tl){
    _tl.audios.forEach((obj,i,arr) => {
      let audioBefore = 0
      for(let j=0;j<i;j++){
        audioBefore += arr[j].howl.duration()
      }
      obj.startTime = obj.howl['_start'] = VBS.timeline.getLabelTime(label)+audioBefore
      if(i !== arr.length-1)
        obj.howl['_next'] = arr[i+1].howl
      if(i !== 0)
        obj.howl['_prev'] = arr[i-1].howl
    });
  }

  function addToBuild(newLabel,func){
    let inTime
    if(label)
      inTime = Math.max(VBS.timeline.getLabelTime(label) + tl.audios.reduce((dur,obj)=>dur+(obj.howl ? obj.howl.duration() : 0),0), tl.endTime())
    label = newLabel
    VBS.timeline.add(label,inTime ? inTime : undefined)
    tl = func()
    tl.eventCallback("onStart", function(){
      // Standard audio setup
      if(!VBS.scrubbingDir && tl.audios.length){
        if(window.VBS.speech.currentlyPlaying){
          window.VBS.speech.currentlyPlaying.stop()
          window.VBS.speech.currentlyPlayingId = null
        }
        if(this.audios.length){
          if(this.audios[0].howl){
            window.VBS.speech.currentlyPlaying = this.audios[0].howl
            window.VBS.speech.currentlyPlayingId = this.audios[0].howl.play()
          } else if(this.audios.length > 1 && this.audios[1].howl){
            window.VBS.speech.currentlyPlaying = this.audios[1].howl
            window.VBS.speech.currentlyPlayingId = this.audios[1].howl.play()
          }
        }
      }
    })
    VBS.timeline.add(tl,label)
    linkAudios(tl)
  }

  addToBuild("intro",intro)
  addToBuild("tableStart",tableStart)
  addToBuild("jarIn",jarIn)
  addToBuild("fundIn",fundIn)
  if (user['Transfers'] > 0) addToBuild("transfersIn",transfersIn)
  addToBuild("contsEe",contsEe)
  addToBuild("contsEr",contsEr)
  if(VBS.user['Return'] >= 0) addToBuild("return",returnIn)
  else addToBuild("return",returnOut)
  addToBuild("chargesOut",chargesOut)
  addToBuild("closingBalance",closingBalance)
  addToBuild("tableEnd",tableEnd)
  if(user['Balance'] > 0) addToBuild("today",today)
  addToBuild("lsAge",lsAge)
  if(!Number.isNaN(user['Beneficiaries']) && user['Beneficiaries'] == 0)
    addToBuild("bene",bene)
  addToBuild("end",end)

  VBS.tracker.setMediaTotalLengthInSeconds(VBS.timeline.duration());

  console.log('built timeline')
  
}

/*tl.to({g:0},0.5,{
  g:1/1000,
  onUpdate:(tween)=>{
    VBS.engine.world.gravity.scale = tween.target.g
  },
  onUpdateParams: ['{self}']
})*/