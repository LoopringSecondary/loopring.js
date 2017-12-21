import abi from 'ethereumjs-abi';
import {validate} from '../transaction/validators';

export solSHA3 = (types, data) =>
{
    const hash = abi.soliditySHA3(types, data);
    return hash;
};

export generateCancelOrderData = (order) =>
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

export generateCutOffData = (timestamp) =>
{
    validate({value:timestamp,type:'TIMESTAMP'});

    const method = abi.methodID('setCutoff', ['uint']).toString('hex');
    const data = abi.rawEncode(['uint'], [timestamp]).toString('hex');
    return '0x' + method + data;
};

export generateApproveData = (address, amount) =>
{
    validate({value:address,type:'ADDRESS'});
    validate({value:amount,type:'QUANTITY'});

    const method = abi.methodID('approve', ['address', 'uint']).toString('hex');
    const data = abi.rawEncode(['address', 'uint'], [address, amount]).toString('hex');
    return '0x' + method + data;
};

export generateWithdrawData = (amount) =>
{
    validate({value:amount,type:'QUANTITY'});

    const method = abi.methodID('withdraw', ['uint']).toString('hex');
    const data = abi.rawEncode(['uint'], [amount]).toString('hex');
    return '0x' + method + data;
};

export generateTransferData = (address, amount) =>
{
    validate({value:address,type:'ADDRESS'});
    validate({value:amount,type:'QUANTITY'});

    const method = abi.methodID('transfer', ['address', 'uint']).toString('hex');
    const data = abi.rawEncode(['address', 'uint'], [address, amount]).toString('hex');
    return '0x' + method + data;
};

export generateBalanceOfData = (address) =>
{
    validate({value:address,type:'ADDRESS'});

    const method = abi.methodID('balanceOf', ['address']).toString('hex');
    const data = abi.rawEncode(['address'], [address]).toString('hex');
    return '0x' + method + data;
};

export generateAllowanceData = (owner, spender) =>
{
    validate({value:owner,type:'ADDRESS'});
    validate({value:spender,type:'ADDRESS'});

    const method = abi.methodID('allowance', ['address', 'address']).toString('hex');
    const data = abi.rawEncode(['address', 'address'], [owner, spender]).toString('hex');
    return '0x' + method + data;
};

export default getAbiData = ({method,timestamp,address,amount,order})=>{
    validate({value:'method',type:'ABI_METHOD'})
    switch (method) {
        case 'cancelOrder':
            generateCancelOrderData(order);
        case 'setCutoff':
            generateCutOffData(timestamp);
            break;
        case 'approve':
            generateApproveData(address, amount);
            break;
        case 'withdraw':
            generateWithdrawData(amount);
            break;
        case 'transfer':
            generateTransferData(address, amount);
            break;
        case 'balanceOf':
            generateBalanceOfData(address);
            break;
        case 'allowance':
            generateAllowanceData(owner, spender);
            break;
    }
    
}