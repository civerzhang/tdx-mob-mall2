import checkZh from "./url-jy";
import { onActivity } from "commons/view.js";
import Ddcx from "pages/ddcx.vue";

checkZh(Ddcx);

// 定义当前 View 激活事件
if(typeof tdxActivity != "function") {
  window.tdxActivity = () => {
    onActivity(() => { checkZh(Ddcx); });
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