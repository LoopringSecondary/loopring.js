import utils from '../utils'

const rawToken = {
  name:'',
  address:'',
  digits:'',
  allowance:'',
  balance:'',
  allocated:'',
}

export default class token {
  constructor(tokenInput) {
    
  }
  getAddress(){

  }
  getBalance(){

  }
  getAllowance(){

  }
  getAllocated(){

  }

}

// getToken

export function getTokenByName(name){
  // TODO
  return {} 
}
export function getTokenByAddress(address){
  // TODO
  return {} 
}

// get Address
export function getAddressByName(tokenName){
  // TODO
  return 'xxx'
}
// get Balance

export function getBalanceByName(tokenName){
  return 'xxx'
}
export function getBalanceByAddress(address){
  // TODO
  return 'xxx'
}
export getBalanceOfToken(token){
  // const balances = _.keyBy(this.balancesRaw.result.tokens, 'token');
  // const balance = balances[this.tokenb.token.toUpperCase()] ? Number(balances[this.tokenb.token.toUpperCase()].balance) : 0;
  const balances = {} //TODO
  return this.balances[token] ? this.balances[token].balance : 0;
  // TODO: get from local or server 
}

// get Allowance

export function getAllowanceByAddress(address){
  // TODO
  return {}
}
export function getAllowanceByName(tokenName){
  return 'xxx'
}


// get Allocated


