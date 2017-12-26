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

