
# nestjs-router

[![Build Status](https://travis-ci.org/ImmortalLark/nest-router.svg?branch=master)](https://travis-ci.org/ImmortalLark/nest-router)
[![Travis](https://img.shields.io/badge/latest-v0.0.5-brightgreen.svg)](https://www.npmjs.com/package/nestjs-router)
[![Coverage Status](https://coveralls.io/repos/github/ImmortalLark/nest-router/badge.svg?branch=feature%2Ftest)](https://coveralls.io/github/ImmortalLark/nest-router?branch=feature%2Ftest)

实现 nest 路由嵌套以复用模块或controller

#### 安装
```bash
npm install nestjs-router --save
```

#### 模块嵌套
```js
import NestRouter from "nestjs-router";
import { Module } from "@nestjs/common";
import ArticalModule from "../artical/artical.module";
import UserModule from "../user/user.module";

// 嵌套后路径 articalModule: admin/* 、UserModule: admin/nest/*
@Module({
  imports: NestRouter.nestModule("admin", {
    ArticalModule,
    nest: {
      UserModule
    }
  })
})
export default class AdminModule {}
```

#### 复用controller
```js
import NestRouter from "nestjs-router";
import { Module } from "@nestjs/common";
import AdminController from "./admin.controller";
import ArticalController from "../artical/artical.controller";
import UserController from "../user/user.controller";
/**
 * 假设ArticalController和UserController在Artical模块和User模块中已使用，
 * 路径分别为"artical/*" 和 "user/*"。现在想要AdminModule中复用这两个控制器并且路径变为
 * "admin/artical/*" 和 "admin/nest/user/*"
 */
@Module({
  controllers: [ AdminController, ...NestRouter.nestController("admin", {
    ArticalController, 
    nest: {
      UserController
    }
  })] 
})
export default class AdminModule {}
```