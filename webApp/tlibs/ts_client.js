/* 
    version: ts_client v2.0.8 | (c) 2017-06-02 15:25 
    author: 丁坤
    updater: 尤勇
    update: 客户端全局封装函数window[globalName]修改为window.top[globalName]，解决app内部页面嵌套找不到回调函数的bug
*/

var util = {};

util.getUID = (function () {
    var id = 0;
    return function (type) {
        if (type === 'number') {
          return id++;
        }
        return ('0000000' + (id++).toString(36)).substr(-8);
    };
}());

util.getUrlParam = function (name) {
    var reg = new RegExp("(^|&)"+ name +"=([^&]*)(&|$)");
    var url = (window.location.search || window.location.hash);
    var r = url.substr(url.indexOf('?') + 1).match(reg);
    if (r!=null) return decodeURIComponent(r[2]); return null;
}

util.IXJSON2Obj = function (data) {
    if (typeof data === "string") {
        IXJSON = JSON.parse(data);
    }
    if (!(IXJSON instanceof Array)) {
        IXJSON.errorCode = IXJSON.errorCode || IXJSON.ErrorCode;
        IXJSON.errorInfo = IXJSON.errorInfo || IXJSON.ErrorInfo;
        return IXJSON;
    }
    //if (IXJSON instanceof Array)
    if (typeof IXJSON !== "object")
        return data;
    if (IXJSON === null) return {
        errorCode: -1,
        errorInfo: '底层通信错误'
    };
    var ret = {};
    ret.errorCode = +IXJSON[0][0];
    ret.errorInfo = IXJSON[0][1];
    ret.pos = IXJSON[0][4];
    ret.count = IXJSON[0][2];

    var titles = IXJSON[1];
    IXJSON.shift();
    IXJSON.shift();
    IXJSON.shift();

    ret.list = IXJSON.reduce(function (prev, curr) {
    // 将扁平数组转换为对象
    prev.push(curr.reduce(function (p, c, index) {
      p[titles[index]] = c;
      return p;
    }, {}));
    return prev;
    }, []);

    return ret;
}

// https://developer.mozilla.org/en-US/docs/Web/API/document.cookie
//
//
// :: cookies.js ::
//
// A complete cookies reader/writer framework with full unicode support.
//
// Revision #1 - September 4, 2014
//
// https://developer.mozilla.org/en-US/docs/Web/API/document.cookie
// https://developer.mozilla.org/User:fusionchess
//
// This framework is released under the GNU Public License, version 3 or later.
// http://www.gnu.org/licenses/gpl-3.0-standalone.html
//
// Syntaxes:
//
// * docCookies.setItem(name, value[, end[, path[, domain[, secure]]]])
// * docCookies.getItem(name)
// * docCookies.removeItem(name[, path[, domain]])
// * docCookies.hasItem(name)
// * docCookies.keys()
//
//
/**
 * 将函数封装成一个全局函数，该全局函数在执行过后就会销毁
 * @param  {Function} fn 需要封装的函数
 * @return {String}      全局函数的名称（确保唯一和特殊）
 */
util.wrapFn = function (fn) {
  // 如果fn不是一个函数，则直接返回
  if (typeof fn !== 'function') {
    return fn;
  }
  // 生成一个全局唯一的随机名称，将函数绑定到根作用域下
  var globalName = 'globalAnonymous$$' +
    util.getUID() +
    '$' + Math.random().toString(16).substr(3, 6);
  window.top[globalName] = function (PCData, spare1, spare2, stream) {
    fn.call(this, PCData, spare1, spare2, stream);
    delete window.top[globalName];
  };
  return globalName;
};

var docCookies = {
  getItem: function (sKey) {
    if (!sKey) { return null; }
    return decodeURIComponent(document.cookie.replace(new RegExp("(?:(?:^|.*;)\\s*" + encodeURIComponent(sKey).replace(/[\-\.\+\*]/g, "\\$&") + "\\s*\\=\\s*([^;]*).*$)|^.*$"), "$1")) || null;
  },
  setItem: function (sKey, sValue, vEnd, sPath, sDomain, bSecure) {
    if (!sKey || /^(?:expires|max\-age|path|domain|secure)$/i.test(sKey)) { return false; }
    var sExpires = "";
    if (vEnd) {
      switch (vEnd.constructor) {
      case Number:
        sExpires = vEnd === Infinity ? "; expires=Fri, 31 Dec 9999 23:59:59 GMT" : "; max-age=" + vEnd;
        break;
      case String:
        sExpires = "; expires=" + vEnd;
        break;
      case Date:
        sExpires = "; expires=" + vEnd.toUTCString();
        break;
      }
    }
    document.cookie = encodeURIComponent(sKey) + "=" + encodeURIComponent(sValue) + sExpires + (sDomain ? "; domain=" + sDomain : "") + (sPath ? "; path=" + sPath : "") + (bSecure ? "; secure" : "");
    return true;
  },
  removeItem: function (sKey, sPath, sDomain) {
    if (!this.hasItem(sKey)) { return false; }
    document.cookie = encodeURIComponent(sKey) + "=; expires=Thu, 01 Jan 1970 00:00:00 GMT" + (sDomain ? "; domain=" + sDomain : "") + (sPath ? "; path=" + sPath : "");
    return true;
  },
  hasItem: function (sKey) {
    if (!sKey) { return false; }
    return (new RegExp("(?:^|;\\s*)" + encodeURIComponent(sKey).replace(/[\-\.\+\*]/g, "\\$&") + "\\s*\\=")).test(document.cookie);
  },
  keys: function () {
    var aKeys = document.cookie.replace(/((?:^|\s*;)[^\=]+)(?=;|$)|^\s*|\s*(?:\=[^;]*)?(?:\1|$)/g, "").split(/\s*(?:\=[^;]*)?;\s*/);
    var nLen, nIdx;
    for (nLen = aKeys.length, nIdx = 0; nIdx < nLen; nIdx++) { aKeys[nIdx] = decodeURIComponent(aKeys[nIdx]); }
    return aKeys;
  }
};

/////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
// 事件回调处理
function notify(msgType, data,obj) {
    return;
}

// 没有 WebSocket 版本的浏览器,则使用Flash 方式
WEB_SOCKET_FORCE_FLASH=false;
if (!window.WEB_SOCKET_SWF_LOCATION) {
    WEB_SOCKET_SWF_LOCATION = "../../WebSocketMain.swf";
}
// Set this to dump debug message from Flash to console.log:
WEB_SOCKET_DEBUG = false;

// 会话管理基类
function sessionBase(settings) {
    this.settings = settings || {};
    this.ifConnect = true;
    this.ifClient = false;
    this.needLogin = this.settings['needLogin'] || false;
    this.loginOnce = this.needLogin ? false : true;
    this.ifLogin = this.needLogin ? false : true;
    this.ifGetCookieState = false;
    this.isPending = false;
    this.isQuit = false;
    this.sessionTimeOut = 0;
    this.isRiWork = this.settings['isRiWork'] || false;  // 通过RI值，来确定TP到TS的路由选择

    this.hasLocalStorage = false;
    try {
        this.hasLocalStorage = typeof window.localStorage.getItem === 'function' && typeof window.localStorage.setItem === 'function';
    } catch (ex) {
        this.hasLocalStorage = false;
    }

    this.utils = {
        getUID : (function () {
            var id = 0;
            return function (type) {
                if (type === 'number') { return id++;} 
                return ('0000000' + (id++).toString(36)).substr(-8);
            };
        }()),
        // 将函数封装成一个全局函数，该全局函数在执行过后就会销毁
        wrapFn : function (fn) {
            if (typeof fn !== 'function') { return fn; }
            // 生成一个全局唯一的随机名称，将函数绑定到根作用域下
            var globalName = 'globalAnonymous$$' + utils.getUID() + '$' + Math.random().toString(16).substr(3, 6);
            global[globalName] = function (stream) {
                fn.call(this, stream);
                delete global[globalName];
            };
            return globalName;
        },

        // 将 url 的附带参数转化成 JSON 对象
        queryToJson: function (str) {
            return str.split('&').reduce(function (prev, curr) {
                curr = curr.split('=');
                prev[curr[0]] = curr[1];
                return prev;
            }, {});
        },
        //  将 JSON 对象转换成 url 查询字符串
        jsonToQuery: function (obj) {
            var ret = [];
            $.each(obj, function (key, value) {
                ret.push(key + '=' + value);
            });
            return ret.join('&');
        }
    }
}

if (/TdxFC/.test(navigator.userAgent) === false && (window.external === undefined || window.external !== {}) && !(navigator.userAgent.indexOf('Trident/4.0') > -1)) {
    try {
        window.external = {};

        if (window.external.GetSysInfo === undefined) {
            window.external.GetSysInfo = function (opt) {
                if (opt.Class == "FuncInfo" && opt.Key == "FuncName") {
                    //var param = getUrlParam();
                    return util.getUrlParam("FuncID") || localStorage.getItem("FuncId") || "";
                } else {
                    try {
                        return JSON.parse(localStorage.getItem("keyInfo"))[0][opt["Key"]];
                    } catch(e) {
                        return undefined;
                    }
                }
                return undefined;
            }
        }

        if (window.external.getAccInfo === undefined) {
            window.external.getAccInfo = function () {
                return localStorage.getItem('accInfo') || "";
            }
        }
    } catch (e) {

    }
    
} else {
    try {
        if (/TdxFC/.test(navigator.userAgent) === false && window.external.GetSysInfo === undefined && !(navigator.userAgent.indexOf('Trident/4.0') > -1)) {
            window.external.GetSysInfo = function (opt) {
                if (opt.Class == "FuncInfo" && opt.Key == "FuncName") {
                    return util.getUrlParam("FuncID") || localStorage.getItem("FuncId") || "";
                } else {
                    try {
                        return JSON.parse(localStorage.getItem("keyInfo"))[0][opt["Key"]];
                    } catch(e) {
                        return undefined;
                    }
                }
                return undefined;
            }
        }

        if (/TdxFC/.test(navigator.userAgent) === false && window.external.getAccInfo === undefined && !(navigator.userAgent.indexOf('Trident/4.0') > -1)) {
            window.external.getAccInfo = function () {
                return localStorage.getItem('accInfo') || "";
            }
        }
    } catch (e) {

    }
    
}

sessionBase.prototype.getState= function (sKey) {
    if (this.ifGetCookieState) {
        var retVar = localStorage.getItem(sKey) || (this[sKey] || false);
        if (retVar === "true") retVar = true;
        if (retVar === "false")retVar = false;
        // 修改内部变量和本地同步
        this[sKey]=retVar;
        return retVar;
    } else{
        return this[sKey];
    }
}
sessionBase.prototype.getStateSetTime= function (sKey) {
    var sKeySetTime=sKey+"SetTime";
    if (this.ifGetCookieState) {
        return localStorage.getItem(sKeySetTime)||0;
    } else {
        return this[sKey] ||0;
    }
}
sessionBase.prototype.setState = function (sKey,sValue,endTime) {
    if (this.ifGetCookieState) {
        localStorage.setItem(sKey, sValue);
        localStorage.setItem(sKey + "SetTime", (new Date()).getTime());
        this[sKey] = sValue;
    } else {
        this[sKey] = sValue;
        this[sKey+"SetTime"]=(new Date()).getTime();
    }
}

sessionBase.prototype.setItem = function (sKey, sValue) {
    if( this.hasLocalStorage){
        localStorage.setItem(sKey, sValue);
    }else{
        this[sKey] = sValue;
    }
}

sessionBase.prototype.getItem = function (sKey) {
    if( this.hasLocalStorage){
        return localStorage.getItem(sKey)||"";
    }else{
        return this[sKey]||"";
    }
}

sessionBase.prototype.removeItem = function (sKey) {
    if ( this.hasLocalStorage) {
        localStorage.removeItem(sKey);
    }
}


sessionBase.prototype.asynTrigger = function () {
    var deferred = jQuery.Deferred();
    function timeOut  () {
        deferred.resolveWith(this, ["", this]);
    }
    setTimeout(timeOut, 50);
    return deferred.promise();
}
sessionBase.prototype.connect = function (param) {
    return this.asynTrigger();
}
sessionBase.prototype.send = function (entry, stream, callback) {
    return this.asynTrigger();
}
sessionBase.prototype.login = function (param, callback) {
    // var param = "IX,SPEC=2834,STRUCT=ACL:checkuser\r\n 1,Token|2,TDXID|3,InputZH|4,ZH|5,PWD|6,InputZHLB|7,YYB|8,InPutYYB|9,AuthType|10,AuthInfo|11,YWLX|12,MachineInfo|13,PublicKey|14,SSOMode|\r\n|1600860|18926080396|18926080396|6NYVUNymCwk=|340|||0||0||MCYCIQCsNf+VWaR7qZ7s+Xd3z3D2nUhavUvBCf0uiTvn/YtYKwIBAw==|1|";
    return this.send("ACL.checkuser", param);
}
sessionBase.prototype.heartbeat = function (param, callback) {
    return this.asynTrigger();
}
sessionBase.prototype.quit = function (param) {
    return this.asynTrigger();
}
sessionBase.prototype.getUserInfo = function (param) {
    return {};
}

sessionBase.prototype.getEntryPrefix = function(entry) {
    return entry.split(/[\.\:]/)[0];
}

sessionBase.prototype.getRI = function(entry) {

    // 全部匹配
    var ri = localStorage.getItem(entry);

    var prefix; // 功能前缀
    if(ri == null) {
        prefix = entry.split(/[\.\:]/)[0];
    }

    ri = localStorage.getItem(prefix + "*");
    if(ri == null) {
        ri = "";
    }

    return ri;
}

///////////////////////////////////////////////////////////////////////////////////////////////////////////
// TS链接管理
function sessionTs(settings) {
    sessionBase.call(this, settings);   //对象之间的继承， 构造函数绑定，使用call或apply方法，将父对象的构造函数绑定在子对象上； 改变sessionBase的this指向并初始化，实现sessionTs对父类的属性和函数继承
    // 重载Login方法
    this.ifConnect = false;
    this.ifGetCookieState = true;
    this.sessionTimeOut = 1 * 1800 * 1000 - 10000;
    this.lastEffectTime = (new Date()).getTime();

    // 如果没有本地存储,则链接状态不落地,页面刷新时,从新链接登陆
    if (!this.hasLocalStorage) this.ifGetCookieState = false;


    this.setState("ifClient", false);
    ///////////////////////////////////////////////////////////////////////////////////////////////////////////
    // 基本逻辑处理
    // 如果不需要登陆,则直接设置死登陆状态为true
    if (!this.needLogin) {
        this.setState("ifLogin", true);
    }
    // 如果需要登陆, 则先读取cookie存储的登陆状态信息,如果小于5分钟(TP session默认超时是5分钟),则直接设置为登陆成功,不再进行登陆
    var lastConnectTime = this.getStateSetTime("ifConnect");
    var ifConnect = this.getState("ifConnect");
    var gapTime = (new Date()).getTime() - lastConnectTime;

    if ((gapTime > this.sessionTimeOut) && ifConnect) {
        this.setState("ifLogin", false);
        this.setState("ifConnect", false);
        this.setState("isPending", false);
    }

    var ifLogin = this.getState("ifLogin");
    if (this.needLogin) {
        if (ifLogin && (gapTime > this.sessionTimeOut )) {
            this.setState("ifLogin", false);
            this.setState("loginOnce", false);
            this.setState("isPending", false);
        }
    }
    var isPendingSetTime = this.getStateSetTime("isPending")||0;
    var isPending = this.getState("isPending");
    // 如果pending时间超过5s, 强制恢复, 防止Pending过程种出错不能恢复
    if (isPending && (new Date()).getTime() - isPendingSetTime > 5 * 1000) {
        this.setState("isPending", false);
        this.setState("ifLogin", false);
        this.setState("ifConnect", false);
        this.setState("loginOnce", false);
    }
    // 如果ASPSessionID 为空,则设置为未连接,未登陆
    var ASPSessionID=docCookies.getItem("ASPSessionID")||"";
    if(ASPSessionID.length==0){
        this.setState("isPending", false);
        this.setState("ifLogin", false);
        this.setState("ifConnect", false);
        this.setState("loginOnce", false);
    }
    /*this.listenEvent();*/
    var _this = this;
    setInterval(function () {
        _this.heartbeat();
    }, 10000);
};

sessionTs.prototype = new sessionBase();   // 设置sessionTs的protoType属性为sessionBase的实例对象，改变了sessionTs.prototype.constructor的指向，现在指向sessionBase。但重要的是，每一个实例也有一个constructor属性，默认调用prototype对象的constructor属性。这显然会导致继承链的紊乱（obj明明是用构造函数sessionTs生成的），因此我们必须手动纠正，将sessionTs.prototype对象的constructor值改为sessionTs; 
sessionTs.prototype.constructor = sessionTs;    // 修正sessionTs.prototype.constructor为sessionTs本身; 

/*var objTs = new sessionTs(); 创建sessionTs的一个新实例 */

sessionTs.prototype.listenEvent = function () {
    function onEvent(e) {
        this.heartbeat();
    };
    $(document).keydown(onEvent.bind(this));
    $(document).mousemove(onEvent.bind(this));
};
sessionTs.prototype.connect = function (param) {
    var options = { type: 'GET',
        url: '/' + "TOUCH" + '?' + "Device=Browser&Ip=0.0.0.0&Mac=00-00-00-00-00-00-00-00&Build=WEB&Type=41&Ver=1.0.0&EP=0" };

    var deferred = jQuery.Deferred();
    this.lastEffectTime = (new Date()).getTime();
    $.ajax(options)
        .done(function (data, statusText, jqXHR) {
            deferred.resolveWith(this, [data, this]);
        }.bind(this))
        .fail(function (xhr, statusText, errorThrown) {
            var responseText = xhr.responseText;
            // 返回-5105 重新touch
            if (responseText.indexOf("(-5105)") > 0) {
                $.ajax(options)
                    .done(function (data, statusText, jqXHR) {
                        deferred.resolveWith(this, [data, this]);
                    }.bind(this))
                    .fail(function (xhr, statusText, errorThrown) {
                        deferred.rejectWith(this, [statusText, xhr.responseText, this]);
                    }.bind(this));
            } else if (responseText.length > 0 && (responseText.substr(2, 5) === '-5100' )) {
                deferred.resolveWith(this, ["", this]);
            } else {
                deferred.rejectWith(this, [statusText, xhr.responseText, this]);
            }
        }.bind(this));
    return deferred.promise();
};

sessionTs.prototype.send = function (entry, stream, param) {
    var deferred = jQuery.Deferred();
    
    // 根据 entry 获取 ri 值
    var ri = this.getRI(entry);

    $.ajax({ url: '/TQL?Entry=' + entry + "&RI=" + ri, type: 'POST', data: stream})
        .done(function (data, statusText, jqXHR) {
            this.setState("ifConnect", true);
            deferred.resolveWith(this, [data, this]);
        }.bind(this))
        .fail(function (xhr, statusText, errorThrown) {
            deferred.rejectWith(this, [statusText, xhr.responseText, this]);
        }.bind(this));
    return deferred.promise();
}

sessionTs.prototype.heartbeat = function (param) {
    if ((new Date()).getTime() - this.lastEffectTime > this.sessionTimeOut && this.getState("ifConnect")) {
    //if ((new Date()).getTime() - this.lastEffectTime > this.sessionTimeOut) {
        this.lastEffectTime = (new Date()).getTime();
        //this.setState("ifConnect", true);
        $.ajax({ type: 'GET', url: '/' + "ALIVE" + '?' + "" })
            .fail(function (xhr, statusText, errorThrown) {
                this.setState("ifLogin", false);
                this.setState("ifConnect", false);
            }.bind(this));
    }
}

sessionTs.prototype.quit = function (param) {
    var deferred = jQuery.Deferred();
    $.ajax({ type: 'GET', url: '/' + "QUIT" + '?' + "" })
        .done(function (data, statusText, jqXHR) {
            deferred.resolveWith(this, [data, this]);
        }.bind(this))
        .fail(function (xhr, statusText, errorThrown) {
            deferred.rejectWith(this, [statusText, xhr.responseText, this]);
        }.bind(this));
    return deferred.promise();
}

///////////////////////////////////////////////////////////////////////////////////////////////////////////
// WS链接管理
function sessionWS(settings) {
    sessionBase.call(this, settings);
    // 重载Login方法
    this.ifConnect = false;
    this.sessionTimeOut = 1 * 60 * 1000 - 10000;
    
    ///////////////////////////////////////////////////////////////////////////////////////////////////////////
    // 基本逻辑处理
    // 如果不需要登陆,则直接设置死登陆状态为true
    if (!this.needLogin) this.setState("ifLogin", true);
    this.deferred2MsgKey = {};
    this.heartbeat = false;


    // 初始化 WebSocket
    function checkHttps() { var a = top.location.href.toLowerCase(); return a.indexOf('https:') == 0; }
    var defaults = { ip: window.location.hostname, port: window.location.port, protocol: checkHttps() ? "wss" : "ws", path: "/WS" };
    this.settings = $.extend({}, defaults,this.settings);
    this.TransKey = 1000;

    function clearDeferred(code, msg) {
        $.each(this.deferred2MsgKey, function (key, value) {
            value.rejectWith(this, [code, msg, this]);
        }.bind(this))
    }

    this.messageevent = {
        onopen: function (event) {
            this.deferred2MsgKey["onOpen"].resolveWith(this, ["", this]);
            delete this.deferred2MsgKey["onOpen"];
        },
        onmessage: function (event) {
            var res = event.data;
            var backEvent = res.split('?')[0];
            res = res.substr(backEvent.length + 1);

            var backInfo = res.split('|')[0];
            res = res.substr(backInfo.length + 1);
            var emitEventName = backEvent;
            if (backEvent === 'TQL') emitEventName = 'TQL:' + this.utils.queryToJson(backInfo)["TransKey"] || "";

            if (emitEventName === "Push") {
                this.settings.notify("pushMsg", event.data, this);
            } else if (this.deferred2MsgKey[emitEventName] !== undefined) {
                this.deferred2MsgKey[emitEventName].resolveWith(this, [res, this, backInfo]);
                delete this.deferred2MsgKey[emitEventName];
            }
        },
        onerror: function (event) {
            this.setState("ifLogin", false);
            this.setState("ifConnect", false);
            clearDeferred.call(this,-1, event.type);
        },
        onclose: function (event) {
            this.setState("ifLogin", false);
            this.setState("ifConnect", false);
            clearDeferred.call(this, -1, event.type);
        }
    }
};

sessionWS.prototype = new sessionBase();
sessionWS.prototype.constructor = sessionWS;

sessionWS.prototype.connect = function (param) {
    var deferred = jQuery.Deferred();
    function _connect() {
        var deferredcon = jQuery.Deferred();
        this.deferred2MsgKey["onOpen"] = deferredcon;
        var url = this.settings.protocol + '://' + this.settings.ip + ':' + this.settings.port + this.settings.path;
        if (this.socket !== undefined) this.socket.close();
        this.socket = new WebSocket(url);
        $.each(this.messageevent, function (key, value) {
            this.socket[key] = value.bind(this);
        }.bind(this));
        return deferredcon.promise();
    }
    function _touch() {
        var deferredTouch = jQuery.Deferred();
        this.deferred2MsgKey["touch"] = deferredTouch;
        this.socket.send("touch"+'?' + "Device=BrowserWS&Ip=0.0.0.0&Mac=00-00-00-00-00-00-00-00&Build=WEB&Type=41&Ver=1.0.0&EP=0");
        return deferredTouch.promise();
    }
    _connect.apply(this)
        .done(function (data) {
            _touch.apply(this)
                .done(function (data) {
                    // 启动心跳
                    if (this.heartbeat === false) {
                        this.heartbeat = true;
                        setInterval(this.socket.send.bind(this.socket, 'alive'), this.sessionTimeOut);
                    }
                    deferred.resolveWith(this, ["", this]);
                }.bind(this))
                .fail(function (code,msg) { deferred.rejectWith(this,[code,msg,this]) }.bind(this))
        }.bind(this))
        .fail(function (code, msg) { deferred.rejectWith(this, [code, msg, this]) }.bind(this))
    return deferred.promise();
};

sessionWS.prototype.send = function (entry, stream, param) {
    var deferred = jQuery.Deferred();
    var TransKey = this.TransKey++;

    // 根据 entry 获取 ri 值
    var ri = this.getRI(entry);
    var wsSendStr = 'TQL?' + "TransKey=" + TransKey + "&RI=" + ri + "&" + "Entry=" + entry + '|' + stream;
    
    // var wsSendStr = 'TQL?' + "TransKey=" + TransKey + "&" + "Entry=" + entry + '|' + stream;
    this.deferred2MsgKey['TQL:' + TransKey] = deferred;
    this.socket.send(wsSendStr);
    return deferred.promise();
}

sessionWS.prototype.quit = function (param) {
    this.socket.close();
    return this.asynTrigger();
}

///////////////////////////////////////////////////////////////////////////////////////////////////////////
// http 链接管理(原来tomcat tp逻辑迁移,无环境,未测试)
function sessionHTTP(settings) {
    sessionBase.call(this, settings);
    this.ifGetCookieState = true;
    this.setState("ifClient", false);
    if (!this.needLogin) this.setState("ifLogin", true);
    this.url = (settings.basePath || '/tq') + '/Exec';
    this.timeout = settings.timeout|| 3*60*1000;
};

sessionHTTP.prototype = new sessionBase();
sessionHTTP.prototype.constructor = sessionHTTP;

sessionHTTP.prototype.send = function (entry, stream, param) {
    var deferred = jQuery.Deferred();
    $.ajax({
        url: this.url, type: 'POST', cache: false,
        data: { ap: "", funcid: entry, bodystr: stream, timeout: this.timeout }
    })
        .done(function (data, statusText, jqXHR) {
            var prefix;
            try {
                prefix = data.split('|')[0];
                data = data.substr(prefix.length + 1);
            } catch (e) {
                deferred.rejectWith(this, ["error", e, this]);
            }
            deferred.resolveWith(this, [data, this]);
        }.bind(this))
        .fail(function (xhr, statusText, errorThrown) {
                state = state === 'timeout' ? 'timeout' : 'error';
                deferred.rejectWith(this, [state, xhr.responseText, this]);
        }.bind(this));
    return deferred.promise();
}

///////////////////////////////////////////////////////////////////////////////////////////////////////////
// PC链接管理
function sessionPC(settings) {
    sessionBase.call(this, settings);

    this.ifGetCookieState = true;
    this.setState("ifClient", true);

    // 如果没有本地存储,则链接状态不落地,页面刷新时,从新链接登陆
    //if (!this.hasLocalStorage) this.ifGetCookieState = false;
    ///////////////////////////////////////////////////////////////////////////////////////////////////////////
    // 基本逻辑处理
    // 如果不需要登陆,则直接设置死登陆状态为true

    if (!this.needLogin) {
        this.setState("ifLogin", true);
    }
};

sessionPC.prototype = new sessionBase();

sessionPC.prototype.constructor = sessionPC;

sessionPC.prototype.send = function (entry, stream, param) {
    var deferred = jQuery.Deferred();
    window.external.CallTQL(util.wrapFn(function (data) {
        deferred.resolveWith(this, [data, this])
    }.bind(this)), entry, stream);
    return deferred.promise();
}
///////////////////////////////////////////////////////////////////////////////////////////////////////////
// PCCEF 新版wenkit拓展调用
function sessionPCCEF(settings) {
    sessionBase.call(this, settings);
    // 重载Login方法
    // this.ifConnect = false;
    this.ifGetCookieState = true;

    this.setState("ifClient", true);
    /*this.sessionTimeOut = 1 * 60 * 1000 - 10000;
    this.lastEffectTime = (new Date()).getTime();*/

    // 如果没有本地存储,则链接状态不落地,页面刷新时,从新链接登陆
    //if (!this.hasLocalStorage) this.ifGetCookieState = false;
    ///////////////////////////////////////////////////////////////////////////////////////////////////////////
    // 基本逻辑处理
    // 如果不需要登陆,则直接设置死登陆状态为true
    if (!this.needLogin) {
        this.setState("ifLogin", true);
    }
};
sessionPCCEF.prototype = new sessionBase();
sessionPCCEF.prototype.constructor = sessionPCCEF;
sessionPCCEF.prototype.send = function (entry, stream, callback, method) {
    var deferred = jQuery.Deferred();
    var request = { Method: method || 'CallTQL', FuncName: entry, Param: stream };
    window.TDXQuery({
        request: JSON.stringify(request),
        onSuccess: function (response) { deferred.resolveWith(this, [response, this]) }.bind(this),
        onFailure: function (errCode, errInfo) { deferred.rejectWith(this, [errCode, errInfo, this]); }.bind(this)
    });
    return deferred.promise();
}

// 资讯 tqlex 调用，屏蔽TOUCH
function sessionTX(settings) {
    sessionBase.call(this, settings);

    // 基本处理逻辑
    // 无须登陆，直接设置ifLogin、ifClient为true
    this.ifGetCookieState = true;
    this.setState("ifClient", true);
    this.setState("ifLogin", true);
}

sessionTX.prototype = new sessionBase();
sessionTX.prototype.constructor = sessionTX;
sessionTX.prototype.send = function (entry, stream, param) {
    var deferred = jQuery.Deferred();
    // 根据 entry 获取 ri 值
    //var ri = this.getRI(entry);
    $.ajax({ url: '/TQLEX?Entry=' + entry, type: 'POST', data: stream})
        .done(function (data, statusText, jqXHR) {
            deferred.resolveWith(this, [data, this]);
        }.bind(this))
        .fail(function (xhr, statusText, errorThrown) {
            deferred.rejectWith(this, [statusText, xhr.responseText, this]);
        }.bind(this));
    return deferred.promise();
}

///////////////////////////////////////////////////////////////////////////////////////////////////////////
// android 链接管理
function sessionAndriod(settings) {
    sessionBase.call(this, settings);

    this.setState("ifClient", false);
};
sessionAndriod.prototype = new sessionBase();
sessionAndriod.prototype.constructor = sessionAndriod;
sessionAndriod.prototype.send = function (entry, stream, param, obj) {
    var deferred = jQuery.Deferred();
    if (obj.jyflag === 1) {
        // 安卓 旧请求发送方式
        var originCallbackName = util.wrapFn(function (formid, funcid, flagtype, _data) {
            deferred.resolveWith(this, [_data, this]);
        }.bind(this));

        var ardfun = "FuncID" + ":" + entry;
        window.tdx_java.Android_SendData('x', ardfun, 'JY', stream.length, stream, originCallbackName);
        return deferred.promise();
    }
    else if (obj.jyflag === 0) {
        // 安卓 新请求发送方式
        var originCallbackName = util.wrapFn(function (formid, strFuncName, strErrNo, strResultCont) {
            if (formid.indexOf('_UrlEncode') > -1) {
                strResultCont = decodeURIComponent(strResultCont);
            }
            deferred.resolveWith(this, [strResultCont, this, strErrNo]);
        })
        
        /*var temp = {
            "SendSession": (typeof obj.SendSession === 'object' ) ? obj.SendSession.sessionType  || JSON.parse(obj.SendSession).sessionType,
            "TQLParam": stream
        };
        if (obj.SendSession.sessionType === 'JYSession') {
            temp.SessionID = obj.SendSession.SessionID;
        }
        var SendSession = JSON.stringify(temp);*/

        window.tdx_java.TdxSendData(entry, stream, obj.SendSession, originCallbackName, obj.formid);
        return deferred.promise();
    }
    
}

///////////////////////////////////////////////////////////////////////////////////////////////////////////
// IOS链接管理
function sessionIOS(settings) {
    sessionBase.call(this, settings);

    this.setState("ifClient", false);
};
sessionIOS.prototype = new sessionBase();
sessionIOS.prototype.constructor = sessionIOS;
sessionIOS.prototype.send = function (entry, stream, callback, obj) {
    var deferred = jQuery.Deferred();
    if (obj.jyflag === 1) {
        // IOS 旧发送方式
        var originCallbackName = util.wrapFn(function (formid, strFuncName, strErrNo, strResultCont) {
            if (formid.indexOf('_UrlEncode') > -1) {
                strResultCont = decodeURIComponent(strResultCont);
            }
            //if (strErrNo != 0) {
            //    strResultCont = JSON.stringify([[strErrNo, strResultCont, '', '', ''], [], []]);
            //}
            deferred.resolveWith(this, [strResultCont, this, strErrNo]);
        });
        /*
          通过 iframe 设置 src 的方式发起请求
          参数顺序：
            1. *全局回调函数名称
            2. 回调顺序索引（不再需要）
            3. 用于获取实际回调函数的索引（不再需要）
            4. *TQL 调用接口
            5. *调用参数（是否需要进行编码，防止同时出现两个分号）
            6. 回调函数名称（不再需要）
        */
        var sender = document.createElement('IFRAME');
        sender.style.display='none';
        var url = 'js-frame:' + ['Get_Ret', 0, obj.formid, entry, stream, originCallbackName, "FuncID"].join(';;');
        sender.setAttribute('src', url);
        document.documentElement.appendChild(sender);
        sender.parentNode.removeChild(sender);
        sender = null;
        return deferred.promise();
    }
    else if (obj.jyflag === 0) {
        // IOS 新请求发送方式
        var originCallbackName = util.wrapFn(function (formid, strFuncName, strErrNo, strResultCont) {
            if (formid.indexOf('_UrlEncode') > -1) {
                strResultCont = decodeURIComponent(strResultCont);
            }

            //if (strErrNo != 0) {
            //    strResultCont = JSON.stringify([[strErrNo, strResultCont, '', '', ''], [], []]);
            //}
            deferred.resolveWith(this, [strResultCont, this, strErrNo]);
        })

        /*var tmp = {
            "SessionType": obj.SendSession.sessionType,
            "TQLParam": stream
        };
        if (obj.SendSession.sessionType === 'JYSession') {
            tmp.SessionID = obj.SendSession.SessionID;
            tmp.JYParam = stream;
        }*/

        var iframe = document.createElement("IFRAME");
        var url = 'tdx-frame:' + ['CallTQL', obj.formid, entry, stream, originCallbackName].join(';;');
        
        
        iframe.setAttribute("src", url);
        document.documentElement.appendChild(iframe);
        iframe.parentNode.removeChild(iframe);
        iframe = null;
        return deferred.promise();
    }

}

//交易应答
//formid：框架ID
//funcid：功能号ID
//flagtype：0：成功 ，1：失败
//_data：返回的json 数据
//callbackname : 回调函数
Get_Ret = function (formid, funcid, flagtype, _data, callbackname) {
    window.frames["Main_Frame"].Cmd_cbk(formid, funcid, flagtype, _data, callbackname);
}

Cmd_cbk = function (formid, funcid, flagtype, _data, callbackname) {
    callbackname(formid, funcid, flagtype, _data);
}

//////////////////////////////////////////////////////////////////////////////////////
// 包含会话管理的客户端
// 智能切换通信层
function autoGetPlatform() {
    var platform = "tphttp";
    if ( (window.location.href.indexOf("http") == 0 || window.location.href.indexOf("https") == 0) && (!window.TDXQuery) && !window.external && !window.external.CallTQL ) {
        platform = "http";
        // tp 路径带site,说明是tphttp
        if (window.location.href.indexOf("/site/") > 0) platform = "tphttp";
        return platform;
    }
    // TDXQuery 为新版webkit拓展调用方法
    if (window.TDXQuery) {
        platform = "pccef";
        return platform;
    }
    else if(window.external && window.external.CallTQL){
        platform="pc";
        return platform;
    }

    if (window.location.search.indexOf("ispc") != -1) platform = "pc";

    if ( window.location.href.indexOf("http") == 0 || window.location.href.indexOf("https") == 0 ) {
        platform = "http";
        // tp 路径带site,说明是tphttp
        if (window.location.href.indexOf("/site/") > 0) platform = "tphttp";
        return platform;
    }

    // 判断当前环境为安卓还是IOS
    var ua = navigator.userAgent.toLowerCase();

    if (ua.indexOf('android') >= 0) {
        // 此为安卓环境
        return "android";
    }
    var u = navigator.userAgent, app = navigator.appVersion;

    var isiOS = !!u.match(/\(i[^;]+;( U;)? CPU.+Mac OS X/); //ios终端
    if (isiOS) {
        // 此为 IOS环境
        return "ios";
    }

    /*var ua = navigator.userAgent.toLowerCase();
    if (ua.indexOf("ipod") != -1 || ua.indexOf("iphone") != -1 || ua.indexOf("ipad") != -1) {
        platform = "ios";
    }
    else if (ua.indexOf("android") != -1) {
        platform = "android";
    }
    platform = "tphttp";*/
    return platform;
}

var CreateTDXClient = function (settings) {
    this.settings = settings || {};
    // 链接类型
    var sessionTypes = {
        "tphttp": sessionTs, "tpws": sessionWS, "pc": sessionPC, "pccef": sessionPCCEF,
        "ios": sessionIOS, "android": sessionAndriod, "http": sessionHTTP, "tqlex": sessionTX
    };
    var serverType = this.settings['serverType'] || autoGetPlatform();
    //var serverType = "pccef";
    this.ssObj = new sessionTypes[serverType](this.settings);
    
    // 代理对象
    function sessionProxy(ssObj) {
        this.settings = settings || {};
        this.debug = this.settings["debug"] || false;
        this.forceLogin=this.settings["forceLogin"] || false;
        this.ssObj=ssObj;
        ssObj.PrxObj = this;
        // 是否缓存请求, 在登陆成功或者链接成功前,缓存应用的请求,链接成功后发出,如果链接失败或者客户校验失败,则清除
        this.cacheReq = this.settings['cacheReq'] || true;
        this.caches = [];
        // 登陆前可以发送的功能列表
        this.preLoginFuncList = this.settings['preLoginFuncList'] || [];
        // 恢复缓存数据
        this.loginInfo = JSON.parse(this.ssObj.getItem("loginInfo") || "{}");
        // 回调通知函数
        this.notifyCallBacks = [];
        this.notifyCallBacks.push(this.settings['notify'] || notify)
        // this.isQuit = false;
        ifLoginDef=undefined;           // 全局状态

        var _this = this,
        prx = {
            _notifyCallBack: function(msgType,data,thisObj){
                for(var i=0;i<_this.notifyCallBacks.length;i++){
                    _this.notifyCallBacks[i](msgType,data,thisObj);
                }
            },
            _callbackError: function (code, msg, deferred) {
                if (ifLoginDef)
                    ifLoginDef.rejectWith(_this, [code, msg, _this]);
                    
                // 清除缓存请求
                while (_this.caches[0]) {
                    var args = _this.caches.shift();
                    if (args.callback)
                        eval(args.callback)(msg, code);
                    if (args.deferred)
                        args.deferred.rejectWith(_this, [code, msg, _this]);
                    // 遇到相同延时对象,就清空返回,防止重复
                    if (args.deferred === deferred) {
                        _this.caches = [];
                        return;
                    }
                }
                deferred.rejectWith(_this, [code, msg, _this]);
            },
            _executeCache: function () {
                while (_this.caches[0]) {
                    var args = _this.caches.shift();
                    if(_this.ssObj.getState("needLogin") && !_this.ssObj.getState("ifLogin")&&_this.preLoginFuncList.indexOf(args.entry) < 0) {
                        args.deferred.rejectWith(_this,[-1,"账号未登陆,功能("+args.entry+")"+"禁止调用",_this]);
                    }else{
                        prx._execute(args.deferred, args.entry, args.stream, args.callback);
                    }
                }
            },
            _execute: function (deferred, entry, stream, callback, obj) {
                if(_this.debug) console.log("Send : " + entry + ":" + stream);
                _this.ssObj.send(entry, stream, callback, obj)
                    .done(function (data, ssObj, strErrNo) {
                        if(_this.debug) console.log("Revc : " + entry + ":" + data);
                        if (Object.prototype.toString.call(data) === '[object Array]') 
                            sendDone(JSON.stringify(data), ssObj, strErrNo);
                        else
                            sendDone(data, ssObj, strErrNo);
                    })
                    .fail(function (code, msg, ssObj) {
                        // 报5105错误时,重新登陆,再发送
                        if (msg.indexOf("(-5105)") > 0 || msg.indexOf("(-5102)") > 0) {
                            _this.ssObj.setState("ifLogin",false);
                            _this.ssObj.setState("ifConnect",false),
                            // 调用执行逻辑,复用链接和重新登陆逻辑
                            _this.execute(entry, stream)
                                .done(function (data, ssObj, strErrNo) {
                                    sendDone(data, ssObj, strErrNo);
                                })
                                .fail(function (code, msg, ssObj) {
                                    if (callback != undefined) eval(callback)(msg,code);
                                    deferred.rejectWith(_this, [code, msg, _this]);
                                });
                        } else {
                            // 这里添加配置 isRiWork 生效的逻辑
                            if(_this.ssObj.getState("isRiWork")) {
                                // code == "error" msg == "", 页面切换, 前一个页面的未返回请求被cancel掉
                                // 不执行前面页面的回调了，promise写法请求未处理，还是会在 fail 分支中处理
                                if(code == "error" && msg == "") {
                                    deferred.rejectWith(_this, [code, msg, _this]);
                                } else if(code == "error" && msg != "") {

                                    // code == "error" msg == "E|xxxxx"  post请求 5xx 错误
                                    // 这里需要重置localStorage中RI的值
                                    var prefix = _this.ssObj.getEntryPrefix(entry);
                                    var keys = _this.ssObj.getItem(prefix).split(",");
                                    keys.map(function(key) {
                                        _this.ssObj.removeItem(key);
                                    });
                                    _this.ssObj.removeItem(prefix);

                                    // 这里重发请求，触发登录
                                    _this.ssObj.setState("ifLogin",false);
                                    _this.ssObj.setState("ifConnect",false),
                                    // 调用执行逻辑,复用链接和重新登陆逻辑
                                    _this.execute(entry, stream)
                                        .done(function (data, ssObj, strErrNo) {
                                            sendDone(data, ssObj, strErrNo);
                                        })
                                        .fail(function (code, msg, ssObj) {
                                            if (callback != undefined) eval(callback)(msg,code);
                                            deferred.rejectWith(_this, [code, msg, _this]);
                                        });
                                } else {
                                    if (callback != undefined) eval(callback)( msg,code);
                                    deferred.rejectWith(_this, [code, msg, _this]);                                    
                                } 
                            } else {
                                if (callback != undefined) eval(callback)( msg,code);
                                deferred.rejectWith(_this, [code, msg, _this]);
                            }
                        }
                    });
                function sendDone(data, ssObj, strErrNo) {
                    if (data === '') {
                        data = '[[0,"",0,"",0],[],[]]';
                        deferred.resolveWith(_this, [data, _this]);
                    }
                    else if (ssObj.settings.needReserve === false) {
                        if (callback !== undefined) eval(callback)(strErrNo, data);
                        // deferred.resolveWith(_this, [strErrNo, data, _this]);
                        deferred.resolveWith(_this, [data, _this, strErrNo]); // 所有的 resolveWith 第2个参数，这里数组第2位都是对象，而不是应答信息
                    } else {
                        var RetInfo = util.IXJSON2Obj(data);
                        if (RetInfo.errorCode == 0) {
                            if (callback != undefined) eval(callback)(null,data);
                            deferred.resolveWith(_this, [data, _this]);
                        } else {
                            if (callback != undefined) eval(callback)(RetInfo.errorInfo,RetInfo.errorCode);
                            deferred.rejectWith(_this,[RetInfo.errorCode, RetInfo.errorInfo, _this]);
                        }
                    }
                }
            },
            _monitorPendging:function(){
                var ID = null;
                function timeOut(){
                    if (!_this.ssObj.getState("isPending")) {
                        prx._executeCache();
                        clearInterval(ID);
                    }
                }
                ID=setInterval(timeOut, 300);
            },
            _login: function (deferred, param, callOrg) {
                _this.ssObj.setState("isPending", true);
                prx._monitorPendging();
                if (_this.ssObj.getState("ifConnect") ){
                    _realLogin(_this);
                } else {
                    _this.ssObj.connect(_this.settings)
                        .done(function (data, ssObj) {
                            _this.ssObj.setState("ifConnect", true);
                            if (_this.ssObj.getState("needLogin") && !_this.ssObj.getState("ifLogin") && _this.loginInfo != undefined
                                    && callOrg !== "preexec" && (_this.loginInfo.InputZH != undefined || (_this.ssObj.getItem("Token") || "").length > 0)) {
                                _realLogin(_this);
                            } else {
                                _this.ssObj.setState("isPending", false);
                                // 通知切换窗口
                                if (_this.ssObj.getState("needLogin") && callOrg !== "preexec")
                                    prx._notifyCallBack("loginFail", "没有登陆信息", _this);
                                prx._executeCache();
                            }
                        })
                        .fail(function (code, msg, ssObj) {
                            _this.ssObj.setState("isPending", false);
                            //_this.ssObj.setState("ifLogin", false);
                            _this.ssObj.setState("ifConnect", false);
                            prx._callbackError(code, "链接服务器失败", deferred);
                        });
                }
                // 登陆类型(1.账号密码;2.SSO登陆;3.短信登陆;4.邮箱验证登录;5.三方登录;6.指纹登陆;7.扫一扫登陆;99.匿名登陆;100.单独柜台登陆;101.PB登陆;不送则按旧版登陆逻辑处理)
                function _realLogin(_this) {
                    // 组装请求字符串, 如果是用密码登陆, 则记录下用户名, 密码不记录;如果已经登陆过,则使token登陆
                    var loginInfo = [_this.loginInfo||JSON.parse(_this.ssObj.getItem("loginInfo") || "{}")];

                    if (callOrg==="login") {
                        loginInfo[0]["LoginType"] = loginInfo[0].LoginType || "1";
                    } else {
                        loginInfo = new Array();
                        var tokenObj = {
                            "LoginType": "2",
                            "Token": _this.ssObj.getItem("Token") || docCookies.getItem('Token') || ""
                        }
                        loginInfo.push(tokenObj);
                    }

                    _this.ssObj.login(JSON.stringify(loginInfo))
                        .done(function (data, ssObj) {
                            _this.ssObj.setState("isPending", false);
                            // 处理登陆应答结果
                            var loginRetInfo = util.IXJSON2Obj(data);
                            if (loginRetInfo.errorCode == 0) {
                                _this.ssObj.setState("loginOnce", true);
                                _this.ssObj.setState("ifLogin", true);
                                
                                // 设置相关登陆信息
                                _this.ssObj.setItem("keyInfo", JSON.stringify(loginRetInfo.list));
                                _this.ssObj.setItem("loginRetInfo", data);
                                _this.ssObj.setItem("TDXID", loginRetInfo.list[0]["TDXID"]);
                                _this.ssObj.setItem("ZH", loginRetInfo.list[0]["ZH"]);
                                var token = loginRetInfo.list[0]["Token"] || "";
                                if (token.length > 0) {
                                    _this.ssObj.setItem("Token", token);
                                    // $.cookie("Token", token);
                                    docCookies.setItem("Token", token);
                                }
                                
                                docCookies.setItem("TDXID", loginRetInfo.list[0]["TDXID"]);
                                docCookies.setItem("LOGID", loginRetInfo.list[0]["ZH"]);
                                docCookies.setItem("ATYPE", loginRetInfo.list[0]["ZHLB"]);
                                docCookies.setItem("BTYPE", 300);
                                docCookies.setItem("NICK", loginRetInfo.list[0]["ZHMC"]);

                                //docCookies.setItem("Token", token,(new Date((new Date()).valueOf() + 30*24*60*60*1000)));
                                var tmp=loginRetInfo.list[0]["ZHMC"];
                                if (tmp.length > 0) _this.ssObj.setItem("ZHMC", tmp);
                                var tmp = loginRetInfo.list[0]["YYB"];
                                if (tmp.length > 0) _this.ssObj.setItem("YYB", tmp);

                                prx._executeCache();
                                //delete _this.loginInfo["PWD"];
                                _this.ssObj.setItem("loginInfo", JSON.stringify(_this.loginInfo));
                                // 如果是显示登陆调用,则触发延时对象
                                if (callOrg === "login") deferred.resolveWith(_this, [loginRetInfo, _this]);
                                prx._notifyCallBack("loginSucceed", data, _this);
                                if(ifLoginDef)
                                    ifLoginDef.resolveWith(_this, [loginRetInfo, _this]);

                                // if (callOrg === "login") deferred.resolveWith(_this, [data, _this]);
                            } else {
                                localStorage.setItem("msg", loginRetInfo.errorInfo);
                                prx._callbackError(loginRetInfo.errorCode, "登陆失败("+loginRetInfo.errorInfo+")", deferred);
                                prx._notifyCallBack("loginFail", loginRetInfo.errorInfo, _this);
                            }
                        })
                        .fail(function (code, msg, ssObj) {
                            localStorage.setItem("msg", msg);
                            _this.ssObj.setState("isPending", false);
                            prx._callbackError(code, "登陆失败("+msg+")", deferred);
                            prx._notifyCallBack("loginFail", msg, _this);
                        });
                }
            }
        };
        // 如果因手动刷新,后台登陆状态还存在时,则直接通知登陆成功
        if(this.ssObj.getState("needLogin")&&this.ssObj.getState("ifLogin")&&this.ssObj.getState("ifConnect"))
            prx._notifyCallBack("loginSucceed", _this.ssObj.getItem("loginRetInfo"), _this);
        

        // 判断是否是SSO跳转,如果是,则获取Token,写入cookie、localStorage
        var token = util.getUrlParam("Token") || "";
        if (token.length > 0) {
            _this.ssObj.setItem("Token", token);
            docCookies.setItem("Token", token,(new Date((new Date()).valueOf() + 30*24*60*60*1000)));
            //if (!this.ssObj.getState("isPending"))
            if (!this.ssObj.getState("ifLogin"))
                prx._login(jQuery.Deferred(), _this.loginInfo, "exec");
        } else if (this.forceLogin && !this.ssObj.getState("isPending")&&!this.ssObj.getState("ifLogin") && !window.TDXQuery) {
            prx._login(jQuery.Deferred(), _this.loginInfo, "exec");
        }

        this.setServerType = function (serverType) {
            if ( window.location.href.indexOf("http") == 0 || window.location.href.indexOf("https") == 0 ) {
                this.ssObj = new sessionTypes[serverType](this.settings);
            }
        }


        // 其他标签页登陆成功后,检测自动发送缓存请求 
        if (this.ssObj.getState("isPending")) { prx._monitorPendging(); };
        this.execute = function (entry, stream, callback, obj) {
            if ( (window.location.href.indexOf("http") == 0 || window.location.href.indexOf("https") == 0) && !!obj && obj["Way"] === 'qs' ) {
                // 判断当前环境为安卓还是IOS
                var ua = navigator.userAgent.toLowerCase();

                if (ua.indexOf('android') >= 0) {
                    // 此为安卓环境
                    // return "android";
                    this.ssObj = new sessionTypes["android"](this.settings);
                }
                var u = navigator.userAgent, app = navigator.appVersion;

                var isiOS = !!u.match(/\(i[^;]+;( U;)? CPU.+Mac OS X/); //ios终端
                if (isiOS) {
                    // 此为 IOS环境
                    // return "ios";
                    this.ssObj = new sessionTypes["ios"](this.settings);
                }
            } else {
                var serverType = this.settings['serverType'] || autoGetPlatform();
                this.ssObj = new sessionTypes[serverType](this.settings);
            }
            // this.ssObj = new sessionTypes["android"](this.settings);
            // 申请延时对象
            var deferred = jQuery.Deferred();
            if (this.ssObj.getState("ifClient")) {
                prx._execute(deferred, entry, stream, callback, obj);
            }
            else if (this.ssObj.getState("isPending") && this.cacheReq && this.ssObj.getState("loginOnce")) {
                this.caches.push({ entry: entry, stream: stream, callback: callback, deferred: deferred });
                return deferred;
            }
            // 如果是登陆前协议,或者不需要登陆校验,则直接发送
            else if (this.ssObj.getState("ifConnect") && (!this.ssObj.getState("needLogin") ||
                                    this.preLoginFuncList.indexOf(entry) >= 0 || this.ssObj.getState("ifLogin"))) {
                prx._execute(deferred, entry, stream, callback, obj);
            } else {
                this.caches.push({ entry: entry, stream: stream, callback: callback, deferred: deferred });
                if (!this.ssObj.getState("isPending"))
                //if (!_this.ssObj.getState("ifLogin"))
                    prx._login(deferred, _this.loginInfo, this.preLoginFuncList.indexOf(entry) >= 0 ? "preexec" : "exec");
            }
            return deferred.promise();
        }
        this.quit = function (param) {
            var token = docCookies.getItem("Token")||"";
            param = [{ Token: token }];
            // 先删除后台sso,再退出回话
            var deferred = jQuery.Deferred();
            function _clear(){
                // 清楚cookies
                docCookies.removeItem("Token");
                docCookies.removeItem("TDXID");
                docCookies.removeItem("LOGID");
                docCookies.removeItem("ATYPE");
                docCookies.removeItem("BTYPE");
                docCookies.removeItem("NICK");
                if (!window.TDXQuery) {
                    _this.ssObj.removeItem("Token");
                }

                _this.ssObj.removeItem("TDXID");
                _this.ssObj.removeItem("ZH");
                _this.ssObj.removeItem("ZHMC");
                _this.ssObj.removeItem("L2Token");
                _this.ssObj.removeItem("keyInfo");
                _this.ssObj.removeItem("loginInfo");
                _this.ssObj.removeItem("loginRetInfo");

                _this.ssObj.setState("ifLogin", false);
                _this.ssObj.setState("ifConnect", false);
                _this.ssObj.setState("loginOnce", false);
                //_this.ssObj.setState("Token", '');
                deferred.resolveWith(_this, ["", _this]);
            }
            function _quit(){
                _this.ssObj.quit()
                    .done(function(data, thisObj){ _clear(); })
                    .fail(function(code, msg, thisObj){ _clear(); });
            }
            if (token.length > 0) {
                _this.execute("SSO:invalidsso",JSON.stringify(param))
                    .done(function (data, thisObj) { _quit(); })
                    .fail(function (code, msg, thisObj) { _quit(); });
            } else {
                _quit();
            }
            return deferred.promise();
        }
        // 登陆
        this.login = function (param) {
            // 如果调用显示登陆,则说明改回话需要登陆
            _this.ssObj.setState("needLogin", true);
            //ifLoginDef = undefined;
            var deferred = jQuery.Deferred();
            _this.loginInfo = param || _this.loginInfo;
            prx._login(deferred, param, "login");
            return deferred.promise();
        }
        this.getLoginRetInfo = function () { return _this.ssObj.getItem("loginRetInfo"); }
        this.ifLoginAsync = function (onceStatus) {
            if ((onceStatus ? false :　_this.ssObj.getState('loginOnce')) || _this.ssObj.getState("ifLogin")) {
                return this.ssObj.asynTrigger();
            } else {
                ifLoginDef = jQuery.Deferred();
                return ifLoginDef.promise();
            }
        }
        this.ifLogin = function () { return _this.ssObj.getState("ifLogin"); }
        this.regNotifyCall = function (notifyCall) { _this.notifyCallBacks.push(notifyCall); }
        this.regPreLoginFunc = function (funcName) { _this.preLoginFuncList.push(funcName); }
    }
    sessionProxy.prototype = this.ssObj;
    return new sessionProxy(this.ssObj);
};