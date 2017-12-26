import Schema from 'async-validator';
import basicSchemas from './validator_schemas';
import transactionSchemas from '../transaction/schemas';
import orderSchemas from '../order/schemas';

const schemas = {
  basic:{
    ...basicSchemas
  },
  stand:{
    ...transactionSchemas
  }
}

let handleErrors = (errors, fields)=>{
  let msgs = errors.map(err=>err.message).join()
  throw new Error(`data type invalid: ${msgs} \n`)
}

let validate = (payload)=>{
  let {type,value,onError,onSuccess}= payload
  let source = {}
  let schema = {}

  // fix bug: if value undefined or null
  if(typeof value === 'undefined'){ throw new Error(`data type invalid: ${type} should not be undefined`) }
  if(value === null){ throw new Error(`data type invalid: ${type} should not be null`) }

  if(schemas['basic'][type]){
    // validate one field , schema & source must just has one field
    schema[type] = schemas['basic'][type]
    source[type] = value
  }
  if(schemas['stand'][type]){
    // validate multiple fields
    schema = schemas['stand'][type]
    source = value
  }

  // TODO: if schema empty
  let validator = new Schema(schema)
  validator.validate(source,(errors, fields) => {
    if(errors){
      console.log('validate start source',source)
      console.log('validate start schema',schema)
      if(onError){
        onError(errors, fields)
      }else{
        handleErrors(errors, fields);
      }
    }else{
      if(onSuccess){
        onSuccess()
      }
    }
  })
}


let isBN = (bn)=>{
  // web3js
  // http://web3js.readthedocs.io/en/1.0/web3-utils.html#isbn
}
let isBigNumber = (bignumber)=>{
  // web3js
  // http://web3js.readthedocs.io/en/1.0/web3-utils.html#isbignumber
  // TODO
}
let isHex = (mixed)=>{
  // web3js
  // http://web3js.readthedocs.io/en/1.0/web3-utils.html#ishex
  // TODO
}
let isAddress = (mixed)=>{
  // web3js
  // http://web3js.readthedocs.io/en/1.0/web3-utils.html#isaddress
  // TODO
}




export default {
  validate,
  isBN,
  isBigNumber,
  isHex,
  isAddress,
}
