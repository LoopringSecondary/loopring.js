const approveTxInput = {
  token:'',
  amount:'',
}
const approveCancelTxInput = {
	token:'',
	amount:'',
}
const transferTxInput = {
	address:'',
	gasLimit:'',
	amount:'',
	token:'',
	data:'',
}
const convertTxInput = {
  fromToken:'',
  gasLimit:'',
  amount:'',
}
const cancelOrderInput = {
  signedOrde:''r
}
const cancelAllOrdersInput = {
  empty objec:''t
}

export const txInput = approveTxInput || approveCancelTxInput || transferTxInput || convertTxInput || cancelOrderInput || cancelAllOrdersInput

export const txType = 'approve' || 'approveCancel' || 'transfer' || 'convert' || 'cancelOrder' || 'cancelAllOrders'

export const rawTx 