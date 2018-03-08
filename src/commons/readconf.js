/*

  兼容老的交易配置, list 配置。

  mob_list_xxx.js
  mob_send_xxx.js
*/

import { qsid, ds, loadScript, injectFile, htmlPath } from "commons/url.js";

// 载入配置
const run = () => {

  let file = `${htmlPath}mob_list_${ds[1]}.js`;
  let res = loadScript(file);
  if(!res) {
    console.error(`缺少配置文件 mob_list_${ds[1]}.js`);
    return;
  }

  injectFile(res);

  file = `${htmlPath}mob_send_${ds[1]}.js`;
  res = loadScript(file);
  if(!res) {
    console.error(`缺少配置文件 mob_send_${ds[1]}.js`);
    return;
  }

  injectFile(res);
};

run();