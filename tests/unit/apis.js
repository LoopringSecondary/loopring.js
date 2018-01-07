// require('babel-polyfill')
import * as apis from '../../2.0/common/apis'
import * as abis from '../../2.0/common/abis'
import Transaction from '../../2.0/transaction'
import Order from '../../2.0/order'
import Loopring from '../../2.0/loopring'
import orderValidator from './orderValidator'
import orderFormatter from './orderFormatter'
import txFormatter from './txFormatter'
import txsFormatter from './txsFormatter'

function transfer(transferTxInput){
  const tx = new txFormatter('transfer',transferTxInput)
  const txs = new txsFormatter(tx)
  if(!txs.isEThGasEnough()){
    // do sth likes trigger a notification
  }else{
    txs.sign() // TODO
    txs.send() // TODO
  }
}

function convert(convertTxInput){
  const txformatter = new txFormatter('convert',convertTxInput)
  const txs = new txsFormatter([tx])
  if(!tx.isBalanceEnough()){
    // do sth likes trigger a notification
  }
  if(!txs.isEThGasEnough()){
    // do sth likes trigger a notification
  }else{
    txs.sign() // TODO
    txs.send() // TODO
  }
}

function approve(approveTxInput){
  const tx = new txFormatter('approve',approveTxInput)
  
  const isCancleNeeded = true // TODO
  if(tx.isCancleNeeded){
    const cancelTx = new txFormatter('approveCancel',approveTxInput)
    const txs = new txsFormatter([tx,cancelTx])
  }else{
    const txs = new txsFormatter([tx])
  }
  if(!txs.isEThGasEnough()){
    // do sth likes trigger a notification
  }else{
    txs.sign() // TODO
    txs.send() // TODO
  }
}

const signedOrder = {}
const rawOrder = {}
const cancelOrderInput =  rawOrder || signedOrder // TODO

function cancelOrder(cancelOrderInput){
  const order = new Order(cancelOrderInput)
  const signedOrder = order.sign()
  const tx = new txFormatter('cancelOrder',signedOrder)
  const txs = new txsFormatter([tx]) // TODO
  txs.send() // TODO
}

function cancelAllOrders(){
  const tx = new txFormatter('cancelAllOrders')
  const txs = new txsFormatter([tx]) // TODO
  txs.send() // TODO
}

function trade(orderInput){
  let rawOrder = orderFormatter(orderInput)
  let orderValidator = new orderValidator(rawOrder) // TODO orderType
  let txs = []

  if(orderValidator.isWethConvertNeeded()){  
      let  txInput = {
        amount:validator.orderTotal-tokenToPay.balance, // TODO
        token::utils.getTokenByName('WETH'), //TODO
      }
      const wethConvertTx = new txFormatter('convert',txInput)
      txs.push(wethConvertTx)
  }
  if(!orderValidator.isTokenAllowanceEnough()){
      let  txInput = {
        amount:validator.amountToApprove,
        token:validator.tokenToPay,
      }
      const tokenApproveTx = new txFormatter('approve',txInput)
      txs.push(tokenApproveTx)
  }
  if(!orderValidator.isLrcAllowanceEnough()){
      const txInput = {
        amount:validator.lrcFee,
        token:utils.getTokenByName('LRC'), //TODO
      }
      const lrcApproveTx = new txFormatter('approve',txInput)
      txs.push(lrcApproveTx)
  }
  const txsFormatter = new txsFormatter(txs)

  if(!txsFormatter.isEthGasEnough()){
    txsFormatter.sign() // TODO
    txsFormatter.send() // TODO
  }
  if(txsFormatter.isSigned()){
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





