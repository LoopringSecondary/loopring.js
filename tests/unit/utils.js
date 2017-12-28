



export function toHex(){
  // const gasPrice = '0x' + (Number(this.settingsGasPrice) * 1e9).toString(16)
  // cutoffTimeStamp = '0x' + (Number(cutoffNode.value) / 1000).toString(16) 
}

export function toQuantity(){
  // const gasPrice = '0x' + (Number(this.settingsGasPrice) * 1e9).toString(16)
  
}

export function getContractAddress(){
  // const spender = this.appConfig.delegateAddress;
  // raw.protocol = this.appConfig.contractVersionMap[currentVersion].address;
  return ’xxx‘;
}
export function getDelegateAddress(){
  // const spender = this.appConfig.delegateAddress;
  // raw.protocol = this.appConfig.contractVersionMap[currentVersion].address;
  return ’xxx‘;
}
export function getTokenAddress(token){
  return 'xxx'
}
export function getWalletAddress(){
  return 'xxx' 
}
export function getDefaultGasPrice(){
  const defaultGasPrice
  return '0x' + (Number(defaultGasPrice) * 1e9).toString(16)
}
export function getDefaultGasLimit(){
  const defaultGasLimit
  return '0x14820'
}


export getBalanceOfToken(token){
  // const balances = _.keyBy(this.balancesRaw.result.tokens, 'token');
  // const balance = balances[this.tokenb.token.toUpperCase()] ? Number(balances[this.tokenb.token.toUpperCase()].balance) : 0;
  const balances = {} //TODO
  return this.balances[token] ? this.balances[token].balance : 0;
  // TODO 
    // 本地存储了所有token的余额吗？
    // 需不需要异步查询一下余额呢？
}

export function gasValidator(rawTx){
  const balance = getBalanceOfToken('ETH')
  const need = Number(rawTx.gasLimit) * Number(rawTx.gasPrice)
  if(need>balance){
    let tip ='You has insufficient ETH balance for gasLimit * gasPrice'
    return false
  }else{
    return true
  }
}

export function balanceValidator(token,rawTx){
  const balance = getBalanceOfToken(token)
  
  if(token==='ETH'){
    const need = Number(tx.value) + Number(tx.gasLimit) * Number(tx.gasPrice);
  }else{
    const need = Number(tx.gasLimit) * Number(tx.gasPrice);
  }
  if(need>balance){
    // TODO
  }else{
    // TODO
  }
}

