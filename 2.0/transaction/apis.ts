import request from '../common/request';

let headers = {
    'Content-Type': 'application/json'
};


export async function getTransactionCount({add:string,tag:string}){
  // TODO:type vlidator
  let body = {};
  body.method = 'eth_getTransactionCount';
  body.params = [add,tag];
  return request(`${HOST}`,{
    method:'post',
    headers,
    body,
  });
}

export async function sendRawTransaction({tx:SIGNED_HEX}){
    // TODO:type vlidator
    let body = {};
    body.method = 'eth_sendRawTransaction';
    body.params = [tx];
    return request(`${HOST}`,{
      method:'post',
      headers,
      body,
    });
};










