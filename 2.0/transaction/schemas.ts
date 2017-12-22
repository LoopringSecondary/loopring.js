
// TODO: required rule
let basicSchemas = {
	ADDRESS:{
		type:'string',
		pattern:/111/g,
		validator:()=>{}
	},
	HEX:{
		type:'hex',
		pattern:/111/g,
		validator:()=>{}
	},
	QUANTITY:{
		type:'string',
		pattern:/111/g,
		validator:()=>{}
	},
	PRIVATE_KEY:{
		type:'string',
		pattern:/111/g,
		validator:()=>{}
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









