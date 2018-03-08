/*

  请求封装

*/
import { getLocalStorage } from "commons/req-localStorage";
import { Fw2Req } from "commons/req-calltql.js";
import { webCall } from "commons/req-webcall.js";

export const __webCallTqlWrapper = (entry, param, callback, row) => {
  webCall(entry, param, callback, row);
}

/* 

  所有的请求入口，这里来区分不同的环境请求，
  
  来确定调用 connect.js 的 __jyCallTql, __hqCallTql, __fwCallTql

  JY.xxxx  走原来的交易请求逻辑，使用 __jyCallTql
  HQ.xxxx  走原来的行情请求逻辑，使用 __hqCallTql
  FW.xxxx  走原来的服务请求逻辑，使用 __fwCallTql

  FW2.xxxx 走 TS 的交易请求，使用 __hqCallTql，不过有新的参数

  Local.localStorage

*/
export const callTqlWrapper = (entry, ix, callback) => {

  if(entry.indexOf("JY.") >= 0) {
    __jyCallTql.send(entry.replace("JY.", ""), ix.valueOf(), callback);
  }
  else if(entry.indexOf("HQ.") >= 0) {
    __hqCallTql.send(entry.replace("HQ.", ""), ix.valueOfJson(), callback);
  }
  else if(entry.indexOf("FW.") >= 0) {
    __fwCallTql.send(entry.replace("FW.", ""), ix.valueOfJson(), callback);
  }
  else if(entry.indexOf("FW2.") >= 0) {
    Fw2Req(entry, ix, callback);
  }
  else if(entry.toLowerCase() == "local.localstorage") {
    getLocalStorage(ix.valueOfJson()[0].key, callback);
  }
}

/*
  IXContent
*/
const IXContent = function() {
  this.cnt = [];
  this.cntJ = {};
}

IXContent.prototype.Set = function(key, value) {
  if(value && key) {
    let o = {};
    o[key] = value;
    this.cnt.push(o);
    this.cntJ[key] = value;
  }
}

IXContent.prototype.valueOf = function() {
  return this.cnt;
}

IXContent.prototype.valueOfJson = function() {
  return [this.cntJ];
}

window["IXContent"] = IXContent;