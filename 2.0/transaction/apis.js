import request from '../common/request'
import validator from '../common/validator'
// import {ADDRESS,RPC_TAG,HEX} from './types'

let headers = {
    'Content-Type': 'application/json'
};
const HOST = 'https://relay1.loopring.io/rpc'

export async function getTransactionCount(add,tag){
  validator.validate({value:add,type:'ADDRESS'})

  let body = {}
  body.method = 'eth_getTransactionCount'
  body.params = [add,tag]
  return request(`${HOST}`,{
    method:'post',
    headers,
    body,
  })
}

export async function sendRawTransaction(signedTx){
    validator.validate({value:signedTx,type:'HEX',})
    
    let body = {}
    body.method = 'eth_sendRawTransaction'
    body.params = [signedTx]
    return request(`${HOST}`,{
      method:'post',
      headers,
      body,
    })
}










