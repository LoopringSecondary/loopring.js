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

new Loopring('https://relay1.loopring.io/rpc')
console.log('LOOPRING_PROVIDER_HOST',LOOPRING_PROVIDER_HOST)


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





