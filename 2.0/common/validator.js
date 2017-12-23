import Schema from 'async-validator';
import transaction from '../transaction/schemas';

const schemas = {
  basic:{
    ...transaction.basic
  },
  stand:{
    ...transaction.stand
  }
}

let handleErrors = (errors, fields)=>{
  let msgs = errors.map(err=>err.message).join()
  throw new Error(`validate data type failed: ${msgs}`)
}

let validate = (payload)=>{
  let {type,value,onError,onSuccess}= payload
  let source = {}
  let schema = {}

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
  console.log('validate start source',source)
  console.log('validate start schema',schema)
  validator.validate(source,(errors, fields) => {
    console.log('validate end')
    if(errors){
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

export default {
  validate
}
