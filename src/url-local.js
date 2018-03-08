import "commons/global.css";
import event from "commons/event.js";

import "commons/plugin.js";

// 获取配置文件内容，mob_list_xxx.js 和 mob_send_xxx.js
import "commons/readconf.js";

// vue 示例变量
let vm;

export default page => {

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