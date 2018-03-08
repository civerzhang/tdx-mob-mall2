> GetSendData

我们实现页面的时候，会发现经常性要实现一个文件 `mob_send_xxx.js`

在这个文件中，有一个必须实现的全局函数 `GetSendData`，类似下面的内容

```
var GetSendData = function(n, json) {
  var funcid;
  var ix = new IXContent();

  switch(n) {

    case 0:
      ...
      break;
  }

  return [funcid, ix];
}
```

下面是一些简单的约定：

## 1. n, json

这个 `n` 和 `mob_list_xxx.js` 中一些组件配置的 `index` 值有关。

是为了把不同的数据绑定到正确的组件上，组件中有个变量 `dataCache`，这个变量存所有的数据，
通过下标，知道哪个数据是哪个组件的。

`json` 是某些组件会有的一些参数，主要使用到列表查询中

## 2. `funcid` 请求功能号

因为对请求做了封装，所以需要通过设置 `funcid` 的前缀来得到该请求通过那个协议发送出去。

```
HQ.[实际功能号]          // 通过 connect.js 的 __hqCallTql 发送到行情 TP 的请求，这里一般都不需要账号信息

JY.[实际功能号]          // 通过 __jyCallTql 发送的交易 TC 的请求，用户信息 APP 底层维护

FW.[实际功能号]

FW2.[实际功能号]         // 通过 __fwCallTql 发送请求，但是后台是纯 TS 实现，就是说应用层需要维护用户信息（已封装）

local.localstorage      // 获取本地的数据

```

## 3. `IXContent` 请求参数结构

有2种结构

```
<!-- 结构1 -->
[
  { key: value },
  { key: value },
  ...
]
```

或者

```
<!-- 结构2 -->
[
  {
    key: value,
    key1: value1,
    ...
  }
]
```

得到方式，分别通过

```
var ix = new IXConent();
ix.valueOf();         // 结构1 
ix.valueOfJson();     // 结构2
```

**有一些其他的参数**

1. 关于 `FormatResult` 的处理

~~程序逻辑对应答默认进行了 `FormatResult` 处理，但是有的参数不是标准的应答格式，所以这里需要返回原数据
通过设置 `ix.Set("tdxOrigin", "1")` 来达到目的。~~

这里的 `tdxOrigin` 在送到 `TC50` 的时候会不认，导致请求没有应答。这里我们替换成 `F19471` 来处理。