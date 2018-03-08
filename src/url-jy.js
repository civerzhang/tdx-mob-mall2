import "commons/global.css";
import event from "commons/event.js";
import { __webCallTqlWrapper } from "commons/req.js";
import { isPtLogin } from "commons/req-calltql.js";

import "commons/plugin.js";

// 获取配置文件内容，mob_list_xxx.js 和 mob_send_xxx.js
import "commons/readconf.js";
import { getConf } from "commons/transconf.js";

// vue 示例变量
let vm;

const run = page => {

  if(vm) {
    event.$emit("tdxActivity");
  }
  else {

    vm = new Vue({
      el: "#app",
      data: {},
      computed: {
        
        ViewPage() {
          return page;
        }
      },

      render(h) {
        return h(this.ViewPage);
      }
    });
  }
}

// 用户登录检查
export default page => {

  isPtLogin((flag, zhRow) => {

    if(flag) {
      run(page);
    }
    else {

      let { loginPage } = getConf();
      if(loginPage) {
        window.location.href = loginPage;
      }
      else {
        tdxAlert("mob_list_xxx.js 中缺少配置项 loginPage");
      }
    }
  });
}