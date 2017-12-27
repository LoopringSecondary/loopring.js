import abi from 'ethereumjs-abi';
import validator from './validator'

export const solSHA3 = (types, data) =>
{
    const hash = abi.soliditySHA3(types, data);
    return hash;
};

export const generateCancelOrderData = (order) =>
{
    // TODO order type
    const data = abi.rawEncode([
        'address[3]',
        'uint[7]',
        'bool',
        'uint8',
        'uint8',
        'bytes32',
        'bytes32'
    ], [
        order.addresses,
        order.orderValues,
        order.buyNoMoreThanAmountB,
        order.marginSplitPercentage,
        order.v, order.r, order.s
    ]).toString('hex');

    const method = abi.methodID(
        'cancelOrder', [
            'address[3]',
            'uint[7]',
            'bool',
            'uint8',
            'uint8',
            'bytes32',
            'bytes32'
        ]).toString('hex');

    return '0x' + method + data;
};

export const generateCutOffData = (timestamp) =>
{
    validator.validate({value:timestamp,type:'TIMESTAMP'});

    const method = abi.methodID('setCutoff', ['uint']).toString('hex');
    const data = abi.rawEncode(['uint'], [timestamp]).toString('hex');
    return '0x' + method + data;
};

export const generateApproveData = (address, amount) =>
{
    validator.validate({value:address,type:'ADDRESS'});
    validator.validate({value:amount,type:'QUANTITY'});

    const method = abi.methodID('approve', ['address', 'uint']).toString('hex');
    const data = abi.rawEncode(['address', 'uint'], [address, amount]).toString('hex');
    return '0x' + method + data;
};

export const generateWithdrawData = (amount) =>
{
    validator.validate({value:amount,type:'QUANTITY'});

    const method = abi.methodID('withdraw', ['uint']).toString('hex');
    const data = abi.rawEncode(['uint'], [amount]).toString('hex');
    return '0x' + method + data;
};

export const generateTransferData = (address, amount) =>
{
    validator.validate({value:address,type:'ADDRESS'});
    validator.validate({value:amount,type:'QUANTITY'});

    const method = abi.methodID('transfer', ['address', 'uint']).toString('hex');
    const data = abi.rawEncode(['address', 'uint'], [address, amount]).toString('hex');
    return '0x' + method + data;
};

export const generateBalanceOfData = (address) =>
{
    validator.validate({value:address,type:'ADDRESS'});

    const method = abi.methodID('balanceOf', ['address']).toString('hex');
    const data = abi.rawEncode(['address'], [address]).toString('hex');
    return '0x' + method + data;
};

export const generateAllowanceData = (owner, spender) =>
{
    validator.validate({value:owner,type:'ADDRESS'});
    validator.validate({value:spender,type:'ADDRESS'});

    const method = abi.methodID('allowance', ['address', 'address']).toString('hex');
    const data = abi.rawEncode(['address', 'address'], [owner, spender]).toString('hex');
    return '0x' + method + data;
};

export const generateAbiData = ({method,timestamp,address,amount,order,owner,spender})=>{
    validator.validate({value:method,type:'ABI_METHOD'})
    switch (method) {
        case 'cancelOrder':
            return generateCancelOrderData(order);
        case 'setCutoff':
            return generateCutOffData(timestamp);
        case 'approve':
            return generateApproveData(address, amount);
        case 'withdraw':
            return generateWithdrawData(amount);
        case 'transfer':
            return generateTransferData(address, amount);
        case 'balanceOf':
            generateBalanceOfData(address);
        case 'allowance':
            return generateAllowanceData(owner, spender);
    }
}

export default {
    generateAbiData,
    solSHA3,
}