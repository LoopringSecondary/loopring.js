// require('babel-polyfill')
import * as apis from '../../2.0/common/apis'
import * as abis from '../../2.0/common/abis'
import Transaction from '../../2.0/transaction'
import Loopring from '../../2.0/loopring'

new Loopring('https://relay1.loopring.io/rpc')
console.log('LOOPRING_PROVIDER_HOST',LOOPRING_PROVIDER_HOST)

function orderFormatter(formInput){
    // TODO formInput unKnown
   const {
    order,
   } = formInput
   return {
     ...order,
     protocol: getContractAddress(),
     owner: getWalletAddress(),
     tokenS: getTokenAddress(tokenS),
     tokenB: getTokenAddress(tokenB),
     v: Number(values.v),
   }
}

function rawTxFormatter(rawOrder){
  let order = new Order(rawOrder)
  order.sign() // TODO : order must be signed
  const signedOrder = order.order // TODO
  const abiData = abis.generateCancelOrderData(signedOrder) 
  const rawTx = {
      to: utils.getContractAddress(),
      gasPrice:utils.getGasPrice(),
      gasLimit: utils.toHex(8400), 
      value: utils.toHex(0),
      data: abiData
  }
  const isGasEnough = utils.isGasEnough([rawTx])
  return rawTx
}

async function cancelOrder(rawTx,privateKey){
  const tx = Transaction(rawTx)
  // tx.setData(dataParams) // TODO
  await tx.setNonce()
  tx.sign()
  await tx.send()
}
