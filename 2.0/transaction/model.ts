import EthTransaction from 'ethereumjs-tx';
import * as apis from './apis';
import * as abis from '../common/abis';
import {validate} from './validators';
import {baseTx,signedTx,PRIVATE_KEY_BUFFER} from './types';

export default class Transaction {

  public tx = {

  }; 

  constructor(tx:baseTx) { 
    super();
    // TODO: type validator 
    this.tx = tx;
  }
  public getTx(){
    return this.tx;
  }
  public setData(payload){
    this.tx.data = abis.getAbiData(payload);
  }
  public async setNonce(payload){
    this.tx.nonce = await apis.getTransactionCount(payload);
  }
  public setSigned({privateKey:PRIVATE_KEY_BUFFER}){
    validate({value:privateKey,type:'PRIVATE_KEY_BUFFER'})
    
    const ethTx = new EthTransaction(this.tx);
    ethTx.sign(privateKey);
    this.tx.signed = '0x' + ethTx.serialize().toString('hex');
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

