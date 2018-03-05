import "reflect-metadata";
import { PATH_METADATA, MODULE_PATH, metadata } from '@nestjs/common/constants';

const nestedClassType = {
  modules: MODULE_PATH,
  controllers: PATH_METADATA
};

export default class NestRouter {
  // 嵌套控制器
  public static nestController (path: string, routes: object): any[] {
      return NestRouter.flattenRoutes(path, routes, metadata.CONTROLLERS);
  }
  // 嵌套模块
  public static nestModule (path: string, routes: object): any[] {
    return NestRouter.flattenRoutes(path, routes, metadata.MODULES);
  }

  private static flattenRoutes (rootPath: string, routes: object, type: string): Function[] {
    // 拍平路由树
    let flatRoutes = [];
    Object.keys(routes).forEach((path) => {
      // target 可以是路由配置对象或模块、控制器。
      const target = routes[path];
      if ( target instanceof Function) {
        let NestedClass = NestRouter.buildPath(rootPath, target, type);
        flatRoutes.push(NestedClass);
      }
      flatRoutes = flatRoutes.concat(NestRouter.flattenRoutes(`${rootPath}/${path}`, target, type));
    });
    return flatRoutes;
  }
  // 构建路径
  private static buildPath(rootPath: string, target: any, metaType: string): Function {
    const oldPath = Reflect.getMetadata(nestedClassType[metaType], target);
    const newPath =  oldPath ? `${rootPath}/${oldPath}` : rootPath;
    // 新类继承自原class 避免污染
    class NestedClass extends target {}
    // 修改路径
    Reflect.defineMetadata(nestedClassType[metaType], newPath, NestedClass);
    // 使用target的名称
    Reflect.defineProperty(NestedClass, "name", { value: target.name, writable: true });

    return NestedClass;
  }
}
