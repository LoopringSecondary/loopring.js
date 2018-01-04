
import utils from './utils'

export default class OrderValidator {
  constructor(orderInput) { 
    
    this.tokenToPay = {}
    this.amountToPay = ''
    this.amountToArrove = ''

  }
  getAmountToPay(){

  }
  getAmountToApprove(){

  }
  getAmountAllocated(){

  }

  isTokenAllowanceEnough(){

  }
  isLrcAllowanceEnough(){

  }
  isGasEnough(){

  }


}


export default class OrderValidator {
  constructor(order) { 

    this.orderTotal
    this.tokenToPay
    this.amountToPay
    
  }
  
  getAmountAllocated(){
    // TODO
    // await relay.getEstimatedAllocatedAllowance(this.wallet.address, tokens.token )
  }
  getAmountToPay(){
    let {
      orderAmount,
      orderPrice,
      lrcFee
    } = this.order

    let {
      tokenToPay
    } = this

    if(orderType==='sell'){
      amountToPay = orderAmount
    }
    if(orderType==='buy'){
      amountToPay = utils.toBigNumber(orderAmount).times(orderPrice)
    }
    const amountAllocated = this.getAmountAllocated() // TODO

    if(tokenToPay.name==='LRC'){
      this.amountToPay = utils.toBigNumber(amountToPay).plus(lrcFee).plus(amountAllocated) 
    }else{
      amountToPay = utils.toBigNumber(amountToPay).plus(amountAllocated) 
    }

    return amountToPay
  }
  getAmountToApprove(orderInput){

    const {
      tokens={},
      tokenb={},
      orderAmount,
      orderTotal,
      orderPrice,
      orderType,
    } = orderInput

    const amountToPay = getAmountToApprove(orderInput)

    if (amountToPay.gt(token.allowance) ) {
        const JAVA_LONG_MAX = '9223372036854775806'
        let amountToApprove = utils.toBigNumber(JAVA_LONG_MAX,token.digits)
    }else{
        let amountToApprove = 0
    }
    return amountToApprove
  }
  static computeLrcFee(){

    const orderTotal = amount * this.order.orderPrice
    const lrcPercentage = 2/1000
    return orderTotal * lrcPercentage
  }

  isLrcFeeEnough(){
    const lrcFee = this.computeLrcFee()
    const amountToPay = getBalanceOfToken(orderInput)
    const token = utils.getBalanceOfToken(token)
    
    if( token.name === "LRC"){
      return utils.isBalanceEnough('LRC',amountToPay)
    }else{
      return utils.isBalanceEnough('LRC',lrcFee)
    }
  }
}
