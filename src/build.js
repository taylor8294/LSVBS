import videoStart from './scenes/videoStart';
import logoStart from './scenes/logoStart';
import intro from './scenes/intro';
import tableStart from './scenes/tableStart';
import jarIn from './scenes/jarIn';
import startBalanceIn from './scenes/startBalanceIn';
import transfersIn from './scenes/transfersIn';
import withdrawalsOut from './scenes/withdrawalsOut';
import eeContsIn from './scenes/eeContsIn';
import erContsIn from './scenes/erContsIn';
import returnIn from './scenes/returnIn';
import returnOut from './scenes/returnOut';
import chargesOut from './scenes/chargesOut';
import endBalance from './scenes/endBalance';
import tableEnd from './scenes/tableEnd';
import beneficiaries from './scenes/beneficiaries';
import jarEnd from './scenes/jarEnd';

export default function(config){

  if(this.DEBUG) console.log('Video Statement '+this.id+': building scenes')

  let that = this,
      sceneDict = {videoStart,logoStart,intro,tableStart,jarIn,startBalanceIn,transfersIn,withdrawalsOut,eeContsIn,erContsIn,returnIn,returnOut,chargesOut,endBalance,tableEnd,beneficiaries,jarEnd},
      scenesToInclude = Object.keys(sceneDict), //all scenes except..
      scenes = [],
      sceneObjs = []
  //... videoStart and chargesOut. These are disabled by default.
  scenesToInclude.splice(scenesToInclude.findIndex(scene => scene === 'videoStart'),1)
  scenesToInclude.splice(scenesToInclude.findIndex(scene => scene === 'chargesOut'),1) //['logoStart','intro','tableStart','jarIn','startingBalanceIn','transfersIn','withdrawalsOut','eeContsIn','erContsIn','returnIn','returnOut','closingBalance','tableEnd'],
  
  //Reduce list of all available scenes to just those enabled in config
  if(config.list && config.list.length){
    scenesToInclude = config.list.filter(sceneName => Object.keys(sceneDict).map(n=>n.toLowerCase()).includes(sceneName.toLowerCase()))
  } else {
    if(config.enabled && config.enabled.length){
      config.enabled.forEach(n => {
        if(Object.keys(sceneDict).map(n2=>n2.toLowerCase()).includes(n.toLowerCase()))
          scenesToInclude.push(n)
      })
    }
    if(config.disabled && config.disabled.length){
      scenesToInclude = scenesToInclude.filter(n => !config.disabled.map(n2=>n2.toLowerCase()).includes(n.toLowerCase()))
    }
  }
  if(scenesToInclude.includes('chargesOut')) this.showCharges = true

  //Remove scenes that are not applicable for this member
  if(this.data.bulkTransfers+this.data.transfers<=0){
    let ind = scenesToInclude.findIndex(scene => scene == 'transfersIn')
    if(ind >= 0){
      scenesToInclude.splice(ind,1)
    }
  }
  if(!this.data.withdrawals){
    let ind = scenesToInclude.findIndex(scene => scene == 'withdrawalsOut')
    if(ind >= 0){
      scenesToInclude.splice(ind,1)
    }
  }
  if(this.data.employeeContributions<=0){
    let ind = scenesToInclude.findIndex(scene => scene == 'eeContsIn')
    if(ind >= 0){
      scenesToInclude.splice(ind,1)
    }
  }
  if(this.data.employerContributions<=0){
    let ind = scenesToInclude.findIndex(scene => scene == 'erContsIn')
    if(ind >= 0){
      scenesToInclude.splice(ind,1)
    }
    //TODO add deferred specific scene in here?
  }
  if(this.data.investmentReturn+(this.showCharges?0:this.data.charges) < 0){
    let ind = scenesToInclude.findIndex(scene => scene == 'returnIn')
    if(ind >= 0){
      scenesToInclude.splice(ind,1)
    }
  } else {
    let ind = scenesToInclude.findIndex(scene => scene == 'returnOut')
    if(ind >= 0){
      scenesToInclude.splice(ind,1)
    }
  }
  if(this.user.beneficiaries || this.user.beneficiaries===undefined){
    let ind = scenesToInclude.findIndex(scene => scene == 'beneficiaries')
    if(ind >= 0){
      scenesToInclude.splice(ind,1)
    }
  }
  // Move position of withdrawals scene depending on if we also have a transfers scene
  if(scenesToInclude.includes('withdrawalsOut') && !scenesToInclude.includes('transfersIn')){
    let ind1 = scenesToInclude.findIndex(scene => scene == 'withdrawalsOut'),
        ind2 = scenesToInclude.findIndex(scene => scene == 'returnIn' || scene == 'returnOut')
    if(ind1 >= 0 && ind2 >= 0){
      scenesToInclude.splice(ind2, 0, scenesToInclude.splice(ind1, 1)[0]);
    }
  }
  // Done
  if(scenesToInclude.includes('chargesOut')) this.showCharges = true
  scenes = scenesToInclude.map(n => sceneDict[n])
  
  // Go through each scene, queuing the speech needed and storing objects
  for(let scene of scenes){
    let sceneObj = scene.call(this, config)
    if(!sceneObj.audio) sceneObj.audio = []
    for(let i=0; i<sceneObj.audio.length;i++){
      sceneObj.audio[i] = this.audio.queueSpeech(sceneObj.audio[i])
    }
    sceneObjs.push(sceneObj)
    //if(this.DEBUG) console.log('Video Statement '+this.id+': built '+sceneObj.id)
  }

  // Now that all the speech has been queued, fetch it
  return new Promise(function(resolve, reject) {
    that.audio.getSpeech().then(function(numLoaded){
      let addedUpTo = 0;
      // Now that we have all the Howl objects and we know they are loaded
      if(that.DEBUG) console.log('Video Statement '+that.id+': building timeline')
      sceneObjs.forEach((sceneObj,ind)=>{
        // Get the timeline object
        that.timeline.add(sceneObj.id,addedUpTo)
        let tl = sceneObj.tl()
        // Link the howl objects for this timeline, and add caption events
        tl.audio = sceneObj.audio
        let audioBefore = 0
        for(let i=0,l=tl.audio.length; i<l; i++){
          tl.audio[i].startTime = tl.audio[i].howl['_start'] = addedUpTo+audioBefore
          if(i !== l-1) tl.audio[i].howl['_next'] = tl.audio[i+1].howl
          if(i !== 0) tl.audio[i].howl['_prev'] = tl.audio[i-1].howl
          if(Array.isArray(tl.audio[i].text)){
            let charsToNow = 0,
                totalChars = tl.audio[i].text.join('').length
            tl.audio[i].text.forEach((t,j)=>{
              tl.add(function(){
                that.setCC(tl.audio[i].text[j]);
              },audioBefore+(charsToNow/totalChars)*tl.audio[i].howl.duration())
              charsToNow += t.length
            })
          } else {
            tl.add(function(){
              that.setCC(tl.audio[i].text);
            },audioBefore)
          }
          audioBefore += tl.audio[i].howl.duration()
        }
        /*Add something to end of timeline to allow audio to finish if needed
        if(tl.duration() < audioBefore){ 
          let t = Math.ceil((audioBefore-tl.duration())*10)/10
          tl.to({x:0},t,{x:1})
        }*/
        // Add final caption event
        tl.add(function(){
          that.setCC('');
        },audioBefore)
        // Add the scene to the master timeline
        that.timeline.add(tl,sceneObj.id)

        addedUpTo += tl.duration()
        //let existingOnStart = tl.eventCallback("onStart")
        tl.eventCallback("onStart", function(){
          if(that.DEBUG) console.log('Video Statement '+that.id+': onStart',this.vars.id)
          //if(existingOnStart) existingOnStart()
          // Standard audio setup
          if(this.audio.length){
            if(that.audio.speech.currentlyPlaying){
              that.audio.speech.currentlyPlaying.stop()
              that.audio.speech.currentlyPlaying = null
              that.audio.speech.currentlyPlayingId = null
            }
            if(this.audio[0].howl){
              that.audio.speech.currentlyPlaying = this.audio[0].howl
              that.audio.speech.currentlyPlayingId = this.audio[0].howl.play()
            } else if(this.audio.length > 1 && this.audio[1].howl){ //fail safe, try playing the next one
              that.audio.speech.currentlyPlaying = this.audio[1].howl
              that.audio.speech.currentlyPlayingId = this.audio[1].howl.play()
            }
          }
        })
      })
      sceneObjs = null
      if(that.DEBUG) console.log('Video Statement '+that.id+': timeline built')
      resolve()
    })
  })
  
}