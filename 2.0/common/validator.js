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
  throw new Error(`invalid data type: ${errors} , ${fields}`)
}

let validate = (payload)=>{
  // TODO: Custom Validator, Custom rules?
  let {type,value,onError,onSuccess}= payload
  let source = {}
  let schema = {}

  if(schemas['basic'][type]){
    schema = schemas['basic'][type]
    source[type]=value
  }
  if(schemas['stand'][type]){
    schema = schemas['stand'][type]
    source = value
  }

  // TODO: if schema empty
  let validator = new Schema(schema)
  validator.validate(source,(errors, fields) => {
    if(errors){
      if(onError){
        onError()
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
