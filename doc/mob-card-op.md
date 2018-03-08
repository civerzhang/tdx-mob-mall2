> 单产品，带委托操作

## 1. 效果

![mob-card-op](images/mob-card-op.jpg)

## 2. 调用

```
<mob-card-op 
  :item="item"
  :data="data"
/>
```

`data` 格式

```
{
  key: value,
  ...
}
```

一个数据列

## 3. 配置

### 3.1 功能配置

文件：`mob_list_xxx.js`

内容：

```
{
  tplid: "mob-card-op",                   // 必选，组件 id
  index: 0,                               // 必选，数据下标，dataCache 中的下标
  toggleShow: 1,                          // 可选，是否根据数据请求，有隐藏的需求
  split: {},                              // 可选，是否带分隔
  bar: {
    // mob-bar 配置
  },
  card: {                                 // 卡片区域
    title: {                              // 卡片标题
      field: "pro_name",
      style: {}
    },
    cards: [                              // label 部分配置
      {
        field: "pro_type2_name",
        class: "card-blue",
        style: {}
      },
      {
        field: "risk_level_name",
        class: "card-gray",
        style: {}
      }
    ],
    sy: {
      name: "七日年化收益",
      nameStyle: {},
      field: "nav",
      fieldStyle: {},
      format: "2%"
    },
    op: {
      name: "立即购买",
      style: {},
      urlParam: {                         // 点击操作按钮跳转配置
        requireLogin: 1,                  // 跳转前，是否需要登录
        OpenUrl: "http://www.baidu.com",
        OpenType: "browser"
      }
    },
    urlParam: {                           // 点击卡片部分跳转配置
      OpenName: "产品详情",
      OpenUrl: "cpxq.html",
      queryParams: [
        { key: "code", value: "pro_code" },
        { key: "pro_type1", value: "pro_type1"},
        { key: "pro_type2", value: "pro_type2"},
      ]
    }
  }
}
```

`bar` 可选，标题栏配置 [mob-bar](/doc/mob-bar)

### 3.2 颜色配置

文件：`color_set[_skin].js`

内容：

```
mobCardOp: {
  syName: {
    color: "rgba(0, 0, 0, 0.5)"
  },
  syValue: {
    color: "#000"
  }
},

mobCard: {
  fieldColor: {
    "nav": ["red", "green", 3]
  }
}
```

### 3.3 大小配置

文件：`size_set.js`

内容：

```
mobCardOp: {

  card: {
    padding: "15px",
    paddingTop: "0px"
  },
  cardTitle: {
    fontSize: "18px",
    lineHeight: "30px"
  },
  syName: {
    fontSize: "12px",
    lineHeight: "26px"
  },
  syValue: {
    fontSize: "30px"
  }
}
```

### 注意

比如，这里配置了一个收益字段 `nav`，我们在 `color_set.js` 中的 `mobCard` 中
支持 `fieldColor` 配置，对单个字段的颜色进行处理。[详情](/doc/fieldColor.md)