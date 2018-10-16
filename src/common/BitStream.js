import {toHex, toBuffer, addHexPrefix, clearHexPrefix} from './formatter';
import {setLength} from 'ethereumjs-util';

export default class BitStream
{
    constructor (initialData = '')
    {
        this.data = addHexPrefix(initialData);
    }

    getData ()
    {
        return this.data;
    }

    addNumber (data, length = 4, forceAppend = true)
    {
        this.insert(clearHexPrefix(toHex(setLength(toBuffer(data), length))), forceAppend);
    }

    addAddress (address, forceAppend = true)
    {
        this.insert(clearHexPrefix(address), forceAppend);
    }

    addBigNumber (data, length = 32, forceAppend = true)
    {
        this.insert(clearHexPrefix(toHex(setLength(toBuffer(toHex(data)), length))), forceAppend);
    }
    addHex (data, forceAppend = true)
    {
        return this.insert(clearHexPrefix(data), forceAppend);
    }

    addRawBytes (bs, forceAppend = true)
    {
        this.insert(clearHexPrefix(toHex(bs)), forceAppend);
    }

    insert (x, forceAppend)
    {
        const offset = this.length();
        if (!forceAppend)
        {
            // Check if the data we're inserting is already available in the bitstream.
            // If so, return the offset to the location.
            let start = 0;
            while (start !== -1)
            {
                start = this.data.indexOf(x, start);
                if (start !== -1)
                {
                    if ((start % 2) === 0)
                    {
                        // logDebug("++ Reused " + x + " at location " + start / 2);
                        return start / 2;
                    }
                    else
                    {
                        start++;
                    }
                }
            }
        }
        this.data += x;
        return offset;
    }

    // Returns the number of bytes of data
    length ()
    {
        return this.data.length / 2;
    }
}
