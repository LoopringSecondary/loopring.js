import EthTransaction from 'ethereumjs-tx'
import abis from '../common/abis'
import validator from '../common/validator'
import * as apis from './apis'
import {BaseTx,RawTx,SignedTx,RPC_TAG,ADDRESS} from './types'

export default class Transaction {

  public tx = <any>{}

  constructor(tx:BaseTx) { 
    validator.validate({value:tx,type:'TX'})
    this.tx = tx
  }

  public getTx(){
    return this.tx
  }

  public setData(payload){
    this.tx.data = abis.getAbiData(payload)
  }

  public async setNonce(add:ADDRESS,tag:RPC_TAG){
    validator.validate({value:add,type:'ADDRESS'})
    this.tx.nonce = await apis.getTransactionCount(add,tag)
  }

  public sign(privateKey:Buffer){
    validator.validate({value:privateKey,type:'PRIVATE_KEY'})
    const ethTx = new EthTransaction(this.tx)
    ethTx.sign(privateKey)
    this.tx.signed = '0x' + ethTx.serialize().toString('hex')
  }

  public async send(){
    return apis.sendRawTransaction(this.tx.signed)
  }

  static async batchSend(){
    // TODO
  }

  static async batchSign(){
    // TODO
  }

}

