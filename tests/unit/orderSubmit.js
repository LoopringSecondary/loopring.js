// require('babel-polyfill')
import * as apis from '../../2.0/common/apis'
import * as abis from '../../2.0/common/abis'
import Transaction from '../../2.0/transaction'
import Loopring from '../../2.0/loopring'

new Loopring('https://relay1.loopring.io/rpc')
console.log('LOOPRING_PROVIDER_HOST',LOOPRING_PROVIDER_HOST)

function orderFormatter(formInput){
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
    data.amountS = utils.getAmount(orderAmount,tokens.digits)
    data.amountB = utils.getTotalAmount(orderAmount,orderPrice,tokenb.digits)
  }
  if(orderType=='buy'){
    data.amountS = utils.getTotalAmount(orderAmount,orderPrice,tokens.digits)
    data.amountB = utils.getAmount(orderAmount,tokenb.digits)
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

function getApprovedRawTx(token){
    const spender = utils.getDelegateAddress()
    const amountToApprove = token.amountToApprove
    // amountToApprove = '0x' + Number(amountToApprove).toString(16)
    return {
      gasLimit: utils.getDefaultGasLimit(),
      gasPrice: utils.getDefaultGasPrice(),
      to: token.address,
      value: '0x0',
      data: abi.generateApproveData(spender,amountToApprove)
    }
}

function Token(order,orderType){

  // lrcFee  TODO
  // response TODO
  this.name = ''
  this.balance = 0
  this.allowance = 0
  this.amountToPay = 0
  this.amountToApprove = 0
  this.digits = 0

  this.setAmountToPay = ()=>{
    if(this.name==='LRC'){
      // amountToPay = Number(amount) + Number(lrcFee);
      this.amountToPay = new BigNumber(this.amountToPay).plus(lrcFee).plus(response.result) ;
    }else{
      this.amountToPay = new BigNumber(this.amountToPay).plus(response.result) ;
    }
  }
  
  this.setAmountToPay()

  this.setAmountToApprove = ()=>{
    if (this.amountToPay.gt(this.allowance) ) {
        const JAVA_LONG_MAX = '9223372036854775806'
        this.amountToApprove = new BigNumber(JAVA_LONG_MAX).times(Number('1e'+this.digits))
    }else{
        this.amountToApprove = 0 
        // Do need to approve
    }
  }

  this.setAmountToApprove()

  this.generateRawTxs = ()=>{
    let raws = []
    if(this.amountToApprove){
      if(this.allowance>0){
        const cancelRawTx = getApprovedRawTx(0)
        raws.push(cancelRawTx)
      }
      const toApproveRawTx = getApprovedRawTx(this.amountToApprove) 
      raws.push(toApproveRawTx)
    }
    return raws
  }
}


function sell(formInput){

  let rawOrder = orderFormatter(formInput)
  let order = Order(rawOrder)
  let token = Token(rawOrder)
  let rawTxs = token.generateRawTxs
  let bool = utils.isEthGasEnough(rawTxs)
}


