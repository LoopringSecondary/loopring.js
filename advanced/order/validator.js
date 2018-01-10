import * as apis from '../../2.0/common/apis'
import Auth from './auth'
import utils from './utils'

export default class OrderValidator {
  constructor(rawOrder) { 
    this.order = rawOrder
    this.amountToPay = null
    this.amountToArrove = null
    this.setOrderTotal()
    this.setTokenToSell()
    this.setAmountToPay()
    this.setAmountToApprove()
  }
  setTokenToSell(){
    this.tokenS = utils.getTokenByAddress(this.order.tokenS)
    // TODO
    // tokenS.alloawance
    // tokenS.blalance
    // tokenS.digits
    // tokenS.address
  }
  setAmountToPay(){
    const tokenS = this.tokenS
    const amountS = this.order.amountS
    const lrcFee = this.order.lrcFee
    this.getAmountAllocated() // TODO
    const amountAllocated = this.amountAllocated // TODO

    if(tokenS.name==='LRC'){
      this.amountToPay = utils.toBigNumber(amountS).plus(lrcFee).plus(amountAllocated) 
    }else{
      this.amountToPay = utils.toBigNumber(amountS).plus(amountAllocated) 
    }
  }
  setAmountToApprove(){
    const allowance = this.tokenS.allowance // TODO
    const digits = this.tokenS.digits
    const amountToPay = this.amountToPay

    if (amountToPay.gt(allowance)){ // TODO
        const JAVA_LONG_MAX = '9223372036854775806'
        this.amountToApprove = utils.toBigNumber(JAVA_LONG_MAX,digits)
    }else{
        this.amountToApprove = 0
    }
  }
  async setAmountAllocated(){
    const Auth = new Auth()
    const account = Auth.getAccount()
    this.amountAllocated = await apis.getEstimatedAllocatedAllowance(account.address, this.tokenS.address)
  }
  isTokenSBalanceEnough(){
    const tokenS = this.tokenS
    const amountS = this.amountS
    if(tokenS.name === 'WETH'){
      const wethBalance = tokenS.balance // TODO
      const ethBalance = utils.getBalanceByTokenName('ETH') // TODO
      if(wethBalance < amountS < wethBalance + ethBalance){
        this.amountToConvert = amountS-tokenS.balance // TODO
        return false
      }else{
        return true
      }
    }else{
      // TODO
      return true
    }
  }
  isTokenSAllowanceEnough(){
    return this.amountToPay <= this.tokenS.allowance // TODO
  }
  isLrcAllowanceEnough(){
    const lrcAllowance = utils.getAllowanceByTokenName('LRC') //TODO
    return this.order.lrcFee <= lrcAllowance
  }
}
