> 表单协议书组件

## 1. 效果

![mob-form-xys](images/mob-form-xys.jpg)

## 2. 调用

```
<mob-form-xys 
  :item="item"
  :data="data"
/>
```

`data` 格式

```
{
  key: value,
  key: value,
  ...
}
```

## 3. 配置

### 3.1 功能配置

```
{
  tplid: "mob-form-xys",
  field: "xysCheck",
  title: "我已知悉如下协议",
  urls: [],
  getUrls: getUrls,
  style: {},
  checkStyle: {},
  checkImage: ["uncheck.png", "check.png"],
}
```

`getUrls` 可以动态获取 `urls` 的内容

```
var getUrls = function(data) {

  var urls = [];
  var urlParam = {
    OpenName: "",
    OpenUrl: "",
    OpenType: "browser",
    OpenParam: {
      WebViewType: __tdxMobSystem == "Android" ? "JyURL" : "LcoalURL",
      UrlType: "Remote"
    }
  };

  // 招募书
  if(data.zms) {
    urls.push({
      title: "《产品招募书》",
      style: {},
      checkStyle: {},
      checkImage: ["uncheck.png", "check.png"],
      urlParam: $.extend({}, urlParam, {
        "OpenName": "产品招募书",
        "OpenUrl": data.zms
      })
    });
  }

  // 电子合同
  if(data.dzht) {
    urls.push({
      title: "《产品合同》",
      style: {},
      checkStyle: {},
      checkImage: ["uncheck.png", "check.png"],
      urlParam: $.extend({}, urlParam, {
        "OpenName": "产品合同",
        "OpenUrl": data.zms
      })
    });
  }

  if(data.fxjss) {
    urls.push({
      title: "《产品风险揭示书》",
      style: {},
      checkStyle: {},
      checkImage: ["uncheck.png", "check.png"],
      urlParam: $.extend({}, urlParam, {
        "OpenName": "产品风险揭示书",
        "OpenUrl": data.zms
      })
    });
  }

  return urls;
}
```

`urls` 格式 `[{...}, {...}, ...]`，每个单元的配置格式

```
{
  title: "《产品招募书》",
  style: {},
  checkStyle: {},
  checkImage: ["uncheck.png", "check.png"],
  urlParam: $.extend({}, urlParam, {
    "OpenName": "产品招募书",
    "OpenUrl": data.cpzms
  })
}
```

### 3.2 颜色配置

```
{
  mobFormXys: {
    row: {},
    check: {}
  }
}
```

`row` 行配置，主要针对文字

`check` 前面的图片配置

### 3.3 大小配置