import validator from '../common/validator'
import keystore from '../common/keystore'
import crypto  from 'crypto'
import ethereumUtil  from 'ethereumjs-util'


export default class Account {
  constructor(){
  }
  static create(){
    const privateKey = crypto.randomBytes(32)
    const publicKey = ethereumUtil.privateToPublic(privateKey)
    const address = ethereumUtil.publicToAddress(publicKey)
    return {
      privateKey,
      publicKey,
      address,
    }
  }
  static encrypt(privateKey, password){
    // TODO type validate
    const keystoreJsonV3 = keystore.pkeyToKeystore(privateKey,privateKey)
    return keystoreJsonV3
  }
  static decrypt(keystoreJsonV3, password){
    // TODO type validate
    const privateKey = keystore.decryptKeystoreToPkey(keystoreJsonV3,password);
    const publicKey = ethereumUtil.privateToPublic(privateKey)
    const address = ethereumUtil.publicToAddress(publicKey)
    return {
      privateKey,
      publicKey,
      address,
    }
  }
  static formatAddres(address){
    validator.validate({type:'ADDRESS',value:address})
    return ethereumUtil.toChecksumAddress('0x' + address.toString('hex'));
  }
}

