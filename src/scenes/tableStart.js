import { colorStringToInt, getString } from '../utils.js'

export default function(config){
  // Init vars
  config = config || {}
  var {app, resources} = this.pixi, that = this
  var WIDTH = this.pixi.WIDTH, HEIGHT = this.pixi.HEIGHT;

  // Build contents table
  let rowTexts = this.pixi.tableRowTexts = [], rowRects = this.pixi.tableRowRects = []
  /*let headerTextStyle = new PIXI.TextStyle({fontFamily : ['Franklin-Gothic-Demi', 'Franklin Gothic Demi', 'Franklin Gothic Medium', 'Franklin Gothic', 'ITC Franklin Gothic', 'Arial', 'ArialMT', 'sans-serif'], fontSize: 20, fontWeight: '400', fill : 0xffffff, align : 'left'}),
      tableTextStyle = headerTextStyle.clone()
  tableTextStyle.fill = 0x575756*/
  let headerTextStyle = this.pixi.tableHeaderTextStyle = this.pixi.baseTextStyle.clone()
  if(config.tableHeaderFont && config.tableHeaderFont.length) headerTextStyle.fontFamily = config.tableHeaderFont
  headerTextStyle.fill = config.tableHeaderColor ? colorStringToInt(config.tableHeaderColor) : 0xffffff
  headerTextStyle.fontSize = config.tableHeaderFontSize ? Number(config.tableHeaderFontSize) : 20
  let tableTextStyle = this.pixi.tableTextStyle =  headerTextStyle.clone()
  if(config.tableRowFont && config.tableRowFont.length) tableTextStyle.fontFamily = config.tableRowFont
  tableTextStyle.fill = config.tableRowColor ? colorStringToInt(config.tableRowColor) : 0x575756
  tableTextStyle.fontSize = config.tableRowFontSize ? Number(config.tableRowFontSize) : 20

  rowTexts.push(new PIXI.Text(getString('startBalanceTable',that), headerTextStyle));
  if(this.data.transfers > 0)
    rowTexts.push(new PIXI.Text(getString('transfersTable',that), tableTextStyle));
  if(this.data.withdrawals < 0)
    rowTexts.push(new PIXI.Text(getString('withdrawalsTable',that), tableTextStyle));
  if(this.data.employeeContributions > 0)
    rowTexts.push(new PIXI.Text(getString('employeeContributionsTable',that), tableTextStyle));
  if(this.data.employerContributions > 0)
    rowTexts.push(new PIXI.Text(getString('employerContributionsTable',that), tableTextStyle));
  rowTexts.push(new PIXI.Text(getString('investmentReturnTable',that), tableTextStyle));
  if(this.showCharges)
    rowTexts.push(new PIXI.Text(getString('chargesTable',that), tableTextStyle));
  rowTexts.push(new PIXI.Text(getString('endBalanceTable',that), headerTextStyle));
  let fullRowHeight = ((6*HEIGHT/8)/rowTexts.length),
      rowHeight = fullRowHeight*0.8
  rowTexts.forEach((text,i) => {
      text.visible = false
      if(i==0 || i==rowTexts.length-1)
        rowRects.push(that.pixi.addRect(WIDTH/2,HEIGHT/8+i*fullRowHeight+fullRowHeight/2,30*WIDTH/32,rowHeight,config.tableHeaderBg ? colorStringToInt(config.tableHeaderBg) : this.pixi.primaryColor));
      else
        rowRects.push(that.pixi.addRect(WIDTH/2,HEIGHT/8+i*fullRowHeight+fullRowHeight/2,30*WIDTH/32,rowHeight,config.tableRowBg ? colorStringToInt(config.tableRowBg) : this.pixi.secondaryColor));
      text.position.set(WIDTH/16, HEIGHT/8+i*fullRowHeight+fullRowHeight/2-text.height/2)
      app.stage.addChild(text) //rowRects added to stage automatically in addRect
  });
  rowRects.forEach(rect => rect.visible = false);
  //this.pixi.table = {tableTextStyle, headerTextStyle, rowRects, rowTexts}

  return {
    id: 'tableStart',
    tl: function(){
        let tl = new TimelineLite({ id: "tableStart" })
        tl.from(rowRects[0], 1, {
            x: -WIDTH / 2,
        })
        tl.from(rowTexts[0], 1, {
            x: -15 * WIDTH / 16,
        }, "-=1")
        tl.from(rowRects[rowRects.length - 1], 1, {
            x: 3 * WIDTH / 2,
        }, "-=1")
        tl.from(rowTexts[rowTexts.length - 1], 1, {
            x: WIDTH + WIDTH / 16
        }, "-=1")
        let midRects = rowRects.slice(1, rowRects.length - 1),
            midTexts = rowTexts.slice(1, rowTexts.length - 1)
        tl.staggerFrom(midTexts, 1, {
            x: -15 * WIDTH / 16,
            ease: Power2.easeOut
        }, 0.5)
        tl.staggerFrom(midRects, 1, {
            x: -WIDTH / 2,
            ease: Power2.easeOut
        }, 0.5, "-="+(1+0.5*(midTexts.length-1)))
        tl.to(rowRects.concat(rowTexts), 1, {
          pixi: {alpha: 0},
          ease: Power2.easeOut
        },"+=3")
        rowRects.concat(rowTexts).forEach(actor => actor.visible = true); //make visible now tl state has been set (prevents flash at start)
        return tl
    },
    audio: [{
        id: 'tableStart1',
        text: [
          'This 2 minute video is personal to you, and will',
          'walk you through what\'s happened to your Account',
          'over the last tax year to ' + this.data.endDate.toFormattedString() + '.'
        ]
    }]
}
  
}