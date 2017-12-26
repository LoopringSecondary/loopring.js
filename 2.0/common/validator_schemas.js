
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
}
// TX_SIGNED:{
//     type:'string',
//     required:true, 
//     pattern:/^0x[0-9a-fA-F]+$/g, // legnth 不定
//   },
//   SIGNATURE:{ //for signature
//     type:'string',
//     required:true, 
//     pattern:/^0x[0-9a-fA-F]{64}$/g,
//   },
//   PRIVATE_KEY:{
//     validator:(rule,value,cb)=>{
//       if (value instanceof Buffer && pk.length === 32){
//           cb()
//       }else{
//           cb('private_key must be buffer')
//       }
//     }
//   },
export default basicSchemas