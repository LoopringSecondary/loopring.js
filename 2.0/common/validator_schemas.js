
// Schema Help： https://github.com/yiminghe/async-validator
// required: value should be not empty eg: null, undefined, ''

let basicSchemas ={
  URL:{
    type:'url',
    required:true, 
  },
  ADDRESS:{
    type:'string',
    required:true, 
    pattern:/^0x[0-9a-fA-F]{40}$/g,
  },
  QUANTITY:{
    type:'string',
    required:true,
    pattern:/^0x[0-9a-fA-F]{1,64}$/g,
  },
  HEX:{
    type:'string',
    required:true,
    pattern:/^0x[0-9a-fA-F]+$/g,
  },
  ABI_METHOD:{
    type:'enum',
    required:true, 
    enum:['cancelOrder','setCutoff','approve','withdraw','transfer','balanceOf','allowance'],
  },
  RPC_TAG:{
    type:'enum',
    required:true,
    enum:['latest','earliest','pending'],
  },
  TIMESTAMP:{
    type:'string',
  },
  PRIVATE_KEY:{
    validator:(rule,value,cb)=>{
      // Code Convention: PRIVATE_KEY must just have two formats
      // 1. Buffer
      // 2. Hex : '0x'+ buffer.toString('hex') eg.
      if (value instanceof Buffer){
        if(value.length === 32){
          cb()
        }else{
          cb('unvalid PRIVATE_KEY type: ',value)
        }
      }

      if(typeof value === 'string'){
        let pattern =  /^0x[0-9a-fA-F]{64}$/g
        if(value.test(pattern)){
          cb()
        }else{
          cb('unvalid PRIVATE_KEY type: ',value)
        }
      }
    }
  },
}
export default basicSchemas