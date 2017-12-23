import fetch from 'isomorphic-fetch';


function checkStatus(res) {
  // TODO
  return res;
}

function parseJSON(res) {
  return res.json();
}

function request(url, options) {
  if(options.body){
    options.body.id = '1'; // TODO ?
    options.body = JSON.stringify(options.body);
  }
  return fetch(url, options)
    .then(checkStatus)
    .then(parseJSON)
    .then(res=>{
      console.log('res',res)
      if (res.error){
          throw new Error('res error: '+ res.error.message)
      }
      return res.result;
    })
    // .catch(error=>{
    //   throw new Error(error)
    // })
}


export default request;
