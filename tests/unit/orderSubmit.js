// require('babel-polyfill')
import * as apis from '../../2.0/common/apis'
import * as abis from '../../2.0/common/abis'
import Transaction from '../../2.0/transaction'
import Loopring from '../../2.0/loopring'

new Loopring('https://relay1.loopring.io/rpc')
console.log('LOOPRING_PROVIDER_HOST',LOOPRING_PROVIDER_HOST)

function toOrder(formInput){
  const {
    tokens={},
    tokenb={},
    orderAmount,
    orderTotal,
    orderPrice,
    orderType,
  } = formInput

  const order = {}
  order.protocol = utils.getContractAddress()
  order.owner = utils.getWalletAddress()
  order.tokenS = tokens.address
  order.tokenB = tokenb.address
  if(orderType=='sell'){
    order.amountS = utils.getAmount(orderAmount,tokens.digits)
    order.amountB = utils.getTotalAmount(orderAmount,orderPrice,tokenb.digits)
  }
  if(orderType=='buy'){
    order.amountS = utils.getTotalAmount(orderAmount,orderPrice,tokens.digits)
    order.amountB = utils.getAmount(orderAmount,tokenb.digits)
  }
  order.timestamp = Number((new Date().getTime() / 1000).toFixed(0));
  order.ttl = utils.getTTL();
  order.salt = Math.round(Math.random() * 1e8);
  order.buyNoMoreThanAmountB = false;
  order.lrcFee = utils.getLrcFee() // TODO
  order.marginSplitPercentage = Number(order.lrcFee) !==0 ? Number(this.settingsMarginSplit) : 100
  return order;

}

function submitOrder(rawOrder){
  let order = new Order(rawOrder)
  order.sign()
  return order.submit()
}



function toToken(){
  this.name = ''
  this.balance = 0
  this.allowance = 0
  this.digits = 0
}


function toRawTx(formInput){
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
    rawTx.to = token.address
  }
  function setValue(){
    rawTx.value = utils.getAmount(0)
  }
  function setData(){
    if(token.name==='LRC'){
      const amountToPay = utils.toBigNumber(amount).plus(lrcFee).plus(response.result) // TODO response
    }else{
      const amountToPay = utils.toBigNumber(amount).plus(response.result) // TODO response
    }
    if (amountToPay.gt(token.allowance) ) {
        const JAVA_LONG_MAX = '9223372036854775806'
        let amountToApprove = utils.toBigNumber(JAVA_LONG_MAX,token.digits)
    }else{
        let amountToApprove = 0
    }
    if(type=='cancel'){
      amountToApprove = 0
    }
    amountToApprove = utils.getAmount(amountToApprove,token.digits)
    const spender = utils.getDelegateAddress()
    rawTx.data = abis.generateApproveData(spender,amountToApprove)
  }
  setGasLimit()
  setGasPrice()
  setTo()
  setValue()
  setData()
  retrun rawTx
}

function toRawTxs(){
  let {
    token,
    amount,
  } = formInput
  
  let rawTxs = []
  if(token.allowance > 0){
    const cancelTx = toRawTx(fromInput,'cancel')
    rawTxs.push(cancelTx)
  }
  const approveTx = toRawTx(fromInput)
  rawTxs.push(approveTx)
  
  let isGasEnough = utils.isGasEnough(rawTxs)
  // TODO
  return rawTxs
}


function sell(formInput){

  let rawOrder = toOrder(formInput)
  let rawTxs = toRawTxs(formInput)
  let bool = utils.isEthGasEnough(rawTxs)
  let order = Order(rawOrder)
}


