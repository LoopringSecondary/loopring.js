import validator from '../common/validator'
import formatter from '../common/formatter'
import keystore from '../common/keystore'
import crypto  from 'crypto'
import ethereumUtil  from 'ethereumjs-util'

export default class Account {
  constructor(privateKey){
    this.privateKey = privateKey
    this.publicKey = ethereumUtil.privateToPublic(privateKey)
    this.address = ethereumUtil.publicToAddress(publicKey)
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
    return keystore.pkeyToKeystore(privateKey,password) // keystoreJsonV3
  }
  static decrypt(keystoreJsonV3, password){
    return keystore.decryptKeystoreToPkey(keystoreJsonV3,password) // privateKey
  }
  static download(){
    // TODO
  }

}

