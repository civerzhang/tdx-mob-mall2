> 饼图组件

## 1. 效果

![mob-chart-pie](images/mob-chart-pie.jpg)

## 2. 调用

```
<mob-chart-pie 
  :item="item"
  :data="data"
/>
```

`data` 格式

```
{...}
```

## 3. 配置

### 3.1 功能配置

```
{
  tplid: "mob-chart-pie",
  split: {...},
  bar: {...},
  index: 1,
  chart: {
    cc: [
      {
        name: "银行理财",
        color: "#f26a55",
        field: "zjYhlc",
        format: "2m"
      },
      {
        name: "基金",
        color: "#fba62e",
        field: "zjJj",
        format: "2m"
      },
      {
        name: "股票",
        color: "#90ed7d",
        field: "zjGp",
        format: "2m"
      },
      {
        name: "其他",
        color: "#f7a35c",
        field: "zjXj",
        format: "2m"
      }
    ],
    style: {
      height: "160px"
    },
    title: "各类资产",
    name: "占比",
    innerSize: "80%"
  }
},
```

`chart.cc` 显示比例的项目

`chart.title` 饼图的标题

`chart.innerSize` 饼图内圈大小

`chart.name` 饼图显示 `name`

`chart.style` 图表区域样式，一般只是设置高度

### 3.2 颜色配置

```
mobChartPie: {
  chart: {},
  name: {
    color: "rgba(0, 0, 0, 0.5)"
  },
  value: {
    color: "#333"
  }
}
```

### 3.3 大小配置

```
mobChartPie: {
  chart: {},
  name: {
    fontSize: "13px"
  },
  value: {
    fontSize: "15px"
  }
}
```