// require('babel-polyfill')
import * as apis from '../../2.0/common/apis'
import * as abis from '../../2.0/common/abis'
import Transaction from '../../2.0/transaction'
import Loopring from '../../2.0/loopring'

new Loopring('https://relay1.loopring.io/rpc')
console.log('LOOPRING_PROVIDER_HOST',LOOPRING_PROVIDER_HOST)


function inputFormatter(formInput){
	this.tx = {}
	function setGasLimit(){
		this.tx.gasLimit = utils.getGasLimit(gasLimit) // TODO
	}
	function setGasPrice(){
		this.tx.gasPrice = utils.getGasLimit() // TODO
	}
	function setTo(){
		this.tx.to = token.address
	}
	function setValue(){
		this.tx.value = '0x0'
	}
	function setData(){
		// this.tx.data = abis.generateTransferData(address, amount)
	}
}


function approve(formInput){
	const rawTx = inputFormatter(formInput)
	const balanceEnough = utils.isBalanceEnough(rawTx,token) // TODO
	const gasEnough = utils.isEthGasEnough(rawTx)
}


async _signToSend() {
    try {
        if (!this.valid) {
            return;
        }
        let detail = {};
        if (!this.amount || !this.selectedTokenBalance) {
            detail = {text: "input value and select token", category: "warning", duration: 8000}
            this.dispatchEvent(new CustomEvent('notification', {
                bubbles: true,
                composed: true,
                detail: detail
            }));
            return;
        }
        const spender = this.appConfig.delegateAddress;
        const currentAllowance = Number(this.balances[this.token].allowance);
        const tx = {};
        // tx.gasPrice = '0x' + (Number(this.settingsGasPrice) * 1e9).toString(16);
        // tx.gasLimit = '0x' + Number(this.$.gasLimit.value).toString(16);
        // tx.to = this.selectedTokenBalance.address;
        // tx.value = '0x0';
        

        if (currentAllowance === 0 || Number(this.$.amount.value) === 0 ) {
            tx.data = signer.generateApproveData(spender, '0x' + (new BigNumber(this.$.amount.value).times(Number('1e' + this.selectedTokenBalance.digits))).toString(16));
            detail = {
                raws: [{"raw": JSON.stringify(tx), "subTitle": "New Authorization Of " + this.selectedTokenBalance.token.toUpperCase(),"description":"Set allowance  to " + this.$.amount.value+" with gas is "+Number(tx.gasLimit)+ " and gasPrice is " + Number(tx.gasPrice)/1e9 + "Gwei."
                }]
            };

        } else {
            tx.data = signer.generateApproveData(spender, '0x0');
            const cancelRaw = JSON.stringify(tx);
            tx.data = signer.generateApproveData(spender, '0x' + (new BigNumber(this.$.amount.value).times(Number('1e' + this.selectedTokenBalance.digits))).toString(16));
            detail = {
                raws: [{
                    "raw": cancelRaw,
                    "subTitle": "Cancel Older Authorization Of " + this.selectedTokenBalance.token.toUpperCase(),
                    "description": "Set allowance  to 0 first in order to set Allowance to 0 with gas is "+Number(tx.gasLimit)+ " and gasPrice is " + Number(tx.gasPrice)/1e9 + "Gwei."
                }, {"raw": JSON.stringify(tx), "subTitle": "New Authorization Of " + this.selectedTokenBalance.token.toUpperCase(),"description":"Set allowance  to " + this.$.amount.value+" with gas is "+Number(tx.gasLimit)+ " and gasPrice is " + Number(tx.gasPrice)/1e9 + "Gwei."
            }]
            };
        }


        
        this.dispatchEvent(new CustomEvent('signtosend', {bubbles: true, composed: true, detail: detail}));
    } catch (e) {
        var detail = {text: e.message, category: "error", duration: 8000}
        this.dispatchEvent(new CustomEvent('notification', {
            bubbles: true,
            composed: true,
            detail: detail
        }));
    }
}


