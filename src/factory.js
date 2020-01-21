import * as utils from './utils'
import gsapSetup from './setup/gsap'
import matomoSetup from './setup/matomo'
import pixiSetup from './setup/pixi'
import box2dSetup from './setup/box2d'
import mouseSetup from './setup/mouse'
import howlerSetup from './setup/howler'
import speechSetup from './setup/speech'

import buildScenes from './build.js'
import startRenderLoop from './loop'
import { calculateUnit } from './utils'

export default function(){

  // Constructor
  var VideoStatement = function(config) {
    if(!config){
      console.error('ParameterError: must pass config object to instantiate a new VideoStatement')
      return false
    }

    /*********************
     * Private variables *
     *********************/     
    var _user, _data, _$el, _tracker, _timeline, _playing = false, _config = config,
        _pixi, _box2d, _audio = {}, _speech,
        _currency = {}, _behaviour, _DEBUG = !!(VideoStatement.debug || VideoStatement.DEBUG || config.debug || config.DEBUG);
    var videoControlerTimeChanged = false, videoControlerTimeChanger = null;

    /********************
     * Public variables *
     ********************/
    this.id = config.id === 0 ? config.id : config.id || VideoStatement.counter+1;
    this.title = config.title || 'Video Statement '+this.id;

    /******************************
     * Get/Create wrapper element *
     ******************************/
    let needToAppend = false;
    _$el = utils.getjQueryElement(config.wrap || config.el || config.$el)
    if(!_$el){
      let $wrapSearch = $("[data-video-statement-wrap],.video-statement-wrap").filter((i,e)=>$(e).find('.video-statement-canvas').length == 0)
      if($wrapSearch.length > 0)
        _$el = $wrapSearch.eq(0)
      else {
        if(!utils.getjQueryElement(config.appendTo) && _DEBUG) console.warn('InputWarning: No valid wrapper or appendTo element provided, one will be created and appended to the `body`')
        _$el = $('<div class="video-statement-wrap" id="video-statement-wrap-'+this.id+'"></div>')
        needToAppend = true;
      }
    }
    _$el[0].videoStatement = this
    if(!_$el.attr('id')) _$el.attr('id','video-statement-wrap-'+this.id)

    
    /**************************
     * Parse User & Data Info *
     **************************/
    // First, see if data was passed directly in config
    if(typeof config.user === 'object' && typeof config.data === 'object')
      this.$dataTable = 'config'
    else {
      this.$dataTable = utils.getjQueryElement(config.dataTable, false)
      if(this.$dataTable) this.$dataTable = this.$dataTable.filter(function(){ return !$(this).attr('data-for-video-statement'); });
      if(!this.$dataTable || this.$dataTable.length == 0){
        // If there exists an unused table inside our wrapper, use that
        if(_$el.find('.video-statement-data-table').filter(function(){ return !$(this).attr('data-for-video-statement'); }).length > 0){
          this.$dataTable = _$el.find('.video-statement-data-table').filter(function(){ return !$(this).attr('data-for-video-statement'); }).eq(0)
        }
        // Else if there exists an unused table anywhere, use that
        else if($('.video-statement-data-table').filter(function(){ return !$(this).attr('data-for-video-statement'); }).length > 0){
          if(_DEBUG) console.warn('InputWarning: Table with class `video-statement-data-table` was found outside the wrapper element')
          this.$dataTable = $('.video-statement-data-table').filter(function(){ return !$(this).attr('data-for-video-statement'); }).eq(0)
        }
        // Else if there exists any table inside our wrapper el
        else if(_$el.find('table').length > 0){
          if(_DEBUG) console.warn('InputWarning: No table with class `video-statement-data-table` could be found, using a `table` element found inside the wrapper')
          this.$dataTable = _$el.find('table').eq(0)
        }
      }
      // If we can't find a datatable, fail
      if(!this.$dataTable){
        console.error('InputError: No data table was found');
        return false;
      }
    }
    let parsedData = this.$dataTable === 'config' ? $.extend({},config.user,config.data) : utils.parseTable(this.$dataTable)
    console.log(parsedData)
    if(!parsedData){
      console.error('Error: Parsing data table failed');
      return false;
    }

    let validated = utils.checkUserData(parsedData,_DEBUG)
    if(!validated){
      //console.error is in checkUserData
      return false;
    }

    _user = {
      schemeCode: validated.schemeCode,
      memberName: validated.memberName,
      forename: validated.forename,
      possessive: validated.possessive,
      employer: validated.employer,
      employerPossessive: validated.employerPossessive,
      category: validated.category,
      beneficiaries: validated.beneficiaries,
      benefitStatementUrl: validated.benefitStatementUrl,
      balance: validated.balance, // TODO Today's balance - not currently used
    }

    if(!(/\b[A-Z]/.test(_user.memberName))){
      _user.memberName = _user.memberName.split(/\b/g)
                                         .map(word => word[0].toUpperCase()+word.substring(1))
                                         .join('')
                                         .replace(/\bMc(\w)/,(match,g)=> 'Mc'+g.toUpperCase())
    }

    _user.forename = _user.forename || _user.memberName.split(' ')[0]
    if(!(/\b[A-Z]/.test(_user.forename))) _user.forename = _user.forename[0].toUpperCase()+_user.forename.substring(1)

    _user.possessive = _user.possessive || _user.forename.replace(/[^\w]+$/g,'')+'\''+(_user.forename[_user.forename.length-1] == 's' ? '' : 's')
    _user.employer = _user.employer || 'Your employer'
    _user.employerPossessive = _user.employerPossessive || _user.employer.replace(/[^\w]+$/g,'')+'\''+(_user.employer[_user.employer.length-1] == 's' ? '' : 's')

    _data = {
      startDate: validated.startDate,
      endDate: validated.endDate,
      startBalance: validated.startBalance,
      bulkTransfers: validated.bulkTransfers,
      transfers: validated.transfers,
      withdrawals: validated.withdrawals,
      employeeContributions: validated.employeeContributions,
      employerContributions: validated.employerContributions,
      investmentReturn: validated.investmentReturn,
      charges: validated.charges,
      endBalance: validated.endBalance,
      benefitStatementUrl: validated.benefitStatementUrl,
    }

    // All validated so can append $el (if needed), increase counter, and mark table as used
    if(needToAppend) _$el.appendTo((config.appendTo && utils.getjQueryElement(config.appendTo)) || document.body)
    VideoStatement.counter++;
    if(this.$dataTable !== 'config'){
      if(!this.$dataTable.attr('id')) this.$dataTable.attr('id','video-statement-data-table-'+this.id)
      if(!this.$dataTable.hasClass('video-statement-data-table')) this.$dataTable.addClass('video-statement-data-table')
      this.$dataTable.attr('data-for-video-statement',this.id)
    }
    
    /******************
     * Parse Currency *
     ******************/
    var currencies={ALL:{name:"Albania Lek",symbol:"Lek"},AFN:{name:"Afghanistan Afghani",symbol:"\u060B"},ARS:{name:"Argentina Peso",symbol:"$"},AWG:{name:"Aruba Guilder",symbol:"\u0192"},AUD:{name:"Australia Dollar",symbol:"A$"},AZN:{name:"Azerbaijan Manat",symbol:"\u20BC"},BSD:{name:"Bahamas Dollar",symbol:"B$"},BBD:{name:"Barbados Dollar",symbol:"Bds$"},BYN:{name:"Belarus Ruble",symbol:"Br"},BZD:{name:"Belize Dollar",symbol:"BZ$"},BMD:{name:"Bermuda Dollar",symbol:"BD$"},BOB:{name:"Bolivia Bol\u00EDviano",symbol:"$b"},BAM:{name:"Bosnia and Herzegovina Convertible Mark",symbol:"KM"},BWP:{name:"Botswana Pula",symbol:"P"},BGN:{name:"Bulgaria Lev",symbol:"\u043B\u0432"},BRL:{name:"Brazil Real",symbol:"R$"},BND:{name:"Brunei Darussalam Dollar",symbol:"B$"},KHR:{name:"Cambodia Riel",symbol:"\u17DB"},CAD:{name:"Canada Dollar",symbol:"Can$"},KYD:{name:"Cayman Islands Dollar",symbol:"CI$"},CLP:{name:"Chile Peso",symbol:"CLP$"},CNY:{name:"China Yuan Renminbi",symbol:"\u00A5"},COP:{name:"Colombia Peso",symbol:"COL$"},CRC:{name:"Costa Rica Colon",symbol:"\u20A1"},HRK:{name:"Croatia Kuna",symbol:"kn"},CUP:{name:"Cuba Peso",symbol:"\u20B1"},CZK:{name:"Czech Republic Koruna",symbol:"K\u010D"},DKK:{name:"Denmark Krone",symbol:"kr"},DOP:{name:"Dominican Republic Peso",symbol:"RD$"},XCD:{name:"East Caribbean Dollar",symbol:"EC$"},EGP:{name:"Egypt Pound",symbol:"E\u00A3"},SVC:{name:"El Salvador Colon",symbol:"\u20A1"},EUR:{name:"Euro",symbol:"\u20AC"},FKP:{name:"Falkland Islands (Malvinas) Pound",symbol:"FK\u00A3"},FJD:{name:"Fiji Dollar",symbol:"FJ$"},GHS:{name:"Ghana Cedi",symbol:"\u00A2"},GIP:{name:"Gibraltar Pound",symbol:"\u00A3"},GTQ:{name:"Guatemala Quetzal",symbol:"Q"},GGP:{name:"Guernsey Pound",symbol:"\u00A3"},GYD:{name:"Guyana Dollar",symbol:"GY$"},HNL:{name:"Honduras Lempira",symbol:"L"},HKD:{name:"Hong Kong Dollar",symbol:"HK$"},HUF:{name:"Hungary Forint",symbol:"Ft"},ISK:{name:"Iceland Krona",symbol:"kr"},INR:{name:"India Rupee",symbol:""},IDR:{name:"Indonesia Rupiah",symbol:"Rp"},IRR:{name:"Iran Rial",symbol:"\uFDFC"},IMP:{name:"Isle of Man Pound",symbol:"\u00A3"},ILS:{name:"Israel Shekel",symbol:"\u20AA"},JMD:{name:"Jamaica Dollar",symbol:"J$"},JPY:{name:"Japan Yen",symbol:"\u00A5"},JEP:{name:"Jersey Pound",symbol:"\u00A3"},KZT:{name:"Kazakhstan Tenge",symbol:"\u043B\u0432"},KPW:{name:"Korea (North) Won",symbol:"\u20A9"},KRW:{name:"Korea (South) Won",symbol:"\u20A9"},KGS:{name:"Kyrgyzstan Som",symbol:"\u043B\u0432"},LAK:{name:"Laos Kip",symbol:"\u20AD"},LBP:{name:"Lebanon Pound",symbol:"\u00A3"},LRD:{name:"Liberia Dollar",symbol:"LD$"},MKD:{name:"Macedonia Denar",symbol:"\u0434\u0435\u043D"},MYR:{name:"Malaysia Ringgit",symbol:"RM"},MUR:{name:"Mauritius Rupee",symbol:"\u20A8"},MXN:{name:"Mexico Peso",symbol:"Mex$"},MNT:{name:"Mongolia Tughrik",symbol:"\u20AE"},MZN:{name:"Mozambique Metical",symbol:"MT"},NAD:{name:"Namibia Dollar",symbol:"N$"},NPR:{name:"Nepal Rupee",symbol:"\u20A8"},ANG:{name:"Netherlands Antilles Guilder",symbol:"\u0192"},NZD:{name:"New Zealand Dollar",symbol:"NZ$"},NIO:{name:"Nicaragua Cordoba",symbol:"C$"},NGN:{name:"Nigeria Naira",symbol:"\u20A6"},NOK:{name:"Norway Krone",symbol:"kr"},OMR:{name:"Oman Rial",symbol:"\uFDFC"},PKR:{name:"Pakistan Rupee",symbol:"\u20A8"},PAB:{name:"Panama Balboa",symbol:"B\/."},PYG:{name:"Paraguay Guarani",symbol:"Gs"},PEN:{name:"Peru Sol",symbol:"S\/."},PHP:{name:"Philippines Peso",symbol:"\u20B1"},PLN:{name:"Poland Zloty",symbol:"z\u0142"},QAR:{name:"Qatar Riyal",symbol:"\uFDFC"},RON:{name:"Romania Leu",symbol:"lei"},RUB:{name:"Russia Ruble",symbol:"\u20BD"},SHP:{name:"Saint Helena Pound",symbol:"\u00A3"},SAR:{name:"Saudi Arabia Riyal",symbol:"\uFDFC"},EHP:{name:"Sahrawi peseta",symbol:"\u20A7"},RSD:{name:"Serbia Dinar",symbol:"\u0414\u0438\u043D."},SCR:{name:"Seychelles Rupee",symbol:"\u20A8"},SGD:{name:"Singapore Dollar",symbol:"S$"},SBD:{name:"Solomon Islands Dollar",symbol:"SI$"},SOS:{name:"Somalia Shilling",symbol:"S"},ZAR:{name:"South Africa Rand",symbol:"R"},LKR:{name:"Sri Lanka Rupee",symbol:"\u20A8"},SEK:{name:"Sweden Krona",symbol:"kr"},CHF:{name:"Switzerland Franc",symbol:"CHF"},SRD:{name:"Suriname Dollar",symbol:"Sr$"},SYP:{name:"Syria Pound",symbol:"\u00A3S"},TWD:{name:"Taiwan New Dollar",symbol:"NT$"},THB:{name:"Thailand Baht",symbol:"\u0E3F"},TTD:{name:"Trinidad and Tobago Dollar",symbol:"TT$"},TRY:{name:"Turkey Lira",symbol:""},TVD:{name:"Tuvalu Dollar",symbol:"$T"},UAH:{name:"Ukraine Hryvnia",symbol:"\u20B4"},GBP:{name:"United Kingdom Pound",symbol:"\u00A3"},USD:{name:"United States Dollar",symbol:"$"},UYU:{name:"Uruguay Peso",symbol:"$U"},UZS:{name:"Uzbekistan Som",symbol:"\u043B\u0432"},VEF:{name:"Venezuela Bol\u00EDvar",symbol:"Bs"},VND:{name:"Viet Nam Dong",symbol:"\u20AB"},YER:{name:"Yemen Rial",symbol:"\uFDFC"},ZWD:{name:"Zimbabwe Dollar",symbol:"Z$"}},
        fromSymbol = {"\u00A3":"GBP","\u20AC":"EUR","$":"USD","\u00A2":"GHS","\u00A5":"JPY","\u20A7":"EHP","\u0192":"ANG"}
    if(config.currency){
      config.currency = config.currency.toUpperCase().trim()
      if(!config.currencySymbol){
        if(currencies[config.currency]){
          _currency.code = config.currency
          _currency.symbol = currencies[config.currency].symbol
        } else if(fromSymbol[config.currency]){
          _currency.symbol = config.currency
          _currency.code = fromSymbol[config.currency]
        } else {
          _currency.code = config.currency
          _currency.symbol = config.currency
        }
      } else {
        _currency.code = config.currency
        _currency.symbol = config.currencySymbol
      }
    } else if(config.currencySymbol){
        _currency.symbol = config.currencySymbol
        if(fromSymbol[config.currencySymbol]) _currency.code = fromSymbol[config.currencySymbol]
        else  _currency.code = "   "
    } else {
      _currency.code = "GBP"
      _currency.symbol = "£" //"\u00A4" "¤"
    }
    if(config.currencyName) _currency.name = config.currencyName
    else if(_currency.code && currencies[_currency.code]) _currency.name = currencies[_currency.code].name
    else if(_currency.symbol) _currency.name = _currency.symbol
    else _currency.name = "Currency"


    /******************
     * Behaviour Vars *
     ******************/
    _behaviour = {
      "autoplay": !!config.autoplay,
      "pauseOnBlur": config.pauseOnBlur === undefined ? true : !!config.pauseOnBlur,
      "dim": config.dim === undefined ? true : !!config.dim,
      "dimInPoint": config.dimInPoint === undefined ? "tableStart" : (Number.isFinite(+config.dimInPoint) ? parseFloat(config.dimInPoint) : config.dimInPoint),
      "dimOutPoint": config.dimOutPoint === undefined ? "onComplete" : (Number.isFinite(+config.dimOutPoint) ? parseFloat(config.dimOutPoint) : config.dimOutPoint),
      "dimDuration": config.dimDuration === undefined ? 1 : (Number.isFinite(+_behaviour.dimDuration) ? parseFloat(config.dimDuration) : 1)
    }
    if(_behaviour.dimDuration > 10) _behaviour.dimDuration = _behaviour.dimDuration/1000;
  
    /***********
     * Getters *
     ***********/
    var trackerSet = false; // only allowed to set tracker once
    Object.defineProperties(this, {
      "DEBUG": {"get": function(){return _DEBUG;}},
      "user": {"get": function(){return _user;}},
      "data": {"get": function(){return _data;}},
      "$el": {"get": function(){return _$el;}},
      "el": {"get": function(){return _$el[0];}},
      "currency": {"get": function(){return _currency;}},
      "tracker": {
        "set": function(trkr){if(!trackerSet){trackerSet=true;_tracker=trkr;}},
        "get": function(){return _tracker;}
      },
      "config": {"get": function(){return _config;}},
      "timeline": {"get": function(){return _timeline;}},
      "pixi": {"get": function(){return _pixi;}},
      "box2d": {"get": function(){return _box2d;}},
      "audio": {"get": function(){return _audio;}},
      "speech": {"get": function(){return _speech;}}
    });

    /*****************
     * Setup tracker *
     ******************/
    _tracker = matomoSetup.call(this, config.matomo || {})
  
    /**************
     * Setup GSAP *
     **************/
    _timeline = gsapSetup.call(this) //_audio not initiated until howlerSetup below but that's ok
    
    /****************
     * Setup Canvas *
     ****************/
    _pixi = pixiSetup.call(this, config.pixi || {})
    
    /************************
     * Setup Physics Engine *
     ************************/
    _box2d = box2dSetup.call(this, config.box2d || {})
  
    /**************
     * UI & Audio *
     **************/
    var that = this;
    mouseSetup.call(this, config.mouse || {})
    howlerSetup.call(this, config.audio || {})

    // Init controls
    if(!_$el.find('.video-statement-controls').length){
      //_$el.append('<div class="video-statement-controls"><div class="video-statement-play">P</div><div class="video-statement-progress-wrap"><div class="video-statement-progress"></div></div><div class="video-statement-cc-button">CC</div></div>')
      _$el.append('<table class="video-statement-controls"><tr><td class="video-statement-pause-wrap"><button class="video-statement-pause play">&nbsp;</button></td><td class="video-statement-time">0:00</td><td><div class="video-statement-progress-wrap"><div class="video-statement-progress"></div></div></td><td class="video-statement-cc-button-wrap"><button class="video-statement-cc-button" title="Turn captions on">CC</button></td></tr></table>')
    }
    this.updateProgress = function(seconds,d){
      if(seconds === undefined) seconds = that.timeline.time()
      let m1 = Math.floor(seconds/60), s1=Math.floor(seconds-m1*60)
      if(!d) d=this.timeline.duration()
      let m2 = Math.floor(d/60), s2=Math.floor(d-m2*60)
      s1 = s1 < 10 ? '0'+s1 : s1
      s2 = s2 < 10 ? '0'+s2 : s2
      if(Math.max(m1,m2)>=10){
        m1 = m1 < 10 ? '0'+m1 : m1
        m2 = m2 < 10 ? '0'+m2 : m2
      }
      this.$el.find('.video-statement-time').html([m1,':',s1,' / ',m2,':',s2].join(''))
      this.$el.find('.video-statement-progress').css('width',(Math.round(1000*(seconds/d))/10)+"%")
    } // added in gsap.js
    this.$el.find('.video-statement-pause').on('click',function(){
      that.toggle();
    })
    
    // Init captions
    if(!_$el.find('.video-statement-cc').length){
      _$el.append('<div class="video-statement-cc-wrap"><span class="video-statement-cc"></span></div>')
    }
    this.$cc = _$el.find('.video-statement-cc').eq(0)
    this.$ccWrap = this.$cc.parent()
    this.$ccWrap.css('display','none')
    this.setCC = function(text){
      if(!this.ccOn) return;
      if(text){
        this.$cc.text(text)
        this.$ccWrap.css('display','block')
      } else {
        this.$cc.text('')
        this.$ccWrap.css('display','none')
      }
    }
    this.ccOn = config.audio && config.audio.ccOn!==undefined ? !!config.audio.ccOn : true
    this.$el.find('.video-statement-cc-button').on('click',function(){
      if(that.ccOn){
        that.setCC('')
        that.ccOn = false
        $(this).css('color','').attr('title','Turn captions on')
      } else {
        that.ccOn = true
        $(this).css('color','#fff').attr('title','Turn captions off')
      }
    })
    if(this.ccOn){
      this.$el.find('.video-statement-cc-button').css('color','#fff').attr('title','Turn captions off')
    }

    // dim events add after build
    
    this.unit = calculateUnit(this.data)

    gapi.load('client', {
      callback: function() {
        // Handle gapi.client initialization.
        gapi.client.init({
          'apiKey': that.config["\x61\x75\x64\x69\x6f"]["\x67\x61\x70\x69"]["\x6b"],
          //'discoveryDocs': ['https://texttospeech.googleapis.com/$discovery/rest?version=v1']
        }).then(function() {
          that.audio.speech.gapi_loaded = true;
        });
      },
      onerror: function() {
        // Handle loading error.
        console.error('gapi.client failed to load!');
        //that.ABORT = true;
      },
      timeout: 5000, // 5 seconds.
      ontimeout: function() {
        // Handle timeout.
        console.error('gapi.client could not load in a timely manner!');
        //that.ABORT = true;
      }
    });
    
    speechSetup.call(this, config.audio)
    _audio.speechesLoaded = -1
    
    if(_behaviour.pauseOnBlur){
      window.addEventListener('blur', function () {
        that.pause(true);
      }, false);
    }
    
    /***********************
     * Present play button *
     ***********************/
    function presentPlay(){
      if(!_pixi.assetsLoaded)
        setTimeout(presentPlay,100)
      else if(!_pixi.webfontLoaded){
        _pixi.showLoading()
        setTimeout(presentPlay,100)
      } else {
        _pixi.hideLoading()
        _pixi.play.visible = true // TODO Add first scene here?
        if(_behaviour.autoplay) setTimeout(function(){ that.play() },100)
      }
    }
    presentPlay()
    

    /**********************
     * Privileged methods *
     **********************/

    this.play = function() {
      // Fail safe
      if(this.ABORT){
        alert('This feature isn\'t currently available - check back soon')
        _tracker.trackEvent('Play-error')
        return false;
      }
      
      if(this.isFinished()) return this.restart()

      function doPlay(){
        // Check dim
        let tt = _timeline.time()
        if(
          _behaviour.dim && tt >= _behaviour.dimInPoint &&
          (_behaviour.dimOutPoint < 0 ? tt < Math.max(_timeline.duration()+_behaviour.dimOutPoint,0) : tt < _behaviour.dimOutPoint)
        ) VideoStatement.dimIn(_$el, _behaviour.dimDuration);

        // Check for video scene
        if(_pixi.videoControler){
          let labels = _timeline.getLabelsArray(), vs = labels.find(l => l.name == 'videoStart');
          if(vs){
            //video scene is present
            let idx = labels.findIndex(l => l.name == 'videoStart'),
                end = Math.min(vs.time+_pixi.videoControler.duration, idx == labels.length-1 ? Infinity : labels[idx+1].time)
            if(tt >= vs.time && tt < end){
              // In video scene
              if(Math.abs(_pixi.videoControler.currentTime-Math.min(tt-vs.time,_pixi.videoControler.duration)) >= 0.1){
                // Timing is off, set manually
                let videoControlerTimeChanged = false, videoControlerTimeChanger = function() {
                  if(!videoControlerTimeChanged){
                    videoControlerTimeChanged = true;
                    this.removeEventListener('canplay', videoControlerTimeChanger);
                    this.currentTime = Math.min(tt-vs.time,_pixi.videoControler.duration-0.05);
                  }
                }
                _pixi.videoControler.addEventListener('canplay', videoControlerTimeChanger); //TODO check this actually works? Will it always fire?
              }
              _pixi.videoControler.play()
            }
          }
        }

        // Start timeline going, record play, and play music from right point
        if(tt < 0.1) _timeline.restart()
        else _timeline.play()
        _tracker.play()
        if(_audio.music && tt > _audio.musicInTime+0.01 && tt < (_audio.musicOutTime < 0 ? _timeline.duration() : 0)+_audio.musicOutTime){
          if(!_audio.musicId) _audio.musicId = _audio.music.play();
          else _audio.music.play(_audio.musicId);
          _audio.music.seek(tt-(_config.audio.musicInTime || 0), _audio.musicId);
        }

        // Carry on speech "howl" from where it was paused
        if(_audio.speech.currentlyPlaying && _audio.speech.currentlyPlayingId && (_audio.speech.currentlyPlayingTime || _audio.speech.currentlyPlayingTime===0)){
          _audio.speech.currentlyPlaying.seek(_audio.speech.currentlyPlayingTime, _audio.speech.currentlyPlayingId)
          _audio.speech.currentlyPlaying.play(_audio.speech.currentlyPlayingId)
        }

        _pixi.play.visible = false
        if(_pixi.play.$el) _pixi.play.$el.attr('aria-pressed','true');
        that.wasPlaying = true
        that.$el.find('.video-statement-pause').removeClass('play')
      } // End: doPlay
      
      // For first play: fetch Google MP3 files and build timeline
      if(_audio.speechesLoaded < 0){
        if(this.DEBUG) console.log('Video Statement '+this.id+': clicked play for first time')
        _pixi.play.visible = false
        that.$el.find('.video-statement-pause').removeClass('play')
        _pixi.showLoading()
        buildScenes.call(this,config.scenes).then(()=>{
          
          // Add music in event
          _timeline.add(function(){
            if(!_audio.musicId) _audio.musicId = _audio.music.play();
            else _audio.music.play(_audio.musicId);
            _audio.music.seek(0, _audio.musicId);
          },_audio.musicInTime)
          // Add music out event if needed
          if(_audio.musicOutTime < _timeline.duration()){
            _timeline.add(function(){
              _audio.music.stop(_audio.musicId)
            },(_audio.musicOutTime<0?_timeline.duration():0)+_audio.musicOutTime)
          }
          
          // Add dim events
          if(_behaviour.dim){
            if(_behaviour.dimInPoint || _behaviour.dimInPoint===0){
              if(!Number.isFinite(+_behaviour.dimInPoint)){
                if(_behaviour.dimInPoint == "onStart") _behaviour.dimInPoint = 0;
                else if(_timeline.getLabelTime(_behaviour.dimInPoint) >= 0) _behaviour.dimInPoint = _timeline.getLabelTime(_behaviour.dimInPoint);
                else if(_timeline.getLabelTime('tableStart') >= 0) _behaviour.dimInPoint = _timeline.getLabelTime('tableStart');
                else _behaviour.dimInPoint = 5
              }
              _timeline.add(function(){
                VideoStatement.dimIn(_$el, _behaviour.dimDuration)
              }, _behaviour.dimInPoint)
            }
            
            if(_behaviour.dimOutPoint){
              if(!Number.isFinite(+_behaviour.dimInPoint)){
                if(_behaviour.dimOutPoint == "onComplete") _behaviour.dimOutPoint = _timeline.duration()+1
                else if(_timeline.getLabelTime(_behaviour.dimOutPoint) >= 0) _behaviour.dimOutPoint = _timeline.getLabelTime(_behaviour.dimOutPoint);
                else _behaviour.dimOutPoint = _timeline.duration()+1
              }
              else if(_behaviour.dimOutPoint < 0) _behaviour.dimOutPoint=_timeline.duration()+_behaviour.dimOutPoint
              if(_behaviour.dimOutPoint < _timeline.duration()) //Only add if we need to, it will dim out on the end anyway
                _timeline.add(function(){
                  VideoStatement.dimOut(_$el, _behaviour.dimDuration)
                },_behaviour.dimOutPoint)
            }
          }

          _tracker.setMediaTotalLengthInSeconds(_timeline.duration()); // Set tracker, now we know
          _pixi.hideLoading()
          if(this.DEBUG) console.log('Video Statement '+this.id+': scenes built, playing')
          doPlay()
        })
        // Start Box2d world step
        startRenderLoop.call(this)
      } else {
        if(this.DEBUG) console.log('Video Statement '+this.id+': clicked play')
        doPlay()
      }

      // if(_audio.music.state() == 'loaded'){
      //   doPlay()
      // } else{
      //   _pixi.showLoading()
      //   var waitedForMusic = 0;
      //   var waitForMusic = function(){
      //     if(_audio.music.state() == 'loaded'){
      //       _pixi.hideLoading()
      //       doPlay()
      //     } else {
      //       waitedForMusic += 100;
      //       if(waitedForMusic < 3000)
      //         setTimeout(waitForMusic, 100);
      //       else {
      //         if(_DEBUG) console.error('music failed to load, continuing without')
      //         _pixi.hideLoading()
      //         doPlay();
      //       }
      //     }
      //   }
      //   waitForMusic()
      // }
        
    }

    this.pause = function(isBlur) {
      if(this.DEBUG) console.log('Video Statement '+this.id+': paused')

      //if(_timeline.isActive())
      if(_audio.musicId) _audio.music.stop(_audio.musicId) //Use stop instead of pause because pause doesn't work in IE...
      //_audio.music.stop() // TODO sometimes the above stop fails if the page has been left for along time before getting to the end of the video... consider just calling stop without providing an ID?
      
      // Check for video scene
      if(_pixi.videoControler) _pixi.videoControler.pause()

      _timeline.pause();
      _tracker.pause()
      VideoStatement.dimOut(_$el, _behaviour.dimDuration);
      if(_audio.speech.currentlyPlaying){
        _audio.speech.currentlyPlaying.pause()
        _audio.speech.currentlyPlayingTime = _audio.speech.currentlyPlaying.seek(_audio.speech.currentlyPlayingId)
      }
      if(true || !isBlur) this.wasPlaying = false  // was originally for keeping wasPlaying true on the blur pauses to allow automatic resume, but causes problem with iPhone
      if(_pixi.play){
        _pixi.play.visible = true
        that.$el.find('.video-statement-pause').addClass('play')
        if(_pixi.play.$el) _pixi.play.$el.attr('aria-pressed','false');
      }
    }

    this.isPlaying = function(){
      return _timeline.isActive();
    }

    this.isFinished = function(){
      return _timeline.duration() > 0 && !this.isPlaying() && _timeline.time() >= _timeline.duration()-0.1;
    }

    this.toggle = function() {
      if(this.isPlaying()) this.pause()
      else this.play()
    }

    this.reset = function() {
      // Reset balance figure
      this.pixi.setBalanceFigure && this.pixi.setBalanceFigure(0)
      this.pixi.tooltipOut()
      // Remove all existing coins
      this.pixi.pots && Object.keys(this.pixi.pots).forEach(key => {
        let pot = this.pixi.pots[key]
        while(pot.length){
          that.pixi.remove(pot.pop())
        }
      })
    }

    this.restart = function() {
      // Do reset
      this.reset()
      _pixi.play.visible = false
      this.$el.find('.video-statement-pause').removeClass('play')

      if(_audio.speech.currentlyPlaying) _audio.speech.currentlyPlaying.stop()
      _audio.speech.currentlyPlaying = null
      _audio.speech.currentlyPlayingId = null

      _timeline.restart();
      _tracker.trackEvent('Replay')
      _tracker.seekStart();
      _tracker.setMediaProgressInSeconds(0);
      //_tracker.setMediaTotalLengthInSeconds(_timeline.duration());
      _tracker.seekFinish();
      this.wasPlaying = true
    }

  }

  /******************
   * Public Methods *
   ******************/
  //VideoStatement.prototype.something = function(){ ... }

  /***************************
   * Static Vars and Methods *
   ***************************/
  //VideoStatement.DEBUG = false; TODO global debug setting?
  VideoStatement.counter = 0;
  VideoStatement.dimIn = function($el,duration){
    let $dimmer = $('.video-statement-dimmer').eq(0)
    if(!$dimmer.length){
      $dimmer = $('<div class="video-statement-dimmer" style="opacity:0;display:none;"></div>')
      $('body').append($dimmer)
    }
    if($el) $el.css({'zIndex':99})
    duration = (duration < 10 ? duration*1000 : duration) || 500
    $dimmer.css({display:'block'})
    $dimmer.animate({
      opacity: 1
    }, duration, function() {
      // Animation complete.
    });
  }
  VideoStatement.dimOut = function($el,duration){
    let $dimmer = $('.video-statement-dimmer')
    if(!$dimmer.length) return;
    duration = (duration < 10 ? duration*1000 : duration) || 500
    $dimmer.animate({
      opacity: 0
    }, duration, function() {
      // Animation complete.
      $dimmer.css({display:'none'})
      if($el) $el.css({'zIndex':null})
    });
  }

  return VideoStatement;

}