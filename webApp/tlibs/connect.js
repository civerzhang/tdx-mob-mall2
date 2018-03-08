var g_tdx_log = true;

var __tdxMobSystem = tdxCheckMobSys();
/******************************************************connect.js  from tdx*****************************************************************/
/***检测手机系统***/
function tdxCheckMobSys() {
  var clientType = '';
  /***pc客户端***/
  var matches = /tdxw/i.test(navigator.userAgent.toLowerCase()
  );
  if (matches) {
    clientType = 'PC';
  }

  /***ios-app应用内***/
  var matches = /tdxios/i.test(navigator.userAgent.toLowerCase());
  if (matches) {
    if (window.location.href.indexOf("http") == 0 || window.location.href.indexOf("https") == 0) {
      clientType = 'WEB-IOS';
    } else {
      clientType = 'IOS';
    }

  }

  /*** Android-app 安卓app应用内***/
  var matches = /tdxandroid/i.test(navigator.userAgent.toLowerCase());
  if (matches) {
    if (window.location.href.indexOf("http") == 0 || window.location.href.indexOf("https") == 0) {
      clientType = 'WEB-Android';
    } else {
      clientType = 'Android';
    }
  }
  //
  /***wechat-app 微信内嵌浏览器内***/
  var ua = navigator.userAgent.toLowerCase();
  if (ua.match(/MicroMessenger/i) == "micromessenger") {
    clientType = 'WX';
  }

  if (g_tdx_log) {
    // console.log("%c环境类型-clientType：" + clientType, 'color:gray')
  }

  return clientType;
}


/***返回URL的一个随机串***/
function getRnd() {
  return parseInt(Math.random() * 10000) + "=" + parseInt(Math.random() * 10000);
}

/***获取 function 名称***/
function Fun_Name(funname) {
  var tmp = funname.toString();
  var re = /function\s*(\w*)/i;
  var matches = re.exec(tmp);
  //alert("name:" +matches[1]);
  return matches[1];
}

/**获取当前时间-时分秒**/
function _theTime(){
     var myDate = new Date();
     myhours = myDate.getHours();
     myminutes = myDate.getMinutes();
     myseconds = myDate.getSeconds();
     mymilliseconds = myDate.getMilliseconds();

     return myhours +':'+myminutes +':'+myseconds +':'+mymilliseconds;
}


/***回调函数字典***/
var _callFuncDictConnect = {};

/***统一不同方式的回调函数***/
function getCallBack(formid, strFuncName, strErrNo, strResultCont) {


  if (g_tdx_log) {
    console.log([
      '接受应答:',
      '%c\nWebCall请求详情，formid: [' + formid + ']，功能名-strFuncName：[' + strFuncName + ']',
      '%cstrErrNo：',
      '%c' + strErrNo,
      '%c应答结果：',
      '%c' + strResultCont,
      '%c当前时间: ' + _theTime(),
      ''
    ].join('\n'), 'color: green', 'color: red', 'color: gray', 'color: blue', 'color: gray', 'color: green');
  }


  if (formid.indexOf('_UrlEncode') > -1) {
    strResultCont = decodeURIComponent(strResultCont);
  }

  if (strErrNo != 0) {
    strResultCont = JSON.stringify([[strErrNo, strResultCont, '', '', ''], [], []]);
    if (strErrNo == '-10000') {
      __tdxLoginBox();
      strResultCont = JSON.stringify([[0, strResultCont, 0, "", ''], [], []]);
    }
  }

  if (_callFuncDictConnect.hasOwnProperty(formid)) {
    var callback = _callFuncDictConnect[formid];
    _callFuncDictConnect[formid] = undefined;
    delete _callFuncDictConnect[formid];
    callback(strResultCont);
  }
}

/*****************************************IOS函数桥接******************************************/
var _IOSBridgeConnect = {
  callbacksCount: 1,
  callbacks: {},
  resultForCallback: function resultForCallback(callbackId, resultArray) {
    try {
      var callback = _IOSBridgeConnect.callbacks[callbackId];
      if (!callback) {
        return;
      }
      callback.apply(null, resultArray);
    } catch (e) {
      alert(e);
    }
  },
  call: function call(strCallWay, args, strFuncName, frameID, callback) {
    var hasCallback = callback && typeof callback == "function";
    var callbackId = hasCallback ? _IOSBridgeConnect.callbacksCount++ : 0;
    if (hasCallback) {
      _IOSBridgeConnect.callbacks[callbackId] = callback;
    }
    var iframe = document.createElement("IFRAME");
    iframe.style.display='none';
    iframe.setAttribute("src", "tdx-frame:" + strCallWay + ";;" + frameID + ";;" + strFuncName + ";;" + args + ";;" + callback);
    document.documentElement.appendChild(iframe);
    iframe.parentNode.removeChild(iframe);
    iframe = null;
  }
};

/***创建TS_client对象***/
var tdxClientObj = CreateTDXClient({
  // serverType:,
  needReserve: false,
  needLogin: false,
  preLoginFuncList: [],
  notify: function (msgType, data, obj) {
  }
});
var mCallTQL = tdxClientObj.execute.bind(tdxClientObj);

/***激活TQLEX调用方式***/
var activeServerType = function () {
  var setServerType = tdxClientObj.setServerType.bind(tdxClientObj);
  setServerType("tqlex");
}

/***转发请求到ts_client.js***/
var NcallTql = function (strFuncName, cparams, callbk, otherparams) {
  var __formid = otherparams.formid;
  var __Way = otherparams.Way;

  if (strFuncName == 'TSTC.uinfo' && __tdxMobSystem != "IOS" && __tdxMobSystem != "Android") {
    callbk(_formidDict[__formid], strFuncName, 0, localStorage.getItem('uinfo'));
    return;
  }

  mCallTQL(strFuncName, cparams, function (err, data) {

    if (g_tdx_log) {
      console.log([
        '接受应答:',
        '%c\nCallTQL请求详情，功能名-strFuncName: [' + strFuncName + ']，入参-cparams：[' + cparams + ']',
        '%c应答结果：',
        '%c' + (typeof data === 'object') ? JSON.stringify(data) : data,
        '%c当前时间: ' + _theTime(),
        ''
      ].join('\n'), 'color: green', 'color: red','color: blue','color: green');
    }

    /***券商服务请求应答原始返回***/
    if (__Way == 'qs') {
      callbk(data);
      return;
    }

    if (typeof data === 'string') {
      data = data.replace(/\r\n/g, "<br>");
      data = data.replace(/\r/g, "<br>");
      data = data.replace(/\n/g, "<br>");
      data = data.replace(/&nbsp;/g, " ");
    }


    try {
      if (__tdxMobSystem != "IOS" && __tdxMobSystem != "Android" && __tdxMobSystem != 'WEB-IOS' && __tdxMobSystem != 'WEB-Android') {
        var curHref = window.location.href;
        /***未登录，唤起登录***/
        if (data.indexOf('[-10000]') > -1 && curHref.indexOf('login.html') < 0) {
          __tdxLoginBox();
        }
      } else {
        if (err == '-10000') {
          __tdxLoginBox();
        }
      }

      if (otherparams.jyflag === 1) {

        callbk(_formidDict[__formid], strFuncName, err, data);
      } else {

        if(err !='0' && err!=''){
          data = '[[' + err + ',"' + data + '",0,"",0,""],[],[],[]]';
        }
        callbk(data);
      }

    } catch (ex) {
      /***具体错误处理***/
      data = '-999';
      err = '[[' + data + ',"' + ex + '",0,"",0,""],[],[],[]]';
      callbk(err);
    }

  }, otherparams);  //'jyflag':0 默认新的交易通道(通用),'jyflag':1,针对交易webview  otherparams={'jyflag': 0};
}


var _formidDict = [];
function sendRequest(strCallWay, strFuncName, paramsFuncData, objOptParam, funcCallBack, addParObj) {

  var PageId = '';
  if (typeof paramsFuncData == 'object' && paramsFuncData.length > 0) {
    PageId = paramsFuncData[0].tdxPageID;
  }

  if (typeof paramsFuncData == 'object' && paramsFuncData["tdxPageID"]) {
    PageId = paramsFuncData.tdxPageID;
  }

  var callback_name = typeof  funcCallBack == "function" ? Fun_Name(funcCallBack) : "none";
  var formid = getRnd() + '_$$$$$' + '_' + callback_name + PageId;
  _callFuncDictConnect[formid] = funcCallBack;

  if (typeof addParObj == 'object' && addParObj.formid != undefined && addParObj.formid != '') {
    _formidDict[formid] = addParObj.formid;
  }
  var addWay = '';
  if (typeof addParObj == 'object' && addParObj.hasOwnProperty('Way')) {
    addWay = addParObj.Way;
  }


  if (__tdxMobSystem == "IOS" || __tdxMobSystem == 'WEB-IOS') {
    var cparams = paramsFuncData;
    if (strCallWay === "CallTQL") {

      if (__tdxMobSystem == 'WEB-IOS' && addWay !=='qs') {
        if (typeof paramsFuncData != 'string') {
          paramsFuncData = JSON.stringify(paramsFuncData);
        }
        NcallTql(strFuncName, paramsFuncData, funcCallBack, {'formid': formid, 'Way': addWay});
        return;
      }

      /****新数据请求发送通道，支持发生到:行情、服务、交易****/
      var tmp = {
        "SessionType": objOptParam.sessionType,
        "TQLParam": paramsFuncData
      };
      if (objOptParam.sessionType === 'JYSession') {
        tmp.SessionID = objOptParam.SessionID;
        tmp.JYParam = paramsFuncData;
      }
      jsonExtend(tmp, objOptParam);
      cparams = JSON.stringify(tmp);
      NcallTql(strFuncName, cparams, funcCallBack, {'jyflag': 0, 'formid': formid, 'Way': addWay});
    } else if (strCallWay === 'WJyCallTql') {
      /****老交易请求发送通道****/
      NcallTql(strFuncName, cparams, funcCallBack, {'jyflag': 1, 'formid': formid});
    } else if (strCallWay === 'WebCall') {
      /***IOS客户端内部请求调用***/
      cparams = JSON.stringify(paramsFuncData);
      _IOSBridgeConnect.call(strCallWay, cparams, strFuncName, formid, 'getCallBack');
    }
  } else if (__tdxMobSystem == 'Android' || __tdxMobSystem == 'WEB-Android') {
    if (typeof paramsFuncData != 'string') {
      paramsFuncData = JSON.stringify(paramsFuncData);
    }
    if (strCallWay === "CallTQL") {

      /*
       新数据请求发送通道，支持发生到:行情、服务、交易
       * */

      var temp = {
        "SendSession": objOptParam.sessionType,
        "TQLParam": paramsFuncData
      };
      if (objOptParam.sessionType === 'JYSession') {
        temp.SessionID = objOptParam.SessionID;
      }
      jsonExtend(temp, objOptParam);

      var SendSession = JSON.stringify(temp);
      NcallTql(strFuncName, paramsFuncData, funcCallBack, {'jyflag': 0, 'formid': formid, 'SendSession': SendSession, 'Way': addWay});
      // window.tdx_java.TdxSendData(strFuncName, paramsFuncData, SendSession, 'getCallBack', formid);
    } else if (strCallWay === 'WJyCallTql') {
      /*
       老交易请求发送通道
       * */
      NcallTql(strFuncName, paramsFuncData, funcCallBack, {'jyflag': 1, 'formid': formid});
    } else if (strCallWay === 'WebCall') {
      /***Android客户端内部请求调用***/
      window.tdx_java.TdxWebCall(strFuncName, paramsFuncData, 'getCallBack', formid);
    }
  } else {
    if (strCallWay === 'WJyCallTql' || objOptParam.hasOwnProperty("TSTC") || strFuncName.indexOf("TSTC.") >= 0) {
      if (__tdxMobSystem == 'PC') {

        if (strFuncName == "uinfo") {
          strFuncName = 'tc.getuinfo';
        } else {
          if (strFuncName.indexOf("FuncID(") == 0 && strFuncName.slice(strFuncName.length - 1) == ")") {
            strFuncName = strFuncName.slice(("FuncID(").length, strFuncName.length - 1);
          } else {
            strFuncName = 'atc.' + strFuncName;
          }
        }
        NcallTql(strFuncName, paramsFuncData, funcCallBack, {'jyflag': 1, 'formid': formid});

      } else {
        var uinfo = localStorage.getItem("uinfo");

        // 如果这里检查到用户未登录，发 TSTC 请求的时候，必须去登录
        if (!uinfo) {
          __tdxLoginBox(function () {
          });
          return;
        }

        /***原来硬代码的功能进行兼容***/
        if (strFuncName == "uinfo") {
          funcCallBack(addParObj.formid, strFuncName, "", uinfo);
          return;
        }
        /***微信交易的处理分支***/
        uinfo = JSON.parse(uinfo);
        var tmpParams = [{
          "@AddPreF": "1",
          "@QSID": uinfo.qsid,
          "F1235": "webwt",
          "F121": uinfo.zjzh
        }]
        if (typeof paramsFuncData == 'string') {
          paramsFuncData = JSON.parse(paramsFuncData);
        }
        try {
          if (strFuncName.indexOf("TSTC.") >= 0) {
            jsonExtend(tmpParams[0], paramsFuncData[0]);
          } else {
            strFuncName = 'TSTC.' + strFuncName;
            paramsFuncData.forEach(function (item, index) {
              jsonExtend(tmpParams[0], item);
            })
          }
        } catch (err) {

        }

        tmpParams = JSON.stringify(tmpParams);
        if (strCallWay === "WJyCallTql") {
          NcallTql(strFuncName, tmpParams, funcCallBack, {'jyflag': 1, 'formid': formid});
        } else {
          NcallTql(strFuncName, tmpParams, funcCallBack, {'jyflag': 0, 'formid': formid});
        }
      }
    } else {
      if (typeof paramsFuncData != 'string') {
        paramsFuncData = JSON.stringify(paramsFuncData);
      }

      NcallTql(strFuncName, paramsFuncData, funcCallBack, {'formid': formid, 'Way': addWay});
    }

  }


  if (g_tdx_log) {
    console.log([
      '发送请求:',
      '%c\n【'+strCallWay+'】请求详情，功能名-strFuncName: [' + strFuncName + ']，入参-cparams：[' + paramsFuncData + ']',
      '%cobjOptParam: ' + JSON.stringify(objOptParam),     
      '%c当前时间: ' + _theTime(),
      ''
    ].join('\n'), 'color: green', 'color: red', 'color: green');
  }

}

/***json对象合并***/
function jsonExtend(destination, source) {
  for (var property in source)
    destination[property] = source[property];
  return destination;
}
/***通用交易请求通道***/
var JYCallTql = function () {
  this.SessionID = '';
  this.objOptParam = {'sessionType': 'JYSession', 'SessionID': this.SessionID || ""};
  this.callWay = 'CallTQL';
  this.addParObj = {};

}

JYCallTql.prototype.send = function (entry, stream, callback) {
  sendRequest(this.callWay, entry, stream, this.objOptParam, callback, this.addParObj);
}

/***交易Webview专属请求通道***/
var WJyCallTql = function () {
  this.objOptParam = {};
  this.callWay = 'WJyCallTql';
}

WJyCallTql.prototype.send = function (entry, stream, callback, addParObj) {
  sendRequest(this.callWay, entry, stream, this.objOptParam, callback, addParObj)
}

/***行情请求发送***/
var HQCallTql = function () {
  this.objOptParam = {'sessionType': 'HQSession'};
  this.callWay = 'CallTQL';
  this.addParObj = {};
}

HQCallTql.prototype.send = function (entry, stream, callback) {
  sendRequest(this.callWay, entry, stream, this.objOptParam, callback, this.addParObj);
}

/***服务FWSession请求发送***/
var FWCallTql = function () {
  this.objOptParam = {'sessionType': 'FWSession', 'SessionID': this.SessionID || ""};
  this.callWay = 'CallTQL';
  this.addParObj = {};
}

FWCallTql.prototype.send = function (entry, stream, callback) {
  sendRequest(this.callWay, entry, stream, this.objOptParam, callback, this.addParObj)
}

/***链接跳转调用/调用硬代码功能/枚举交易账号/唤起登陆界面***/
var WEBCallTql = function () {
  this.callWay = 'WebCall';
  this.objOptParam = {'sessionType': '', 'SessionID': this.SessionID || ""};
}


WEBCallTql.prototype.send = function (entry, stream, callback) {

  if (callback == '' || callback == undefined || typeof callback != 'function') {
    callback = function () {

    }
  }

  if (__tdxMobSystem != "IOS" && __tdxMobSystem != "Android" && __tdxMobSystem != 'WEB-IOS' && __tdxMobSystem != 'WEB-Android') {
    /*
     * 非app内部页面跳转支持（微信、浏览器）
     * */
    var streamObj = stream;
    if (typeof stream === 'string') {
      streamObj = JSON.parse(stream);
    }
    if (streamObj.hasOwnProperty('OpenUrl')) {

      var homePath = "/site/webApp/app/";
      var OpenName = streamObj.OpenName;
      var OpenUrl = streamObj.OpenUrl;
      var UrlType = streamObj.OpenParam.UrlType;
      var realUrl = OpenUrl;

      if (UrlType === "Absolute") {
        realUrl = homePath + OpenUrl;
      } else {
        // 取iframe中的路径，来计算出相对路径
        var curHref = window.location.href;
        var lastIndexSlash = curHref.lastIndexOf("/");
        realUrl = curHref.substring(0, lastIndexSlash + 1) + OpenUrl;
      }

      // 如果外层没有包裹页面，这里直接改变URL中的路径
      if (window.top === window) {
        window.location.href = realUrl;
      } else {
        parent.window.postMessage(JSON.stringify({OpenName: OpenName, OpenUrl: realUrl}), "*");
      }

    } else {
      sendRequest(this.callWay, entry, stream, this.objOptParam, callback);

    }

  } else {

    sendRequest(this.callWay, entry, stream, this.objOptParam, callback);
  }

}

// 唤起登录框
function __tdxLoginBox(param, callback) {

  if (__tdxMobSystem == 'IOS' || __tdxMobSystem == 'Android' || __tdxMobSystem == 'WEB-IOS' || __tdxMobSystem == 'WEB-Android') {
    callback = callback || param;
    var webCallTql = new WEBCallTql();
    var par = param;
    if (typeof param == 'function' || param == undefined) {
      par = {'HostType': '0', 'NoFlushPage': '1'};
    }
    webCallTql.send('tdxLoginTrade', par, function (data) {
      callback(data);
    });
  } else if (__tdxMobSystem == 'PC') {
    console.log('pc here')

  } else {
    // location.href = '';
    __webCallTql.send("tdxOpenUrl", {
      "OpenName": "登录",
      "OpenType": "native",
      "OpenUrl": "login/login.html",
      "OpenParam": {
        "UrlType": "Absolute"
      }
    }, function () {
    })
  }
}

//获取账户列表
function __tdxgetAccList(callback) {

  if (__tdxMobSystem == "IOS" || __tdxMobSystem == "Android" || __tdxMobSystem == "WEB-Android" || __tdxMobSystem == "WEB-IOS") {

    var webCallTql = new WEBCallTql();
    webCallTql.send('tdxEnumTradeAcc', {}, function (data) {
      callback(data);
    });
  } else {
    // debugger;
    var uinfo = JSON.parse(localStorage.getItem("uinfo"));
    if (uinfo == null) {
      callback([]);
    } else {
      callback([JSON.stringify(uinfo)]);
    }
  }
}


// 获取自选股列表
function __tdxGetZxgList(callback) {
  var webCallTql = new WEBCallTql();
  webCallTql.send('tdxGetZxgList', {}, function (data) {
    callback(data);
  });
}

// 获取TDXID
// 返回空示例：[[0,"",0,"",0,""],["TDXID"],[]]
function __tdxGetPulTdxID(callback) {
  var webCallTql = new WEBCallTql();
  webCallTql.send('tdxGetPulTdxID', {}, function (data) {
    callback(data);
  });

}


//唤起一户通登录框

function __tdxYhtLogin() {
  var webCallTql = new WEBCallTql();
  webCallTql.send('tdxYhtLogin', {}, function (data) {
    // callback(data);
  });
}


//获取注册手机号及一户通手机号
function __tdxGetRegTel(callback) {
  var webCallTql = new WEBCallTql();
  webCallTql.send('tdxGetRegTel', {}, function (data) {
    callback(data);
  });
}

//激活页面通知网页消息函数
//function tdxActivity(){
// 开发自行定义该函数
// }


//手机表单调用键盘精灵
//入参示例：{'m_bFindSHSZ ':1,'m_bFindQH':1, 'm_bFindHK':1,'m_bFindMG':1,'m_bFindALLOTHER':1}
//key        查找深沪市场,     查找期货市场,   查找港股市场,   查找美股市场,  查找其他             vlue 0 不启用/ 1 启用
//回调  SETCODE,CODE 两个字段

function __tdxWebKeyboardElves(param, callback) {
  var webCallTql = new WEBCallTql();
  webCallTql.send('tdxWebKeyboardElves', param || {}, function (data) {
    callback(data);
  });
}


//触发返回按钮
function __returnToSuperior(param) {
  if (typeof param != 'object') {
    param = {};
  }
  var webCallTql = new WEBCallTql();
  webCallTql.send('ReturnToSuperior',param, function (data) {
    //callback(data);
  });
}


//__webCallTql.send('ReturnToSuperior', {"GotoRoot":1}, function (data) {}); 返还至首页

//获得当前位置 tdxGetLocation
//无参数
function __getLocation(callback) {
  var webCallTql = new WEBCallTql();
  webCallTql.send('tdxGetLocation', {}, function (data) {
    callback(data);
  });
}

//返回错误代码  0表示无错误  1表示权限错误，手机没有开启  2表示其他错误，无法定位
//返回数据是一个json  如下：{"latitude":"37.78583445","longitude":"122.40641749"}

//拨打电话 tdxCallTel
//PhoneNum  拨打的电话号码
function __callTel(cellnumb) {
  if (typeof cellnumb != 'string') {
    cellnumb = String(cellnumb);
  }
  var webCallTql = new WEBCallTql();
  webCallTql.send('tdxCallTel', {'PhoneNum': cellnumb}, function (data) {
    //callback(data);
  });
}

//找回资金账号的接口
//param = {'account':content,'option':1}  account和option，account为要操作的数据，比如电话号码，或者账号，option为操作类别，0复制到剪切板，1收藏数据到通讯录，2打开拨号盘
function __tdxManipulateData(param) {
  var webCallTql = new WEBCallTql();
  webCallTql.send('tdxManipulateData', param, function (data) {

  });
}

// 判断是否普通账户登录
function __isLoginNormal(callback) {
  __tdxgetAccList(function (data) {
    try {
      var curUser;
      if (typeof data == "string") { // ios
        data = JSON.parse(data);
        curUser = data[0];
      } else { // android
        curUser = JSON.parse(data[0] || {});
      }
    } catch (e) {
    }

    // 未登录或者当前账号不是普通账号
    if (data.length == 0 || curUser["HostType"] != 0) {
      callback(0);
    } else {
      callback(1);
    }
  })
}


//获取新股数量 沪深新股数量
/*
 返回示例
 {"SGSL": 2,"XGSL": 3,"ZQSL": 2}  //SGSL申购数量  XGSL 新股数量 ZQSL 中签数量
 */
function __tdxXgslReqHS(callback) {
  var webCallTql = new WEBCallTql();
  webCallTql.send('tdxXgslReq', {Target: 0}, function (data) {
    callback(data);
  });
}

//获取新股数量 港股新股数量
function __tdxXgslReqGG(callback) {
  var webCallTql = new WEBCallTql();
  webCallTql.send('tdxXgslReq', {Target: 1}, function (data) {
    callback(data);
  });
}

/*
 tdxFlushJYLockTime 延长交易锁屏时间
 */
function __tdxFlushJYLockTime() {
  var webCallTql = new WEBCallTql();
  webCallTql.send('tdxFlushJYLockTime', {}, function (data) {
    // callback(data);
  });
}

//获取uinfo信息
function __tdxGetUinfo(callback) {
  __WJyCallTql.send('uinfo', [{"zjxx": 'loc'}], function (data) {
    callback(data);
  });
}

/***获取一户通账户信息*****/

function __tdxGetYhtZhInfo(callback) {
  var webCallTql = new WEBCallTql();
  webCallTql.send('tdxGetYhtZhInfo', {}, function (data) {
    callback(data);
  });
}


/***网页打开对话框****/
// 入参示例  [{'title':'提示','content':'hello,tdx !','buttons':[{'value':'取消','fun':'func1'},{'value':'确定','focus':true,'fun':'func2'}]}]
function __tdxOpenDialog(param) {
  // if (typeof param == 'object') {
  //   param = JSON.stringify(param)
  // }
  var webCallTql = new WEBCallTql();
  webCallTql.send('tdxOpenDialog', param, function (data) {
    //callback(data);
  });
}


//隐藏顶部栏  tdxHideTopBar
//隐藏当前的顶部栏区域（注意：切换视图后顶部栏会自动恢复）

function __tdxHideTopBar() {
  var webCallTql = new WEBCallTql();
  webCallTql.send('tdxHideTopBar', {}, function (data) {
    //callback(data);
  });
}

// tdxBottomBarVisibility 隐藏底部栏
//0:底部栏隐藏，1：底部栏显示
function __tdxBottomBarVisibility(flag) {
  var webCallTql = new WEBCallTql();
  webCallTql.send('tdxBottomBarVisibility', {'VisibilityFlag': flag || 1}, function (data) {
    //callback(data);
  });
}

//tdxOpenPwdDialog 弹出交易密码输入对话框 （港股有的网页操作前需要弹出密码框，要根据后台返回的标志判断是否弹框）
/*
 如果输入密码后点击确定，errFlag为0 返回一个密码替换串"passwordstr"，示例：[[0,"",1,"",0,""],["password"],[],["passwordstr"]]
 如果取消输入，errFlag为-1
 */
function __tdxOpenPwdDialog(callback) {
  var webCallTql = new WEBCallTql();
  webCallTql.send('tdxOpenPwdDialog', {}, function (data) {
    callback(data);
  });
}


//tdxQuitTrade 交易账号全部退出
function __tdxQuitTrade() {
  var webCallTql = new WEBCallTql();
  webCallTql.send('tdxQuitTrade', {}, function (data) {
    //callback(data);
  });
}

//tdxIsTradeLocked 判断交易是否锁定
function __tdxIsTradeLocked(callback) {
  var webCallTql = new WEBCallTql();
  webCallTql.send('tdxIsTradeLocked', {}, function (data) {
    callback(data);
// 锁定返回1，[[0,"1",0,"",0,""],[],[]]
// 未锁定返回0:[[0,"0",0,"",0,""],[],[]]
  });
}

//tdxConfirmPay 支付请求确认
//orderInfo和payType,orderInfo是字符串，payType是支付类型 {'orderInfo':'','payType':''}
function __tdxConfirmPay(param, callback) {
  var webCallTql = new WEBCallTql();
  webCallTql.send('tdxConfirmPay', param, function (data) {
    callback(data);
  });
}


// “tdxReFetchGDDM" 刷新股东列表
function __tdxReFetchGDDM(callback) {
  var webCallTql = new WEBCallTql();
  webCallTql.send('tdxReFetchGDDM', {}, function (data) {
    callback(data);
  });
}

// “tdxOpenPDF" 下载并打开PDF文档 {"File":"下载的url"}
function __tdxOpenPDF(param) {
  var webCallTql = new WEBCallTql();
  webCallTql.send('tdxOpenPDF', param || {}, function (data) {
    callback(data);
  });
}

//网页动态修改顶部栏标题 {"Title":"xxx"}
function __tdxSetTopbarTitle(param) {
  var webCallTql = new WEBCallTql();
  webCallTql.send('tdxSetTopbarTitle', param || {}, function (data) {
    callback(data);
  });
}

// “tdxChangeCurAcc" 切换账号 {"SessionID":SessionID}
function __tdxChangeCurAcc(param) {
  var webCallTql = new WEBCallTql();
  webCallTql.send('tdxChangeCurAcc', param || {}, function (data) {
    callback(data);
  });
}

/*
 * 应答格式化
 * */
var FormatResult = function (data) {
  try {

    if (typeof data == 'string') {
      data = data.replace(/\r\n/ig, "<br>");
      data = data.replace(/\s/g, "");
      data = JSON.parse(data);
    }

    var rt = {};
    rt.ErrorCode = data[0][0];
    rt.ErrorInfo = data[0][1];
    rt.Num = data[0][2];
    rt.Cookies = data[0][3];
    rt.POS = data[0][4];

    if (rt.ErrorCode != 0) {
      return rt;
    }

    // 数据部分
    rt.rows = [];

    var titles = data[1];
    data.shift();
    data.shift();
    data.shift();

    rt.rows = data.reduce(function (prev, curr) {
      // 将扁平数组转换为对象
      prev.push(curr.reduce(function (p, c, index) {
        p[titles[index]] = c;
        return p;
      }, {}));
      return prev;
    }, []);

    return rt;

  } catch (e) {
    alert('获取数据失败，请稍后重试！');
    //alert('FormatResult，数据格式化失败。' + e);
    return {};
  }
}

// 这里实例化请求对象
var __webCallTql = new WEBCallTql();
var __jyCallTql = new JYCallTql();
var __hqCallTql = new HQCallTql();
var __fwCallTql = new FWCallTql();

//针对交易html特别实例化
var __WJyCallTql = new WJyCallTql();
var __jyhtmlTQL = {App: __webCallTql, Call: __WJyCallTql};


// 这里实例化请求对象,券商合作开发调用

var __jyCallTqlEx = new JYCallTql();
__jyCallTqlEx.addParObj = {'Way': 'qs'};

var __hqCallTqlEx = new HQCallTql();
__hqCallTqlEx.addParObj = {'Way': 'qs'};

var __fwCallTqlEx = new FWCallTql();
__fwCallTqlEx.addParObj = {'Way': 'qs'};

!function () {

  // 这里实现公共函数,都绑定到 tdx 下
  var TDX = function () {
  };

  TDX.prototype.getUrlParam = function (url) {

    var param = {};
    var index = url.indexOf("?");
    if (index == -1) {
      return param;
    }

    url = url.substr(index + 1);
    var queryArr = url.split("&");
    queryArr.forEach(function (p) {
      var a = p.split("=");
      param[a[0]] = a[1];
    })

    return param;
  }

  window["tdx"] = new TDX();

}()