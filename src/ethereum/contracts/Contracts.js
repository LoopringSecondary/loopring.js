import Contract from './Contract';
import {
    addHexPrefix,
    clearHexPrefix,
    toBN,
    toBuffer,
    toHex
} from '../../common/formatter';
import { ecsign } from 'ethereumjs-util';
import BitStream from '../../common/BitStream';
import { soliditySHA3 } from 'ethereumjs-abi';

const erc20Abi = require('../../config/abis/erc20.json');
const wethAbi = require('../../config/abis/weth.json');
const airdropAbi = require('../../config/abis/airdrop.json');
const ringAbi = require('../../config/abis/ring.json');
const orderAbi = require('../../config/abis/order.json');

const ERC20Token = new Contract(erc20Abi);
const WETH = new Contract(wethAbi);
const AirdropContract = new Contract(airdropAbi);
const Ring = new Contract(ringAbi);
const Order = new Contract(orderAbi);
const SERIALIZATION_VERSION = 0;
const ORDER_VERSION = 0;

function setupSpendables (rings)
{
    let numSpendables = 0;
    const ownerTokens = {};
    for (const order of rings.orders)
    {
        const tokenFee = order.feeToken;
        // Token spendables
        if (!ownerTokens[order.owner])
        {
            ownerTokens[order.owner] = {};
        }
        if (!ownerTokens[order.owner][order.tokenS])
        {
            ownerTokens[order.owner][order.tokenS] = {
                index: numSpendables++
            };
        }
        order.tokenSpendableS = ownerTokens[order.owner][order.tokenS];
        if (!ownerTokens[order.owner][tokenFee])
        {
            ownerTokens[order.owner][tokenFee] = {
                index: numSpendables++
            };
        }
        order.tokenSpendableFee = ownerTokens[order.owner][tokenFee];
    }
    return numSpendables;
}

function createMiningTable (ringsInfo, param)
{
    const feeRecipient = ringsInfo.feeRecipient || ringsInfo.transactionOrigin;
    const miner = ringsInfo.miner || feeRecipient;

    if (feeRecipient !== ringsInfo.transactionOrigin)
    {
        insertOffset(param, param.data.addAddress(ringsInfo.feeRecipient, 20, false));
    }
    else
    {
        insertDefault(param);
    }

    if (miner !== feeRecipient)
    {
        insertOffset(param, param.data.addAddress(ringsInfo.miner, 20, false));
    }
    else
    {
        insertDefault(param);
    }

    if (ringsInfo.sig && miner !== ringsInfo.transactionOrigin)
    {
        insertOffset(param, param.data.addHex(createBytes(ringsInfo.sig), false));
        addPadding(param);
    }
    else
    {
        insertDefault(param);
    }
}

function insertOffset (param, offset)
{
    if (offset % 4 === 0)
    {
        param.tables.addNumber(offset / 4, 2);
    }
}

function insertDefault (param)
{
    param.tables.addNumber(0, 2);
}

function addPadding (param)
{
    if (param.data.length() % 4 !== 0)
    {
        param.data.addNumber(0, 4 - (param.data.length() % 4));
    }
}

function createBytes (data)
{
    const bitstream = new BitStream();
    bitstream.addNumber((data.length - 2) / 2, 32);
    bitstream.addRawBytes(data);
    return bitstream.getData();
}

function ringsToParam (ringsInfo)
{
    const param = {
        ringSpecs: [],
        data: new BitStream(),
        tables: new BitStream()
    };
    // Offset 0 is the default so just add dummy bytes at the front so we load zeros
    param.data.addNumber(0, 32);
    createMiningTable(ringsInfo, param);
    param.ringSpecs = ringsInfo.rings;
    ringsInfo.orders.map((o) => createOrderTable(o, param));

    return param;
}

function createOrderTable (order, param)
{
    addPadding(param);
    insertOffset(param, ORDER_VERSION);
    insertOffset(param, param.data.addAddress(order.owner, 20, false));
    insertOffset(param, param.data.addAddress(order.tokenS, 20, false));
    insertOffset(param, param.data.addAddress(order.tokenB, 20, false));
    insertOffset(param, param.data.addNumber(order.amountS, 32, false));
    insertOffset(param, param.data.addNumber(order.amountB, 32, false));
    insertOffset(param, param.data.addNumber(order.validSince, 4, false));
    param.tables.addNumber(order.tokenSpendableS.index, 2);
    param.tables.addNumber(order.tokenSpendableFee.index, 2);

    if (order.authAddr)
    {
        insertOffset(param, param.data.addAddress(order.authAddr, 20, false));
    }
    else
    {
        insertDefault(param);
    }

    if (order.broker)
    {
        insertOffset(param, param.data.addAddress(order.broker, 20, false));
    }
    else
    {
        insertDefault(param);
    }

    if (order.orderInterceptor)
    {
        insertOffset(param, param.data.addAddress(order.orderInterceptor, 20, false));
    }
    else
    {
        insertDefault(param);
    }

    if (order.walletAddress)
    {
        insertOffset(param, param.data.addAddress(order.walletAddress, 20, false));
    }
    else
    {
        insertDefault(param);
    }

    if (order.validUntil)
    {
        insertOffset(param, param.data.addNumber(order.validUntil, 4, false));
    }
    else
    {
        insertDefault(param);
    }

    if (order.sig)
    {
        insertOffset(param, param.data.addHex(createBytes(order.sig), false));
        addPadding(param);
    }
    else
    {
        insertDefault(param);
    }

    if (order.authSig)
    {
        insertOffset(param, param.data.addHex(createBytes(order.authSig), false));
        addPadding(param);
    }
    else
    {
        insertDefault(param);
    }

    param.tables.addNumber(order.allOrNone ? 1 : 0, 2);

    if (order.feeToken && order.feeToken !== this.context.lrcAddress)
    {
        insertOffset(param, param.data.addAddress(order.feeToken, 20, false));
    }
    else
    {
        insertDefault(param);
    }

    if (order.feeAmount)
    {
        insertOffset(param, param.data.addNumber(order.feeAmount, 32, false));
    }
    else
    {
        insertDefault(param);
    }

    param.tables.addNumber(order.feePercentage ? order.feePercentage : 0, 2);
    param.tables.addNumber(order.waiveFeePercentage ? order.waiveFeePercentage : 0, 2);
    param.tables.addNumber(order.tokenSFeePercentage ? order.tokenSFeePercentage : 0, 2);
    param.tables.addNumber(order.tokenBFeePercentage ? order.tokenBFeePercentage : 0, 2);

    if (order.tokenRecipient && order.tokenRecipient !== order.owner)
    {
        insertOffset(param, param.data.addAddress(order.tokenRecipient, 20, false));
    }
    else
    {
        insertDefault(param);
    }

    param.tables.addNumber(order.walletSplitPercentage ? order.walletSplitPercentage : 0, 2);
}

function xor (s1, s2, numBytes)
{
    const x1 = toBN(s1);
    const x2 = toBN(s2);
    const result = x1.xor(x2);
    return '0x' + result.toString(16, numBytes * 2);
}

function calculateRingHashes (ringsInfo)
{
    const ringHashes = [];
    for (const ring of ringsInfo.rings)
    {
        const orderHashes = new BitStream();
        for (const order of ring)
        {
            orderHashes.addHex(ringsInfo.orders[order].hash.toString('hex'));
            orderHashes.addNumber(ringsInfo.orders[order].waiveFeePercentage ? ringsInfo.orders[order].waiveFeePercentage : 0, 2);
        }
        const ringHash = soliditySHA3(['bytes'], [Buffer.from(orderHashes.getData().slice(2), 'hex')]);
        ringHashes.push(toHex(ringHash));
    }

    // XOR ring hashes together for the mining hash
    let ringHashesXOR = ringHashes[0];
    for (let i = 1; i < ringHashes.length; i++)
    {
        ringHashesXOR = xor(ringHashesXOR, ringHashes[i], 32);
    }

    // Calculate mining hash
    const feeRecipient = ringsInfo.feeRecipient || ringsInfo.transactionOrigin;
    const args = [
        feeRecipient,
        ringsInfo.miner ? ((ringsInfo.miner === feeRecipient) ? '0x0' : ringsInfo.miner) : '0x0',
        ringHashesXOR
    ];
    const argTypes = [
        'address',
        'address',
        'bytes32'
    ];
    ringsInfo.hash = toHex(soliditySHA3(argTypes, args));
}

/**
 *
 * @param ringsInfo {
 * orders:[]
 * rings:[][],
 * miner:address,
 * feeRecipient:address
 * }
 * @return {*|string}
 */
const encodeSubmitRing = (ringsInfo) =>
{
    calculateRingHashes(ringsInfo);
    for (const order of ringsInfo.orders)
    {
        if (order.authSig === undefined)
        {
            if (order.authAddr && order.authPrivateKey)
            {
                const sig = ecsign(toBuffer(ringsInfo.hash), toBuffer(addHexPrefix(order.authPrivateKey)));
                order.authSig = toHex(sig.r) + clearHexPrefix(toHex(sig.s)) + clearHexPrefix(toHex(sig.v));
            }
        }
    }

    const numSpendables = setupSpendables(ringsInfo);
    const param = ringsToParam(ringsInfo);
    const stream = new BitStream();
    stream.addNumber(SERIALIZATION_VERSION, 2);
    stream.addNumber(ringsInfo.orders.length, 2);
    stream.addNumber(param.ringSpecs.length, 2);
    stream.addNumber(numSpendables, 2);
    // Mining + Orders
    stream.addHex(param.tables.getData());
    // Rings
    param.ringSpecs.forEach((ring) =>
    {
        stream.addNumber(ring.length, 1);
        ring.forEach((o) => stream.addNumber(o, 1));
        stream.addNumber(0, 8 - ring.length);
    });
    // Data
    // Add a buffer zone of 32 bytes of zeros before the start of the data blob
    // to allow overwriting the starting bytes.
    stream.addNumber(0, 32);
    stream.addHex(param.data.getData());

    return Ring.encodeInputs('submitRings', {data: stream.getData()});
};

Object.assign(Ring, {encodeSubmitRing});

export default {
    ERC20Token,
    WETH,
    AirdropContract,
    Order,
    Ring
};
