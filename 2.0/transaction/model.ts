import EthTransaction from 'ethereumjs-tx'
import * as abis from '../common/abis'
import {validate} from '../common/validators'
import * as apis from './apis'
import {BaseTx,RawTx,SignedTx,PRIVATE_KEY_BUFFER} from './types'

export default class Transaction {

  public tx = {} 

  constructor(tx:BaseTx) { 
    validate({value:tx,type:'TX'})
    super()
    this.tx = tx
  }
  public getTx(){
    return this.tx
  }
  public setData(payload){
    this.tx.data = abis.getAbiData(payload)
  }
  public async setNonce(payload){
    this.tx.nonce = await apis.getTransactionCount(payload)
  }
  public sign({privateKey:PRIVATE_KEY_BUFFER}){
    validate({value:privateKey,type:'PRIVATE_KEY_BUFFER'})
    
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

