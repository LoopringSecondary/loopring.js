import validator from '../common/validator'
import formatter from '../common/formatter'
import keystore from '../common/keystore'
import crypto  from 'crypto'
import ethereumUtil  from 'ethereumjs-util'


export default class Account {
  constructor(){
  }
  static create(){
    const privateKey = crypto.randomBytes(32) // return buffer
    const publicKey = ethereumUtil.privateToPublic(privateKey)
    const address = ethereumUtil.publicToAddress(publicKey)
    return {
      privateKey,
      publicKey,
      address,
    }
  }
  static encrypt(privateKey, password){ 
    return keystore.pkeyToKeystore(privateKey,password)
    // return keystoreJsonV3
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
  static download(){
    // TODO
  }

}

