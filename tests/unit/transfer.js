// require('babel-polyfill')
import * as apis from '../../2.0/common/apis'
import * as abis from '../../2.0/common/abis'
import Transaction from '../../2.0/transaction'
import Loopring from '../../2.0/loopring'

new Loopring('https://relay1.loopring.io/rpc')
console.log('LOOPRING_PROVIDER_HOST',LOOPRING_PROVIDER_HOST)


function inputFormatter(formInput){
	this.tx = {}
	function setGasLimit(){
		this.tx.gasLimit = utils.getGasLimit(gasLimit) // TODO
	}
	function setGasPrice(){
		this.tx.gasPrice = utils.getGasLimit() // TODO
	}
	function setTo(){
		if(token.name==='ETH'){
			this.tx.to = address
		}else{
			this.tx.to = utils.getContractAddress(token)
		}
	}
	function setValue(){
		if(token.name==='ETH'){
			this.tx.value = utils.getTokenAmount(value)
		}else{
			this.tx.value = '0x0'
		}
	}
	function setData(){
		if(token.name==='ETH'){
			this.tx.data = additionalData || '0x' // TODO
		}else{
			const address,amount // TODO
			this.tx.data = abis.generateTransferData(address, amount)
		}
	}
}


function transfter(formInput){
	const rawTx = inputFormatter(formInput)
	const balanceEnough = utils.isBalanceEnough(rawTx,token) // TODO
	const gasEnough = utils.isEthGasEnough(rawTx)
}

function generateRawTxs(formInput){
	let {
		token={},
		gasLimit,
		amount,
		address,
		data,
		additionalData,
	} = formInput

	let raws = []
	let rawTx = {}

	rawTx.gasPrice = utils.getGasPrice()
	rawTx.gasLimit = utils.getGasLimit(gasLimit)

	if(token.name==='ETH'){
		rawTx.to = address
		rawTx.value = utils.getAmount(value)
		rawTx.data = additionalData || '0x'
	}else{
		rawTx.to = utils.getContractAddress(token) // TO BE CONFIRMED
		rawTx.value = '0x0'
		rawTx.data = abis.generateTransferData(
			formInut.address, utils.getAmount(amount)
		) 
	}
	balanceValidator(rawTx,token) 
	gasValidator(token)
	raws.push(rawTx)
	return raws
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


