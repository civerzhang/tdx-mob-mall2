/* 

  个性化实现组件，载入逻辑

  // register.json

  [
    {
      "tplid": "mob-form-input2",
      "file": "mob-form-input2.js"
    },
    ...
  ]



*/


import { loadScript, htmlPath } from "commons/url";
import mixins from "commons/mixins.js";

import mobSplit from "components/mob-split.vue";

let rootPath = `${htmlPath}plugins/`;
let registerPlugins = {};

/* 

  从 vue 文件中获取对应的 template, script 节点下的内容

*/
const spaceReplaceChar = "__space__";
const wrapReplaceChar = "__wrap__";
const getScripts = content => {
  
  // 处理换行
  content = content.replace(/\n/g, wrapReplaceChar);
  content = content.replace(/\s/g, spaceReplaceChar);
  
  let regTpl = new RegExp(/<template>(\S*)<\/template>/);
  let regScript = new RegExp(/<script>(\S*)<\/script>/);
  if(content) {
    let tpl = content.match(regTpl);
    tpl = tpl && tpl[1];
    let options = content.match(regScript);
    options = options && options[1];

    // 还原空格
    let regRtSpace = new RegExp(spaceReplaceChar, "g");
    let regRtWrap = new RegExp(wrapReplaceChar, "g");
    tpl = tpl.replace(regRtSpace, " ");
    options = options.replace(regRtSpace, " ");
    tpl = tpl.replace(regRtWrap, "\n");
    options = options.replace(regRtWrap, "\n");
    return { tpl, options };
  }

  return {};
}

const run = () => {
  
  let json = loadScript(`${rootPath}register.json`);
  try {
    json = JSON.parse(json);
  }
  catch(e) {
    console.error(e);
    json = [];
  }

  for(let i = 0; i < json.length; i++) {

    let { tplid, file } = json[i];
    let scriptText = loadScript(`${rootPath}${file}`);
    let { options, tpl } = getScripts(scriptText);
    let fn = new Function(options);
    let vueTplOptions = fn();

    Vue.component(
      tplid, 
      $.extend(
        {}, 
        { template: tpl },
        vueTplOptions, 
        {
          mixins: [mixins],
          props: {
            item: {
              required: true
            },
            data: {
              required: false
            }
          },
          components: {
            mobSplit
          }
        }
      )
    );
    registerPlugins[tplid] = Vue.component(tplid);
  }
}

run();

export default tplid => {
  return registerPlugins[tplid];
}