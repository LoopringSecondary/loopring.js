import * as apis from '../../2.0/common/apis'
import * as abis from '../../2.0/common/abis'
import Transaction from '../../2.0/transactioni'
import utils from './utils'

export default class txValidator {
  constructor(txs) {
    this.txs=txs
    this.uiTxs=[]
    this.setUI()
  }
  setUI(){
    this.txs.forEach(tx=>{
      const token = tx.token
      const type = tx.type
      const gasLimit = tx.raw.gasLimit
      const gasPrice = tx.raw.gasPrice
      const amount = tx.input.amount // TODO

      let uiTx = {}
      uiTx.raw = tx.raw
      if(type == 'transfer'){
        const address = tx.input.address
        uiTx.title = `Transfer ${token.name},`
        uiTx.description = `Transfer ${amount} ${token.name} to ${address} with gas is ${gasLimit} and gasPrice is ${gasPrice/1e9} Gwei`
      }
      if(type == 'approve'){
        uiTx.title = `New Authorization Of ${token.name},`
        uiTx.description = `Improve ${token.name} Allowance to ${amount}  to pay the order fee with gas is ${gasLimit} and gasPrice is ${gasPrice/1e9} Gwei`
        if(tx.cancelTx){
          let cancelUiTx = tx.cancelTx
          tx.cancelUiTx.title = `Cancel Authorization Of ${token.name},`
          tx.cancelUiTx.description = `Improve ${token.name} Allowance to ${amount}  to pay the order fee with gas is ${gasLimit} and gasPrice is ${gasPrice/1e9} Gwei`
          this.uiTxs.push(tx.cancelUiTx)
        }
      }
      // more todo
      this.uiTxs.push(uiTx)
    })
  }
  sign(){
    
    // const promises = txs.map(tx=>{
    //   let tx = new Transaction(tx.raw)
    //   return tx.sign() // TODO
    // })
  }
  send(){
    
  }
  isBalanceEnough(){
    // 暂无应用场景
  }
  isSigned(){

  }
  isEThGasEnough(){
    
  }
}

  // async show(detail) {

  //     const relay = new Relay(this.settingsRelay+"/rpc");
  //     let nonce = await relay.getTransactionCount(this.wallet.address);

  //     const rawTxs = _.map(detail.raws, function (raw) {
  //         const rawTx = JSON.parse(raw.raw);
  //         rawTx.nonce = rawTx.nonce || nonce;
  //         rawTx.chainId= rawTx.chainId || this.appConfig.chainId || 1;
  //         nonce = '0x' + (Number(rawTx.nonce) + 1).toString(16);

  //         raw.raw = JSON.stringify(rawTx);
  //         return raw;
  //     }.bind(this));

  //     async.map(rawTxs, async function (rawTx) {
  //         const tx = await this.$.signer.sign(JSON.parse(rawTx.raw));
  //         return {
  //             raw: JSON.stringify(tx.tx),
  //             signed: tx.signedTx,
  //             subTitle: rawTx.subTitle,
  //             description:rawTx.description
  //         };
  //     }.bind(this), function (err, result) {

  //         if (err) {
  //             const detail = {text: err.message, category: "error", duration: 8000};
  //             this.dispatchEvent(new CustomEvent('notification', {
  //                 bubbles: true,
  //                 composed: true,
  //                 detail: detail
  //             }));
  //         } else {
  //             detail.raws = result;
  //             this.detail = detail;
  //             this.max = Number(nonce) -1;
  //             this.$.dialog.toggle()
  //         }
  //     }.bind(this));
  // }

  // sendTx() {
  //     async.each(this.detail.raws, async function (raw) {
  //         const relay = new Relay(this.settingsRelay+"/rpc");
  //         const result = await relay.sendSignedTx(raw.signed);
  //         const detail = { text: 'Submit tx successfully, Tx hash is', category: "info", duration: 8000, link: "https://etherscan.io/tx/" + result, linkText: result };
  //         this.dispatchEvent(new CustomEvent('notification', {
  //             bubbles: true,
  //             composed: true,
  //             detail: detail
  //         }));
  //     }.bind(this), function (err) {

  //         if(err && err.message.indexOf('known transaction') > -1){
  //             const txHash = '0x' + err.message.slice(err.message.indexOf('known transaction') + 19);
  //             const detail = { text: 'Submit tx successfully, Tx hash is', category: "info", duration: 8000, link: "https://etherscan.io/tx/" + txHash, linkText: txHash };
  //             this.dispatchEvent(new CustomEvent('notification', {
  //                 bubbles: true,
  //                 composed: true,
  //                 detail: detail
  //             }));
  //         } else if(err && err.message.indexOf('underpriced') > -1){
  //             const detail = {text: 'A tx with the same nonce has been sent, wait for it complete, or increase gasprice or gaslimit, then try again if you want to replace it', category: "warning", duration: 8000};
  //             this.dispatchEvent(new CustomEvent('notification', {
  //                 bubbles: true,
  //                 composed: true,
  //                 detail: detail
  //             }));
  //         } else if(err){
  //             const detail = {text: err.message, category: "error", duration: 8000};
  //             this.dispatchEvent(new CustomEvent('notification', {
  //                 bubbles: true,
  //                 composed: true,
  //                 detail: detail
  //             }));
  //         }
  //     }.bind(this))
  // }


