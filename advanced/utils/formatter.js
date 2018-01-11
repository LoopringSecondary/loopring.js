import BigNumber from 'bignumber.js'

/*
  txFormatter：setTimestamp,setNonce
*/
export function toHex(obj){
  return  '0x' + obj.toString(16)
}

/*
  orderValidator: setAmountToPay,setAmountToApprove
*/
export function toBigNumber(amount,digits){
  if(digits){
    const digits = Number('1e'+ digits)
    return new BigNumber(amount).times(digits)
  }else{
    return new BigNumber(amount)
  }
}

/*
  txFormatter: setValue,setData
  orderFormatter: setAmountS, setAmountB
*/
export function getAmount(amount,digits){
  digits = digits ? digits : 18
  digits = Number('1e' + digits)
  amount = amount ? amount : 0
  const bn = new BigNumber(amount).times(digits)
  return toHex(bg)
}

export function getGasPrice(amount){
  // amount : user input , number or string
  const defaultGasPrice  = '' // TODO
  amount = amount ? amount : defaultGasPrice
  amount = Number(amount) * 1e9
  return toHex(amount)
}

export function getGasLimit(amount){
  // amount : user input , number or string
  const defaultGasLimit  = 84000 
  amount = amount ? amount : defaultGasLimit
  amount = Number(amount)
  return toHex(amount)
}

export function getTotalAmount(quantity,price,digits){
  digits = digits ? digits : 18
  digits = Number('1e' + digits)
  quantity = quantity ? quantity : 0
  const total = new BigNumber(new BigNumber(quantity).times(price).times(digits)).toFixed(0)
  return toHex(total)
}







