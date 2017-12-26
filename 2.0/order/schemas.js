import basicSchemas from '../common/validator_schemas' 

let standSchemas = {
	ORDER:{
		'protocol': {
		    ...basicSchemas.ADDRESS
		},
		'owner': {
		    ...basicSchemas.ADDRESS
		},
		'tokenS': {
		    ...basicSchemas.ADDRESS
		},
		'tokenB': {
		    ...basicSchemas.ADDRESS
		},
		'buyNoMoreThanAmountB': {
		    'type': 'boolean'
		},
		'marginSplitPercentage': {
		    'type': 'integer',
		    'min': 0,
		    'max': 100
		},
		// 'amountS':{

		// },
		// 'amountB':{

		// },
		// 'timestamp':{

		// },
		// 'ttl':{

		// },
		// 'salt':{

		// },
		// 'lrcFee':{

		// },
		'r': {
		    'type': 'integer',
		    'min': 0
		},
		's': {
		    ...basicSchemas.HEX,
		    length:66,
		},
		'v': {
		    ...basicSchemas.HEX,
		    length:66,
		}
	}
}

export default standSchemas








