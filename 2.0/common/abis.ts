
import abi from 'ethereumjs-abi';


export default getAbiData = (payload)=>{
    // TODO
}

export solSHA3 = (types, data) =>
{
    const hash = abi.soliditySHA3(types, data);
    return hash;
};

export generateCancelOrderData = (order) =>
{
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
    const method = abi.methodID('setCutoff', ['uint']).toString('hex');
    const data = abi.rawEncode(['uint'], [timestamp]).toString('hex');
    return '0x' + method + data;
};

export generateApproveData = (address, amount) =>
{
    const method = abi.methodID('approve', ['address', 'uint']).toString('hex');
    const data = abi.rawEncode(['address', 'uint'], [address, amount]).toString('hex');
    return '0x' + method + data;
};

export generateWithdrawData = (amount) =>
{
    const method = abi.methodID('withdraw', ['uint']).toString('hex');
    const data = abi.rawEncode(['uint'], [amount]).toString('hex');
    return '0x' + method + data;
};

export generateTransferData = (address, amount) =>
{
    const method = abi.methodID('transfer', ['address', 'uint']).toString('hex');
    const data = abi.rawEncode(['address', 'uint'], [address, amount]).toString('hex');
    return '0x' + method + data;
};

export generateBalanceOfData = (address) =>
{
    const method = abi.methodID('balanceOf', ['address']).toString('hex');
    const data = abi.rawEncode(['address'], [address]).toString('hex');
    return '0x' + method + data;
};

export generateAllowanceData = (owner, spender) =>
{
    const method = abi.methodID('allowance', ['address', 'address']).toString('hex');
    const data = abi.rawEncode(['address', 'address'], [owner, spender]).toString('hex');
    return '0x' + method + data;
};
