> 我的理财界面逻辑

这个和首页有些相似

区别，有一个跳转到登录的逻辑，所以这里会有一个刷新查询用户状态的逻辑。

## 1. mob_list_xxx.js

页面需要的组件功能配置

```
var mob_list_xxx = {
  items: [
    { 每个组件的配置 }
  ],
  loginPage: "login.html"
}
```

多了一个 `loginPage` 地址配置

## 2. mob_send_xxx.js

这个里面的逻辑和 [首页](/doc/page_index) 是一样的