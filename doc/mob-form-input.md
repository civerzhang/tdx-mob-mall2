> 表单行输入组件

## 1. 效果

![mob-form-input](images/mob-form-input.jpg)

## 2. 调用

```
<mob-form-input
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
  tplid: "mob-form-input",
  title: {
    name: "购买金额",
    style: {
      color: "rgba(0,0,0,0.5)"
    }
  },
  input: {
    placeholder: "请输入购买金额",
    name: "￥",
    style: {
      fontSize: "26px",
      fontWeight: "bold",
      height: "30px",
      marginBottom: "5px"
    },
    field: "gmje",
  },
  split: {}
}
```

`input` 的输入框配置中 `field` 指的是我们输入的内容存放在这个里面

这个内容会通过 `mob-form-input-change` 事件消息发送出去，参数 `{ [field]: value }`, field 就是我们配置的。
这里看到是 `gmje`

### 3.2 颜色配置

```
{
  mobFormSpan: {
    box: {},
    title: {},
    input: {}
  }
}
```

### 3.3 大小配置

```
{
  mobFormSpan: {
    box: {},
    title: {},
    input: {}
  }
}
```