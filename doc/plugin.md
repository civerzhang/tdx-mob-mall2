<p class="tip">
  券商合作开发说明
</p>

在定制券商的需求时，我们提供的组件可能满足不了券商的需求。这个时候需要去实现新的组件，但是每次都把组件放到总的组件库中，会使得
插件越来越大。同时券商开发起来也比较麻烦，需要对券商说明程序代码结构逻辑，工程打包。知识点太多。

所以这里提供一个 `plugins` 的部分，来扩展组件以适应券商的定制化需求。

## 一个例子

先以一个例子开头，来说明我们的功能目录结构是什么样的，例如我们要实现一个商城首页的功能，这个时候目录结构

```
/
  app/
    demo/
      js/                 -- tdx 提供的打包后 js 文件，包括：组件库，页面业务逻辑
        ...                     
      css/                -- tdx 提供的打包后的 css 文件
        ...
      plugins/            -- 券商扩展的个性化组件文件
        register.json     -- 需要载入和注册配置
        xxx.vue           -- 组件实现文件
        ...
      size_set.js         -- 大小配置，页面中的大小等配置
      color_set.js        -- 颜色配置，页面中组件颜色
      color_set_black.js  -- 另外一套皮肤颜色配置
      demo.html           -- 实现的功能页面文件
      mob_list_demo.js    -- 对应的界面配置文件
      mob_send_demo.js    -- 对应的业务数据请求文件
  libs/                   -- 三方库
    ...
  tlibs/                  -- tdx 库
    ...
```

我们要实现的 `demo.html` 中，应该会有如下的一些文件

```
<!DOCTYPE html>
<html>
<head>
  <title>商城首页</title>
  <meta charset="utf-8">
  <meta http-equiv="X-UA-Compatible" content="IE=edge,chrome=1">
  <meta name="viewport" content="width=device-width, initial-scale=1.0, maximum-scale=1.0, minimum-scale=1.0, user-scalable=no">
  <link rel="stylesheet" type="text/css" href="css/common.css">
  <link rel="stylesheet" type="text/css" href="css/index.css">
</head>
<body>
<div id="app">
  <div class="tdx-loading"></div>
</div>
</body>
<script src="../../libs/jquery-1.11.2.min.js"></script>
<script src="../../libs/vue.min.js"></script>
<script src="../../tlibs/ts_client.js"></script>
<script src="../../tlibs/connect.js"></script>
<script src="../../tlibs/msgbox.js"></script>
<script src="size_set.js"></script>
<script src="color_set.js"></script>
<script src="color_set_black.js"></script>
<script src="js/common.js"></script>
<script src="js/index.js"></script>
</html>
```

这里看到我们引入 `js/index.js` 文件，表示我们使用 `page_index` 的业务逻辑。

网页文件 `ok` 后，我们需要配置界面上需要哪些组件，文件 `mob_list_demo.js` 如

```
var mob_list_demo = {
  items: [
    {
      tplid: "mob-slider-image",
      ...
    },
    {
      tplid: "mob-list",
      index: 0,
      ...
    }
  ]
}
```

上面我们配置了一个 `mob-slider-image` 组件，一个 `mob-list` 组件。可以在文档中看具体的配置说明。

界面有了，我们现在要请求数据，这里看到在 `mob-list` 中定义了 `index: 0` 这里我们需要在 `mob_send_demo.js` 写如下代码

```
var GetSendData = function(n, json) {
  
  var funcid;
  var ix = new IXContent();
  switch(n) {

    case 1:
      funcid = "HQ.TSTC.10038";
      ix.Set("F19471", "1");
      break;
    default:
      break;
  }

  return [funcid, ix];
}

var SetDataField = function(data, n, vm) {

  if(n == 1) {
    
    var res = data.match(/{[^}]+}/);
    if(res) {
      res = res[0];
      res = JSON.parse(res);

      // 获取一元起投，稳健收益，热门的数据
      var wjsy = res.wjsy;
      var hot = res.hot;

      getWjsyData(wjsy, vm);
      getHotData(hot, vm);

      data = undefined;
    }
  }

  return data;
}
```

配置和实现功能就是这么简单。