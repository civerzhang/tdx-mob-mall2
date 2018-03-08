/* 
  交易的请求封装
*/
import event from "commons/event.js";

let hqJyCallTql;
let uinfo;

const HqJyCallTql = function(def) {
  this.def = def;
}

HqJyCallTql.prototype.send = function(entry, param, callback) {
  __hqCallTql.objOptParam = {'sessionType': 'HQSession',"PasswordSessionID":"CurSession"};
  __hqCallTql.send(entry, $.extend({}, this.def, param[0]), callback);
}

/* 
  FW2.xxx 的请求处理
*/
export const Fw2Req = (entry, ix, callback) => {
  /* 
    这里走 TS 的交易，需要登录
  */
  if(!hqJyCallTql) {
    
    // 唤起登录框
    __tdxLoginBox();
  }
  else {
    hqJyCallTql.send(entry.replace("FW2.", ""), ix.valueOfJson(), callback);
  }
}

export const isPtLogin = callback => {
  
  __webCallTql.send("tdxEnumTradeAcc", {}, res => {
  
    let isPtLogin = false;
    let user;
    if(typeof res == "string") {
      res = JSON.parse(res);
    }
  
    for(let i = 0; i < res.length; i++) {
      
      let zh = res[i];
      if(typeof zh == "string") {
        zh = JSON.parse(zh);
      }
  
      // 第一个普通账户
      if(zh.HostType == 0) {
        isPtLogin = true;
        user = zh;
        break;
      }
    }

    callback(isPtLogin, user);
  })
}
  
const onTdxActivity = function() {

  /* 
    界面激活，去取一次账户信息

    为了使得账户切换的时候，使用当前的活动账户
  */
  isPtLogin( (isPtLogin, user) => {

    if(isPtLogin) {

      /* 
        将当前账号设置为第一个生效的普通账号 
        
        商城，网厅业务都是使用普通账号进行的
        
        多账号的时候，如果切到信用账号，APP 会以信用的账号进行委托，所以这里需要手动切换下
      */ 
      __webCallTql.send("tdxChangeCurAcc", { SessionID: user.SessionID }, () => {});
      hqJyCallTql = new HqJyCallTql({
        "120": user.KHH,
        "134": "#PASSWORD#"
      });

      /* 
        这里需要提供2个最新的全局变量，供后面使用
      */
      if(typeof user.ZJZH == "string") {
        user.ZJZH = JSON.parse(user.ZJZH);
      }
      window["hqJyCallTql"] = hqJyCallTql;
      window["uinfo"] = user;
    }
  });
}

event.$on("tdxActivity", onTdxActivity);

// 自动执行一次
onTdxActivity();