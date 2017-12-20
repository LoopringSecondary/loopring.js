

export const enum Tag { 
  latest = 'latest',
  earliest = 'earliest',
  pending = 'pending',
}
export type RPC_TAG = 'latest' | 'earliest' | 'pending' ;


export const enum AbiMethod { 
  setCutoff = 'setCutoff',
  approve = 'approve',
  withdraw = 'withdraw',
  transfer = 'transfer',
  balanceOf = 'balanceOf',
  allowance = 'allowance',
}



// address
export type DATA = string;
export type ADDRESS = string;

export type QUANTITY = string;
export type SIGNED_HEX = string;





export interface BaseTx {
  from: string;  // Todo: address Type
  to: string;    // Todo: address Type
  value: string;
  gasLimit: string;  // Todo: Unit Type
  gasPrice: string;  // Todo: Unit Type
  chainId: number;
  data?: string;
}

export interface RawTx extends BaseTx {
  nonce: string;
}

export interface SignedTx extends RawTx {
  rawTx: string;
  signedTx: string;
}






