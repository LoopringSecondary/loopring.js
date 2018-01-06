// require('babel-polyfill')
import * as apis from '../../2.0/common/apis'
import * as abis from '../../2.0/common/abis'
import Transaction from '../../2.0/transaction'
import Loopring from '../../2.0/loopring'
import utils from './utils'

new Loopring('https://relay1.loopring.io/rpc')
console.log('LOOPRING_PROVIDER_HOST',LOOPRING_PROVIDER_HOST)


function approveStart(approveTxInput){
	const tx = new txFormatter('approve',approveTxInput)
	const isCancleNeeded = true // TODO
	if(tx.isCancleNeeded){
		const cancelTx = new txFormatter('approveCancel',approveTxInput)
		const txs = new txsFormatter([tx,cancelTx])
	}else{
		const txs = new txsFormatter([tx])
	}
	if(!txs.isEThGasEnough()){
		// do sth likes trigger a notification
	}else{
		txs.sign() // TODO
		txs.send() // TODO
	}
}



