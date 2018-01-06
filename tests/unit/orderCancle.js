// require('babel-polyfill')
import * as apis from '../../2.0/common/apis'
import * as abis from '../../2.0/common/abis'
import Transaction from '../../2.0/transaction'
import Order from '../../2.0/order'
import Loopring from '../../2.0/loopring'

new Loopring('https://relay1.loopring.io/rpc')
console.log('LOOPRING_PROVIDER_HOST',LOOPRING_PROVIDER_HOST)

function toRawOrder(formInput){
    // TODO formInput unKnown
   const {
    order,
   } = formInput
   return {
     ...order,
     protocol: utils.getContractAddress(),
     owner: utils.getWalletAddress(),
     tokenS: utils.getTokenAddress(tokenS),// TODO
     tokenB: utils.getTokenAddress(tokenB),// TODO
     v: Number(values.v),
   }
}


function rawTxFormatter(rawOrder){
  let order = new Order(rawOrder)
  order.sign() // TODO : order must be signed
  const signedOrder = order.order // TODO
  const rawTx = t
}

async function cancelOrder(rawTx,privateKey){
  const tx = Transaction(rawTx)
  // tx.setData(dataParams) // TODO
  await tx.setNonce()
  tx.sign()
  await tx.send()
}
