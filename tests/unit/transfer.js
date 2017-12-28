// require('babel-polyfill')
import * as apis from '../../2.0/common/apis'
import * as abis from '../../2.0/common/abis'
import Transaction from '../../2.0/transaction'
import Loopring from '../../2.0/loopring'

new Loopring('https://relay1.loopring.io/rpc')
console.log('LOOPRING_PROVIDER_HOST',LOOPRING_PROVIDER_HOST)



function generateRawTx(formInput){
	const formInput = {
		token={},
		gasLimit,
		to,
		value,
		data,
	}
	const globalConfig ={
		gasPrice
	}
	let  rawTx = {}

	rawTx.gasPrice = '0x' + (Number(globalConfig.settingsGasPrice) * 1e9).toString(16) //TODO
	rawTx.gasLimit = '0x' + Number(formInput.value).toString(16) // TODO

	if(token.name==='ETH'){
		rawTx.to = formInput.address
		rawTx.value = '0x' + (Number(formInput.value) * 1e18).toString(16) //TODO
		rawTx.data = formInput.additionalData || '0x'
	}else{
		rawTx.to = utils.getContractAddress(token) // TO BE CONFIRMED
		rawTx.value = '0x0'
		rawTx.data = abis.generateTransferData(
			formInut.address, 
			'0x' + (Number(formInut.value) * Number('1e' + token.digits)).toString(16) // TODO
		) 
	}
	balanceValidator(rawTx,token)
	gasValidator(token)
	return rawTx
}

async function transferStart(rawTx,address,privateKey,amount,tag){
    // let abiDataParams = {
    //   method:'transfer',
    //   address:address,
    //   amount: amount
    // }
    // let nonceParams = [
    //   address,
    //   tag,
    // ]
    tx = new Transaction(rawTx)
    // tx.setData(abiDataParams)
    // await tx.setNonce(...nonceParams) // setNonce 是的参数 address ，是什么 address ？
    tx.sign(privateKey)
    return tx
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



