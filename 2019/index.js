import "@babel/polyfill";

import './scripts/utils'
import './scripts/k'
import { matomoSetup } from './scripts/matomoSetup'
import { pixiSetup } from './scripts/pixiSetup'
import { b2Setup } from './scripts/b2Setup'
import { mouseSetup } from './scripts/mouseSetup'
import { howlSetup } from './scripts/howlSetup'
//import { speechSetup } from './scripts/speechSetup' Moved to on play click
import { makeUI } from './scripts/ui'

import { titleOut } from './scripts/scenes/titleOut'

// Global variables
window.VBS = window.VBS || {},
window.VBS.$el = $('#panelBodyPNL_BENSTAT_ANIM .anim-wrap'),
window.VBS.user = {},
window.VBS.timeline = {},
window.VBS.speech = {},
window.VBS.pots = {
  start: [],
  transfers: [],
  contsEe: [],
  contsEr: [],
  return: [],
  charges: []
},
window.VBS.scrubbingDir = 0
window.VBS.DEBUG = document.location.href.indexOf('debug') > -1

window.VBS.init = function () {

  /***************
   * Test inputs *
   ***************/
  let name = prompt('Name', 'Matthew'),
    scheme = prompt('Scheme Code', '0001'),
    cat = prompt('Category Code', '1001'),
    startBalance = parseFloat(prompt('Opening Balance', 21971)),
    bulkTransfers = parseFloat(prompt('Bulk Transfers', 0)),
    transfers = parseFloat(prompt('Transfers', 0)),
    contsEe = parseFloat(prompt('Conts EE', 456)),
    contsEr = parseFloat(prompt('Conts ER', 3432)),
    returns = parseFloat(prompt('Return', 1562)),
    charges = parseFloat(prompt('Charges', -119)),
    lsAge = parseInt(prompt('LifeSight Age', 66)),
    beneNeeded = confirm('Beneficiaries still needed?');

  name = name || 'Matthew'
  scheme = parseInt(scheme)
  scheme = scheme && scheme >= 0 && scheme < 9 ? scheme : 1
  cat = parseInt(cat)
  cat = cat && cat >= 0 && cat < 9999 ? cat : 5001
  startBalance = isFinite(startBalance) && startBalance > 0 && startBalance < 1000000 ? startBalance : 0
  transfers = isFinite(transfers) && transfers > 0 && transfers < 1000000 ? transfers : 0
  contsEe = isFinite(contsEe) && contsEe > 0 && contsEe < 1000000 ? contsEe : 0
  contsEr = isFinite(contsEr) && contsEr > 0 && contsEr < 1000000 ? contsEr : 0
  returns = isFinite(returns) && Math.abs(returns) < startBalance+transfers+contsEe+contsEr ? returns : 0
  charges = isFinite(charges) && charges < 0 && charges > -1*(startBalance+transfers+contsEe+contsEr+returns) ? charges : 0
  lsAge = isFinite(lsAge) && lsAge > 54 && lsAge < 100 ? lsAge : '?';
  let endBalance = startBalance+transfers+contsEe+contsEr+returns+charges
  
  $('.summary-bar h2 a[href="/my-lifesight-account/my-details/"]').eq(0).text(name)
  if(scheme == 1){
    $('.nav .scheme0005 img').attr('src','http://teamue.com/wp-content/uploads/2015/11/Company-Logo-Placeholder.jpg').css('height','75px').parent().css('padding','0px 14px');
    $('#headerContainer .scheme0005 img').attr('src','http://teamue.com/wp-content/uploads/2015/11/Company-Logo-Placeholder.jpg');
  } else if(scheme != 5){
    $('.nav .scheme0005').hide()
    $('#headerContainer .scheme0005').hide()
  }
  $('.summary-bar h2 a[href="/my-lifesight-account/"]').eq(0).text('£'+(endBalance*(1.1+Math.random()*0.05)).toFixedCommas(2))
  $('.summary-bar h2 a[href="/my-lifesight-account/my-lifesight-age/"]').eq(0).html('<span id="LS_AGE_BAR">'+(lsAge ? lsAge : '?')+'</span> years old')
  $('.lifeSight-age').html((lsAge ? lsAge : '?')+' <p>years old</p>')
  if(beneNeeded && $("#panelBodyPNL_ENGJMNT_TRACKER a[href='/my-lifesight-account/my-beneficiaries/']").children().eq(0).attr('aria-valuenow') !== '0%'){
    $("#panelBodyPNL_ENGJMNT_TRACKER a[href='/my-lifesight-account/my-beneficiaries/']").children().eq(0).attr('aria-valuenow','0%')
    $("#progress4").css('maxWidth','0%')
  } else if($("#panelBodyPNL_ENGJMNT_TRACKER a[href='/my-lifesight-account/my-beneficiaries/']").children().eq(0).attr('aria-valuenow') === '0%'){
    $("#panelBodyPNL_ENGJMNT_TRACKER a[href='/my-lifesight-account/my-beneficiaries/']").children().eq(0).attr('aria-valuenow','100%')
    $("#progress4").css('maxWidth','100%')
  }

  [scheme,cat,name,'06/04/2018',startBalance,bulkTransfers,transfers,0,contsEe,contsEr,returns,charges,endBalance,'05/04/2019'].forEach((v,i,arr)=>{
    window.VBS.$el.find('.anim-data-table tbody tr').eq(i).children().eq(1).find('span').html(v)
  })

  /*****************
   * Get User Info *
   *****************/
  let dataItems = Array.from(window.VBS.$el.find('.anim-data-table tr').slice(1)).map((n,i,arr)=>{
      return {
        label: $(n).children().eq(0).find('span').text(),
        data: $(n).children().eq(1).find('span').text(),
        idx: i
      }
    }),
    getDataItem = function(label, idx){
      let filtered = dataItems.filter((o,i,arr) => o.label.toLowerCase() == label.toString().toLowerCase())
      if(label && filtered.length)
        return filtered[0].data
      else if(idx !== undefined){
        filtered = dataItems.filter((o,i,arr) => o.idx == idx)
        if(filtered.length)
          return filtered[0].data
      }
      return ''
    },
    schemeNum = parseInt(getDataItem('Scheme code',0)) || 0,
    employers = ["Acme Corp", "Company Name", "Goldman Sachs", "Santander", "Aspen", "Willis Towers Watson", "Carillion", "Canada Life", "Northumbrian Water"];
  VBS.user = {
    //"RefNo": $('.refno').text() &&  $('.refno').text().split(':').length > 1 ? $('.refno').text().split(':')[1].trim() : '',
    "Forename": getDataItem('Member name',2).trim(),
    "Scheme": schemeNum,
    "Employer": isFinite(schemeNum) && schemeNum >= 0 && schemeNum < employers.length ? employers[schemeNum] : employers[0],
    "Category": getDataItem('Category code',1).trim(),
    "StartDate": new Date(getDataItem('Start date',3).replace( /(\d{2})\/(\d{2})\/(\d{2,4})/, "$2/$1/$3")),
    "EndDate": new Date(getDataItem('End date',13).replace( /(\d{2})\/(\d{2})\/(\d{2,4})/, "$2/$1/$3")),
    "StartBalance": parseFloat(getDataItem('Start balance',4).replace(',','')),
    "Transfers": parseFloat(getDataItem('Bulk transfers',5).replace(',',''))+parseFloat(getDataItem('Transfers',6).replace(',','')),
    "Withdrawals": parseFloat(getDataItem('Withdrawals',7).replace(',','')),
    "ContributionsEE": parseFloat(getDataItem('Employee contributions',8).replace(',','')),
    "ContributionsER": parseFloat(getDataItem('Employer contributions',9).replace(',','')),
    "Return": parseFloat(getDataItem('Investment return',10).replace(',','')),
    "Charges": parseFloat(getDataItem('Charges',11).replace(',','')),
    "EndBalance": parseFloat(getDataItem('End balance',12).replace(',','')),
    "Beneficiaries": $("#panelBodyPNL_ENGJMNT_TRACKER a[href='/my-lifesight-account/my-beneficiaries/']").children().length ? parseInt($("#panelBodyPNL_ENGJMNT_TRACKER a[href='/my-lifesight-account/my-beneficiaries/']").children().eq(0).attr('aria-valuenow')) : NaN,
    "Balance": $(".summary-bar .column-2 h2 a").length ? parseInt($(".summary-bar .column-2 h2 a").text().trim().replace(/[^\d\.]/g,'')) : NaN
  }
  //VBS.user["EndBalance"] = VBS.user["StartBalance"]+VBS.user["Transfers"]+VBS.user["Withdrawals"]+VBS.user["ContributionsEE"]+VBS.user["ContributionsER"]+VBS.user["Return"]+VBS.user["Charges"]
  //VBS.user["Forename"] = VBS.user['Forename'].split(' ').map(word => word[0].toUpperCase()+word.substring(1).toLowerCase()).join('')
  VBS.user["Possessive"] = VBS.user['Forename']+'\''+(VBS.user['Forename'][VBS.user['Forename'].length-1] == 's' ? '' : 's')
  VBS.user["BenStatLink"] = (VBS.$el.find('.related-links a') || VBS.$el.find('a')).attr('href')
  /* Moved to on play click
  if($('#LS_AGE_ACTUAL').text())
    VBS.user["LSAge"] = $('#LS_AGE_ACTUAL').text()
  else if($('#LS_AGE_BAR').text())
    VBS.user["LSAge"] = $('#LS_AGE_BAR').text()
  else
    VBS.user["LSAge"] = $('.lifeSight-age').text().replace($('.lifeSight-age p').text() ? $('.lifeSight-age p').text() : 'years old', '').trim()*/
  if(dataItems.map(itm => itm.data).some(data => data.trim().toLowerCase() === 'none'))
    VBS.ABORT = true;
  calcSquareUnit()

  /**************
   * Setup GSAP *
   **************/
  VBS.timeline = new TimelineMax({
    id: "Master",
    paused: true
  })
  //GSDevTools.create({paused:true, id:"Master Dev"})

  /*****************
   * Setup tracker *
   *****************/
  matomoSetup()
  
  /******************
   * Setup Graphics *
   ******************/
  pixiSetup()
  
  /************************
   * Setup Physics Engine *
   ************************/
  b2Setup()

  /**************
   * UI & Audio *
   **************/
  mouseSetup()
  howlSetup()
  gapi.load('client', {
    callback: function() {
      // Handle gapi.client initialization.
      gapi.client.init({
        'apiKey': VBS['K1']+'-'+VBS['K2']+'_0_'+VBS['K3'],
        //'discoveryDocs': ['https://texttospeech.googleapis.com/$discovery/rest?version=v1']
      }).then(function() {
        VBS.speech.gapi_loaded = true;
      });
    },
    onerror: function() {
      // Handle loading error.
      console.error('gapi.client failed to load!');
    },
    timeout: 5000, // 5 seconds.
    ontimeout: function() {
      // Handle timeout.
      console.error('gapi.client could not load in a timely manner!');
    }
  });
  //speechSetup() Moved to on play click
  window.VBS.speech = VBS.speech || {}
  window.VBS.speech.speechesLoaded = -1
  makeUI()

  /***********************
   * Present play button *
   ***********************/
  function presentPlay(){
    if(!window.VBS.pixi.assetsLoaded){
      setTimeout(presentPlay,100)
      return false
    }
    VBS.timeline.add(titleOut()) // Show logo on screen, only scene that's pre-loaded
    VBS.$el.find('.anim-loading').hide()
    VBS.$el.find('.anim-play').show()
  }
  presentPlay()
  
  // =============================================
  // Square size distribution
  // =============================================

  function calcSquareUnit(){
    // balance = Math.abs(balance)
    // if(Math.round(balance) == 0) return 0
    // if(balance<100) return 1
    // if(balance<250) return 2
    // if(balance<500) return 3
    // if(balance<750) return 4
    // if(balance<1000) return 5
    // return Math.round(Math.sqrt(balance)/5)
    let balance = Math.max(VBS.user['StartBalance'],VBS.user['EndBalance'])
    let sum = VBS.user['StartBalance']+Math.max(VBS.user['Transfers'],0)+VBS.user['ContributionsEE']+VBS.user['ContributionsER']+Math.max(VBS.user['Return'],0)
    let denom = sum > 1000000 ? 180 : sum < 100000 ? 100 : Math.round(100+(1-(1000000-sum)/900000)*80)
    VBS.unit = Math.ceil(sum/denom)
    return Math.ceil(balance/VBS.unit)
  }

  // Box–Muller transform
  function rand_bm(min, max, skew) {
    let u = 0, v = 0;
    skew = skew ? skew : 1
    while (u === 0) u = Math.random(); //Converting [0,1) to (0,1)
    while (v === 0) v = Math.random(); //Since log(0) undefined
    let num = Math.sqrt(-2.0 * Math.log(u)) * Math.cos(2.0 * Math.PI * v);

    num = num / 10.0 + 0.5; // Translate to 0 -> 1
    if (num > 1 || num < 0) num = randn_bm(min, max, skew); // resample between 0 and 1 if out of range
    num = Math.pow(num, skew); // Skew
    num *= max - min; // Stretch to fill range
    num += min; // offset to min
    return num;
  }

}
document.addEventListener("DOMContentLoaded",window.VBS.init)

