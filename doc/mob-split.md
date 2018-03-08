> 分隔组件

## 1. 效果

![效果图片](images/mob-split.jpg)

## 2. 调用

`vue` 中使用方式

```

<mob-split 
  :class="getComponentClass(item)"
  :style="getComponentStyle(item)"
/>

```

## 3. 配置

### 3.1 功能配置

文件：`mob_list_xxx.js`

内容：

```
{
  tplid: "mobSplit",
  style: {},
  flx: 0
}
```

`tplid` 必选，组件 id，mobSplit 或者 mob-split

`style` 可选，样式配置

`flx` 可选，该组件是否缩放，0 - 不缩放（默认），1 - 缩放，自适应剩下的空间

### 3.2 颜色，大小配置

文件：`color_set.js`，或者对应的皮肤 js 文件

内容：

```
var tdx_color = {

  ...
  mobSplit: {
    backgroundColor: "red"
  }
}
```

文件：`size_set.js`

内容：

```
var tdx_size = {
  ...
  mobSplit: {
    height: "15px"
  }
}
```

<p class="danger">
   注意，这里的 `style` 覆盖规则，`mob_list_xxx.js` 中的 `style` 配置内容覆盖 `color_set.js` 和 `size_set.js` 中的内容。
</p>