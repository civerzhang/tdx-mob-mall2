> 在颜色 `color_set.js` 中经常会看到在组件内部有个 `fieldColor` 字段配置

### 1. `fieldColor` 的取值

```
{
  "F141": "red",
  "F131": ["red", "green"],
  "F204": ["red", "green", 2],
  "nav": ["red", "green", 3]
}
```

这些类型的定义有什么含义

1. `F141` 字段的内容，总是 `red` 颜色显示

2. `F131` 字段的内容和买卖标志有关，就是行记录比较 `F130` 字段的值

3. `F204` 字段内容的颜色显示和 `F204` 或者 `F5540` 有关，就是盈亏

4. `nav` 字段内容的颜色显示和自身的值有关

### 2. 具体的代码实现

文件：`commons/color.js`

内容：

```
/*
  获取颜色

  @params { Object } row, 行记录
  @params { Array|String } colorSet, 颜色配置值
  @params { String } field, 字段 id 

  @returns { String } 返回颜色的字符串
*/
const getColor = (row, colorSet, field) => {

  let color;

  // 如果 colorSet 的配置是个对象
  if(typeof colorSet == "object") {

    // 先通过第3个字段来判断颜色类别
    switch(colorSet[2]) {
      
      // 盈亏
      case 2:
        if(parseFloat(row.F204) > 0 || parseFloat(row.F5540) > 0) {
          color = colorSet[0];
        }
        else if(parseFloat(row.F204) < 0 || parseFloat(row.F5540) < 0) {
          color = colorSet[1];
        }
        break;

      // 和自身的值进行比较，大于 0 ，小于 0
      case 3: 
        if(parseFloat(row[field]) > 0) {
          color = colorSet[0];
        }
        else if(parseFloat(row[field]) < 0) {
          color = colorSet[1];
        }
        break;

      // 默认是买卖
      default:
        color = colorSet[mmbzColor[row.F130]];
        break;
    }

    return color;
  }

}
```

具体的外部调用

```
/*

  返回字段的颜色

  @params { Object } row 行记录
  @params { String } field 字段内容
  @params { Number } type 是弹出框的样式，
                      0|空 - 详情弹出框
                      1 - 普通列表
                      2 - 持仓列表
                      3 - 持仓上方资金区域
                      4 - card 类型的字段颜色

*/
export const getFieldColor = (row, field, type) => {

  // mob-row-detail
  if(type == undefined || type == 0) {
    return getFieldColorDialog(row, field);
  }

  // mob-list
  else if(type == 1) {
    return getFieldColorInList(row, field);
  }

  // mob-zjgf-cc
  else if(type == 2) {
    return getFieldColorZjgfCc(row, field);
  }

  // mob-zjgf-zj
  else if(type == 3) {
    return getFieldColorZjgfZj(row, field);
  }

  else if(type == 4) {
    return getFieldColorCard(row, field);
  }

  return;
};
```