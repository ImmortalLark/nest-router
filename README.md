# nest-controller
实现 nest controller 复用的路由嵌套
### 使用方式
包装nestjs Module装饰器的controllers参数
#### 安装
```bash
npm install nest-router --save
```
#### 使用
```js
import NestedController from "nest-controller";
import { Module, Controller } from "@nestjs/common";
import AdminController from "./admin.controller";
import ArticalController from "../artical/artical.controller";
import UserController from "../user/user.controller";
/**
 * 假设ArticalController和UserController在Artical模块和User模块中已使用，
 * 路径分别为"artical/*" 和 "user/*"。现在想要在下复用这两个控制器并且路径变为
 * "admin/artical/*" 和 "admin/user/*"
 */
@Module({
  controllers: [ AdminController, ...NestedController("admin", ArticalController, UserController) ] 
})
export default class AdminModule {}
```