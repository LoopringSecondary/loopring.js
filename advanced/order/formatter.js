import utils from '../utils'
import auth from '../auth'
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
      tokensName,
      tokenbName,
      quantity,
      price,
    }= this.input
    this.tokenS = utils.getTokenByName(tokensName)
    this.tokenB = utils.getTokenByName(tokenbName)
    this.order.protocol = utils.getContractAddress() // TODO Config Module
    this.order.owner = auth.getWalletAddress() // TODO Auth Module
    this.order.tokenS = this.tokenS.address
    this.order.tokenB = this.tokenB.address
    this.order.amountS = utils.getTotalAmount(quantity,price,this.tokenS.digits)
    this.order.amountB = utils.getAmount(quantity,this.tokenB.digits)
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
    const lrcBalance = utils.getBalanceByTokenName('LRC') // TODO Token module
    const lrcFeePercentage = utils.getConfig('lrcFeePercentage') || 2
    let lrcFee = amountS * lrcFeePercentage / 1000

    if(this.tokenS.name == 'LRC'){
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


