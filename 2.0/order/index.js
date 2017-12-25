import EthTransaction from 'ethereumjs-tx'
import abis from '../common/abis'
import validator from '../common/validator'
import * as apis from '../common/apis'
import Transaction from '../transaction'


export default class Order {
  constructor(order) { 
    validator.validate({value:order,type:'ORDER'})
    this.order = order
  }
  // TODO
  sign(privateKey){
      validator.validate({value:privateKey,type:'PRIVATE_KEY_BUFFER'})
      // TODO
      this.order.signed = ''
  }
  async submit(){
    // order is signed
    // order's txs are sent successfull
    return apis.submitOrder(this.order.signed)
  }
  async cancel(amount, privateKey){
    // TODO
    this.sign()
    const rawTx = {...this.order} 
    const tx = Transaction(rawTx)
    tx.setData({
      method:'cancelOrder',
      order:this.order
    })
    await tx.setNonce() // TODO
    await tx.sign(privateKey) // TODO
    await tx.send() // TODO
  }
}
