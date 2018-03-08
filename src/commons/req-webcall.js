/* 
  APP 客户端 webCall 请求封装
*/

import { isPtLogin } from "commons/req-calltql.js";

const platform = __tdxMobSystem || "web";

// 默认 tdxOpenUrl 参数
export const tdxOpenUrlParamDef = {
  OpenName: "undefined",
  OpenType: "native",
  OpenUrl: "",
  OpenParam: {
    UrlType: "Relative",
    WebViewType: platform == "Android" ? "JyURL" : "LocalURL"
  }
}

export const webCall = (entry, param, callback, row) => {
  
  // if(entry == "tdxOpenUrl" && platform == "web") {
  //   window.location.href = param.OpenUrl;
  //   return;
  // }

  // 跳转前需要登录
  if(param.requireLogin) {

    isPtLogin( flag => {

      if(!flag) {
        __tdxLoginBox();
        return;
      }

      webCallTqlCon(entry, param, callback, row);
    });
  }
  else {
    webCallTqlCon(entry, param, callback, row);
  }
}

const webCallTqlCon = (entry, param, callback, row) => {
  
  if(entry == "tdxOpenUrl") {
  
    let querys = [];
    let url = param.OpenUrl;
    if(param.queryParams && row) {
      param.queryParams.map( q => {
        if(q.key != "url") {
          querys.push(`${q.key}=${row[q.value] || ""}`);
        }
        else {
          param.OpenUrl = row[q.value];
        }
      });
    }

    if(url.indexOf("?") > 0) {
      param.OpenUrl += `&${querys.join("&")}`;
    }
    else {
      param.OpenUrl += `?${querys.join("&")}`;
    }
  
    __webCallTql.send(
      entry, 
      $.extend(true, {}, tdxOpenUrlParamDef, param),
      callback
    );
  
    return;
  }
  
  __webCallTql.send(entry, param, callback);
}