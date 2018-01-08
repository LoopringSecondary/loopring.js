// require('babel-polyfill')
import * as apis from '../../2.0/common/apis'
import * as abis from '../../2.0/common/abis'
import Transaction from '../../2.0/transaction'
import Loopring from '../../2.0/loopring'
import txFormatter from './txFormatter'

new Loopring('https://relay1.loopring.io/rpc')
console.log('LOOPRING_PROVIDER_HOST',LOOPRING_PROVIDER_HOST)

function transferStart(transferTxInput){
	const tx = new txFormatter('transfer',transferTxInput)
	const txs = new txsFormatter(tx)
	if(!txs.isEThGasEnough()){
		// do sth likes trigger a notification
	}else{
		txs.sign() // TODO
		txs.send() // TODO
	}
}


