

export type RPC_TAG = 'latest' | 'earliest' | 'pending' ;
export type ABI_METHOD = 'cancelOrder' | 'setCutoff' | 'approve' | 'withdraw' | 'transfer' | 'balanceOf' | 'allowance';
export type ADDRESS = string;
export type QUANTITY = string;
export type HEX = string;
export type PRIVATE_KEY_BUFFER = Buffer;
export type PRIVATE_KEY_STRING = string;


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




