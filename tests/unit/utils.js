

export function toHex(obj){
  // obj = number / ??
  // cutoffTimeStamp = '0x' + (Number(cutoffNode.value) / 1000)toHex
  return  '0x' + obj.toString(16)
}

export function toQuantity(){
  // const gasPrice = '0x' + (Number(this.settingsGasPrice) * 1e9).toString(16)
}
export function toBigNumber(amount,digits){
  if(digits){
    return new BigNumber(amount).times(Number('1e'+ token.digits))
  }else{
    return new BigNumber(amount)
  }
}


export function getGasPrice(amount){
  if(!amount){
    amount = defaultGasPrice // TODO 
  }
  return '0x' + (Number(amount) * 1e9).toString(16)
}
export function getGasLimit(amount){
  if(!amount){
    amount = defaultGasLimit // TODO 
  }
  return '0x' + Number(amount).toString(16) || '0x14820'; // TODO
}

export function getAmount(amount,digits){
  if(!digits){
    digits = 18
  }
  if(amount){
   return '0x' + (new BigNumber(amount).times('1e' + digits)).toString(16)
  }else{
    return '0x0'
  }
  
}
export function getTotalAmount(amount,price,digits){
  return '0x' + new BigNumber(new BigNumber(amount).times(price).times(Number('1e' + digits)).toFixed(0)).toString(16);
}

export function getContractAddress(){
  // const spender = this.appConfig.delegateAddress;
  // raw.protocol = this.appConfig.contractVersionMap[currentVersion].address;
  return 'xxx';
}
export function getDelegateAddress(){
  // const spender = this.appConfig.delegateAddress;
  // raw.protocol = this.appConfig.contractVersionMap[currentVersion].address;
  // TODO
  return {} 
}

export function getWalletAddress(){
  // TODO
  return {} 
}
export function getTokenByName(name){
  // TODO
  return {} 
}
export function getTokenByAddress(address){
  // TODO
  return {} 
}
export function getTokenAddress(tokenName){
  //  tip
  // const detail = { text: 'Token contract address is missing, please contact to the administrators to make up for ' + target.tokenS.toUpperCase() + ' and ' + target.tokenB.toUpperCase() + ' contract Address', category: "error", duration: 8000 }
  return 'xxx'
}
export getBalanceOfToken(token){
  // const balances = _.keyBy(this.balancesRaw.result.tokens, 'token');
  // const balance = balances[this.tokenb.token.toUpperCase()] ? Number(balances[this.tokenb.token.toUpperCase()].balance) : 0;
  const balances = {} //TODO
  return this.balances[token] ? this.balances[token].balance : 0;
  // TODO: get from local or server 
}
export function isGasEnough(rawTx){
  const balance = getBalanceOfToken('ETH')
  const required = Number(rawTx.gasLimit) * Number(rawTx.gasPrice)
  return required <= balance
}
export function isBalanceEnough(rawTx,token){
  const balance = getBalanceOfToken(token)
  if(token==='ETH'){
    const required = Number(tx.value) + Number(tx.gasLimit) * Number(tx.gasPrice);
  }else{
    const required = Number(tx.gasLimit) * Number(tx.gasPrice);
  }
  return required <= balance
}

