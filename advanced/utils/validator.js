import BigNumber from 'bignumber.js'

export function isBalanceEnough(rawTx,token){
  const balance = getBalanceOfToken(token)
  if(token==='ETH'){
    const required = Number(rawTx.value) + Number(rawTx.gasLimit) * Number(rawTx.gasPrice);
  }else{
    const required = Number(rawTx.gasLimit) * Number(rawTx.gasPrice);
  }
  return required <= balance
}



