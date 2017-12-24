import Transaction from './transaction';
import HttpProvider from './common/httpprovider';

export default class Loopring {

  constructor(provider) { 
    this.currentProvider = provider
    // this.transaction = new Transaction(this)
    this.providers = {
        HttpProvider: HttpProvider,
    }
  }
  setProvider(provider) {
  	this.currentProvider = provider
  }
  
}

