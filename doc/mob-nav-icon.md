> 导航组件，带 icon

## 1. 效果

![mob-nav-icon](images/mob-nav-icon.jpg)

## 2. 调用

```
<mob-nav-icon
  :class="getComponentClass(item)"
  :style="getComponentStyle(item)"
  :item="item"
  :data="data"
/>
```

## 3. 配置

### 3.1 功能配置

文件：`mob_list_xxx.js`

内容：

```
{
  tplid: "mobNavIcon",
  navs: [
    {
      url: "nav-dq.png",
      title: "定期",
      urlParam: {
        OpenName: "定期",
        OpenUrl: "dqlc.html"
      }
    },
    {
      url: "nav-hq.png",
      title: "活期"
    },
    {
      url: "nav-jj.png",
      title: "基金"
    }
  ],
  flx: 0,
  split: {...}
}
```

`tplid` 必选，组件 id

`navs` 必选，导航栏每个 nav 的配置

`flx` 可选

`split` 可选

### 3.2 颜色配置

文件：`color_set[_skin].js`

内容：

```
var tdx_color = {
  mobNavIcon: {
    navItem: {},
    image: {},
    title: {}
  }
}
```

### 3.3 大小配置

文件：`size_set.js`

内容：

```
var tdx_size = {
  mobNavIcon: {
    navItem: {},
    image: {},
    title: {}
  }
}
```