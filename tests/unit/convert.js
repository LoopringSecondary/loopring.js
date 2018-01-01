// require('babel-polyfill')
import * as apis from '../../2.0/common/apis'
import * as abis from '../../2.0/common/abis'
import Transaction from '../../2.0/transaction'
import Loopring from '../../2.0/loopring'

new Loopring('https://relay1.loopring.io/rpc')
console.log('LOOPRING_PROVIDER_HOST',LOOPRING_PROVIDER_HOST)


function convert(formInput){
  let { gasLimit,amount,fromToken } = formInput
  let rawTx = {}
  let raws = []
  let weth = utils.getTokenByName('WETH')
  rawTx.to = weth.address // TODO why ?
  rawTx.gasPrice = utils.getGasPrice()
  rawTx.gasLimit = utils.getGasLimit(gasLimit)

  if(fromToken === 'ETH'){
  	rawTx.value = utils.getAmount(amount)
  	rawTx.data = '0xd0e30db0' // TODO why ?
  }else{
  	rawTx.value = utils.getAmount(0)
  	amount = utils.getAmount(amount,weth.digits)
  	rawTx.data = signer.generateWithdrawData(amount)
  }
  raws.push(rawTx)
  let isGasEnough = utils.isGasEnough(rawTx)
  return raws
}
function sendRelatedRawTxs(){
  // TODO
}


