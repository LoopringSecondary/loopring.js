import fetch from 'fetch';


function checkStatus(res) {
  // TODO
  return res;
}


function parseJSON(res) {
  return res.json();
}

function ifResHasErr(res){
  if (res.error){
      throw new Error(res.error.message);
  }
  return res;
}


function request(url, options) {
  if(options.body){
    options.body.id = '1';
    options.body = JSON.stringify(options.body);
  }
  return fetch(url, options)
    .then(checkStatus)
    .then(parseJSON)
    .then(ifResHasError)
}


export default request;
