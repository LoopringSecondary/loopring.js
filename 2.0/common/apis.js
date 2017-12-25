import request from './request'
import validator from './validator'
// import {ADDRESS,RPC_TAG,HEX} from './types'

let headers = {
    'Content-Type': 'application/json'
}

// ==================
// Transaction
// ==================


export async function getTransactionCount(add,tag){
  validator.validate({value:add,type:'ADDRESS'})
  
  let body = {}
  body.method = 'eth_getTransactionCount'
  body.params = [add,tag]
  return request({
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
    return request({
      method:'post',
      headers,
      body,
    })
}

export async function submitOrder(order){
    validator.validate({value:order,type:'Order',})

    let body = {}
    body.method = 'loopring_submitOrder'
    body.params = [order]
    return request({
      method:'post',
      headers,
      body,
    })
}
export async function getOrders(filter){
    // validator.validate({value:filter,type:'HEX',})

    let body = {}
    body.method = 'loopring_getOrders'
    body.params = [filter]
    return request({
      method:'post',
      headers,
      body,
    })
}


// ==================
// Order
// ==================

export async function submitOrder(order){
    validator.validate({value:order,type:'Order',})

    let body = {}
    body.method = 'loopring_submitOrder'
    body.params = [order]
    return request({
      method:'post',
      headers,
      body,
    })
}
export async function getOrders(filter){
    // validator.validate({value:filter,type:'HEX',})

    let body = {}
    body.method = 'loopring_getOrders'
    body.params = [filter]
    return request({
      method:'post',
      headers,
      body,
    })
}










