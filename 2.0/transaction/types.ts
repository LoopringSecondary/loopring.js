export type RPC_TAG = 'latest' | 'earliest' | 'pending' ;
// export const enum RPC_Tag { 
//   latest = 'latest',
//   earliest = 'earliest',
//   pending = 'pending',
// }

export const enum AbiMethod { 
  setCutoff = 'setCutoff',
  approve = 'approve',
  withdraw = 'withdraw',
  transfer = 'transfer',
  balanceOf = 'balanceOf',
  allowance = 'allowance',
}
export type DATA = string;

export type ADDRESS = string;

export type QUANTITY = string;

export type HEX = string;

export interface BaseTx {
  from: ADDRESS;  
  to: ADDRESS;    
  value: QUANTITY;
  gasLimit: QUANTITY;  
  gasPrice: QUANTITY;  
  chainId: number;
  data?: string;
}

export interface RawTx extends BaseTx {
  nonce: string;
}

export interface SignedTx extends RawTx {
  raw: string;
  signed: HEX;
}






