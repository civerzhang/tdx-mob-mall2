import checkZh from "./url-jy";
import { onActivity } from "commons/view.js";
import Jjjy from "pages/jjjy.vue";

checkZh(Jjjy);

// 定义当前 View 激活事件
/* 
  注释这个是为了适当性检查的时候，不要再做刷新
*/
// window.tdxActivity = () => {
//   checkZh();
// };

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