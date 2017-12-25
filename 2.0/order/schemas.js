import basicSchemas from '../common/validator_schemas' 

let standSchemas = {
	ORDER:{
		'protocol': {
		    'type': 'string',
		    'pattern': '^0x[0-9a-fA-F]{40}$'
		},
		'owner': {
		    'type': 'string',
		    'pattern': '^0x[0-9a-fA-F]{40}$'
		},
		'tokenS': {
		    'type': 'string',
		    'pattern': '^0x[0-9a-fA-F]{40}$'
		},
		'tokenB': {
		    'type': 'string',
		    'pattern': '^0x[0-9a-fA-F]{40}$'
		},
		'buyNoMoreThanAmountB': {
		    'type': 'boolean'
		},
		'marginSplitPercentage': {
		    'type': 'integer',
		    'minimum': 0,
		    'maximum': 100
		},
		'r': {
		    'type': 'integer',
		    'minimum': 0
		},
		's': {
		    'type': 'string',
		    'pattern': '^0x[0-9a-fA-F]{64}$'
		},
		'v': {
		    'type': 'string',
		    'pattern': '^0x[0-9a-fA-F]{64}$'
		}
	}
}

export default standSchemas







