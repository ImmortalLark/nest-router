"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
require("reflect-metadata");
const constants_1 = require("@nestjs/common/constants");
class NestRouter {
    static nestController(path, routes) {
        return NestRouter.flattenRoutes(path, routes);
    }
    static flattenRoutes(rootPath, routes) {
        let flatRoutes = [];
        Object.keys(routes).forEach((path) => {
            if (routes[path] instanceof Function) {
                let oldPath = Reflect.getMetadata(constants_1.PATH_METADATA, routes[path]);
                class NestedController extends routes[path] {
                }
                Reflect.defineMetadata(constants_1.PATH_METADATA, `${rootPath}/${oldPath}`, NestedController);
                Reflect.defineProperty(NestedController, "name", { value: path, writable: true });
                flatRoutes.push(NestedController);
            }
            flatRoutes = flatRoutes.concat(NestRouter.flattenRoutes(`${rootPath}/${path}`, routes[path]));
        });
        return flatRoutes;
    }
}
exports.default = NestRouter;
