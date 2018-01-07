
import utils from './utils'

export default class OrderValidator {
  constructor(orderType,rawOrder) { 
    this.order = order
    this.orderType = orderType
    this.tokenToPay = ''
    this.lrcFee = ''
    this.orderTotal = ''
    this.amountToPay = ''
    this.amountToArrove = ''
    this.setOrderTotal()
    this.setTokenToPay()
    this.setAmountAllocated()
    this.setAmountToPay()
    this.setAmountToApprove()
  }
  setOrderTotal(){
    if(this.orderType==='sell'){
      this.orderTotal = this.order.amountB // TODO
    }
    if(this.orderType==='buy'){
      this.orderTotal = this.order.amountS // TODO
    }
  }
  setTokenToPay(){
    if(this.orderType==='sell'){
      this.tokenToPay = this.order.tokenb // TODO
    }
    if(this.orderType==='buy'){
      this.tokenToPay = this.order.tokens // TODO
    }
  }
  setAmountAllocated(){
    // TODO
  }
  setAmountToPay(){
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
  setAmountToApprove(){
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
  isWethConvertNeeded(){
    const token = this.tokenToPay
    if(token.name === 'WETH'){
      const wethBalance = token.balance
      const ethBalance = utils.getBalanceByTokenName('ETH') // TODO
      if(wethBalance < this.orderTotal < wethBalance + ethBalance){
        return true
      }else{
        return false
      }
    }else{
      return false
    }
  }
  isTokenAllowanceEnough(){
    return this.amountToPay <= this.tokenToPay.allowance
  }
  isLrcAllowanceEnough(){
    const lrcBalance = utils.getBalanceByTokenName('LRC')
    return this.order.lrcFee <= lrcBalance
  }
  generaterTxs(){
    const allowance = this.tokenToPay.allowance
    const amount = this.amountToApprove
    let  txInput = {
      amount:this.amountToApprove,
      token:this.tokenToPay,
    }
    if(validator.tokenToPay.allowance > 0){
        txInput.amount = 0
        const canelRawTx = new txFormatter('approve',txInput)
    }
    const approveRawTx = new txFormatter('approve',txInput)
  }
}
