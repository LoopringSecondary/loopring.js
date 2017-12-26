import basicSchemas from '../common/validator_schemas' 

let signedTx = {

}

let standSchemas = {
	rawTx:{
		to:{
			...basicSchemas.ADDRESS
		},    
		value:{
			...basicSchemas.QUANTITY // User Input
		},
		gasLimit:{
			validator(rule,value,cb)=>{
				const gasLimit = new BigNumber(Number(value))
				if (gasLimit.lessThan(21000))
				{
				  cb('gasLimit must be greater than 21000')
				}else if (gasLimit.greaterThan(5000000))
				{
				  cb('gasLimit is too big')
				}else{
					cb()
				}
			}
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
		// signed:{
		// 	...basicSchemas.signedTx // TO
		// },
		// transactionHash:{
		// 	type:'string'
		// },
	},
}



export default standSchemas







