
// Schema Help： https://github.com/yiminghe/async-validator
// required: not empty eg: null, undefined, ''

let basicSchemas ={
	ADDRESS:{
		type:'string',
		required:true, 
		pattern:/^0x[0-9a-fA-F]{1,64}$/g,
	},
	HEX:{
		type:'hex',
		required:true, 
		pattern:/^0x[0-9a-fA-F]+$/g,
	},
	QUANTITY:{
		type:'string',
		required:true, 
	},
	PRIVATE_KEY:{
		type:'string',
		required:true, 
		length:64,
	},
	PRIVATE_KEY_BUFFER:{
		validator:(rule,value,cb)=>{
			if (value instanceof Buffer && pk.length === 32){
			    cb()
			}else{
					cb('private_key must be buffer')
			}
		}
	},
	TIMESTAMP:{
		type:'string',
	}
}

let standSchemas = {
	TX:{
		to:{
			...basicSchemas.ADDRESS
		},    
		value:{
			...basicSchemas.QUANTITY
		},
		gasLimit:{
			...basicSchemas.QUANTITY
		},  
		gasPrice:{
			...basicSchemas.QUANTITY
		},
		chainId:{
			type:'string',
		},
		nonce:{
			type:'string'
		},
		data:{
			type:'string'
		},
		signed:{
			type:'string'
		}
	}
}

export default {
	basic:basicSchemas,
	stand:standSchemas
}







