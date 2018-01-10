import basicSchemas from '../common/validator_schemas' 
import BigNumber from 'bignumber.js'

let signedTx = {

}

let standSchemas = {
	rawTx:{
		to:{
			...basicSchemas.ADDRESS
		},    
		value:{
			...basicSchemas.QUANTITY
		},
		gasLimit:{
			validator(rule,value,cb){
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
			...basicSchemas.QUANTITY
		},
		chainId:{
			type:'number', 
		},
		nonce:{
			type:'string' 
		},
		// v, TODO
		// r, TODO
		// s, TODO
		data:{
			type:'string' 
		},
	},
}



export default standSchemas







