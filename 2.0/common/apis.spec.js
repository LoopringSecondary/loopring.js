import "babel-polyfill"

import apis from './apis'

async function test(){
    let res = await apis.getTransactionCount('0xebA7136A36DA0F5e16c6bDBC739c716Bb5B65a00')
    console.log('res',res);
}

test()

describe('Module Apis', () => {
    it('getTransactionCount', () => {

    })
})
