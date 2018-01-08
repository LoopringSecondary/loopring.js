import * as apis from '../../2.0/common/apis'
import * as abis from '../../2.0/common/abis'
import Transaction from '../../2.0/transaction'
import Account from '../../2.0/account'
import utils from './utils'

const approveTxInput = {
  // token,
  // amount,
}
const approveCancelTxInput = {
	// token,
	// amount,
}

const transferTxInput = {
	// address,
	// gasLimit,
	// amount,
	// token,
	// data,
}
const convertTxInput = {
	// fromToken,
	// gasLimit,
	// amount,
}
const cancelOrderInput = {
	// signedOrder
}
const cancelAllOrdersInput = {
	// empaty object
}

const inputTx = approveTxInput || approveCancelTxInput || transferTxInput || convertTxInput || cancelOrderInput || cancelAllOrdersInput
const type = 'approve' || 'approveCancel' || 'transfer' || 'convert' || 'cancelOrder' || 'cancelAllOrders'

export default class txFormatter {
  constructor(type,inputTx) {
  	this.type = type
  	this.input = inputTx
  	this.raw = {}
    this.signed = ''
		this.setToken()
		this.setGasLimit()
		this.setGasPrice()
		this.setTo()
    this.setValue()
    this.setChainId()
		this.setData()

  }
  setToken(){
  	if(this.type === 'convert'){
  		this.token = utils.getTokenByName('WETH') // token.address , token.name  , token.digits, token.allowance
  	}
  	if(this.input.token){
  		this.token = this.input.token
  	}
  }
  setGasLimit(){
  	const gasLimit = this.input.gasLimit
  	this.raw.gasLimit = utils.getGasLimit(gasLimit)  
  }
  setGasPrice(){
  	this.raw.gasPrice = utils.getGasPrice() 
  }
  setTo(){
  	const token = this.token
  	const address = this.input.address
  	if(this.type === ('approve' || 'convert' || 'approveCancel')){
  		this.raw.to = token.address	 // token address
  	}
  	if(this.type === 'transfer'){
  		if(token.name ===' ETH'){ 
  			this.raw.to = address  // user address
  		}else{
  			this.raw.to = token.address
  		}
  	}
  	if(this.type ==== ('cancelOrder' || 'cancelAllOrders') ){
  		this.raw.to = utils.getContractAddress() // TO CONFIRM: loopring contract address 
  	}
  }
  setValue(){
  	if(this.type === ('approve' || 'approveCancel' || 'cancelOrder' || 'cancelAllOrders')){
  		this.raw.value = utils.getAmount(0)
  	}
  	if(this.type === ('transfer' || 'convert')){
  		if(token.name==='ETH'){
  			this.raw.value = utils.getAmount(amount)
  		}else{
  			this.raw.value = utils.getAmount(0)
  		}
  	}
  }
  setData(){
  	const digits = this.token.digits
  	const amount = this.amount && utils.getAmount(this.amount,digits)
  	if(this.type === 'approve'){
      const spender = utils.getDelegateAddress()
      this.raw.data = abis.generateTransferData(spender, amount)
      if(token.allowance > 0){
        this.cancelTx = {...this.raw}
        this.cancelTx.data = abis.generateTransferData(spender, '0x0')
      }
    }
  	if(this.type === 'transfer'){
      const address = this.address // user address ,not token address
  		const token = this.token // TODO
  		if(token.name==='ETH'){
  			this.raw.data = data || '0x'
  		}else{
  			this.raw.data = abis.generateTransferData(address, amount) 
  		}
  	}
  	if(this.type === 'convert'){
      const fromToken = this.input.fromToken // TODO
      const token = this.token // TODO
  		if(fromToken === 'ETH'){
  			this.raw.data = '0xd0e30db0' 
  		}else{
  			this.raw.data = abis.generateWithdrawData(amount)
  		}
  	}
  	if(this.type === 'cancelOrder'){
  		const signedOrder = this.input.signedOrder
  		this.raw.data = abis.generateCancelOrderData(signedOrder)
  	}
  	if(this.type === 'cancelAllOrders'){
  		const timestamp = utils.toHex(Date.parse(new Date()) / 1000)
  		this.raw.data = abis.generateCutOffData(timestamp)
  	}
  }
  setChainId(){
    this.raw.chainId = this.input.chainId || 1
  }
  async setNonce(address,tag){
    const tag = tag ? tag || 'latest'
    const nonce = await apis.getTransactionCount(address,tag)
    this.raw.nonce = utils.toHex(nonce+1)
    return this
  }
  sign(privateKey){
    const account = new Account(privateKey)
    const address = account.address
    const _this = this
    return _this.setNonce(address).then(tx=>{
        _this.ethTx = new Transaction(tx.raw)
        return _this.ethTx.sign(privateKey)
    })
  }
  send(){
    return this.ethTx.send(signed)
  }
}


