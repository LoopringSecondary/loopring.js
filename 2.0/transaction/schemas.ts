
import ethereumUtil from 'ethereumjs-util' 

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


let common_types = [
	{
		type:'ADDRESS',
		rules:{
			type:'string',
			regexp:/111/g,
		}
	},
	{
		type:'HEX',
		rules:{
			type:'string',
			regexp:/111/g,
		}
	},
	{
		type:'QUANTITY',
		rules:{
			type:'string',
			regexp:/111/g,
		}
	},
	{
		type:'PRIVATE_KEY_BUFFER',
		rules:{
			type:'string',
			regexp:/111/g,
		}
	},
	{
		type:'PRIVATE_KEY_STRING',
		rules:{
			type:'string',
			regexp:/111/g,
		}
	},
]


let schemaTransformer = (schema={})=>{
	let keys = Object.keys(schema);
	keys.forEach(key=>{
		let field = schema[key];
		let common_field = common_types.find(item=>item.type === field.type);
		let new_field = {
			...field,
			rules:[
				...common_field.rules,
				...field.rules,
			]
		}
		schema[key] = new_field;
	})
}

let txSchema = schemaTransformer(
	{
		to:{type:'ADDRESS'};    
		value:{type:'QUANTITY'};
		gasLimit:{type:'QUANTITY'};  
		gasPrice:{type:'QUANTITY'};
		chainId:{type:'number'};
		nonce:{type:'string'};
		data:{type:'string'};
		signed:{type:'string'};
	}
)


