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
		fromToken,
		gasLimit,
		amount,
	} = formInput

	let rawTx = {}
	let wethToken = utils.getTokenByName('WETH') // TODO

	function setGasLimit(){
		rawTx.gasLimit = utils.getGasLimit(gasLimit) 
	}
	function setGasPrice(){
		rawTx.gasPrice = utils.getGasPrice() 
	}
	function setTo(){
		rawTx.to = wethToken.address
	}
	function setValue(){
		if(fromToken === 'ETH'){
			rawTx.value = utils.getAmount(amount)
		}else{
			rawTx.value = utils.getAmount(0)
		}
	}
	function setData(){
		if(fromToken === 'ETH'){
			rawTx.data = '0xd0e30db0' // TODO why ?
		}else{
			amount = utils.getAmount(amount,wethToken.digits)
			rawTx.data = abis.generateWithdrawData(amount)
		}
	}
	setGasLimit()
	setGasPrice()
	setTo()
	setValue()
	setData()
	retrun rawTx
}

function toRawTxs(formInput){
	let rawTxs = []
	let rawTx = toRawTx(formInput)
	rawTxs.push(rawTx)
	let isGasEnough = utils.isGasEnough(rawTx)
	return rawTxs
}

function sendRelatedRawTxs(){
  // TODO
}


