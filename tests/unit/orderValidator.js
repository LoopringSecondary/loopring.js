
import utils from './utils'

export default class OrderValidator {
  constructor(rawOrder) { 
    this.order = order
    this.orderType = '' // TODO
    this.tokenToPay = ''
    this.lrcFee = ''
    this.orderTotal = ''
    this.amountToPay = ''
    this.amountToArrove = ''
  }
  getOrderTotal(){
    if(this.orderType==='sell'){
      this.orderTotal = this.order.amountB // TODO
    }
    if(this.orderType==='buy'){
      this.orderTotal = this.order.amountS // TODO
    }
  }
  getTokenToPay(){
    if(this.orderType==='sell'){
      this.tokenToPay = this.order.tokenb // TODO
    }
    if(this.orderType==='buy'){
      this.tokenToPay = this.order.tokens // TODO
    }
  }
  getAmountAllocated(){
    // TODO
  }
  getAmountToPay(){
    const token = this.tokenToPay
    const orderTotal = this.orderTotal
    const lrcFee = this.order.lrcFee
    const amountAllocated = this.getAmountAllocated() // TODO

    if(token.name==='LRC'){
      this.amountToPay = utils.toBigNumber(orderTotal).plus(lrcFee).plus(amountAllocated) 
    }else{
      this.amountToPay = utils.toBigNumber(orderTotal).plus(amountAllocated) 
    }
  }
  getAmountToApprove(){
    const allowance = this.tokenToPay.allowance
    const digits = this.tokenToPay.digits
    const amount = this.amountToPay

    if (amount.gt(allowance) ) {
        const JAVA_LONG_MAX = '9223372036854775806'
        this.amountToApprove = utils.toBigNumber(JAVA_LONG_MAX,digits)
    }else{
        this.amountToApprove = 0
    }
  }
  isWethEnough(){
    // TODO
  }
  isTokenAllowanceEnough(){
    return this.amountToPay <= this.tokenToPay.allowance
  }

  isLrcAllowanceEnough(){
    const lrcBalance = utils.getBalanceByTokenName('LRC')
    return this.order.lrcFee <= lrcBalance
  }
  isEthGasEnough(){
    
  }
  generaterTxs(){
    
  }
}
