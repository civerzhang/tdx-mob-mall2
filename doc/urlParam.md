> 跳转配置 urlParam 参数介绍

### 1. 一般逻辑

这里的 `urlParam` 的取值，大致遵循 `APP` 提供的 `tdxOpenUrl` 的参数约定

```
{
  OpenName: "",                         // 跳转界面显示title
  OpenType: ["native", "browser"],      // 打开页面方式，native - APP中打开，browser - 浏览器中打开
  OpenUrl: ""                           // 跳转地址
  OpenParam: {
    UrlType: ["Remote", "Relative", "Absolute"],
    WebViewType:["JyURL", "LocalURL", "NetURL"]
  },
  ShareInfo: {
     Title :  消息标题名称,
     Abstract:  摘要,
     ImageUrl:  图片Url,
     ShareUrl:  分享的网页url（防止本地网页需要分享的问题）,
     Time:    发布时间
  }
}
```

这些配置不必都写出来，他们都有一个默认的配置值

```
const tdxOpenUrlParamDef = {
  OpenName: "undefined",
  OpenType: "native",
  OpenUrl: "",
  OpenParam: {
    UrlType: "Relative",
    WebViewType: platform == "Android" ? "JyURL" : "LocalURL"
  }
}
```

## 2. url 中添加参数

在这个基础上，根据业务需求，我们跳转的时候，需要加入一些参数在 `URL` 中，这些参数我们通过另外一个参数来传入。

```
{
  OpenName: "xxx",
  ...
  queryParams: [
    { key: "pro_code", value: "code" },
    ...
  ]
}
```

这里我们将 `rowdata` 中的 `code` 字段内容放在 `pro_code` 上。

eg：

```
<!-- urlParam -->
{
  OpenUrl: "fhxx.html",
  queryParams: [
    { key: "code", value: "pro_code" }
  ]
}

<!-- rowdata -->
{
  "pro_code: "502048",
  ...
}
```

转成的跳转 `url` 是 `fhxx.html?code=502048`

## 3. 跳转 url 需要登录

```
{
  requireLogin: 1,
  ...
}
```

添加这个参数，表示跳转前需要验证普通是否登录。如果没有登录，转到去登录。

## 4. 动态的 url

如果我们要跳转的 `url` 是动态的，从接口那里获取到，这时我们需要在 `queryParams`
中给出一个特殊的 `{ key: "url", value: "urlField" }`

我们的逻辑在获取到配置中 `url` 的 `key`，那么我们通过这个来得到新的 `url`。