# @elora-cloud/elora-unplugin-vue-components

[unplugin-vue-components](https://github.com/unplugin/unplugin-vue-components)解析器[@elora-cloud/elora-plus](https://github.com/Elora-Cloud/elora-cloud/packages/elora-plus)的实现。

扩展了 [element-plus](https://github.com/element-plus/element-plus)的内置解析器`ElementPlusResolver`,因为[@elora-cloud/elora-plus](https://github.com/Elora-Cloud/elora-cloud/packages/elora-plus)对 [element-plus](https://github.com/element-plus/element-plus)一些组件的样式进行了修改，所以在按需加载时除了需要加载element-plus的组件内的样式同时也需要加载@elora-cloud/elora-plus组件内修改的样式

[github](https://github.com/Elora-Cloud/elora-cloud/packages/elora-unplugin-vue-components)地址

[gitee](https://gitee.com/mumulx/elora-plus/tree/master/packages/elora-unplugin-vue-components)地址

## 开始

```sh
pnpm add -D @elora-cloud/elora-unplugin-vue-components
```

自动导入组件和样式文件，最终的结果为：

```js
import { ElCheckbox } from "element-plus/es";
import "element-plus/es/components/base/style/css";
import "element-plus/es/components/checkbox/style/css";
import "@elora-cloud/elora-plus/theme/styles/checkbox.css";
```

## 配置

如果没有添加[unplugin-vue-components](https://github.com/unplugin/unplugin-vue-components)、[unplugin-auto-import](https://github.com/unplugin/unplugin-auto-import)，需要先添加的依赖

```sh
pnpm add -D unplugin-vue-components
upnpm add -D unplugin-auto-import
```

配置vite插件`vite.config.ts`

```typescript
import Components from 'unplugin-vue-components/vite';
import AutoImport from 'unplugin-auto-import/vite';
// import { ElementPlusResolver } from 'unplugin-vue-components/resolvers'; 去掉默认的ElementPlusResolver
// 引入自定义的解析器
import { EloraPlusResolver, ElementPlusResolver } from '@elora-cloud/elora-unplugin-vue-components';
{
    ...
    plugins:[
        ...
        Components({
            resolvers: [
              ElementPlusResolver(), 
              EloraPlusResolver()
            ]
          }),
          AutoImport({
            resolvers: [
              ElementPlusResolver(),
              EloraPlusResolver(),
            ]
          }),
    ]
}
```

