// require('babel-polyfill')
import * as apis from '../../2.0/common/apis'
import * as abis from '../../2.0/common/abis'
import Transaction from '../../2.0/transaction'
import Loopring from '../../2.0/loopring'

new Loopring('https://relay1.loopring.io/rpc')
console.log('LOOPRING_PROVIDER_HOST',LOOPRING_PROVIDER_HOST)

// order interfaces
  // rawOrder
  // signedOrder


function toAmount =  {
  raw.amountS = '0x' + (Number(this.sellAmount) * Number('1e' + this.tokens.digits)).toString(16);
  raw.amountB = '0x' + Number((Number(this.sellTotal) * Number('1e' + this.tokenb.digits)).toFixed(0)).toString(16);
}

function auth(){

  // 判断 是否登录 （钱包是否存在）
  // 判断：钱包地址是否在白名单里
  // 判断：系统配置是否设置（应该是有默认值的）
  // 判断：LRC 配置是否配置
  if (!this.wallet) {

      const detail = {
          text: 'Set Wallet First!',
          category: 'warning',
          duration: 5000,
          link: '/#/wallet',
          linkText: 'Go to set Wallet'
      };

      this.dispatchEvent(new CustomEvent('notification', {
          bubbles: true,
          composed: true,
          detail: detail
      }));

      return;
  }
  if (!this.appConfig || !this.settingsMarginSplit || !this.settingsLrcFee) {
      return;
  }
  if (this.appConfig.whiteList && this.appConfig.whiteList.indexOf(this.wallet.address) < 0) {
      const detail = {
          text: 'Your address is not in white list, could not submit order',
          category: "warning",
          duration: 5000
      };
      this.dispatchEvent(new CustomEvent('notification', {
          bubbles: true,
          composed: true,
          detail: detail
      }));
      return;
  }
}

function lrcValidator(){
  // TODO
}

// TODO
isLrcFeeEnough(lrcFee, lrcBalance, token, amount) {

    if (lrcFee >= 0 && lrcBalance >= 0 && token && amount >= 0) {
        return token.token.toUpperCase() === "LRC" ? Number(amount) + lrcFee <= lrcBalance: lrcFee <= lrcBalance;
    }
    return true
}
// TODO
function getLrcFee(){
  let bool = this.isLrcFeeEnough(this.sellFee, this.lrcBalance,this.tokens,this.sellAmount)

  if(bool){
    // lrcFee is enoungh
    return '0x' + new BigNumber(this._showAmount(this.sellFee)).times(Number('1e' + this.lrc.digits)).toString(16)
  }else{
    return '0x0'
  }
}

function generateRawOrder(formInput){
  const {
    tokens={},
    tokenb={},
    sellAmount,
    sellTotal, // TODO ，why not buyTotal
  } = formInput

  const raw = {}
  raw.protocol = utils.getContractAddress()
  raw.owner = utils.getWalletAddress()
  raw.tokenS = tokens.address;
  raw.tokenB = tokenb.address;
  raw.amountS = toAmount(sellAmount,tokens.digits)
  raw.amountB = toAmount(sellTotal,tokenb.digits)
  raw.timestamp = Number((new Date().getTime() / 1000).toFixed(0));
  raw.ttl = 30 * 24 * 3600;
  raw.salt = Math.round(Math.random() * 1e8);
  raw.buyNoMoreThanAmountB = false;
  raw.lrcFee = getLrcFee()
  raw.marginSplitPercentage = Number(raw.lrcFee) !==0 ? Number(this.settingsMarginSplit) : 100;
  return raw;
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


function token(){

  // lrcFee  TODO
  // response TODO
  this.name = ''
  this.balance = 0
  this.allowance = 0
  this.amountToPay = 0
  this.amountToApprove

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


function sell(){
  let order = Order()

  let token = token()
  let rawTxs = token.generateRawTxs


}



function getAmountToPay(token,lrcFee){

  if(token.name==='LRC'){
    // amountToPay = Number(amount) + Number(lrcFee);
    token.amountToPay = new BigNumber(token.amountToPay).plus(lrcFee).plus(response.result) ;
  }else{
    token.amountToPay = new BigNumber(token.amountToPay).plus(response.result) ;
  }
  return amountToPay
}

function getAmountToApprove(token){

  if (token.amountToPay.gt(token.allowance) ) {
      const JAVA_LONG_MAX = '9223372036854775806'
      token.amountToApprove = new BigNumber(JAVA_LONG_MAX).times(Number('1e'+token.digits))
  }else{
      token.amountToApprove = 0 // Do need to approve
  }
  return token.amountToApprove
}



function generateRawTxs(order){
  let raws = []
  if(token.amountToApprove){
    if(token.allowance>0){
      const cancelRawTx = getApprovedRawTx(0)
      raws.push(cancelRawTx)
    }
    const toApproveRawTx = getApprovedRawTx(token.amountToApprove) 
    raws.push(approveRawTx)
  }

}


