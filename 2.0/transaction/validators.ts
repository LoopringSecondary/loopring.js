
const ethereumUtil = require('ethereumjs-util');



// =========== types ===========
// 
// ADDRESS
// HEX
// PRIVATE_KEY
// RPC_TAG
// TIMESTAMP
// QUANTITY
// ABI_METHOD -- abi.js
// 
// =========== interfaces of transactions ===========
// 
// BaseTx
// RawTx
// SignedTx
// 
// =========== interfaces of transactions ===========
// 
// ORDER  -- abis.js
// 
// =========== end ========


let validators = {}

validators.ADDRESS = (address)=>{
  if (!address)
  {
      return false;
  }
  return ethereumUtil.isValidAddress(address);
}

validators.HEX = (str)=>{
   if (typeof str !== 'string')
   {
       return false;
   }
   if (str === '')
   {
       return true;
   }
   str = str.substring(0, 2) === '0x'
       ? str.substring(2).toUpperCase()
       : str.toUpperCase();

   const re = /^[0-9A-F]+$/g;
   return re.test(str);
}


validators.PRIVATE_KEY = (privateKey) =>
{
    if (typeof privateKey === 'string')
    {
        return privateKey.length === 64;
    }
    else if (privateKey instanceof Buffer)
    {
        return privateKey.length === 32;
    }
    else
    {
        return false;
    }
};

validators.validate = (payload,callback)=>{

  let {type,value}= paylaod;
  let validator = validators[type];
  let result;

  if(!validator){
    result = true; // if no validator, to be validated default 
  }else{
    result = validator(value);
  }

  if(!result){
    if(callback){
      callback();
    }else{
      throw new Error(`invalid ${type}: ${value}`); 
    }
  }
}

export default validators;



