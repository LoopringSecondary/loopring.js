// require('babel-polyfill')
import * as apis from '../../2.0/common/apis'
import * as abis from '../../2.0/common/abis'
import Transaction from '../../2.0/transaction'
import Loopring from '../../2.0/loopring'
import orderValidator from './orderValidator'
import orderFormatter from './orderFormatter'

new Loopring('https://relay1.loopring.io/rpc')
console.log('LOOPRING_PROVIDER_HOST',LOOPRING_PROVIDER_HOST)

function submitPrepare(formInput){
  let rawOrder = orderFormatter(formInput)
  let validator = new orderValidator(rawOrder)
  if(validator.isTokenAllowanceEnough()){
      validator.generateApproveTxs()
  }
  if(validator.isLrcAllowanceEnough()){
      validator.generateLrcApproveTxs()
  }
  if(validator.isEthGasEnough()){
    
  }

}

function submitOrder(rawOrder){
  let order = new Order(rawOrder)
  order.sign()
  return order.submit()
}



function toToken(){
  this.name = ''
  this.balance = 0
  this.allowance = 0
  this.digits = 0
}


function toRawTx(orderInput){
  const amount = getOrderAmount(orderInput)
  const token = getOrderToken(orderInput)
  const lrcFee = getOrderLrcFee(orderInput)
  cosnt 

  let rawTx = {}

  function setGasLimit(){
    rawTx.gasLimit = utils.getGasLimit() 
  }
  function setGasPrice(){
    rawTx.gasPrice = utils.getGasPrice() 
  }
  function setTo(){
    rawTx.to = token.address
  }
  function setValue(){
    rawTx.value = utils.getAmount(0)
  }
  function setData(){
    if(token.name==='LRC'){
      const amountToPay = utils.toBigNumber(amount).plus(lrcFee).plus(response.result) // TODO response
    }else{
      const amountToPay = utils.toBigNumber(amount).plus(response.result) // TODO response
    }
    if (amountToPay.gt(token.allowance) ) {
        const JAVA_LONG_MAX = '9223372036854775806'
        let amountToApprove = utils.toBigNumber(JAVA_LONG_MAX,token.digits)
    }else{
        let amountToApprove = 0
    }
    if(type=='cancel'){
      amountToApprove = 0
    }
    amountToApprove = utils.getAmount(amountToApprove,token.digits)
    const spender = utils.getDelegateAddress()
    rawTx.data = abis.generateApproveData(spender,amountToApprove)
  }
  setGasLimit()
  setGasPrice()
  setTo()
  setValue()
  setData()
  retrun rawTx
}

function toRawTxs(){
  let {
    token,
    amount,
  } = formInput
  
  let rawTxs = []
  if(token.allowance > 0){
    const cancelTx = toRawTx(fromInput,'cancel')
    rawTxs.push(cancelTx)
  }
  const approveTx = toRawTx(fromInput)
  rawTxs.push(approveTx)
  
  let isGasEnough = utils.isGasEnough(rawTxs)
  // TODO
  return rawTxs
}


function sell(formInput){

  let rawOrder = toOrder(formInput)
  let rawTxs = toRawTxs(formInput)
  let bool = utils.isEthGasEnough(rawTxs)
  let order = Order(rawOrder)
}


