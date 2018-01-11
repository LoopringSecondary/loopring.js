// require('babel-polyfill')
import * as apis from '../../2.0/common/apis'
import * as abis from '../../2.0/common/abis'
import Account from '../../2.0/account'
import Loopring from '../../2.0/loopring'

new Loopring('https://relay1.loopring.io/rpc')
console.log('LOOPRING_PROVIDER_HOST',LOOPRING_PROVIDER_HOST)


function generateAccount(password) {
  let account = Account.create()
  const privateKey = account.privateKey
  let keystore = Account.encrypt(privateKey,password)
  return keystore
}
function unlockAccount(keystoreJsonV3,password) {
  let account = Account.decrypt(keystoreJsonV3,password)

  if(typeof window !== 'undefined'){
    window.ACCOUNT = account 
  }
  if(typeof global !== 'undefined'){
    global.ACCOUNT = account 
  }
  return account;
}

function getAddress(){
  return ACCOUNT.address
}

function getPrivatekey(){
  return ACCOUNT.privateKey
}





