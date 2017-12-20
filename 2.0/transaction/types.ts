

export interface BaseTransaction {
  from: string;  // Todo: address Type
  to: string;    // Todo: address Type
  value: string;
  data: string;
  gasLimit: string;  // Todo: Unit Type
  gasPrice: string;  // Todo: Unit Type
  chainId: number;
}

export interface RawTransaction extends BaseTransaction {
  nonce: string;
}


export interface SignedTransaction extends RawTransaction {
  rawTx: string;
  signedTx: string;
}





