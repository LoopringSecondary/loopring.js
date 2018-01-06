import * as apis from '../../2.0/common/apis'
import * as abis from '../../2.0/common/abis'
import Transaction from '../../2.0/transactioni'
import utils from './utils'

export default class txsFormatter {
  constructor(txs) {
    this.txs=txs
    this. = []
  }
  setUI(){
    this.txs.forEach()
    const token = this.token
    const address = this.input.address
    const gasLimit = this.raw.gasLimit
    const gasPrice = this.raw.gasPrice
    if(this.type == 'transfer'){
      this.title = `Transfer ${token.name},`
      this.description = `Transfer ${amount} ${token.name} to ${address} with gas is ${gasLimit} and gasPrice is ${gasPrice/1e9} Gwei`
    }
    if(this.type == 'approve'){
      this.title = `New Authorization Of ${token.name},`
      this.description = `Improve ${token.name} Allowance to ${amount}  to pay the order fee with gas is ${gasLimit} and gasPrice is ${gasPrice/1e9} Gwei`
    }
    if(this.type == 'approveCancel'){
      this.title = `New Authorization Of ${token.name},`
      this.description = `Improve ${token.name} Allowance to ${amount}  to pay the order fee with gas is ${gasLimit} and gasPrice is ${gasPrice/1e9} Gwei`
    }
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
