// require('babel-polyfill')
import * as apis from '../../2.0/common/apis'
import * as abis from '../../2.0/common/abis'
import Transaction from '../../2.0/transaction'
import Loopring from '../../2.0/loopring'
import orderValidator from './orderValidator'
import orderFormatter from './orderFormatter'
import txFormatter from './txFormatter'
import txsFormatter from './txsFormatter'

new Loopring('https://relay1.loopring.io/rpc')
console.log('LOOPRING_PROVIDER_HOST',LOOPRING_PROVIDER_HOST)

function trade(orderInput){
  let rawOrder = orderFormatter(orderInput)
  let orderValidator = new orderValidator(rawOrder) // TODO orderType
  let txs = []

  if(!orderValidator.isTokenAllowanceEnough()){ // TODO 
      let  txInput = {
        amount:validator.amountToApprove,
        token:validator.tokenToPay,
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
// function submitOrder(rawOrder){
//   let order = new Order(rawOrder)
//   order.sign()
//   return order.submit()
// }

// function toToken(){
//   this.name = ''
//   this.balance = 0
//   this.allowance = 0
//   this.digits = 0
// }





