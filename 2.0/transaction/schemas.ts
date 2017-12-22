
// TODO: required rule
let basicSchemas = {
	ADDRESS:{
		type:'string',
		pattern:/^0x[0-9a-fA-F]{1,64}$/g,
	},
	HEX:{
		type:'hex',
	},
	QUANTITY:{
		type:'string',
	},
	PRIVATE_KEY:{
		type:'string',
		validator:(pk)=>{
			if (typeof pk === 'string')
			{
			    return pk.length === 64;
			}
			else if (pk instanceof Buffer)
			{
			    return pk.length === 32;
			}
			else
			{
			    return false;
			}
		}
	},
	TIMESTAMP:{
		type:'string',
	},

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
		},
	},
}

export default {
	basic:basicSchemas,
	stand:standSchemas,
}









