import * as apis from './transaction/apis';

let payload = {
  add:'0xebA7136A36DA0F5e16c6bDBC739c716Bb5B65a00',
  tag:'latest',
}
let result = apis.getTransactionCount(...payload).then(res=>{
  console.log("res",res)
});
