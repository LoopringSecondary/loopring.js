import validator from '../common/validator'
import keystore from '../common/keystore'
import crypto  from 'crypto'
import ethereumUtil  from 'ethereumjs-util'


export default class Account {
  constructor(){
  }
  create(){
    this.privateKey = crypto.randomBytes(32)
    this.publicKey = ethereumUtil.privateToPublic(this.privateKey)
    this.address = ethereumUtil.publicToAddress(this.publicKey)
    return this.getAccount()
  }
  encrypt(privateKey, password){
    // TODO type validate
    const keystoreJsonV3 = keystore.pkeyToKeystore(privateKey,privateKey)
    return keystoreJsonV3
  }
  decrypt(keystoreJsonV3, password){
    // TODO type validate
    this.privateKey = keystore.decryptKeystoreToPkey(keystoreJsonV3,password);
    this.publicKey = ethereumUtil.privateToPublic(this.privateKey)
    this.address = ethereumUtil.publicToAddress(this.publicKey)
    return this.getAccount()
  }
  getAddress(){
    // TODO type format
    return ethereumUtil.toChecksumAddress('0x' + this.address.toString('hex'))
  }
  getAccount(){
    return {
      publicKey:this.publicKey,
      privateKey:this.privateKey,
      address:this.address,
    }
  }
}

