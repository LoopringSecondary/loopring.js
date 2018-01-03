// require('babel-polyfill')
import * as apis from '../../2.0/common/apis'
import * as abis from '../../2.0/common/abis'
import Transaction from '../../2.0/transaction'
import Loopring from '../../2.0/loopring'
import utils from './utils'

new Loopring('https://relay1.loopring.io/rpc')
console.log('LOOPRING_PROVIDER_HOST',LOOPRING_PROVIDER_HOST)


function toRawTx(formInput,type){
	let {
		token,
		gasLimit,
		amount,
	} = formInput

	let rawTx = {}
	function setGasLimit(){
		rawTx.gasLimit = utils.getGasLimit(gasLimit) 
	}
	function setGasPrice(){
		rawTx.gasPrice = utils.getGasPrice() 
	}
	function setTo(){
		rawTx.to = token.address
	}
	function setValue(){
		rawTx.value = utils.getAmount(0)
	}
	function setData(){
		if(type == 'cancel'){
			const amount = 0
		}
		const spender = utils.getDelegateAddress()
		const amountToApprove = utils.getAmount(amount,token.digits)
		rawTx.data = abis.generateTransferData(spender, amountToApprove)
	}
	setGasLimit()
	setGasPrice()
	setTo()
	setValue()
	setData()
	retrun rawTx
}

function toRawTxs(){
	let {
		token,
		amount,
	} = formInput
	
	let rawTxs = []
	if(token.allowance > 0){
		const cancelTx = toRawTx(fromInput,'cancel')
		rawTxs.push(cancelTx)
	}
	const approveTx = toRawTx(fromInput)
	rawTxs.push(approveTx)
	
	let isGasEnough = utils.isGasEnough(rawTxs)
	// TODO
	return rawTxs
}

function approve(formInput){
	let rawsTxs = toRawTxs(formInput)
}



