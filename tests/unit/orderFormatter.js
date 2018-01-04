
import utils from './utils'

function orderFormatter(orderInput){
  const {
    tokens={},
    tokenb={},
    orderAmount,
    orderPrice,
    orderType,
  } = orderInput

  const order = {}
  order.protocol = utils.getContractAddress()
  order.owner = utils.getWalletAddress()
  order.tokenS = tokens.address
  order.tokenB = tokenb.address
  if(orderType=='sell'){
  	order.amountB = utils.getTotalAmount(orderAmount,orderPrice,tokenb.digits)
    order.amountS = utils.getAmount(orderAmount,tokens.digits)
  }
  if(orderType=='buy'){
    order.amountS = utils.getTotalAmount(orderAmount,orderPrice,tokens.digits)
    order.amountB = utils.getAmount(orderAmount,tokenb.digits)
  }
  order.timestamp = Number((new Date().getTime() / 1000).toFixed(0))
  order.ttl = utils.getTTL();
  order.salt = Math.round(Math.random() * 1e8);
  order.buyNoMoreThanAmountB = false

  function getLrcFee(){
  	const lrcFeePercentage = utils.getConfig('lrcFeePercentage') || 2

  	if(orderType==='sell'){
  	  let orderTotal = orderAmount
  	  // let orderTotal = order.amountB
  	}
  	if(orderType==='buy'){
  	  let orderTotal = orderAmount * orderPrice
  	  // let orderTotal = order.amountS
  	}
  	let lrcFee = orderTotal * lrcFeePercentage / 1000
  	let lrcBalance = utils.getBalanceByTokenName('LRC')

  	if(token.name == 'LRC'){
  		let isLrcFeeEnough = lrcFee+orderTotal <= lrcBalance
  	}else{
  		let isLrcFeeEnough = lrcFee <= lrcBalance
  	}
  	if(!isLrcFeeEnough){
  		lrcFee = 0 
  	}
  	return lrcFee
  }
  order.lrcFee = getLrcFee()  

  function getMarginSplitPercentage(){
  	if(Number(order.lrcFee) !==0){
  		return  utils.getConfig('marginSplitPercentage') || 50
  	}else{
  		return  100
  	}
  }
  order.marginSplitPercentage = getMarginSplitPercentage()
  return order;

}



