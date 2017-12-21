

export type RPC_TAG = 'latest' | 'earliest' | 'pending' ;
export type ABI_METHOD = 'cancelOrder' | 'setCutoff' | 'approve' | 'withdraw' | 'transfer' | 'balanceOf' | 'allowance';
export type ADDRESS = string;
export type QUANTITY = string;
export type HEX = string;
export type PRIVATE_KEY = string;


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

// export const enum RPC_Tag { 
//   latest = 'latest',
//   earliest = 'earliest',
//   pending = 'pending',
// }
// 
// export const enum ABI_METHOD { 
//   cancelOrder = 'cancelOrder',
//   setCutoff = 'setCutoff',
//   approve = 'approve',
//   withdraw = 'withdraw',
//   transfer = 'transfer',
//   balanceOf = 'balanceOf',
//   allowance = 'allowance',
// }





