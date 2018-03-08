"use strict";

!function () {

  var getSkin = function getSkin() {

    var reg = new RegExp("(^|&)color=([^&]*)(&|$)");
    var r = location.search.substr(1).match(reg);
    if (r != null) {
      return r[2];
    } else {
      return undefined;
    }
  };

  /* 
    处理参数
  */
  var doParams = function() {
    
    var msg = arguments[0];
    var func = arguments[1];

    var rt = {};
    if(arguments.length > 1) {
      rt.content = msg;
      rt.ok = function() {
        if(typeof func == "function") {
          func(1);
        }
      };
      rt.cancel = function() {
        if(typeof func == "function") {
          func(0);
        }
      }
    }
    else {
      if(typeof msg == "string") {
        rt.content = msg;
      }
      else {
        rt = msg;
      }
    }

    return rt;
  }

  /**
   * 重写交易中的 alert 弹框
   */
  var GlobalAlert = function GlobalAlert() {
    
    var json = doParams(arguments[0], arguments[1]);

    // 将提示中的换行替换成 <br>
    json["content"] = json["content"].replace(/\r\n/g, "<br>");
    json["content"] = json["content"].replace(/\n/g, "<br>");

    MsgBox(json, 0);
  };

  /**
   * 重写交易的 Confirm 弹框
   */
  var GlobalConfirm = function GlobalConfirm() {
    
        var json = doParams(arguments[0], arguments[1]);
    
        // 将提示中的换行替换成 <br>
        json["content"] = json["content"].replace(/\r\n/g, "<br>");
        json["content"] = json["content"].replace(/\n/g, "<br>");
    
        MsgBox(json, 1);
      };

  /**
   * 弹框逻辑实现函数
   * @param { Object } box 提示框内容对象，包括提示内容，确定、取消 callback
   * @param { Number } type 提示框类型 0 - alert, 1 - confirm
   *
   * @return 无返回值
   */
  var MsgBox = function MsgBox(box, type) {

    var id = "_" + parseInt(Math.random() * 10000).toString(16);
    var btnStr = void 0;
    if (type == 1) {
      btnStr = "\n      <button class=\"" + rn + "-btn " + rn + "-btn-ca\">\u53D6\u6D88</button>\n      <button class=\"" + rn + "-btn " + rn + "-btn-ok\">\u786E\u5B9A</button>\n    ";
    } else {
      btnStr = "\n      <button class=\"" + rn + "-btn " + rn + "-btn-single\">\u786E\u5B9A</button>\n    ";
    }

    var boxClass = rn + "-box-wrapper";
    var bodyClass = type == 0 ? rn + "-body-alert" : rn + "-body";
    var styleStr = "\n    <style>\n      ." + rn + "-box-wrapper,\n      ." + rn + "-box-wrapper-nob {\n        position: fixed;\n        top: 0;\n        left: 0;\n        right: 0;\n        bottom: 0;\n        display: -webkit-box;\n        display: -ms-flexbox;\n        display: -webkit-flex;\n        display: flex;\n        -webkit-box-pack: center;\n            -ms-flex-pack: center;\n                -webkit-justify-content: center;\n                justify-content: center;\n        -webkit-box-align: center;\n            -ms-flex-align: center;\n                -webkit-align-items: center;\n                align-items: center;\n        z-index: 1000;\n      }\n\n      ." + rn + "-box-wrapper {\n        background: rgba(0, 0, 0, 0.6);\n        filter:progid:DXImageTransform.Microsoft.gradient(startColorstr=#7f000000,endColorstr=#7f000000);\n      }\n\n      ." + rn + "-box {\n        background-color: " + color.boxBackColor + ";\n        border-radius: 15px;\n        min-width: 195px;\n        width: " + size.width + ";\n        max-height: 400px;\n        min-height: 200px;\n        display: -webkit-box;\n        display: -ms-flexbox;\n        display: -webkit-flex;\n        display: flex;\n        -webkit-box-orient: vertical;\n        -webkit-box-direction: normal;\n            -ms-flex-direction: column;\n                -webkit-flex-direction: column;\n                flex-direction: column;\n        padding: 0 35px;\n      }\n\n      ." + rn + "-head {\n        -ms-flex-negative: 0;\n            -webkit-flex-shrink: 0;\n        flex-shrink: 0;\n        font-size: 18px;\n        line-height: 18px;\n        color: " + color.headColor + ";\n        padding: 24px 0 14px 0;\n        text-align: center;\n        border-bottom: 1px solid " + color.headBorderColor + ";\n      }\n\n      ." + rn + "-body,\n      ." + rn + "-body-alert {\n        -webkit-box-flex: 1;\n        -ms-flex: 1 1 auto;\n        -webkit-flex: 1 1 auto;\n        flex: 1 1 auto;\n        overflow: auto;\n        -webkit-overflow-scrolling: auto;\n        font-size: 14px;\n        line-height: 18px;\n        color: " + color.bodyColor + ";\n        padding-top: 20px;\n      }\n\n      ." + rn + "-body-alert {\n        text-align: " + size.body.align + ";\n      }\n\n      ." + rn + "-foot {\n        -ms-flex-negative: 0;\n        -webkit-flex-shrink: 0;\n        flex-shrink: 0;\n        padding: 20px 0;\n        display: -webkit-box;\n        display: -ms-flexbox;\n        display: -webkit-flex;\n        display: flex;\n        -webkit-box-align: center;\n            -ms-flex-align: center;\n                -webkit-align-items: center;\n                align-items: center;\n        -webkit-box-pack: center;\n            -ms-flex-pack: center;\n                -webkit-justify-content: center;\n                justify-content: center;\n      }\n\n      ." + rn + "-btn {\n        -webkit-box-flex: 1;\n            -ms-flex: 1 1 auto;\n                -webkit-flex: 1 1 auto;\n        flex: 1 1 auto;\n        font-size: 17px;\n        line-height: 35px;\n        border: 0;\n        border-radius: 4px;\n        margin: 0 10px;\n      }\n\n      ." + rn + "-btn-single {\n        color: " + color.btnSingleColor + ";\n        background-color: " + color.btnSingleBackColor + ";\n      }\n\n      ." + rn + "-btn-ca {\n        color: " + color.btnCaColor + ";\n        background-color: " + color.btnCaBackColor + ";\n      }\n\n      ." + rn + "-btn-ok {\n        color: " + color.btnOkColor + ";\n        background-color: " + color.btnOkBackColor + ";\n      }\n    </style>\n  ";

    if ($("." + rn + "-box-wrapper").length > 0) {
      boxClass = rn + "-box-wrapper-nob";
      styleStr = "";
    }

    var boxStr = "\n    <div class=\"" + boxClass + "\">\n      <div class=\"" + rn + "-box\">\n        <div class=\"" + rn + "-head\">\u6E29\u99A8\u63D0\u793A</div>\n        <div class=\"" + bodyClass + "\">" + box.content + "</div>\n        <div class=\"" + rn + "-foot\">" + btnStr + "</div>\n      </div>\n    </div>\n  ";

    $("body").append("<div id=\"" + id + "\">" + styleStr + boxStr + "</div>");

    $("#" + id).fadeIn();

    // 绑定函数
    $("#" + id + " ." + rn + "-btn-ok").unbind("click").bind("click", function () {

      $("#" + id).fadeOut(400, function () {

        $("#" + id).remove();
        if (typeof box.ok == "function") {
          box.ok();
        }
      });
    });

    $("#" + id + " ." + rn + "-btn-single").unbind("click").bind("click", function () {

      $("#" + id).fadeOut(400, function () {

        $("#" + id).remove();
        if (typeof box.ok == "function") {
          box.ok();
        }
      });
    });

    $("#" + id + " ." + rn + "-btn-ca").unbind("click").bind("click", function () {

      $("#" + id).fadeOut(400, function () {

        $("#" + id).remove();
        if (typeof box.cancel == "function") {
          box.cancel();
        }
      });
    });
  };

  var rn = "d22d0";
  var skin = getSkin();

  var color_set = {
    boxBackColor: "#FFFFFF",
    headColor: "#161616",
    headBorderColor: "#E8E8E8",
    bodyColor: "#333333",
    btnSingleColor: "#fff",
    btnSingleBackColor: "#F03838",
    btnOkColor: "#fff",
    btnOkBackColor: "#F03838",
    btnCaColor: "#fff",
    btnCaBackColor: "#363749"
  };

  var color_set_black = {
    boxBackColor: "#222333",
    headColor: "#fff",
    headBorderColor: "rgba(255, 255, 255, 0.1)",
    bodyColor: "#A2A3B4",
    btnSingleColor: "#fff",
    btnSingleBackColor: "#F03838",
    btnOkColor: "#fff",
    btnOkBackColor: "#F03838",
    btnCaColor: "#fff",
    btnCaBackColor: "#363749"
  };

  var size = {
    width: "50%",
    body: {
      align: "left"
    }
  };

  var color = skin == "black" ? color_set_black : color_set;

  window["GlobalAlert"] = GlobalAlert;
  window["GlobalConfirm"] = GlobalConfirm;
  window["tdxAlert"] = GlobalAlert;
  window["tdxConfirm"] = GlobalConfirm;
}();