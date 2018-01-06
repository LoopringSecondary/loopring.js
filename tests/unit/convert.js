// require('babel-polyfill')
import * as apis from '../../2.0/common/apis'
import * as abis from '../../2.0/common/abis'
import Transaction from '../../2.0/transaction'
import Loopring from '../../2.0/loopring'
import utils from './utils'

new Loopring('https://relay1.loopring.io/rpc')
console.log('LOOPRING_PROVIDER_HOST',LOOPRING_PROVIDER_HOST)


function toRawTxs(formInput){
	let rawTxs = []
	let rawTx = toRawTx(formInput)
	rawTxs.push(rawTx)
	let isGasEnough = utils.isGasEnough(rawTx)
	return rawTxs
}

function convertStart(convertTxInput){
	const txformatter = new txFormatter('convert',convertTxInput)
	const txs = new txsFormatter([tx])
	if(!tx.isBalanceEnough()){
		// do sth likes trigger a notification
	}
	if(!txs.isEThGasEnough()){
		// do sth likes trigger a notification
	}else{
		txs.sign() // TODO
		txs.send() // TODO
	}
}

