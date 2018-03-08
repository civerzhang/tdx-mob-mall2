/*
  
  解析 url，给出我们需要的目录

*/

import tdxVal from "commons/tdx.js";

let pathname = location.pathname;
let search = location.search.substr(1);

// 获取参数中的配置
const getParam = key => {

  let reg = new RegExp(`(^|&)${key}=([^&]*)(&|$)`);
  let r = search.match(reg);
  if(r != null) {
    return r[2];
  }
  else {
    return undefined;
  }
};

// 获取所有的 url 参数
const getParams = () => {

  if(!search) {
    return {};
  }

  let arr = search.split("&");
  let param = {};
  arr.map( p => {
    let pair = p.split("=");
    param[pair[0]] = pair[1];
  });

  return param;
}

/*

  解析路径, 2级目录  

  工程的目录结构

  webApp/
    app/
      demo/
        res/
          ... 资源图片文件
        js/
          ... 打包后的js文件
        css/
          images/
            ... 打包后的图片文件
          ... 打包后的 css 文件
        index.html
        mob_list_index.js
        mob_send_index.js
        ...
    libs/
      ...
    tlibs/
      ...

  demo/index.html

  返回 ["demo", "index"]
*/
const getPath = () => {

  let reg = new RegExp(`\/([^\/]*)\/([^\/]*).html$`);
  let r = pathname.match(reg);
  if(r) {
    return r.slice(1);
  }
  else {
    return undefined;
  }
};

/*
  读取 js 文件内容

  @params { String } file 读取文件的路径
*/
const loadScript = file => {

  let xhr = new XMLHttpRequest();
  xhr.open("GET", file, false);       // 同步读取文件
  xhr.send(null);
  if(xhr.readyState == 4) {

    // 404 错误
    if(xhr.status == 404) {
      return undefined;
    }

    if(xhr.status >= 200 && xhr.status < 300 || xhr.status == 304 || xhr.responseText != "") {
      return xhr.responseText;
    }
    else {
      return undefined;
    }
  }
};

/*
  将 js 内容弄到 html 中去

  @params { String } content js文件内容字符串
*/
const injectFile = content => {
  let script = document.createElement ("script");
  script.type = "text/javascript";
  script.text = content;
  document.body.appendChild(script);
};

// console.log("-------------process------------");
// console.log(process.env);
// console.log("-------------process------------");

let set = loadScript("config.json");
if(set) {
  set = JSON.parse(set);
}
set = set || {};

let htmlPath;
if(set.debug) {
  htmlPath = set.path;
}
else {
  htmlPath = "";
}

// let htmlPath = process.env.NODE_ENV != "production" ? `http://${process.env.host}:${process.env.port}/webApp/app/mall/` : set.path;

/* 
  这里抛出一些公共变量
*/
tdxVal("getParam", getParam);

module.exports = {
  ds: getPath(),
  qsid: getParam("qsid"),
  color: getParam("color"),
  injectFile,
  loadScript,
  getParam,
  getParams,
  htmlPath
};