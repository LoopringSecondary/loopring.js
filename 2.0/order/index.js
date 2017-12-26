import EthTransaction from 'ethereumjs-tx'
import abis from '../common/abis'
import validator from '../common/validator'
import formatter from '../common/formatter'
import * as apis from '../common/apis'
import Transaction from '../transaction'
import ethUtil  from 'ethereumjs-util'


export default class Order {
  constructor(order) { 
    validator.validate({value:order,type:'ORDER'})
    this.order = order
  }
  sign(privateKey){
      validator.validate({value:privateKey,type:'PRIVATE_KEY'})
      const orderTypes = [
          'address',
          'address',
          'address',
          'address',
          'uint',
          'uint',
          'uint',
          'uint',
          'uint',
          'uint',
          'bool',
          'uint8'
      ]
      const orderData = [
        this.order.protocol,
        this.order.owner, 
        this.order.tokenS, 
        this.order.tokenB,
        formatter.toBN(this.order.amountS),
        formatter.toBN(this.order.amountB),
        formatter.toBN(this.order.timestamp),
        formatter.toBN(this.order.ttl),
        formatter.toBN(this.order.salt),
        formatter.toBN(this.order.lrcFee),
        this.order.buyNoMoreThanAmountB,
        this.order.marginSplitPercentage
      ]
      const hash = abis.solSHA3(orderTypes, orderData)
      const finalHash = ethUtil.hashPersonalMessage(hash)
      const signature = ethUtil.ecsign(finalHash, privateKey)
      const v = formatter.toNumber(signature.v)
      const r = formatter.toHex(signature.r)
      const s = formatter.toHex(signature.s)
      return {
          ...this.order,v,r,s
      }
  }
  async submit(){
    return apis.submitOrder(this.order.signed)
  }
  // async cancel(amount, privateKey){
  //   this.sign()
  //   const rawTx = {...this.order}
  //   const tx = Transaction(rawTx)
  //   tx.setData({
  //     method:'cancelOrder',
  //     order:this.order
  //   })
  //   await tx.setNonce()
  //   await tx.sign(privateKey)
  //   await tx.send()
  // }
}
