# nestjs-router
实现 nest 路由嵌套以复用模块或controller

### 使用方式
包装nestjs Module装饰器的controllers参数

#### 安装
```bash
npm install nestjs-router --save
```

#### 模块嵌套
```js
import NestRouter from "nest-controller";
import { Module } from "@nestjs/common";
import AdminModule from "./admin.module";
import ArticalModule from "../artical/artical.module";
import UserModule from "../user/user.module";

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
import NestRouter from "nest-controller";
import { Module } from "@nestjs/common";
import AdminController from "./admin.controller";
import ArticalController from "../artical/artical.controller";
import UserController from "../user/user.controller";
/**
 * 假设ArticalController和UserController在Artical模块和User模块中已使用，
 * 路径分别为"artical/*" 和 "user/*"。现在想要在下复用这两个控制器并且路径变为
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