> 查询日期组件

## 1. 效果

![mob-query-date](images/mob-query-date.jpg)

## 2. 调用

```
<mob-query-date 
  :item="item"
/>
```

## 3. 配置

### 3.1 功能配置

```
{
  tplid: "mob-query-date",
  direction: 0,  // 查过去
  query: [3]
}
```

`direction` 日期方向，0 - 查历史，1 - 查未来。默认 0

`query` 默认显示，0 - 一周，1 - 一月，2 - 三月，3 - 当日

### 3.2 颜色配置

```
{
  mobQueryDate: {
    box: {},
    name: {},
    date: {},
    images: {}
  }
}
```

### 3.3 大小配置

```
{
  mobQueryDate: {
    box: {},
    name: {},
    date: {},
    images: {}
  }
}
```