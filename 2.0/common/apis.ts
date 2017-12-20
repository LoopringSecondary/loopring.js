import request from './request';
import crypto from 'crypto';

const id = () => {
    return crypto.randomBytes(16).toString('hex');
};

let headers = {
    'Content-Type': 'application/json'
};


export async function getTransactionCount(payload){
  let {add,tag} = payload
  // TODO type
  let body = {};
  body.id = id();
  body.method = 'eth_getTransactionCount';
  body.params = [add,tag];
  return request(`${HOST}`,{
    method:'post',
    headers,
    body,
  });
}

export async function sendRawTransaction(payload){
    
    let {tx} = payload;
    // TODO tx type
    request.id = id();
    request.method = 'eth_sendRawTransaction';
    request.params = [tx];
    return request(`${HOST}`,{
      method:'post',
      headers,
      body,
    });
};










