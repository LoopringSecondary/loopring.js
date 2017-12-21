import EthTransaction from 'ethereumjs-tx';
import * as apis from './apis';
import * as abis from '../common/abis';
import {validate} from './validators';
import {baseTx,signedTx,Tag,AbiMethod} from './types';

export default class Transaction {

  public tx = {}; 

  constructor(tx:baseTx) { 
    super();
    // TODO: type validator 
    this.tx = tx;
  }

  public setData(payload){
    this.tx.data = abis.getAbiData(payload);
    return this.tx;
  }

  public async setNonce(payload){
    this.tx.nonce = await apis.getTransactionCount(payload);
    return this.tx;
  }

  private setSigned({privateKey:PRIVATE_KEY}){
    validate({value:privateKey,type:'PRIVATE_KEY'})
    
    const ethTx = new EthTransaction(this.tx);
    ethTx.sign(privateKey);
    this.tx.signed = '0x' + ethTx.serialize().toString('hex');
    return this.tx;
  }

  public async send(){
    return apis.sendRawTransaction(this.tx.signed);
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

