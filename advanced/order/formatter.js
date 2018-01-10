import utils from './utils'
import {rawOrder,signedOrder,orderInput} from './types'

export default class orderFormatter {
  constructor(orderInput) {
    this.type=type
    this.input=orderInput
    this.order={}
    this.setBasic()
    this.setTTL()
    this.setLrcFee()
    this.setMarginSplitPercentage()
  }
  setBasic(){
    let {
      tokenS,
      tokenB,
      quantity,
      price,
    }= this.input
    this.order.protocol = utils.getContractAddress()
    this.order.owner = utils.getWalletAddress()
    this.order.tokenS = tokenS.address
    this.order.tokenB = tokenB.address
    this.order.amountS = utils.getTotalAmount(quantity,price,tokenS.digits) // TODO
    this.order.amountB = utils.getAmount(quantity,tokenB.digits)
    this.order.timestamp = Number((new Date().getTime() / 1000).toFixed(0))
    this.order.salt = Math.round(Math.random() * 1e8)
    this.order.buyNoMoreThanAmountB = false
  }
  setTTL(){
    const defaultExpireTime = utils.getConfig('defaultExpireTime') 
    const settingsExpireTime = utils.getConfig('settingsExpireTime') 
    const settingsExpireTimeUnit = utils.getConfig('settingsExpireTimeUnit') 
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
  setLrcFee(){
    const amountS = this.order.amountS
    const tokenS = utils.getTokenByAddress(this.order.tokenS)
    const lrcFeePercentage = utils.getConfig('lrcFeePercentage') || 2
    const lrcBalance = utils.getBalanceByTokenName('LRC')
    let lrcFee = amountS * lrcFeePercentage / 1000

    if(tokenS.name == 'LRC'){
      const isLrcFeeEnough = lrcFee+amountS <= lrcBalance
    }else{
      const isLrcFeeEnough = lrcFee <= lrcBalance
    }
    if(!isLrcFeeEnough){
      lrcFee = 0
    }
    this.order.lrcFee = lrcFee
  }
  setMarginSplitPercentage(){
    if(Number(this.order.lrcFee) !== 0){
      this.order.marginSplitPercentage =  utils.getConfig('marginSplitPercentage') || 50
    }else{
      this.order.marginSplitPercentage = 100
    }
  }
}


