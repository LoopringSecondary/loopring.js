// require('babel-polyfill')
import * as apis from '../../2.0/common/apis'
import * as abis from '../../2.0/common/abis'
import Transaction from '../../2.0/transaction'
import Loopring from '../../2.0/loopring'

new Loopring('https://relay1.loopring.io/rpc')
console.log('LOOPRING_PROVIDER_HOST',LOOPRING_PROVIDER_HOST)


let getContractAddress = ()=>{
  return 'xxx'
}
let getTokenAddress = (token)=>{
  return 'xxx'
}
let getWalletAddress = ()=>{
  return 'xxx' 
}

let checkBalanceForGas(rawTx){
  const balances = {}
  const balance = balances['ETH'] ? balances['ETH'].balance : 0
  const need = Number(rawTx.gasLimit) * Number(rawTx.gasPrice)
  if(need>balance){
    let tip ='You has insufficient ETH balance for gasLimit * gasPrice';
    return false
  }else{
    return true
  }
}
let checkBalanceForLRC(){
  // TODO
}

function orderValidator(values){
  if (!values.tokenS || !values.tokenB) {
    console.log('token not exist')
  }
}

function orderFormatter(values){
  return {
    ...values,
    protocol: getContractAddress(),
    owner: getWalletAddress(),
    tokenS: getTokenAddress(values.tokenS),
    tokenB: getTokenAddress(values.tokenB),
    v: Number(values.v),
  }
}

function generateAbiData(method,signedOrder){
  // TODO 
  // amountS，amountB 是否在orderSchema中
  let {
    owner, tokenS, tokenB,
    amountS, amountB, timestamp, ttl, salt, lrcFee,
    buyNoMoreThanAmountB,
    marginSplitPercentage,
    v,
    r,
    s
  } = signedOrder
  const amount = signedOrder.buyNoMoreThanAmountB ? signedOrder.amountB : signedOrder.amountS;
  const dataParams = {
    method:'cancelOrder', // method
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
  return abis.generateAbiData(dataParams)
}


async function cancelOrderStart(basicOrder,privateKey){


  let order = new Order(basicOrder)
  order.sign() // TODO : order must be signed
  const abiData = order.generateAbiData('cancelOrder') // TODO
  const protocol = order.protocol
  const defaultGasPrice = 'xxx';
  const gasPrice = '0x' + (Number(defaultGasPrice) * 1e9).toString(16) // TODO formatter
  
  const rawTx = {
      to: protocol,
      gasPrice:gasPrice,
      gasLimit: '0x14820', // TODO 
      value: '0x0',
      data: abiData
  }
  
  const tx = Transaction(rawTx)
  // tx.setData(dataParams) // TODO
  await tx.setNonce()
  tx.sign()
  await tx.send()
  return tx;
}

async function cancelOrder(){
  const tx = cancelOrderStart() // TODO
  tx.send()
}
