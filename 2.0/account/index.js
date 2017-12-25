import validator from '../common/validator'
import crypto  from 'crypto'
import ethereumUtil  from 'ethereumjs-util'


export default class Account {
  constructor() { 
  }
  create(){
    this.privateKey = crypto.randomBytes(32)
    this.publicKey = ethereumUtil.privateToPublic(privateKey)
    this.address = ethereumUtil.publicToAddress(publicKey)
    // TODO
  }
  
  encrypt(privateKey, password){
    const keystoreJsonV3
    // TODO return keystoreJsonV3;
  }
  decrypt(keystoreJsonV3, password){
    // TODO generate privateKey
    const privateKey;
    this.publicKey = ethereumUtil.privateToPublic(privateKey);
    this.address = ethereumUtil.publicToAddress(publicKey);
    // TODO  return account;
  }
  getAddress(){
    return ethereumUtil.toChecksumAddress('0x' + this.address.toString('hex'));
  }
}

module.exports = Account;