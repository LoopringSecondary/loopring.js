import request from '../common/request'
import validator from '../common/validator'
import {ADDRESS,RPC_TAG,HEX} from './types'

let headers = {
    'Content-Type': 'application/json'
};
const HOST = 'http://127.0.0.1';

export async function getTransactionCount(add:ADDRESS,tag:RPC_TAG):Promise{
  validator.validate({value:add,type:'ADDRESS',})

  let body = {};
  body.method = 'eth_getTransactionCount';
  body.params = [add,tag];
  return request(`${HOST}`,{
    method:'post',
    headers,
    body,
  });
}

export async function sendRawTransaction(tx:HEX){
    validator.validate({value:tx,type:'HEX',})
    
    let body = {};
    body.method = 'eth_sendRawTransaction';
    body.params = [tx];
    return request(`${HOST}`,{
      method:'post',
      headers,
      body,
    });
};










