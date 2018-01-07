import * as apis from '../../2.0/common/apis'
import * as abis from '../../2.0/common/abis'
import Transaction from '../../2.0/transactioni'
import utils from './utils'

export default class txsFormatter {
  constructor(txs) {
    this.txs=txs
    this.uiTxs=[]
  }
  
  setUI(){
    this.txs.forEach(tx=>{
      const token = tx.token
      const type = tx.type
      const gasLimit = tx.raw.gasLimit
      const gasPrice = tx.raw.gasPrice
      const amount = tx.input.amount // TODO

      let uiTx = {}
      uiTx.raw = tx.raw
      if(type == 'transfer'){
        const address = tx.input.address
        uiTx.title = `Transfer ${token.name},`
        uiTx.description = `Transfer ${amount} ${token.name} to ${address} with gas is ${gasLimit} and gasPrice is ${gasPrice/1e9} Gwei`
      }
      if(type == 'approve'){
        uiTx.title = `New Authorization Of ${token.name},`
        uiTx.description = `Improve ${token.name} Allowance to ${amount}  to pay the order fee with gas is ${gasLimit} and gasPrice is ${gasPrice/1e9} Gwei`
        if(tx.raws.length==2){
          let cancelRawTx = tx.raws[0]
          let cancelUiTx = {...uiTx}
          cancelUiTx.title = `Cancel Authorization Of ${token.name},`
          cancelUiTx.description = `Improve ${token.name} Allowance to ${amount}  to pay the order fee with gas is ${gasLimit} and gasPrice is ${gasPrice/1e9} Gwei`
          this.uiTxs.push(cancelUiTx)
        }
        
      }
      // more todo
      this.uiTxs.push(uiTx)
    })
    
  }
  
  sign(){
    // TODO
  }
  send(){
    // TODO
  }

  isEThGasEnough(){
    this.
  }
  
}

async function transfer(formInput){
  
}
// async function transferSend(){
//   let tx = await transfer()
//   let res = await tx.send()
// }
