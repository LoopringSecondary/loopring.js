
import {baseTx,signedTx,Tag,AbiMethod} from './types';
import * as apis from './apis';
import * as abis from '../common/abis';
import EthTransaction from 'ethereumjs-tx';

export default class Transaction {

  public tx = {}; 

  constructor(tx:baseTx) { 
    super();
    // TODO: type validator 
    this.tx = tx;
  }

  public setData({method:AbiMethod,timestamp,amount,address}){
    // TODO: type vlidator
    this.tx.data = abis.getAbiData({method,timestamp,amount,address});
    return this.tx;
  }

  public async setNonce({add:string,tag:Tag}){
    // TODO:type vlidator
    this.tx.nonce = await apis.getTransactionCount({add,tag});
    return this.tx;
  }

  private setSigned({privateKey}){
    // TODO: type vlidator
    const ethTx = new EthTransaction(this.tx);
    ethTx.sign(privateKey);
    this.tx.signed = '0x' + ethTx.serialize().toString('hex');
    return this.tx;
  }

  public async send(payload){
    // TODO: type vlidator
    return apis.sendRawTransaction(this.tx);
  }

  public sign(payload){
    return this.setSigned(payload);;
  }

  static async batchSend(){
    // TODO
  }

  static async batchSign(){
    // TODO
  }

}

