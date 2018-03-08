> mob-bar 配置

## 1. 效果

![mob-bar](images/mob-bar.jpg)

## 2. 调用

```
<mob-bar 
  :item="item"
  :data="data"
/>
```

`item` 必选，组件显示内容配置

`data` 可选，一般不用

## 3. 配置

### 3.1 功能配置

文件：`mob_list_xxx.js`

```

{
  tplid: "mob-bar",
  icon: {
    style: {
      backgroundColor: "#2E6BB1"
    }
  },
  title: "稳健收益",
  subTitle: "安心理财，稳定回报",
  more: {
    title: "查看更多",
    urlParam: {
      "OpenName": "详情",
      "OpenUrl": "cpxq.html"
    },
    style: {},
    iconStyle: {}
  },
  rowClickEnable: 1
}

```

`tplid` 可选，如果是第一级配置的话需要，如果是在某个组件里面，那么不需要

`icon` 可选，左侧的图标配置，支持图片和样式配置

```
{
  url: "图标名称",
  style: {}
}
```

`title` 必选，大标题

`subTitle` 可选，小标题

`more` 可选，右侧的更多内容

```
{
  title: "更多提示信息",
  urlParam: {跳转参数},
  style:{}
}
```

`rowClickEnable` 整行点击响应，1 - 响应，0 - 不响应（默认不响应）

### 3.2 颜色配置

文件：`color_set.js`

内容：

```
{
  mobBar: {
    icon: {
      backgroundColor: "red"
    },
    title: {
      color: "#000"
    },
    subTitle: {
      color: "rgba(0, 0, 0, 0.5)"
    },
    moreTitle: {
      color: "rgba(0, 0, 0, 0.5)"
    }
  }
}
```

`icon` 图标的样式

`title` 大标题样式

`subTitle` 副标题样式

`moreTitle` 更多提示信息样式

### 3.3 大小配置

文件：`size_set.js`

内容：

```
{
  bar: {
    height: "40px",
    padding: "0 15px"
  },
  icon: {
    width: "4px",
    height: "12px"
  },
  title: {
    marginLeft: "10px",
    fontSize: "14px"
  },
  subTitle: {
    marginLeft: "12px",
    fontSize: "12px"
  },
  moreTitle: {
    fontSize: "12px",
    marginRight: "5px"
  }
}
```

`bar` 标题栏样式

`icon` 图标大小样式

`title` 标题大小样式

`subTitlte` 副标题大小样式

`moreTitle` 更多提示信息样式