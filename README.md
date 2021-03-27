# svelte-vite-template

###  开发基于环境
Git、 Node.Js (v14 以上)、Yarn、Visual Studio Code编辑器


###  项目技术栈
 
| 框架类型 | 框架名称 |  文档地址 |
| ------------ | ------------- |------------- |
| 开发框架      | Svelte  | https://www.sveltejs.cn/ |
| 开发语言      | TypeScript  | https://www.typescriptlang.org/  |
| 样式预处理语言 | Less   | http://lesscss.org/  |
| 开发打包工具   | Vite    | https://vite.xilinglaoshi.com/  |
| 前端自动化工具 | Gulp  | https://gulpjs.com/ |


### 项目目录结构

#### 根目录结构

    |-- assets           # 静态资源文件
    |-- dist             # 编译后之后生产的文件夹
    |-- node_modules     # 依赖模块包文件
    |-- public           # 无需编译的资源存放文件
    |-- scripts          # 存放脚本代码的文件
    |-- src              # 需要编译的代码文件
        |- components        # 页面公共组件
        |- lib               # 页面公共代码
        |- styles            # 页面公共样式
        |- pages             # 页面文件
    |-- template         # 官网项目模版 
    |-- .babelrc         # babel 配置文件
    |-- .browserslistrc  # browsers 兼容浏览器设置 babel、postcss编译出来支持的浏览器版本配置
    |-- gulpfile         # gulp 任务配置文件
    |-- package.json     # npm|yarn 模块管理配置文件
    |-- tsconfig.json    # typescript 配置文件
    |-- vite.config.js   # vite 配置文件


#### Page目录结构
    |-- components       # 页面组件
    |-- lib              # 页面库代码
    |-- App.svelte       # 根组件
    |-- index.html       # 页面html
    |-- main.ts          # 页面入口ts文件



### 如何进行开发
    // 把项目拉取到本地
    git clone git@github.com:Feng373712195/svelte-vite-template.git

    // 进入项目
    cd ./svelte-vite-template

    // 安装所需依赖
    yarn 

    /* 
    *  创建页面 
    *  注意：这里的${pageName}为你自己命名的页面名称
    */
    yarn create-page ${pageName}

    /*
    * 创建页面成功后在 src/pages/${pageName} 中会生产页面，
    * 启动开发服务器，就可以开始开发
    /
    yarn dev


### Build过程

当项目目录打开终端输入 yarn build 会开始编译打包生产环境代码，下面解释具体过程，这个过程主要为了对页面进行SSG(Static Site Generation)
- 第一步 vite build 是为了得到编译后的页面和所需资源，会导出到dist文件夹
- 第二步 vite build --ssr 打包得到页面SSR的代码，编译后导出到.ssr文件夹，里面得到可以得到每个页面render函数的js文件
- 第三步  执行执行 /script/generate.js  具体执行内容是调用每个页面.ssr在文件夹对应的render函数js，得到渲染后的HTML代码，找到dist中对应页面的html，对html内容替换为已经渲染过的内容
- 第四步 使用gulp对html进行压缩
- 编译完成 最终结果都在 /dist文件夹中
- 使用 yarn serve可对编译后的结果进行预览


### 如何设置每个页面中不同的tItle标签

使用Svelte写法，在每个页面中的App.svelte中进行设置

```js
    <svelte:head>
      <title>光年浏览超市</title>
    </svelte:head>
```


### 其他注意事项
- 兼容IE版本中9以上的浏览器
- 开发者无需担心Flexbox在IE中不支持问题，已经使用 flexibility.js 进行处理
- 开发者在 src/pages 新增页面打包时无需重新修改配置 ，配置文件中会自动处理
- 开发时 src/pages/index 默认为首页，在访问开发服务器时 http://localhost:端口号 根域名就可以访问到, 非主页需要输入 http://localhost:端口号/${pageName} 才可访问到
