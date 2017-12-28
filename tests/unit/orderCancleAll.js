// require('babel-polyfill')
import * as apis from '../../2.0/common/apis'
import * as abis from '../../2.0/common/abis'
import Transaction from '../../2.0/transaction'
import Loopring from '../../2.0/loopring'

new Loopring('https://relay1.loopring.io/rpc')
console.log('LOOPRING_PROVIDER_HOST',LOOPRING_PROVIDER_HOST)

function generateRelatedRawTxs(timestamp){
  timestamp = '0x' + (Number(timestamp) / 1000).toString(16) // TODO formatter
  let raws = []
  let rawTx = {}
  rawTx.to = utils.getContractAddress()
  rawTx.gasPrice = utils.getDefaultGasPrice()
  rawTx.gasLimit = utils.getDefaultGasLimit()
  rawTx.value = '0x0'
  rawTx.data = abis.generateCutOffData(timestamp)
  raws.push(rawTx)
  return raws
}
function sendRelatedRawTxs(){
  // TODO
}

