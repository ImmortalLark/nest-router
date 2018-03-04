import "reflect-metadata";
export default class NestRouter {
    static nestController(path: String, routes: Object): any[];
    private static flattenRoutes(rootPath, routes);
}
