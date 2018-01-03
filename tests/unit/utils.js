

// formatter
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

export function getTTL(){
  // TODO
  let ttl = this.appConfig.defaultExpireTime * 24 * 3600;
  if (this.settingsExpireTimeUnit === "Day") {
      ttl = this.settingsExpireTime * 24 * 3600;
  } else if (this.settingsExpireTimeUnit === "Hour") {
      ttl = this.settingsExpireTime * 3600;
  } else if (this.settingsExpireTimeUnit === "Minute") {
      ttl = this.settingsExpireTime * 60;
  } else if (this.settingsExpireTimeUnit === "Second") {
      ttl = this.settingsExpireTime;
  }
  return ttl
}
export function getSalt(){
  return Math.round(Math.random() * 1e8)
}

// getter

export function getContractAddress(){
  // const spender = this.appConfig.delegateAddress;
  // raw.protocol = this.appConfig.contractVersionMap[currentVersion].address;
  return 'xxx';
}
export function getDelegateAddress(){
  // const spender = this.appConfig.delegateAddress;
  // raw.protocol = this.appConfig.contractVersionMap[currentVersion].address;
  return 'xxx';
}

export function getWalletAddress(){
  return 'xxx' 
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
  // TODO 
    // 本地存储了所有token的余额吗？
    // 需不需要异步查询一下余额呢？
}

export function isGasEnough(rawTxs){
  // TODO 
  // 判断 rawTx 是数组还是对象
  const balance = getBalanceOfToken('ETH')
  const need = Number(rawTx.gasLimit) * Number(rawTx.gasPrice)
  if(need>balance){
    let tip ='You has insufficient ETH balance for gasLimit * gasPrice'
    return false
  }else{
    return true
  }
  // if (new BigNumber(this.fromTokenBalance.balance).lt(new BigNumber(tx.value).plus(new BigNumber(tx.gasLimit).times(Number(tx.gasPrice))))) {

  // }

  // const ETHBalance = this.balances['ETH'] ? this.balances['ETH'].balance : 0;
  // if (ETHBalance < detail.raws.length *(Number(tx.gasLimit) * Number(tx.gasPrice))) {
  //     const detail = {
  //         text: 'You has insufficient ETH balance for gasLimit * gasPrice',
  //         category: "warning",
  //         duration: 8000
  //     };
  //     this.dispatchEvent(new CustomEvent('notification', {
  //         bubbles: true,
  //         composed: true,
  //         detail: detail
  //     }));
  //     return;
  // }
}


export function isBalanceEnough(rawTx,token){
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

