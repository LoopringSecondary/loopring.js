// require('babel-polyfill')
import * as apis from '../../2.0/common/apis'
import * as abis from '../../2.0/common/abis'
import Transaction from '../../2.0/transaction'
import Loopring from '../../2.0/loopring'
import utils from './utils'

new Loopring('https://relay1.loopring.io/rpc')
console.log('LOOPRING_PROVIDER_HOST',LOOPRING_PROVIDER_HOST)


function toRawTx(formInput){
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
	utils.isBalanceEnough(rawTx,token)

	setGasLimit()
	setGasPrice()
	setTo()
	setValue()
	setData()
	retrun rawTx
}

function toRawTxs(formInput){
	let rawTxs = []
	const rawTx = toRawTx(fromInput)
	rawTxs.push(rawTx)
	const isBalanceEnough = utils.isBalanceEnough(rawTx,token)
	// TODO
	let isGasEnough = utils.isGasEnough(rawTxs)
	// TODO
	return rawTxs
}

async function transfer(formInput){
	const rawTxs = toRawTxs(formInput)
	// let tx = new Transaction(rawTx)
	// tx.sign(privateKey)
	// const nonceParams=[]
	// await tx.setNonce(...nonceParams) // TO Be Confirm
	// return tx
}
async function transferSend(){
	 // let tx = await transfer()
	 // let res = await tx.send()
}


