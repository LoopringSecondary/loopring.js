// require('babel-polyfill')
import * as apis from '../../2.0/common/apis'
import * as abis from '../../2.0/common/abis'
import Transaction from '../../2.0/transaction'
import Loopring from '../../2.0/loopring'

new Loopring('https://relay1.loopring.io/rpc')
console.log('LOOPRING_PROVIDER_HOST',LOOPRING_PROVIDER_HOST)


function generateRelatedRawTxs(){
  let raws = []
  const timestamp = '0xxxx';
  const abiData = abis.generateCutOffData(timestamp)
  const rawTx = {
      to: getContractAddress(), // TODO
      gasPrice: getDefaultGasPrice(), // TODO
      gasLimit: '0x14820',
      value: '0x0',
      data:abiData
  }
  raws.push(rawTx)
  return raws

}

function sendRelatedRawTxs(){
  // TODO
}

