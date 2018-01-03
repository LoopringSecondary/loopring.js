
import utils from './utils'

export function computeLrcFee(orderInput){
  const {
    tokens={},
    tokenb={},
    orderAmount,
    orderTotal,
    orderPrice,
    orderType,
  } = orderInput

  const orderTotal = orderAmount * orderPrice
  const lrcPercentage = 2/1000
  return orderTotal * lrcPercentage
}

function isLrcGasEnough(orderInput) {
    const lrcFee = computeLrcFee(orderInput)
    const amountToPay = getBalanceOfToken(orderInput)
    const token = utils.getBalanceOfToken(token)
    const lrcBalance = utils.getBalanceOfToken('LRC')

    if( token.name === "LRC"){
      return amountToPay <= lrcBalance
    }else{
      return lrcFee <= lrcBalance
    }
}

// for set order.lrcFee 
function getLrcFee(orderInput){
  let isEnoungh = isLrcGasEnough(orderInput)
  let token = getTokenByName('LRC')
  let computeLrcFee = computeLrcFee(orderInput)
  if(isEnoungh){
    const lrcFee = utils.getAmount(computeLrcFee,token.digits)
  }else{
    const lrcFee = utils.getAmount(0)
  }
  return lrcFee
}

export function getTokenToPay(orderInput){
  const {
    tokens={},
    tokenb={},
    orderAmount,
    orderTotal,
    orderPrice,
    orderType,
  } = orderInput

  if(orderType==='sell'){
    return tokenb 
  }else{
    return tokens 
  }
}
export function getAmountToPay(orderInput){
  const {
    tokens={},
    tokenb={},
    orderAmount,
    orderTotal,
    orderPrice,
    orderType,
  } = orderInput

  if(orderType==='sell'){
    let amountToPay = orderAmount
  }else{
    let amountToPay = orderTotal 
  }
  const lrcFee = getLrcFee(orderInput)

  if(token.name==='LRC'){
    amountToPay = utils.toBigNumber(amount).plus(lrcFee).plus(response.result) // TODO response
  }else{
    amountToPay = utils.toBigNumber(amount).plus(response.result) // TODO response
  }

  return amountToPay
}
export function getAmountToPay(orderInput){

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





