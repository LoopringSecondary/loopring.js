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


function generateRawOrder(){
  // AUTH validator
  // 判断 是否登录 （钱包是否存在）
  // 判断：系统配置是否设置（应该是有默认值的）
  // 判断：钱包地址是否在白名单里
  // 判断：LRC 配置是否配置
  const raw = {}
  const gasLimit = '0x14820'; // TODO default 
  const gasPrice = '0x' + (Number(this.settingsGasPrice) * 1e9).toString(16); // TODO formatter
  let currentVersion = this.settingsVersion;
  const spender = this.appConfig.delegateAddress;
  raw.protocol = this.appConfig.contractVersionMap[currentVersion].address;
  raw.owner = this.wallet.address;
  raw.tokenS = this.tokens.address;
  raw.tokenB = this.tokenb.address;
  raw.amountS = '0x' + (Number(this.sellAmount) * Number('1e' + this.tokens.digits)).toString(16);
  raw.amountB = '0x' + Number((Number(this.sellTotal) * Number('1e' + this.tokenb.digits)).toFixed(0)).toString(16);
  raw.timestamp = Number((new Date().getTime() / 1000).toFixed(0));
  raw.ttl = 30 * 24 * 3600;
  raw.salt = Math.round(Math.random() * 1e8);

  raw.lrcFee = this.isEnoughFee(this.lrcFee, this.lrcBalance,this.tokens) ? '0x' + (this._showAmount(this.lrcFee) * Number('1e' + this.lrc.digits)).toString(16) : '0x0';
  raw.buyNoMoreThanAmountB = false;
  raw.marginSplitPercentage = Number(raw.lrcFee) !==0 ? Number(this.settingsMarginSplit) : 100;
  return raw;
}

function submitOrder(rawOrder){
  let order = new Order(rawOrder)
  order.sign()
  return order.submit()
}

function generateRawTxs(){
  const raws = []
  // 如果 交易的是LRC
    // 比较 支付金额 和 已授权金额的大小
      // 如果支付金额 > 已授权金额
        // 如果已授权金额 为 0 ，怎新增一个授权的tx
        // 如果已授权金额 不为 0 ，怎新增两个授权的tx，
      // 
  // 如果交易的不是LRC
    // 

}
