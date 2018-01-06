
import utils from './utils'

const cancelOrderInput = {
  // TODO
}
const submitOrderInput = {
  // tokens={},
  // tokenb={},
  // orderAmount,
  // orderPrice,
  // orderType,
}

const orderInput = cancelOrderInput || submitOrderInput 

export default class orderFormatter {
  constructor(orderInput) {
    this.type=type
    this.input=orderInput
    this.order={}
    this.setBasic()
    this.setAmount()
    this.setTTL()
    this.setLrcFee()
    this.setMarginSplitPercentage()
  }
  setOrderTotal(){
    // TODO
  }
  setBasic(){
    let {
      tokens,
      tokenb,
      orderAmount,
      orderPrice,
      orderType,
    }= this.input
    this.order.protocol = utils.getContractAddress()
    this.order.owner = utils.getWalletAddress()
    this.order.tokenS = tokens.address
    this.order.tokenB = tokenb.address
    this.order.timestamp = Number((new Date().getTime() / 1000).toFixed(0))
    this.order.salt = Math.round(Math.random() * 1e8)
    this.order.buyNoMoreThanAmountB = false
  }
  setTTL(){
    const defaultExpireTime = utils.getConfig('defaultExpireTime') // TODO
    const settingsExpireTime = utils.getSettings('settingsExpireTime') // TODO
    const settingsExpireTimeUnit = utils.getSettings('settingsExpireTimeUnit') // TODO
    this.order.ttl = defaultExpireTime * 24 * 3600
    if (settingsExpireTimeUnit === "Day") {
      this.order.ttl = settingsExpireTime * 24 * 3600
    } else if (settingsExpireTimeUnit === "Hour") {
      this.order.ttl = settingsExpireTime * 3600
    } else if (settingsExpireTimeUnit === "Minute") {
      this.order.ttl = settingsExpireTime * 60
    } else if (settingsExpireTimeUnit === "Second") {
      this.order.ttl = settingsExpireTime
    }
  }
  setAmount(){
    let {
      tokens,
      tokenb,
      orderAmount,
      orderPrice,
      orderType,
    }= this.input
    if(orderType=='sell'){
      this.order.amountB = utils.getTotalAmount(orderAmount,orderPrice,tokenb.digits)
      this.order.amountS = utils.getAmount(orderAmount,tokens.digits)
    }
    if(orderType=='buy'){
      this.order.amountS = utils.getTotalAmount(orderAmount,orderPrice,tokens.digits)
      this.order.amountB = utils.getAmount(orderAmount,tokenb.digits)
    }
  }
  setLrcFee(){
    const lrcFeePercentage = utils.getConfig('lrcFeePercentage') || 2
    if(orderType==='sell'){
      let orderTotal = orderAmount
      // let orderTotal = order.amountB
    }
    if(orderType==='buy'){
      let orderTotal = orderAmount * orderPrice
      // let orderTotal = order.amountS
    }
    let lrcFee = orderTotal * lrcFeePercentage / 1000
    let lrcBalance = utils.getBalanceByTokenName('LRC')

    if(token.name == 'LRC'){
      let isLrcFeeEnough = lrcFee+orderTotal <= lrcBalance
    }else{
      let isLrcFeeEnough = lrcFee <= lrcBalance
    }
    if(!isLrcFeeEnough){
      lrcFee = 0 
    }
    this.order.lrcFee = lrcFee
  }
  setMarginSplitPercentage(){
    if(Number(order.lrcFee) !==0){
      this.order.marginSplitPercentage =  utils.getConfig('marginSplitPercentage') || 50
    }else{
      this.order.marginSplitPercentage = 100
    }
  }
}


