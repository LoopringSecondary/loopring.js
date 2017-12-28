// require('babel-polyfill')
import * as apis from '../../2.0/common/apis'
import * as abis from '../../2.0/common/abis'
import Transaction from '../../2.0/transaction'
import Loopring from '../../2.0/loopring'

new Loopring('https://relay1.loopring.io/rpc')
console.log('LOOPRING_PROVIDER_HOST',LOOPRING_PROVIDER_HOST)


async function orderStart(order,privateKey){
  
  
  // TODO: get rawTx from order

  const rawTx = {}
  const tx = Transaction(rawTx)
  const dataParams = {
    method:'cancelOrder',
    params: {
      addresses: [owner, tokenS, tokenB],
      orderValues: [amountS, amountB, timestamp, ttl, salt, lrcFee, amount],
      buyNoMoreThanAmountB,
      marginSplitPercentage,
      v,
      r,
      s
    },
  }
  tx.setData(dataParams)
  await tx.setNonce()
  tx.sign()
  await tx.send()
  return tx;
}

async function cancelOrder(){
  const tx = cancelOrderStart() // TODO
  tx.send()
}
