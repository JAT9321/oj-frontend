# 链接

oj-backend (后端)[https://github.com/JAT9321/oj-backend]

oj-code-sandbox (代码沙箱)[https://github.com/JAT9321/oj-code-sandbox]

oj-frontend (前端)[https://github.com/JAT9321/oj-frontend]

# 简介

1 基于 Vue3 + Arco Design 组件库，自主实现了在线做题、题目检索和管理、提交列表、用户登录等页面。

2 使用 Vue-CLI 脚手架初始化项目，并自行开发了全局页面布局和通用前端项目模板，便于后续复用。

3 全局导航生成：基于 Vue Router 的路由配置文件自动生成导航菜单，并通过给路由的 meta 属性增加 hidden 字段实现集中控制页面的显隐。

4 全局权限管理：通过给 Vue Router 路由的 meta 属性增加 access 字段来定义页面权限，然后通过 beforeEach 全局路由守卫集中校验用户进入页面的权限，并进一步将权限管理相关代码统一封装为 access.ts 模块，简化用户使用。

5 全局状态管理：基于 Vuex 定义 User Module 实现了对登录用户的状态存储，并通过组合式 API（useStore）在页面中访问用户信息。

5 前后端联调：使用 openapi-typescript-codegen 工具根据后端 Swagger 接口文档自动生成请求后端的代码，大幅提高开发效率。

6 为提高前端开发效率，使用 IDEA 的 Live Templates 功能自定义了一套基础前端代码模板，能够通过快捷键高效生成代码。

7 选用 ByteMD 开源 Markdown 文本编辑器组件，引入 gfm 插件（支持表格语法）并进一步自行封装了可复用的 Editor 和 Viewer，实现了题目内容及答案的编辑功能。

8 于 Webpack 整合了 Monaco Editor 开源代码编辑器组件，并进一步基于 ref 自行封装了可复用的 Editor 和 Viewer，实现了用户编写代码功能，支持多种语言的高亮。

9 使用 Arco Design 的 Table 组件实现了题目检索页面，并通过自定义插槽将后端返回的 JSON 数据解析为美观的格式。
