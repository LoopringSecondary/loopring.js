import * as apis from '../../2.0/common/apis'
import * as abis from '../../2.0/common/abis'
import Transaction from '../../2.0/transactioni'
import utils from './utils'

export default class txsFormatter {
  constructor(txs) {
  	this.txs=txs
  }
  isEThGasEnough(){

  }
  send(){
    // TODO
  }
}


async function transfer(formInput){
  // const rawTxs = toRawTxs(formInput)
  // let tx = new Transaction(rawTx)
  // tx.sign(privateKey)
  // const nonceParams=[]
  // await tx.setNonce(...nonceParams) // TO Be Confirm
  // return tx
}
// async function transferSend(){
//   let tx = await transfer()
//   let res = await tx.send()
// }
