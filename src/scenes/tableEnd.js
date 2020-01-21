import { colorStringToInt, niceRound } from '../utils.js'

export default function(config){
  // Init vars
  config = config || {}
  var {app, resources} = this.pixi, that = this
  var WIDTH = this.pixi.WIDTH, HEIGHT = this.pixi.HEIGHT;

  //Create values
  let rowValues = this.pixi.tableRowValues = []
  rowValues.push(new PIXI.Text('£'+this.data.startBalance.toFixedCommas(), this.pixi.tableHeaderTextStyle));
  if(this.data.bulkTransfers+this.data.transfers > 0)
    rowValues.push(new PIXI.Text('£'+(this.data.bulkTransfers+this.data.transfers).toFixedCommas(), this.pixi.tableTextStyle));
  if(this.data.withdrawals < 0)
    rowValues.push(new PIXI.Text('\u2212£'+Math.abs(this.data.withdrawals).toFixedCommas(), this.pixi.tableTextStyle));
  if(this.data.employeeContributions > 0)
  rowValues.push(new PIXI.Text('£'+this.data.employeeContributions.toFixedCommas(), this.pixi.tableTextStyle));
  if(this.data.employerContributions > 0)
    rowValues.push(new PIXI.Text('£'+this.data.employerContributions.toFixedCommas(), this.pixi.tableTextStyle)); //TODO remove for deferreds
  rowValues.push(new PIXI.Text((this.data.investmentReturn+(this.showCharges?0:this.data.charges) < 0 ? '–' : '')+'£'+Math.abs(this.data.investmentReturn+(this.showCharges?0:this.data.charges)).toFixedCommas(), this.pixi.tableTextStyle));
  if(this.showCharges)
    rowValues.push(new PIXI.Text('\u2212£'+Math.abs(this.data.charges).toFixedCommas(), this.pixi.tableTextStyle));
  rowValues.push(new PIXI.Text('£'+this.data.endBalance.toFixedCommas(), this.pixi.tableHeaderTextStyle));
  let fullRowHeight = ((6*HEIGHT/8)/rowValues.length)
  rowValues.forEach((actor,i) => {
    actor.alpha = 0
    actor.position.set(15*WIDTH/16-actor.width, HEIGHT/8+i*fullRowHeight+fullRowHeight/2-actor.height/2)
    that.pixi.app.stage.addChild(actor)
  });

  return {
    id: 'tableEnd',
    tl: function(){
        let tl = new TimelineLite({ id: "tableEnd" })
        tl.to([that.pixi.balanceFigure,that.pixi.balanceFigureLabelEnd,that.pixi.jarLabel,that.pixi.jar,that.pixi.coinsContainer], 1, {
          pixi: {alpha: 0},
          onComplete: function(){
            that.pixi.tooltipOut();
          },
          ease: Power2.easeOut
        })
        tl.to(that.pixi.tableRowRects.concat(that.pixi.tableRowTexts).concat(that.pixi.tableRowValues), 1, {
          pixi: {alpha: 1},
          ease: Power2.easeOut
        },"-=0.5").to(that.pixi.tableRowRects.concat(that.pixi.tableRowTexts).concat(that.pixi.tableRowValues), 1, {
          pixi: {alpha: 0},
          ease: Power2.easeOut
        },"+="+(4+rowValues.length))
        return tl
    },
    audio: [{
        id: 'tableEnd1',
        text: 'Here\'s that information again.'
    }]
}
  
}