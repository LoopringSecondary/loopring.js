// require('babel-polyfill')
import * as apis from '../../2.0/common/apis'
import * as abis from '../../2.0/common/abis'
import Transaction from '../../2.0/transaction'
import Loopring from '../../2.0/loopring'

new Loopring('https://relay1.loopring.io/rpc')
console.log('LOOPRING_PROVIDER_HOST',LOOPRING_PROVIDER_HOST)


function toRawTx(formInput,type){
  let {
    token,
    gasLimit,
    amount,
  } = formInput

  let rawTx = {}
  function setGasLimit(){
    rawTx.gasLimit = utils.getGasLimit(gasLimit) 
  }
  function setGasPrice(){
    rawTx.gasPrice = utils.getGasPrice() 
  }
  function setTo(){
    rawTx.to = utils.getContractAddress()
  }
  function setValue(){
    rawTx.value = utils.getAmount(0)
  }
  function setData(){
    const timestamp = utils.toHex(Date.parse(new Date()) / 1000)
    rawTx.data = abis.generateCutOffData(timestamp)
  }
  setGasLimit()
  setGasPrice()
  setTo()
  setValue()
  setData()
  retrun rawTx
}

function sendRelatedRawTxs(){
  // TODO
}

