// Prototype additions

String.prototype.toTitleCase = function () {
  return this.replace(/\w\S*/g, function (txt) { return txt.charAt(0).toUpperCase() + txt.substr(1).toLowerCase(); });
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

$('#panelBodyPNL_BENSTAT_ANIM [role="button"]').each((i,btn) => {
  btn.addEventListener('keydown', function(evt) {
     if(evt.keyCode == 13 || evt.keyCode == 32){
        evt.preventDefault();
        btn.click();
     }
  });
});