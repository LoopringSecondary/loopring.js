// require('babel-polyfill')
import Transaction from '../src/transaction'
import Order from '../src/order'
import orderValidator from './order/validator'
import orderFormatter from './order/formatter'
import txFormatter from './transation/tx'
import txsFormatter from './transation/txs'

function transfer(transferTxInput){
  const tx = new txFormatter('transfer',transferTxInput)
  const txs = new txsFormatter([tx])
  if(txs.isEThGasEnough()){
    txs.sign() // TODO
    txs.send() // TODO
  }
}

function convert(convertTxInput){
  const tx = new txFormatter('convert',convertTxInput)
  const txs = new txsFormatter([tx])
  if(txs.isEThGasEnough()){
    txs.sign()
    txs.send()
  }
}

function approve(approveTxInput){
  const tx = new txFormatter('approve',approveTxInput)
  const txs = new txsFormatter([tx])
  if(txs.isEThGasEnough()){
    txs.sign()
    txs.send()
  }
}

function cancelOrder(cancelOrderInput){
  const order = new Order(cancelOrderInput)
  const signedOrder = order.sign()
  const tx = new txFormatter('cancelOrder',signedOrder)
  const txs = new txsFormatter([tx])
  if(txs.isEThGasEnough()){
    txs.sign()
    txs.send()
  }
}

function cancelAllOrders(){
  const tx = new txFormatter('cancelAllOrders')
  const txs = new txsFormatter([tx])
  if(txs.isEThGasEnough()){
    txs.sign()
    txs.send()
  }
}

function trade(orderInput){
  let rawOrder = orderFormatter(orderInput)
  let validator = new orderValidator(rawOrder)
  let order = new Order(rawOrder)
  const txs = new txsFormatter()
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
  if(!txs.isEthGasEnough()){
    txs.sign()
    txs.send()
    order.sign() //TODO
    order.submit() //TODO
  }
}

function sell(orderInput){
  trade(orderInput)
}
function buy(orderInput){
  trade(orderInput)
}





