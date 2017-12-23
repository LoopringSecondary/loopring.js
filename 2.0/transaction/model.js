import EthTransaction from 'ethereumjs-tx'
import abis from '../common/abis'
import validator from '../common/validator'
import * as apis from './apis'
// import {BaseTx,RawTx,SignedTx,RPC_TAG,ADDRESS} from './types'

export default class Transaction {

  // tx = {}

  constructor(tx) { 
    validator.validate({value:tx,type:'TX'})
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
    validator.validate({value:privateKey,type:'PRIVATE_KEY_BUFFER'})
    const ethTx = new EthTransaction(this.tx)
    ethTx.sign(privateKey)
    this.tx.signed = '0x' + ethTx.serialize().toString('hex')
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

