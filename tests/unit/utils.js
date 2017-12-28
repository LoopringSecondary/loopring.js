



export function toHex(){
  // const gasPrice = '0x' + (Number(this.settingsGasPrice) * 1e9).toString(16)
  // cutoffTimeStamp = '0x' + (Number(cutoffNode.value) / 1000).toString(16) 
}

export function toQuantity(){
  // const gasPrice = '0x' + (Number(this.settingsGasPrice) * 1e9).toString(16)
  
}

export function getContractAddress(){
  return 'xxx'
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

export getBalanceOfToken(token){
  const balances = {} //TODO
  return this.balances[token] ? this.balances[token].balance : 0;
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

