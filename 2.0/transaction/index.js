import EthTransaction from 'ethereumjs-tx'
import abis from '../common/abis'
import validator from '../common/validator'
import formatter from '../common/formatter'
import * as apis from '../common/apis'
// import {BaseTx,RawTx,SignedTx,RPC_TAG,ADDRESS} from '../common/types'

export default class Transaction {
  constructor(baseTx) { 
    // TODO validator.validate({value:tx,type:'TX'})
    this.rawTx = baseTx
    this.rawTx.chainId = this.rawTx.chainId || 1
    this.signedTx = null
  }
  setData(payload){
    this.rawTx.data = abis.getAbiData(payload)
  }
  async setNonce(add,tag){
    if(!this.rawTx.nonce){
    	this.rawTx.nonce = await apis.getTransactionCount(add,tag)
    }
  }
  sign(privateKey){
    validator.validate({value:privateKey,type:'PRIVATE_KEY'})
    privateKey = formatter.toBuffer(privateKey)

    const ethTx = new EthTransaction(this.rawTx)
    const signed = ethTx.sign(privateKey).serialize()
    this.signedTx = formatter.toHex(signed)
  }
  async send(){
    return apis.sendRawTransaction(this.signedTx)
  }
  static async batchSend(){
    // TODO
  }
  static async batchSign(){
    // TODO
  }
}




  

