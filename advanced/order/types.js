export const rawOrder = {
  protocol:'',
  owner:'',
  tokenS:'',
  tokenB:'',
  buyNoMoreThanAmountB:'',
  marginSplitPercentage:'',
  amountS:'',
  amountB:'',
  timestamp:'',
  ttl:'',
  salt:'',
  lrcFee:'',
}

export const signedOrder = {
  ...rawOrder,
  r:'',
  s:'',
  v:'',
}

export const cancelOrderInput = {
  ...signedOrder
}

export const submitOrderInput = {
  tokensName:{},
  tokenbName:{},
  quantity:'',
  price:'',
}

const orderInput = signedOrder || submitOrderInput
