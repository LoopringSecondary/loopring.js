// require('babel-polyfill')
import * as apis from '../../2.0/common/apis'
import * as abis from '../../2.0/common/abis'
import Transaction from '../../2.0/transaction'
import Order from '../../2.0/order'
import Loopring from '../../2.0/loopring'
import orderValidator from './orderValidator'
import orderFormatter from './orderFormatter'
import txFormatter from './txFormatter'
import txValidator from './txValidator'

function transfer(transferTxInput){
  const tx = new txFormatter('transfer',transferTxInput)
  const validator = new txValidator([tx])
  if(validator.isEThGasEnough()){
    validator.sign()
    validaor.send()
  }else{
    // do something like notification
  }
}

function convert(convertTxInput){
  const tx = new txFormatter('convert',convertTxInput)
  const validator = new txValidator([tx])
}

function approve(approveTxInput){
  const tx = new txFormatter('approve',approveTxInput)
  const validator = new txValidator([tx])
}

const signedOrder = {}
const rawOrder = {}
const cancelOrderInput =  rawOrder || signedOrder // TODO

function cancelOrder(cancelOrderInput){
  const order = new Order(cancelOrderInput)
  const signedOrder = order.sign()
  const tx = new txFormatter('cancelOrder',signedOrder)
  const validator = new txValidator([tx]) // TODO
}

function cancelAllOrders(){
  const tx = new txFormatter('cancelAllOrders')
  const validator = new txValidator([tx])
}

function trade(orderInput){
  let rawOrder = orderFormatter(orderInput)
  let validator = new orderValidator(rawOrder)
  let txs = []
  if(validator.isTokenSBalanceEnough()){  
      let  txInput = {
        amount:validator.amountToConvert, 
        token::utils.getTokenByName('WETH'), //TODO
      }
      const wethConvertTx = new txFormatter('convert',txInput)
      txs.push(wethConvertTx)
  }
  if(!validator.isTokenSAllowanceEnough()){
      let  txInput = {
        amount:validator.amountToApprove,
        token:validator.tokenToPay,
      }
      const tokenApproveTx = new txFormatter('approve',txInput)
      txs.push(tokenApproveTx)
  }
  if(!validator.isLrcAllowanceEnough()){
      const txInput = {
        amount:validator.lrcFee,
        token:utils.getTokenByName('LRC'), //TODO
      }
      const lrcApproveTx = new txFormatter('approve',txInput)
      txs.push(lrcApproveTx)
  }
  const txValidator = new txValidator(txs)
  if(!txValidator.isEthGasEnough()){
    txValidator.sign() // TODO
    txValidator.send() // TODO
    let order = new Order(rawOrder)
    order.sign() // TODO
    order.submit() //TODO
  }
}

function sell(orderInput){
  trade(orderInput)
}
function buy(orderInput){
  trade(orderInput)
}





