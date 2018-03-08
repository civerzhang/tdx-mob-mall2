/* 

  存放一些与 view 操作有关的函数

  tdxActivity、Ret_Query、tdxRefresh

  tab 切换的时候

  android Ret_Query 在 tdxActivity 前面执行
*/

/* 
  为了防止界面激活的时候，重复刷新了 2 次
*/
let timer;

export const onActivity = callback => {

  if(timer) {
    clearTimeout(timer);
  }
  
  timer = setTimeout( () => {
    timer = null;
    if(typeof callback == "function") {
      callback();
    }

    // 默认是刷新界面
    else {
      window.location.href = window.location.href;
    }
  }, 50);
}