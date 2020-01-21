import * as Joi from 'joi-browser';

/**
 * Prototype additions
 */

String.prototype.toTitleCase = function () {
  return this.replace(/\b\w+/g, function (txt) { return txt.charAt(0).toUpperCase() + txt.substr(1).toLowerCase(); });
};
String.prototype.toCamelCase = function () {
  return this.replace(/[^a-z ]/ig, '').trim().toLowerCase().replace(/(?:^\w|\b\w|\s+)/g, function (m,i) {
    return +m === 0 ? "" : (i == 0 ? m.toLowerCase() : m.toUpperCase())
  });
};

Date.prototype.toFormattedString = function(addTh){
  let months = [
    "January", "February", "March",
    "April", "May", "June", "July",
    "August", "September", "October",
    "November", "December"
  ];
  let day = this.getDate(),
    monthIndex = this.getMonth(),
    year = this.getFullYear();
  let th = 'th';
  if(day == 1 || day == 21 || day == 31)
    th = 'st'
  else if(day == 2 || day == 22)
    th = 'nd'
  else if(day == 3 || day == 23)
    th = 'rd'
  return day + (addTh ? th : '') + ' ' + months[monthIndex] + ' ' + year;
}

if (Number.isFinite === undefined) Number.isFinite = function(value) {
  return typeof value === 'number' && isFinite(value);
}

Number.prototype.toFixedCommas = function (num) {
  if(num === undefined)
    num = this != 0 && Math.abs(this) < 1 ? 2 : 0; 
  if(num == 0)
    return this.toFixed(0).replace(/\B(?=(\d{3})+(?!\d))/g, ",");
  else
    return (Math.floor(this)+"").replace(/\B(?=(\d{3})+(?!\d))/g, ",")+(this - Math.floor(this)).toFixed(num).replace('0.','.');
}

/**
 * DOM functions
 */

export function getjQueryElement(input,single=true) {
  if(!input) return null
  if(input instanceof HTMLElement || input instanceof SVGElement || (typeof input === 'string' && $(input).length > 0))
    return single ? $(input).eq(0) : $(input)
  else if(typeof input === 'string' && input.indexOf(' ') < 0 && $('#'+input).length > 0)
    return single ? $('#'+input).eq(0) : $('#'+input)
  else if(input instanceof jQuery && input.length > 0)
    return single ? input.eq(0) : input
  else return null
}

export function parseTable(tbl){
  let $tbl = getjQueryElement(tbl)
  let obj = {}, repeated = false
  $tbl.each((i,t)=>{
    Array.from($(t).find('> tbody tr')).forEach((tr,i,arr)=>{
      let key = $(tr).children().eq(0).find('span').text().toCamelCase(),
          val = $(tr).children().eq(1).find('span').text().trim()
      if(repeated || obj[key] !== undefined){
        if(!repeated) repeated = key
        return
      }
      obj[key] = val==='' || ['schemeCode','category'].includes(key) || !Number.isFinite(+val) ? val : parseFloat(val)
    })
  })
  if(obj.balance === '') obj.balance = -1
  if(repeated){
    console.error('InputError: label `'+key+'` is repeated in the data table')
    return false
  }
  return obj
}


/**
 * Joi Validation
 */

var userSchema = Joi.object().keys({
    schemeCode: Joi.string().trim().min(2).regex(/\s/,{invert:true,name:'contains a space'}).empty(['false','None']),
    memberName: Joi.string().trim().min(2).regex(/\d/,{invert:true,name:'contains a number'}).invalid(['false','None']).required(),
    forename: Joi.string().trim().min(2).regex(/\d/,{invert:true,name:'contains a number'}).empty(['false','None']),
    possessive: Joi.string().trim().min(2).regex(/\d/,{invert:true,name:'contains a number'}).empty(['false','None']),
    employer: Joi.string().trim().empty(['','false','None']),
    employerPossessive: Joi.string().trim().empty(['','false','None']),
    category: Joi.string().trim().regex(/\s/,{invert:true,name:'contains a space'}).empty(['false','None']),
    beneficiaries: Joi.boolean().truthy([1,'1',100,'100','Y','y','Yes','yes','true']).falsy([0,'0',-1,'-1',75,'75',50,'50',25,'25','N','n','No','no','false']),
    balance: Joi.number().min(-1)
  }).required().label('user'),

  dataSchema = Joi.object().keys({
    startDate: Joi.date().max('now').required(),
    endDate: Joi.date().greater(Joi.ref('startDate')).required(),
    startBalance: Joi.number().min(0).required(),
    bulkTransfers: Joi.number().min(0).required(),
    transfers: Joi.number().min(0).required(),
    withdrawals: Joi.number().max(0).required(),
    employeeContributions: Joi.number().min(0).required(),
    employerContributions: Joi.number().min(0).required(),
    investmentReturn: Joi.number().required(),
    charges: Joi.number().max(0).required(),
    endBalance: Joi.number().min(0).required(),
    benefitStatementUrl: Joi.string().trim().empty(['','false','None'])
  }).required().label('data');

/*export function checkUser(user,debug) {
  const result = Joi.validate(user,userSchema)
  if(result.error){
    console.error(result.error)
    return false
  }
  if(debug){
    let warn = ['employer','category','beneficiaries','balance'], missing = []
    for(let prop of warn){
      if(!result.value[prop]) missing.push(prop)
    }
    if(missing.length) console.warn('ValidationWarning: missing ['+missing.join(', ')+'] on user')
  }
  return result.value
}

export function checkData(data,debug) {
  const result = Joi.validate(data,dataSchema)
  if(result.error){
    console.error(result.error)
    return false
  }
  let sumProps = ['startBalance','transfers','contributionsEE','contributionsER'],
    sum = sumProps.reduce((val, prop, i, array)=>{
      return val+Math.max(result.value[prop],0)
    },0)
  if(Math.abs(result.value.return) > sum){
    console.error('ValidationError: return is greater than the sum of the parts that could make it up, check data.')
    return false
  }
  sumProps = ['startBalance','transfers','withdrawals','contributionsEE','contributionsER','return','charges']
  sum = sumProps.reduce((val, prop, i, array)=>{
      return val+result.value[prop]
  },0)
  if(result.value.endBalance != sum){
    if(debug) console.warn('ValidationWarning: endBalance is not the sum of its parts, overwriting passed value ['+Math.round(result.value.endBalance)+'] with sum of parts ['+Math.round(sum)+']')
    result.value.endBalance = sum
  }
  if(!result.value.benefitStatementUrl && debug) console.warn('ValidationWarning: missing [benefitStatementUrl] on data')
  return result.value
}*/

var userDataSchema = userSchema.concat(dataSchema)

export function checkUserData(userdata,debug) {
  //Swap dd/mm/yyyy to mm/dd/yyyy for Javascript Date object
  let sd = userdata.startDate.split(/\b/).map(Number).filter(n => !!n),
      ed = userdata.endDate.split(/\b/).map(Number).filter(n => !!n)
  if(sd.length!=3 || ed.length!=3){
    console.error('ValidationError: could not parse start/end date formats, please use "dd/mm/yyyy".')
    return false
  }
  if(sd[1]<13)
    userdata.startDate = sd[1]+"/"+sd[0]+"/"+sd[2]
  if(ed[1]<13)
    userdata.endDate = ed[1]+"/"+ed[0]+"/"+ed[2]

  const result = Joi.validate(userdata,userDataSchema)
  if(result.error){
    console.error(result.error)
    return false
  }
  if(debug){
    let warn = ['schemeCode','employer','category','beneficiaries','balance'], missing = []
    for(let prop of warn){
      if(!result.value[prop]) missing.push(prop)
    }
    if(missing.length) console.warn('ValidationWarning: missing ['+missing.join(', ')+'] on user')
  }
  let sumProps = ['startBalance','bulkTransfers','transfers','employeeContributions','employerContributions'],
    sum = sumProps.reduce((val, prop, i, array)=>{
      return val+Math.max(result.value[prop],0)
    },0)
  if(Math.abs(result.value.investmentReturn) > sum){
    console.error('ValidationWarning: investment return provided is greater than the sum of the parts (>100%), please check.')
  }
  sumProps = ['startBalance','bulkTransfers','transfers','withdrawals','employeeContributions','employerContributions','investmentReturn','charges']
  sum = sumProps.reduce((val, prop, i, array)=>{
      return val+result.value[prop]
  },0)
  if(result.value.endBalance != sum){
    console.warn('ValidationWarning: endBalance is not the sum of its parts, overwriting passed value ['+Math.round(result.value.endBalance)+'] with sum of parts ['+Math.round(sum)+']')
    result.value.endBalance = sum
  }
  if(!result.value.benefitStatementUrl && debug) console.warn('ValidationWarning: missing [benefitStatementUrl] on data')
  return result.value
}

//Unit
export function calculateUnit(data){
  let balance = Math.max(data.startBalance,data.endBalance),
    maxOnScreen = data.startBalance+Math.max(data.bulkTransfers,0)+Math.max(data.transfers,0)+data.employeeContributions+data.employerContributions+Math.max(data.investmentReturn,0),
    numSquares = maxOnScreen > 1000000 ? 180 : maxOnScreen < 100000 ? 100 : Math.round(100+(1-(1000000-maxOnScreen)/900000)*80)
  return Math.max(Math.ceil(balance/numSquares),1)
}

export function niceRound(num, incWord, currencySymbol){
  let rounded = Math.abs(num)
  if (rounded > 995000) rounded = Math.round(rounded / 5000) * 5000
  else if (rounded > 9500) rounded = Math.round(rounded / 1000) * 1000
  else if (rounded > 950) rounded = Math.round(rounded / 100) * 100
  else if (rounded > 95) rounded = Math.round(rounded / 10) * 10
  let word = ''
  if (incWord) {
    let under = ['almost ', 'nearly ']
    word = Math.abs(num) > 100 ? (rounded < Math.abs(num) ? 'over ' : (rounded > Math.abs(num) ? under[Math.floor(Math.random() * under.length)] : 'exactly ')) : '';
  }
  return word + (currencySymbol ? currencySymbol : '') + rounded.toFixedCommas()
}

/**
 * Colors
 */

export function isHexString(str){
  return typeof str === 'string' && /^0x[A-Fa-f0-9]{1,6}|^#?[A-Fa-f0-9]{3}([A-Fa-f0-9]{3})?$/.test(str)
}

export function toLongHexString(str){
  if(!isHexString(str)) return false
  if(str.substr(0,2) === '0x'){
    str = str.substr(2)
    return '#'+'0'.repeat(Math.max(0,6-str.length))+str.toUpperCase()
  }
  str = str.replace('#','')
  if(str.length > 5) return '#'+str.toUpperCase()
  return '#'+(str[0].repeat(2)+str[1].repeat(2)+str[2].repeat(2)).toUpperCase()
}

export function hexToInt(input){
  return typeof input === 'number' ? Math.abs(input) : (isHexString(input) ? parseInt(toLongHexString(input).replace('#',''),16) : NaN)
}

export function isRgbString(str){
  return typeof str === 'string' && /^rgb\((\d+(?:\.\d+)?|\.\d+),(\d+(?:\.\d+)?|\.\d+),(\d+(?:\.\d+)?|\.\d+)\)$/.test(str.toLowerCase().replace(' ',''))
}
export function isRgbaString(str){
  return typeof str === 'string' && /^rgba\((?:(\d{1,3}(?:\.\d+)?|\.\d+),){3}(0(?:\.\d+)?|1(?:\.0+)?|\.\d+)\)$/.test(str.toLowerCase().replace(' ',''))
}

export function rgbToInt(input){
  if(typeof input === 'number') return input
  let matches
  if(isRgbString(input)){
    matches = input.toLowerCase().replace(' ','').match(/^rgb\((\d+(?:\.\d+)?|\.\d+),(\d+(?:\.\d+)?|\.\d+),(\d+(?:\.\d+)?|\.\d+)\)$/)
    let r = Math.round(matches[1]).toString(16), g=Math.round(matches[2]).toString(16), b=Math.round(matches[3]).toString(16)
    return parseInt(r+g+b,16)
  } else if(isRgbaString(input)){
    matches = input.toLowerCase().replace(' ','').match(/^rgba\((\d+(?:\.\d+)?|\.\d+),(\d+(?:\.\d+)?|\.\d+),(\d+(?:\.\d+)?|\.\d+),(0(?:\.\d+)?|1(?:\.0+)?|\.\d+)\)$/)
    let r = Math.round(matches[1]).toString(16), g=Math.round(matches[2]).toString(16), b=Math.round(matches[3]).toString(16) //, a=parseFloat(matches[4])
    return parseInt(r+g+b,16)
  } else return false
}

export function alphaFromRgbaString(input){
  if(isRgbaString(input)){
    matches = input.toLowerCase().replace(' ','').match(/^rgba\((\d+(?:\.\d+)?|\.\d+),(\d+(?:\.\d+)?|\.\d+),(\d+(?:\.\d+)?|\.\d+),(0(?:\.\d+)?|1(?:\.0+)?|\.\d+)\)$/)
    return parseFloat(matches[4])
  }
  if(isRgbString(input)) return 1
  return false
}

export function colorStringToInt(input){
  if(typeof input === 'number') return number
  if(isHexString(input)) return hexToInt(input)
  if(isRgbString(input) || isRgbaString(input)) return rgbToInt(input)
  return false
}

export function createLinearGradient(width, height, stops, angle, canvas) {
  canvas = (canvas ? getjQueryElement(canvas) : null) ? canvas[0] : document.createElement('canvas')
  canvas.width = width
  canvas.height = height

  angle = ((angle || 0) % 360)*Math.PI/180
  if(angle<0) angle = 2*Math.PI+angle
  let x0, y0, x1, y1,
      diagAngle = Math.atan(height/width),
      opp1, adj1, hyp2, opp2, adj2, hyp3, adj3, opp3
  if(angle <= Math.PI/2){ //TODO use cleaner formula from codepen?
    if(angle <= diagAngle){
      opp1 = Math.tan(angle) * width/2,
      hyp2 = height/2 - opp1,
      opp2 = Math.sin(angle)*hyp2,
      adj3 = Math.cos(angle)*opp2,
      opp3 = Math.sin(angle)*opp2,
      x1 = width+adj3, y1 = height/2+opp1+opp3, x0 = width-x1, y0 = height-y1
    } else {
      opp1 = Math.tan(angle) * width/2,
      hyp2 = opp1 - height/2,
      adj2 = Math.cos(angle)*hyp2,
      adj3 = Math.cos(angle)*adj2,
      opp3 = Math.sin(angle)*adj2
      x1 = width-opp3, y1 = height+adj3, x0 = width-x1, y0 = height-y1
    }
  } else if(angle <= Math.PI){
    angle = angle - Math.PI/2
    if(angle <= Math.PI/2-diagAngle){
      opp1 = Math.tan(angle) * height/2,
      hyp2 = width/2 - opp1,
      hyp3 = Math.cos(angle)*hyp2,
      adj3 = Math.cos(angle)*hyp3,
      opp3 = Math.sin(angle)*hyp3,
      x1 = adj3, y1 = height+opp3, x0 = width-x1, y0 = height-y1
    } else {
      adj1 = (width/2)/Math.tan(angle),
      hyp2 = height/2 - adj1,
      hyp3 = Math.cos(angle)*hyp2,
      adj3 = Math.cos(angle)*hyp3,
      opp3 = Math.sin(angle)*hyp3,
      x1 = -opp3, y1 = height/2+adj1+adj3, x0 = width-x1, y0 = height-y1
    }
  } else if(angle <= 3*Math.PI/2){
    angle = angle - Math.PI
    if(angle <= diagAngle){
      opp1 = Math.tan(angle) * width/2,
      hyp2 = height/2 - opp1,
      hyp3 = Math.cos(angle)*hyp2,
      adj3 = Math.cos(angle)*hyp3,
      opp3 = Math.sin(angle)*hyp3,
      x1 = -opp3, y1 = adj3, x0 = width-x1, y0 = height-y1
    } else {
      adj1 = (height/2)/Math.tan(angle),
      hyp2 = width/2 - adj1,
      hyp3 = Math.sin(angle)*hyp2,
      adj3 = Math.cos(angle)*hyp3,
      opp3 = Math.sin(angle)*hyp3,
      x1 = opp3, y1 = -adj3, x0 = width-x1, y0 = height-y1
    }
  } else {
    angle = angle - 3*Math.PI/2
    if(angle <= Math.PI/2-diagAngle){
      opp1 = Math.tan(angle) * height/2,
      hyp2 = width/2 - opp1,
      hyp3 = Math.cos(angle)*hyp2,
      adj3 = Math.cos(angle)*hyp3,
      opp3 = Math.sin(angle)*hyp3,
      x1 = width-adj3, y1 = -opp3, x0 = width-x1, y0 = height-y1
    } else {
      adj1 = (width/2)/Math.tan(angle),
      hyp2 = height/2 - adj1,
      hyp3 = Math.sin(angle)*hyp2,
      adj3 = Math.cos(angle)*hyp3,
      opp3 = Math.sin(angle)*hyp3,
      x1 = width+adj3, y1 = opp3, x0 = width-x1, y0 = height-y1
    }
  }

  let ctx = canvas.getContext('2d')
  ctx.clearRect(0, 0, canvas.width, canvas.height);
  let gradient = ctx.createLinearGradient(x0, y0, x1, y1)
  let stopPoints = Object.keys(stops)

  stopPoints.forEach((point,i,arr)=>{
    gradient.addColorStop(parseFloat(point), stops[point])
  })

  ctx.fillStyle = gradient
  ctx.fillRect(0, 0, width, height)

  return canvas
}

/**
 * Strings
 */
let defaultStrings = {
  startBalanceTable: 'Balance as at #startDate#',
  transfersTable: 'Transfers',
  withdrawalsTable: 'Withdrawals',
  employeeContributionsTable: '#possessive# contributions',
  employerContributionsTable: '#employerPossessive# contributions',
  investmentReturnTable: 'Investment return',
  chargesTable: 'Charges and fees', 
  endBalanceTable: 'Balance as at #endDate#',
  labelJar: '#possessive# Pension Account',
  startBalanceJar: 'Starting balance',
  transfersJar: 'Transferred in',
  withdrawalsJar: 'Withdrawn',
  employeeContributionsJar: '#possessive# contributions',
  employerContributionsJar: '#employerPossessive# contributions',
  investmentReturnJar: 'Investment return',
  chargesJar: 'Charges and fees',
  button: 'Open my Benefit Statement'
}
export function getString(id,that){
  let template = that && that.config && that.config.scenes && that.config.scenes[id+'String'] ? that.config.scenes[id+'String'] : (defaultStrings[id] ? defaultStrings[id] : ''),
      partsToReplace = template.split('#').filter((e,i)=>{return i%2==1})
  partsToReplace.forEach(part => {
    let replacement
    if(that.data[part]){
      if(that.data[part].toFormattedString)
        replacement = that.data[part].toFormattedString()
      else if(that.data[part].toFixedCommas)
        replacement = that.data[part].toFixedCommas(0)
      else replacement = that.data[part]
    } else if(that.user[part]){
      if(that.user[part].toFormattedString)
        replacement = that.user[part].toFormattedString()
      else if(that.user[part].toFixedCommas)
        replacement = that.user[part].toFixedCommas(0)
      else replacement = that.user[part]
    } else replacement = part
    template = template.replace('#'+part+'#',replacement)
  })
  return template
}