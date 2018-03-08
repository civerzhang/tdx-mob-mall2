> 资金展示卡片组件

## 1. 效果

![mob-card-zj](images/mob-card-zj.jpg)

## 2. 调用

```
<mob-card-zj 
  :item="item"
  :data="data"
/>
```

`data` 行记录

```
{
  key: value, key: value, ...
}
```

## 3. 配置

### 3.1 功能配置

```
{
  tplid: "mob-card-zj",
  index: 0,
  title: {
    name: "理财总资产",
    style: {}
  },
  zj: {
    field: "205",
    style: {},
    format: "2m"
  },
  btn: {
    name: "银证转账",
    style: {},
    urlFunc: jumpYzzz,
    urlParam: {}
  },
  style: {},
  split: {}
}
```

`btn.urlFunc` 按钮点击操作函数处理，如果配置这个 `btn.urlParam` 不生效

`btn.urlParam` 跳转配置，`tdxOpenUrl`

### 3.2 颜色配置

```
{
  mobCardZj: {
    box: {},
    title: {},
    zj: {},
    btn: {}
  }
}
```

### 3.3 大小配置

```
{
  mobCardZj: {
    box: {},
    title: {},
    zj: {},
    btn: {}
  }
}
```