import "reflect-metadata";
import { PATH_METADATA } from '@nestjs/common/constants';

export default class NestRouter {
  public static nestController (path: String, routes: Object): any[] {
      return NestRouter.flattenRoutes(path, routes);
  }
  // 嵌套控制器
  private static flattenRoutes (rootPath, routes: Object): Function[] {
    // 拍平路由树
    let flatRoutes = [];
    Object.keys(routes).forEach((path) => {
      if ( routes[path] instanceof Function) {
        let oldPath = Reflect.getMetadata(PATH_METADATA, routes[path]);
        // 新类继承自原controller 避免污染
        class NestedController extends routes[path] {}
        // 修改路径
        Reflect.defineMetadata(PATH_METADATA, `${rootPath}/${oldPath}`, NestedController);
        // 使用原controller名重命名新controller
        Reflect.defineProperty(NestedController, "name", { value: path, writable: true });
        flatRoutes.push(NestedController);
      }
      flatRoutes = flatRoutes.concat(NestRouter.flattenRoutes(`${rootPath}/${path}`, routes[path]));
    });
    return flatRoutes;
  }
}
