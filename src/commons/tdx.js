/* 
  将一些变量绑定到全局变量 tdx 上
*/

export default (name, value) => {

  if(!tdx) {
    window["tdx"] = {};
  }

  tdx[name] = value;
}