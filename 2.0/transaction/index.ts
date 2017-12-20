
import * as types from './types';
import * as apis from '../common/apis';
import * as abis from '../common/abis';
import EthTransaction from 'ethereumjs-tx';

export default class Transaction {

	tx = {}; // TODO type

  constructor(tx) { // TODO type
    super(); 
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

  private setSigned(payload){
  	let privateKey; // TODO type
  	const ethTx = new EthTransaction(this.tx);
  	ethTx.sign(privateKey);
  	this.tx.signed = '0x' + ethTx.serialize().toString('hex');
  	return this.tx;
  }

  public async send(payload){
  	return apis.sendRawTransaction(this.tx);
  }

  public sign(payload){
  	this.setSigned(payload);
  	return this.tx;
  }

  static async batchSend(){
  	// TODO
  }

  static async batchSign(){
  	// TODO
  }

}

