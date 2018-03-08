import run from "./url-local";
import { onActivity } from "commons/view.js";
import Jjlist from "pages/jjlist.vue";

run(Jjlist);

// 定义当前 View 激活事件
if(typeof tdxActivity != "function") {
  window.tdxActivity = () => {
    onActivity(() => { run(Jjlist); });
  };
}

// 定义刷新事件
if(typeof tdxRefresh != "function") {
  window.tdxRefresh = () => {
    onActivity();
  };
}

if(typeof Ret_Query != "function") {
  window.Ret_Query = () => {
    onActivity();
  };
}