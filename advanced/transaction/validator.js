import * as apis from '../../2.0/common/apis'
import * as abis from '../../2.0/common/abis'
import Transaction from '../../2.0/transactioni'
import utils from './utils'

export default class txValidator {
  constructor(txs) {
    this.txs=txs
    this.uiTxs=[]
    this.setUI()
  }
  async isEThGasEnough(){
    const address = '' // TODO
    // const EthBalance = balances['ETH'] ? balances['ETH'].balance : 0;
    const EthBalance = await apis.getEthBalance(address,tag) // TODO how to getBalance
    const gasTotal = 0 
    this.txs.forEach(tx=>{ // txs format
       gasTotal += Number(tx.raw.gasLimit) * Number(tx.raw.gasPrice) // TODO gasLimit format
    })
    return gasTotal <= EthBalance
  }
  async sign(){
    for(tx of this.txs){
      await tx.sign()
    }
    this.txs.map(tx=>tx.sign())
  }
  async sign2(){
    const promises = this.txs.map(tx=>tx.sign())
    const results = await Promise.all(promises)
  }

  async send(){
    this.txs.map(tx=>{
      const result = await tx.send()
    })
  }
}


