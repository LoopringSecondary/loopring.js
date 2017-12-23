
let basicSchemas ={
	ADDRESS:{
		type:'string',
		pattern:/^0x[0-9a-fA-F]{1,64}$/g,
	},
	HEX:{
		type:'hex',
		// length:64,
	},
	QUANTITY:{
		type:'string',
	},
	PRIVATE_KEY:{
		type:'string',
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







