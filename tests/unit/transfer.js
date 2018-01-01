// require('babel-polyfill')
import * as apis from '../../2.0/common/apis'
import * as abis from '../../2.0/common/abis'
import Transaction from '../../2.0/transaction'
import Loopring from '../../2.0/loopring'

new Loopring('https://relay1.loopring.io/rpc')
console.log('LOOPRING_PROVIDER_HOST',LOOPRING_PROVIDER_HOST)


function toTx(formInput){
	let {
		token={},
		gasLimit,
		amount,
		address,
		data,
		additionalData,
	} = formInput
	let rawTx = {}
	function setGasLimit(){
		rawTx.gasLimit = utils.getGasLimit(gasLimit) // TODO
	}
	function setGasPrice(){
		rawTx.gasPrice = utils.getGasPrice() 
	}
	function setTo(){
		if(token.name==='ETH'){
			rawTx.to = address
		}else{
			rawTx.to = utils.getContractAddress(token) // TODO
		}
	}
	function setValue(){
		if(token.name==='ETH'){
			rawTx.value = utils.getAmount(amount)
		}else{
			rawTx.value = utils.getAmount(0)
		}
	}
	function setData(){
		if(token.name==='ETH'){
			rawTx.data = additionalData || '0x'
		}else{
			const amountToTransfer = utils.getAmount(amount,token.digits)
			rawTx.data = abis.generateTransferData(address, amountToTransfer)
		}
	}
	function isBlanceEnough(){
		// TODO  validator
		let isGasEnough = utils.isBlanceEnough(rawTx,token)
	}
	function isGasEnough(){
		// TODO  validator
		let isGasEnough = utils.isGasEnough(rawTx)
	}
	setGasLimit()
	setGasPrice()
	setTo()
	setValue()
	setData() 
	return rawTx
}

function validator(){
	// TODO
	const isBalanceEnough = utils.isBalanceEnough(rawTx,token) // TODO
	const isGasEnough = utils.isGasEnough(rawTx)
}

async function transfer(formInput){
	const rawTx = toRawTx(formInput)
	validator() // TODO
	let tx = new Transaction(rawTx)
	tx.sign(privateKey)
	const nonceParams=[]
	await tx.setNonce(...nonceParams) // TODO setNonce 是的参数 address ，是什么 address ？
	return tx
}
async function transferSend(){
	 let tx = await transfer()
	 let res = await tx.send()
}


