import EthTransaction from 'ethereumjs-tx'
import abis from '../common/abis'
import validator from '../common/validator'
import formatter from '../common/formatter'
import * as apis from '../common/apis'
// import {BaseTx,RawTx,SignedTx,RPC_TAG,ADDRESS} from '../common/types'

export default class Transaction {
  constructor(tx) { 
    // TODO validator.validate({value:tx,type:'TX'})
    this.tx = tx
  }
  getTx(){
    return this.tx
  }
  setData(payload){
    this.tx.data = abis.getAbiData(payload)
  }
  async setNonce(add,tag){
    validator.validate({value:add,type:'ADDRESS'})
    validator.validate({value:tag,type:'RPC_TAG'})
    this.tx.nonce = await apis.getTransactionCount(add,tag)
  }
  sign(privateKey){
    validator.validate({value:privateKey,type:'PRIVATE_KEY'})
    privateKey = formatter.toBuffer(privateKey)
    const ethTx = new EthTransaction(this.tx)
    const signed = ethTx.sign(privateKey).serialize()
    this.tx.signed = formatter.toHex(signed)
  }
  async send(){
    return apis.sendRawTransaction(this.tx.signed) 
  }
  static async batchSend(){
    // TODO
  }
  static async batchSign(){
    // TODO
  }
}

  // this.generateTx = async (rawTx, privateKey) =>
  //   {
  //       const wallet = new Wallet();
  //       wallet.setPrivateKey(ethUtil.toBuffer(privateKey));

  //       const validResult = ajv.validate(transactionSchema, rawTx);

  //       if (validResult.error)
  //       {
  //           throw new Error('invalid Tx data ');
  //       }

  //       const gasLimit = new BigNumber(Number(rawTx.gasLimit));

  //       if (gasLimit.lessThan(21000))
  //       {
  //           throw new Error('gasLimit must be greater than 21000');
  //       }

  //       if (gasLimit.greaterThan(5000000))
  //       {
  //           throw new Error('gasLimit is too big');
  //       }

  //       const balance = await this.getAccountBalance(wallet.getAddress());

  //       const needBalance = new BigNumber(rawTx.value).add(gasLimit * new BigNumber(rawTx.gasPrice));

  //       if (balance.lessThan(needBalance))
  //       {
  //           throw new Error('Balance  is not enough');
  //       }

  //       const nonce = await this.getTransactionCount(wallet.getAddress());

  //       rawTx.nonce = rawTx.nonce || nonce;
  //       rawTx.chainId = rawTx.chainId || 1;

  //       const signed = signer.signEthTx(rawTx, privateKey);
  //       return {
  //           tx: rawTx,
  //           signedTx: signed
  //       };
  //   };

