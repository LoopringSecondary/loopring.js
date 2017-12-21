

validators.validate = (payload,callback)=>{

  let {type,value}= paylaod
  let validator = validators[type]
  let result

  if(!validator){
    result = true // if no validator, to be validated default 
  }else{
    result = validator(value)
  }

  if(!result){
    if(callback){
      callback()
    }else{
      throw new Error(`invalid ${type}: ${value}`) 
    }
  }
}

export default validators



