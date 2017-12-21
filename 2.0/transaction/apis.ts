import request from '../common/request';
import {validate} from './validators';
import {ADDRESS,RPC_TAG,SIGNED_TX_HEX} from './types';


let headers = {
    'Content-Type': 'application/json'
};

export async function getTransactionCount({add:ADDRESS,tag:RPC_TAG}):Promise{
  validate({value:add,type:'ADDRESS',})
  validate({value:tag,type:'RPC_TAG',})

  let body = {};
  body.method = 'eth_getTransactionCount';
  body.params = [add,tag];
  return request(`${HOST}`,{
    method:'post',
    headers,
    body,
  });
}

export async function sendRawTransaction({tx:HEX}){
    validate({value:tx,type:'HEX',})
    
    let body = {};
    body.method = 'eth_sendRawTransaction';
    body.params = [tx];
    return request(`${HOST}`,{
      method:'post',
      headers,
      body,
    });
};










