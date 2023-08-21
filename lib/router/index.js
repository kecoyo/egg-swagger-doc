"use strict";

const path = require("path");
const staticCache = require("koa-static-cache");
const { documentInit } = require("../document/index");
const { getControlContent, getFuncComment, getRouteApikey, getRouteMethod, getRoutePath } = require("./util");

module.exports = {
  /**
   * 注册SwaggerUI基础路由
   */
  basicRouterRegister: (app) => {
    // swaggerUI json字符串访问地址
    app.get("/swagger-doc", (ctx) => {
      ctx.response.status = 200;
      ctx.response.type = "application/json";
      ctx.response.body = documentInit(app);
    });
    app.logger.info("[egg-swagger-doc] register router: get /swagger-doc");

    // swaggerUI的静态资源加入缓存，配置访问路由
    const swaggerH5 = path.join(__dirname, "../../app/public");
    app.use(staticCache(swaggerH5, {}, {}));
    app.logger.info("[egg-swagger-doc] register router: get /swagger-ui.html");
  },
  /**
   * 注册扫描到的路由
   */
  routerRegister: (app) => {
    const { router, controller, config } = app;

    // register routes
    const registerRoutes = (controls, basePath) => {
      for (const controlName in controls) {
        if (Object.prototype.hasOwnProperty.call(controls, controlName)) {
          const control = controls[controlName];
          const controlContent = getControlContent(control); // controller文件内容

          for (const funcName in control) {
            if (Object.prototype.hasOwnProperty.call(control, funcName)) {
              const func = control[funcName];

              if (typeof func === "function") {
                const funcComment = getFuncComment(controlContent, funcName); // 方法注释
                if (funcComment) {
                  const middlewares = [];

                  // 如果方法注释中有@apikey，则添加jwt中间件
                  if (getRouteApikey(funcComment)) {
                    middlewares.push(app.jwt);
                  }

                  // 获取方法注释中路由方法
                  let routePath = getRoutePath(funcComment);
                  if (routePath) {
                    const routeMethod = getRouteMethod(funcComment) || "all";
                    router[routeMethod](`${basePath}${routePath}`, ...middlewares, func);
                    app.logger.info(`[egg-swagger-doc] register router: ${routeMethod} ${basePath}${routePath}`);
                    continue;
                  }
                }
                // 没有注释，默认注册全部方法
                const routePath = `${basePath}/${controlName}/${funcName}`;
                const routeMethod = 'all';
                router[routeMethod](routePath, func);
                app.logger.info(`[egg-swagger-doc] register router: ${routeMethod} ${routePath}`);
              } else {
                // 有多级目录的，递归
                registerRoutes(control, `${basePath}/${controlName}`);
              }
            }
          }
        }
      }
    };

    registerRoutes(controller, config.swaggerdoc.basePath);

    // for (let obj of funcBundler) {
    //   let instance = require(obj.filePath);

    //   let fileExtname = path.extname(obj.filePath);
    //   let direct = `${obj.filePath.split(fileExtname)[0].split('app' + path.sep)[1]}`;

    //   if (fileExtname === '.ts') {
    //     instance = instance.default;
    //   }

    //   for (let req of obj.routers) {
    //     if (instance.prototype) {
    //       const control = convertControllerPath(instance.prototype.pathName, controller);
    //       router[req.method](req.route.replace('{', ':').replace('}', ''), control[req.func]);
    //     } else {
    //       router[req.method](req.route.replace('{', ':').replace('}', ''), instance[req.func]);
    //     }
    //     app.logger.info(`[egg-swagger-doc] register router: ${req.method} ${req.route} for ${direct.replace(path.sep, '-')}-${req.func} `);
    //   }

    // }
  },
};
