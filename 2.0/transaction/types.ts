

export type RPC_TAG = 'latest' | 'earliest' | 'pending' ;
export type ABI_METHOD = 'cancelOrder' | 'setCutoff' | 'approve' | 'withdraw' | 'transfer' | 'balanceOf' | 'allowance';
export type ADDRESS = string;
export type QUANTITY = string;
export type HEX = string;


export interface BaseTx {
  to: ADDRESS    
  value: QUANTITY
  gasLimit: QUANTITY
  gasPrice: QUANTITY
  chainId: number
}

export interface RawTx extends BaseTx {
  data: string;
  nonce: string;
}

export interface SignedTx extends RawTx {
  signed: HEX;
}

