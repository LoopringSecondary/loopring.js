
import utils from './utils'

// TODO
const inputTx = {
	gasLimit,
	address,
	amount, // for value,data
	token, // for to,value,data
	data,// additonalDta
}

export default class txFormatter {
  constructor(inputTx,type) {
  	this.raw={}
		this.setGasLimit()
		this.setGasPrice()
		this.setTo()
		this.setValue()
		this.setData()
  }
  setGasLimit(){
  	this.raw.gasLimit = utils.getGasLimit(gasLimit) 
  }
  setGasPrice(){
  	this.raw.gasPrice = utils.getGasPrice() 
  }
  setTo(){
  	if(type == 'approve'){
  		this.raw.to = token.address	
  	}
  	if(type=='transfer'){
  		if(token.name==='ETH'){
  			this.raw.to = address
  		}else{
  			this.raw.to = utils.getContractAddress(token) // TODO
  		}
  	}
  }
  setValue(){
  	if(type=='approve' || type=='approveCancel'){
  		this.raw.value = utils.getAmount(0)
  	}
  	if(type=='transfer'){
  		if(token.name==='ETH'){
  			this.raw.value = utils.getAmount(amount)
  		}else{
  			this.raw.value = utils.getAmount(0)
  		}
  	}
  	if(type=='convert'){

  	}
  	
  }
  setData(){
  	if(type == 'approve'){
  		const spender = utils.getDelegateAddress()
  		const amountToApprove = utils.getAmount(amount,token.digits)
  		this.raw.data = abis.generateTransferData(spender, amountToApprove)
  	}
  	if(type == 'approveCancel'){
  		const spender = utils.getDelegateAddress()
  		const amountToApprove = utils.getAmount(0,token.digits)
  		this.raw.data = abis.generateTransferData(spender, amountToApprove)
  	}
  	if(type == 'transfer'){
  		if(token.name==='ETH'){
  			this.raw.data = data || '0x'
  		}else{
  			const amountToTransfer = utils.getAmount(amount,token.digits)
  			this.raw.data = abis.generateTransferData(address, amountToTransfer)
  		}
  	}
  	

  }
}


