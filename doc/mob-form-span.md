> 表单行展示组件

## 1. 效果

![mob-form-span](images/mob-form-span.jpg)

## 2. 调用

```
<mob-form-span
  :item="item"
  :data="data"
>
```

这里的 `data` 是表单的记录，格式

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
  tplid: "mob-form-span",
  style: {
    height: "25px",
    marginTop: "20px"
  },
  cols: [
    {
      field: "403",
      style: {
        fontSize: "18px",
        fontWeight: "bold"
      }
    },
    {
      field: "402",
      style: {
        marginLeft: "10px",
        fontSize: "12px",
        color: "rgba(0, 0, 0, 0.5)"
      }
    }
  ],
  op: {
    name: "",
    style: "",
    urlFunc: function() {},
    urlParam: {}
  }
}
```

`style` 行的样式配置

`cols` 一列列的配置，每个区域有如下格式

```
{
  name: "",
  field: "",
  style: {},
  format: ""
}
```

如果配置了 `field`，取 `field` 的值，否则取 `name` 的值。

`op` 操作部分配置，格式

```
{
  name: "",
  style: {},
  urlFunc: function() {},
  urlParam: {}
}
```

如果配置了 `urlFunc` 直接执行这个函数，如果没有就是跳转操作 `urlParam`

### 3.2 颜色配置

```
{
  mobFormSpan: {
    box: {},
    col: {},
    op: {}
  }
}
```

### 3.3 大小配置

```
{
  mobFormSpan: {
    box: {},
    col: {},
    op: {}
  }
}
```