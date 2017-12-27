// require('babel-polyfill')
import * as apis from '../../2.0/common/apis'
import * as abis from '../../2.0/common/abis'
import Transaction from '../../2.0/transaction'
import Loopring from '../../2.0/loopring'

new Loopring('https://relay1.loopring.io/rpc')
console.log('LOOPRING_PROVIDER_HOST',LOOPRING_PROVIDER_HOST)

async function transferStart(rawTx,address,privateKey,amount,tag){
    let abiDataParams = {
      method:'transfer',
      address:address,
      amount: amount
    }
    let nonceParams = [
      address,
      tag,
    ]
    tx = new Transaction(rawTx)
    tx.setData(abiDataParams)
    await tx.setNonce(...nonceParams)
    tx.sign(privateKey)
    return tx;
}

async function transfer(){
	 let tx = await transferStart()
	 let res = await tx.send()
}


// async function transferByStatic(rawTx,address,privateKey,amount,tag){
//     let abiDataParams = {
//       method:'transfer',
//       address:address,
//       amount: amount
//     }
//     let nonceParams = [
//       address,
//       tag,
//     ]
    
//     if(!rawTx.data){
//     	rawTx.data = Transaction.generateAbiData(abiDataParams)
//     }
//     if(!rawTx.nonce){
//     	rawTx.nonce = await Transaction.generateNonce(...nonceParams)
//     }
//     if(!rawTx.chainId){
//     	rawTx.chainId = 1
//     }
//     const signedTx = Transaction.sign(rawTx,privateKey)
//     const res = Transaction.send(signedTx)

// }



