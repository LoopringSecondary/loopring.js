



export function toHex(){
  // const gasPrice = '0x' + (Number(this.settingsGasPrice) * 1e9).toString(16)
  // cutoffTimeStamp = '0x' + (Number(cutoffNode.value) / 1000).toString(16) 
}

export function toQuantity(){
  // const gasPrice = '0x' + (Number(this.settingsGasPrice) * 1e9).toString(16)
  
}

export function toAmount(){
  // data.amountS = '0x' + new BigNumber(this.sellAmount).times(Number('1e' + this.tokens.digits)).toString(16);
  // data.amountB = '0x' + new BigNumber(new BigNumber(this.sellAmount).times(this.sellPrice).times(Number('1e' + this.tokenb.digits)).toFixed(0)).toString(16);
  return '0x' + new BigNumber(amount).times(Number('1e' + digits)).toString(16)
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
  if(!amount){
   amount = 0
  }
  return '0x' + (new BigNumber(amount).times('1e' + digits)).toString(16);
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




export getBalanceOfToken(token){
  // const balances = _.keyBy(this.balancesRaw.result.tokens, 'token');
  // const balance = balances[this.tokenb.token.toUpperCase()] ? Number(balances[this.tokenb.token.toUpperCase()].balance) : 0;
  const balances = {} //TODO
  return this.balances[token] ? this.balances[token].balance : 0;
  // TODO 
    // 本地存储了所有token的余额吗？
    // 需不需要异步查询一下余额呢？
}

export function isEthGasEnough(rawTx){
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

