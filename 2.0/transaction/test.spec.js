import Transaction from './index'

describe('Module Transaction', () => {
    it('transfer tx test', () => {
    		async transfer(tx,address,privateKey,amount,tag){
    		    let setDataParams = {
    		      method:'transfer',
    		      address:address,
    		      amount: amount
    		    }
    		    let setNonceParams = [
    		      address,
    		      tag,
    		    ]
    		    tx = new Transaction(tx)
    		    tx.setData(setDataParams)
    		    await tx.setNonce(..setNonceParams)
    		    tx.sign(privateKey)
    		    // await tx.send()
    		    return {
    		    	rawTx:tx.rawTx,
    		    	signedTx:tx.signedTx,
    		    }
    		}
        expect(true).toBe(true);
    });
})
