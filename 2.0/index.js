import Transaction from './transaction';
import HttpProvider from './common/httpprovider';
import validator from './common/validator';

export default class Loopring {

  constructor(host) {
  	validator.validate({type:'URL',value:host})
  	// browser env
    if(typeof window !== 'undefined'){
    	window.LOOPRING_PROVIDER_HOST = host // used by apis.js
    }
    // node env
    if(typeof global !== 'undefined'){
    	global.LOOPRING_PROVIDER_HOST = host // used by apis.js
    }
  }
}

