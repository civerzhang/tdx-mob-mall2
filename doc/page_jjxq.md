> 基金详情界面逻辑

这个和首页有些相似，如果严格来配置的话，可以使用基金详情界面的业务模板来
配置首页的功能。所以说这个界面模板是包含首页模板的。

## 0. 显示效果

![page_jjxq](images/page_jjxq.gif)

## 1. mob_list_xxx.js

页面需要的组件功能配置

```
var mob_list_xxx = {
  items: [
    { 每个组件的配置 }
  ],
  buttom: [
    { 每个组件的配置 }
  ]
}
```

## 2. mob_send_xxx.js

这个里面的逻辑和 [首页](/doc/page_index) 是一样的