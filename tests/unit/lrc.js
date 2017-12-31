export function getLrcFee(){

  // _computeFee(token, tradeAmount, priceQuote, settingsLrcFe){

  //     if(token && tradeAmount >= 0 && priceQuote && settingsLrcFe>=0){
  //         let selectTokenPrice = priceQuote.getPrice(token.token);
  //         let amount = tradeAmount * selectTokenPrice;
  //         let fee = amount * settingsLrcFe / 1000;
  //         return fee / priceQuote.getPrice("LRC");
  //     }
  // }
}

// TODO
function isLrcGasEnough(lrcFee, lrcBalance, token, amount) {

    if (lrcFee >= 0 && lrcBalance >= 0 && token && amount >= 0) {
        return token.token.toUpperCase() === "LRC" ? Number(amount) + lrcFee <= lrcBalance: lrcFee <= lrcBalance;
    }
    return true
}
// TODO
function getLrcFee(){
  let enoungh = this.isLrcGasEnough(this.sellFee, this.lrcBalance,this.tokens,this.sellAmount)

  if(enoungh){
    return '0x' + new BigNumber(this._showAmount(this.sellFee)).times(Number('1e' + this.lrc.digits)).toString(16)
  }else{
    return '0x0'
  }
}


export function isLrcGasEnough(rawTx){
  const balance = getBalanceOfToken('ETH')
  const need = Number(rawTx.gasLimit) * Number(rawTx.gasPrice)
  if(need>balance){
    let tip ='You has insufficient ETH balance for gasLimit * gasPrice'
    return false
  }else{
    return true
  }
}