import basicSchemas from '../common/validator_schemas' 

let standSchemas = {
	TX:{
		to:{
			...basicSchemas.ADDRESS
		},    
		value:{
			...basicSchemas.QUANTITY // User Input
		},
		gasLimit:{
			...basicSchemas.QUANTITY // User Input
		},  
		gasPrice:{
			...basicSchemas.QUANTITY // User Input
		},
		chainId:{
			type:'number', 
		},
		nonce:{
			type:'string' // System Input
		},
		// v, TODO
		// r, TODO
		// s, TODO
		data:{
			type:'string' // System Input
		},
		// extra
		signed:{
			...basicSchemas.signedTx // TO
		},
		transactionHash:{
			type:'string'
		},

	}
}

export default standSchemas







