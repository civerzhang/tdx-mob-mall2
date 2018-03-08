> 单个按钮组件

## 1. 效果

![mob-btn-single](images/mob-btn-single.jpg)

## 2. 调用

```
<mob-btn-single 
  :item="item"
  :data="data"
/>
```

## 3. 配置

### 3.1 功能配置

```
{
  tplid: "mob-btn-single",
  index: 5,
  btn: getOpBtn
}
```

`btn` 可以是具体的内容，也可以是函数，通过具体的数据获得，所以这里有 `index`

```
var getOpBtn = function(data) {
  var status = data["pro_status"];
  var urlParam = [
    {
      OpenName: "申购",
      OpenUrl: "jyhtml/works123/lcsc/otcsg.html?fromsc=1&PageID=Mobile.OTC.OTCSGTRD",
      OpenParam: {
        UrlType: "Absolute",
        WebViewType: "JyURL"
      },
      queryParams: [
        { key: "F402", value: "pro_code" }
      ],
      requireLogin: 1
    },
    {
      OpenName: "认购",
      OpenUrl: "jyhtml/works123/lcsc/otcrg.html?fromsc=1&PageID=Mobile.OTC.OTCSGTRD",
      OpenParam: {
        UrlType: "Absolute",
        WebViewType: "JyURL"
      },
      ueryParams: [
        { key: "F402", value: "pro_code" }
      ],
      requireLogin: 1
    }
  ];

  if(status == "1") {
    return {
      name: "申购",
      urlParam: urlParam[0]
    };
  }
  else if(status == "2") {
    return {
      name: "认购",
      urlParam: urlParam[1]
    };
  }
}
```

### 3.2 颜色配置

```
mobBtnSingle: {
  btn: {
    backgroundColor: "#2E6BB1",
    color: "#fff"
  }
}
```

### 3.3 大小配置

```
mobBtnSingle: {
  btn: {
    height: "40px",
    fontSize: "18px"
  }
}
```