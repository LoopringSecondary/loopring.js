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
  raw.lrcFee = this.isEnoughFee(this.lrcFee, this.lrcBalance,this.tokens) ? '0x' + (this._showAmount(this.lrcFee) * Number('1e' + this.lrc.digits)).toString(16) : '0x0';
  raw.marginSplitPercentage = Number(raw.lrcFee) !==0 ? Number(this.settingsMarginSplit) : 100;
  // lrcFee的作用
  //  - 存入order
  //  
  return raw;
}

function submitOrder(rawOrder){
  let order = new Order(rawOrder)
  order.sign()
  return order.submit()
}

function getPayment(){
  this.token=token
  this.gas=token
}

function allowance(token){

  
  return {

  }
  
  function getCurrent = ()=>{
    return token.allowance
  }
  function getRequired = ()=>{
    let required;
    if(token.name==='LRC'){
      required = Number(amount) + Number(lrcFee);
    }else{
      required = Number(amount)
    }
    return required
  }
  function getToApprove =()=>{
    let balance = token.balance;
    let allowance = token.allowance;
    let toApprove = token.allowance;
    let toApprove = token.requiedAl;



    if (balance < allowance) { 
        toApprove = balance 
    }
    if (balance > allowance) { 
        toApprove = allowance > required ? allowance : required
    }
    return amount
  }

  this.current = getCurrent()
  this.required = getRequired()
  

}

function getApprovedRawTx(amount){
    amount = '0x' + Number(amount).toString(16)
    let token = {}
    const spender = utils.getDelegateAddress()
    let tx = {}
    tx.gasLimit = utils.getDefaultGasLimit()
    tx.gasPrice = utils.getDefaultGasPrice()
    tx.to = token.address
    tx.value = '0x0'
    tx.data = abi.generateApproveData(spender,amount)
    return tx;
}

function generateRawTxs(){
  const raws = []
  const token = {};
  const currentAllowance = '';
  const requiredAllowance = '';
  const toApproveAllowance = '';

  if(currentAllowance>0){
    const cancelRawTx = getApprovedRawTx(0)
    raw.push(cancelRawTx)
  }
  const toApproveRawTx = getApprovedRawTx(toApproveAllowance) 
  raw.push(approveRawTx)
  
  function balanceCheck(){

  }
  function allowanceCheck(){
    // 如果 交易的是LRC
      // 比较 支付金额 和 已授权金额的大小
        // 如果支付金额 > 已授权金额
          // 如果已授权金额 为 0 ，怎新增一个授权的tx
          // 如果已授权金额 不为 0 ，怎新增两个授权的tx，
        // 
    // 如果交易的不是LRC
  }

  function lrcCheck(){
  }
  function gasCheck(){
  }
  function test(){

  }

}


            async placeBuyOrder() {



                try {
                    

                    let data = {};
                    const detail = {};
                    const raws = [];
                    // let currentVersion = this.settingsVersion;
                    // const spender = this.appConfig.delegateAddress;
                    // data.protocol = this.appConfig.contractVersionMap[currentVersion].address;
                    // data.owner = this.wallet.address;
                    // data.tokenS = this.tokenb.address;
                    // data.tokenB = this.tokens.address;
                    // data.amountS = '0x' + Number((Number(this.buyTotal) * Number('1e' + this.tokenb.digits)).toFixed(0)).toString(16);
                    // data.amountB = '0x' + (Number(this.buyAmount) * Number('1e' + this.tokens.digits)).toString(16);
                    // data.timestamp = Number((new Date().getTime() / 1000).toFixed(0));
                    // data.ttl = 10 * 24 * 3600;
                    // data.salt = Math.round(Math.random() * 1e8);
                    
                    // if (!this.lrc) {
                    //     const detail = {
                    //         text: 'Can\'t get LRC Config',
                    //         category: "warning",
                    //         duration: 5000
                    //     };
                    //     this.dispatchEvent(new CustomEvent('notification', {
                    //         bubbles: true,
                    //         composed: true,
                    //         detail: detail
                    //     }));
                    //     return;
                    // }
                    // data.lrcFee = this.isEnoughFee(this.lrcFee, this.lrcBalance,this.tokenb) ? '0x' + (this._showAmount(this.lrcFee) * Number('1e' + this.lrc.digits)).toString(16) : '0x0';
                    // data.buyNoMoreThanAmountB = true;
                    // data.marginSplitPercentage = Number(data.lrcFee) !==0 ? Number(this.settingsMarginSplit) : 100;
                    // detail.order = {
                    //     raw: JSON.stringify(data),
                    //     subTitle: "Place an order",
                    //     description:"Buy "+Number(this.buyAmount)+" "+ this.tokens.token.toUpperCase()+" with "+ Number(this.buyTotal) +" "+ this.tokenb.token.toUpperCase()
                    // };

                    // const balances = _.keyBy(this.balancesRaw.result.tokens, 'token');
                    // const balance = balances[this.tokenb.token.toUpperCase()] ? Number(balances[this.tokenb.token.toUpperCase()].balance) : 0;
                    // const allowance = balances[this.tokenb.token.toUpperCase()].allowance ? Number(balances[this.tokenb.token.toUpperCase()].allowance) : 0;
                    // const defaultValue = Number(this.tokenb.allowance);
                    // buy order
                    // 如果用来购买的 token 是 lrc
                    if (this.tokenb.token.toUpperCase() === 'LRC') {

                        const require = Number(data.amounts) + Number(data.lrcFee);

                        // 如果 LRC的 消费数量 大于 授权的数量
                        if (require > allowance) {

                            let amount; // 设置授权数量

                            if (balance < defaultValue) { // 余额 小于所需授权
                                amount = balance; // 全部余额都授权
                            }

                            if (balance > defaultValue) { // 余额 小于所需授权
                                amount = defaultValue > require ? defaultValue : require
                            }


                            const tx = {};
                            tx.gasPrice = gasPrice;
                            tx.gasLimit = gasLimit;
                            tx.to = this.tokenb.address;
                            tx.value = '0x0';

                            // 如果 无授权
                            if (allowance === 0) {
                                // 新增1个授权 tx
                                tx.data = signer.generateApproveData(spender, '0x' + Number(amount).toString(16));
                                raws.push({"raw": JSON.stringify(tx),
                                    "subTitle": "New Authorization Of "+this.tokenb.token.toUpperCase(),
                                    "description":"Set allowance  to " + Number(amount)/Number('1e'+this.tokenb.digits)+" with gas is "+Number(gasLimit)+ " and gasPrice is " + Number(gasPrice)/1e9 + "Gwei."
                                });
                            } else {
                                tx.data = signer.generateApproveData(spender, '0x0');
                                const cancelRaw = JSON.stringify(tx);
                                tx.data = signer.generateApproveData(spender, '0x' + Number(amount).toString(16));
                                // 新增2个授权 tx
                                raws.push({
                                    "raw": cancelRaw,
                                    "subTitle": "Cancel Older Authorization Of " + this.tokenb.token.toUpperCase(),
                                    "description": "Set allowance  to 0 first in order to set Allowance to "+ Number(amount)/Number('1e'+this.tokenb.digits)+" with gas is "+Number(gasLimit)+ " and gasPrice is " + Number(gasPrice)/1e9 + "Gwei."
                                }, {"raw": JSON.stringify(tx),
                                    "subTitle": "New Authorization Of "+this.tokenb.token.toUpperCase(),
                                    "description":"Set allowance  to " + Number(amount)/Number('1e'+this.tokenb.digits)+" with gas is "+Number(gasLimit)+ " and gasPrice is " + Number(gasPrice)/1e9 + "Gwei."
                                });
                            }
                        }

                    } else {
                        // 如果购买的 token 不是 lrc
                        // 如果 卖出的 token 数量 大于 授权的token数量
                        if (Number(data.amountS) > allowance) {

                            let amount;

                            if (balance < defaultValue) {
                                amount = balance;
                            }

                            if (balance > defaultValue) {
                                amount = defaultValue > Number(data.amountS) ? defaultValue : Number(data.amountS)
                            }

                            const tx = {};
                            tx.gasPrice = gasPrice;
                            tx.gasLimit = gasLimit;
                            tx.to = this.tokenb.address;
                            tx.value = '0x0';
                            // 新增1个 授权 tx
                            if (allowance === 0) {
                                tx.data = signer.generateApproveData(spender, '0x' + Number(amount).toString(16));
                                raws.push({
                                    "raw": JSON.stringify(tx),
                                    "subTitle": "New Authorization Of " + this.tokenb.token.toUpperCase(),
                                    "description":"Set allowance  to " + Number(amount)/Number('1e'+this.tokenb.digits)+" with gas is "+Number(gasLimit)+ " and gasPrice is " + Number(gasPrice)/1e9 + "Gwei."
                                });
                            } else {
                              // 新增2个 授权 tx
                                tx.data = signer.generateApproveData(spender, '0x0');
                                const cancelRaw = JSON.stringify(tx);
                                tx.data = signer.generateApproveData(spender, '0x' + Number(amount).toString(16));

                                raws.push({
                                    "raw": cancelRaw,
                                    "subTitle": "Cancel Older Authorization Of " + this.tokenb.token.toUpperCase(),
                                    "description": "Set allowance  to 0 first in order to set Allowance to "+ Number(amount)/Number('1e'+this.tokenb.digits)+" with gas is "+Number(gasLimit)+ " and gasPrice is " + Number(gasPrice)/1e9 + "Gwei."
                                }, {
                                    "raw": JSON.stringify(tx),
                                    "subTitle": "New Authorization Of " + this.tokenb.token.toUpperCase(),
                                    "description":"Set allowance  to " + Number(amount)/Number('1e'+this.tokenb.digits)+" with gas is "+Number(gasLimit)+ " and gasPrice is " + Number(gasPrice)/1e9 + "Gwei."
                                });
                            }
                        }

                        // 如果 lrc 的撮合费用 > lrc的授权费
                        if (Number(data.lrcFee) > this.lrcAllowance * Number('1e' + this.lrc.digits)) {

                            const defaultlrc = Number(this.lrc.allowance);
                            const lrcBalance = this.lrcBalance * Number('1e' + this.lrc.digits);
                            const lrcFee = Number(data.lrcFee) ;

                            let lrcAmount;
                            if (defaultlrc >= lrcBalance) {
                                lrcAmount = lrcBalance;
                            }

                            if (defaultlrc < lrcBalance) {
                                lrcAmount = defaultlrc > lrcFee ? defaultlrc : lrcFee;
                            }

                            const tx = {};
                            tx.gasPrice = gasPrice;
                            tx.gasLimit = gasLimit;
                            tx.to = this.tokenb.address;
                            tx.value = '0x0';

                            if (this.lrcAllowance === 0) {
                                // 新增lrc授权
                                tx.data = signer.generateApproveData(spender, '0x' + Number(lrcAmount).toString(16));
                                raws.push({"raw": JSON.stringify(tx), "subTitle": " New Authorization Of LRC ",
                                    "description":"Improve LRC Allowance to " +Number(lrcAmount)/Number('1e'+this.lrc.digits) +" to pay the order fee"+" with gas is "+Number(gasLimit)+ " and gasPrice is " + Number(gasPrice)/1e9 + "Gwei."});
                            } else {
                                tx.data = signer.generateApproveData(spender, '0x0');
                                const cancelRaw = JSON.stringify(tx);
                                tx.data = signer.generateApproveData(spender, '0x' + Number(lrcAmount).toString(16));

                                raws.push({
                                    "raw": cancelRaw,
                                    "subTitle": "Cancel Older Authorization Of LRC",
                                    "description":"Set LRC allowance to 0 in order to improve it to "+Number(lrcAmount)/Number('1e'+this.lrc.digits) +" to pay the order fee with gas is "+Number(gasLimit)+ " and gasPrice is " + Number(gasPrice)/1e9 + "Gwei."
                                }, {"raw": JSON.stringify(tx), "subTitle": "New Authorization Of LRC",
                                    "description":"Improve LRC Allowance to " +Number(lrcAmount)/Number('1e'+this.lrc.digits) +" to pay the order fee"+" with gas is "+Number(gasLimit)+ " and gasPrice is " + Number(gasPrice)/1e9 + "Gwei."
                                });
                            }

                        }
                    }
                    const ETHBalance = balances['ETH'] ? balances['ETH'].balance : 0;
                    if (ETHBalance < raws.length * (Number(gasLimit) * Number(gasPrice))) {
                        const errorDetail = {
                            text: 'You has insufficient ETH balance for gasLimit * gasPrice',
                            category: "warning",
                            duration: 8000
                        };
                        this.dispatchEvent(new CustomEvent('notification', {
                            bubbles: true,
                            composed: true,
                            detail: errorDetail
                        }));
                        return;
                    }
                    detail.raws = raws;
                    this.dispatchEvent(new CustomEvent('placeorder', {
                        bubbles: true,
                        composed: true,
                        detail: detail
                    }));
                } catch (e) {

                    const detail = {
                        text: e.message,
                        category: "error",
                        duration: 5000
                    };
                    this.dispatchEvent(new CustomEvent('notification', {
                        bubbles: true,
                        composed: true,
                        detail
                    }));
                }
            }

