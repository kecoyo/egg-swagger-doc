# @kecoyo/egg-swagger-doc

[![NPM version][npm-image]][npm-url]
[![build status][travis-image]][travis-url]
[![Test coverage][codecov-image]][codecov-url]
[![David deps][david-image]][david-url]
[![Known Vulnerabilities][snyk-image]][snyk-url]
[![npm download][download-image]][download-url]

[npm-image]: https://img.shields.io/npm/v/@kecoyo/egg-swagger-doc.svg?style=flat-square
[npm-url]: https://npmjs.org/package/@kecoyo/egg-swagger-doc
[travis-image]: https://img.shields.io/travis/@kecoyo/egg-swagger-doc.svg?style=flat-square
[travis-url]: https://travis-ci.org/@kecoyo/egg-swagger-doc
[codecov-image]: https://img.shields.io/codecov/c/github/@kecoyo/egg-swagger-doc.svg?style=flat-square
[codecov-url]: https://codecov.io/github/@kecoyo/egg-swagger-doc?branch=master
[david-image]: https://img.shields.io/david/@kecoyo/egg-swagger-doc.svg?style=flat-square
[david-url]: https://david-dm.org/@kecoyo/egg-swagger-doc
[snyk-image]: https://snyk.io/test/npm/@kecoyo/egg-swagger-doc/badge.svg?style=flat-square
[snyk-url]: https://snyk.io/test/npm/@kecoyo/egg-swagger-doc
[download-image]: https://img.shields.io/npm/dm/@kecoyo/egg-swagger-doc.svg?style=flat-square
[download-url]: https://npmjs.org/package/@kecoyo/egg-swagger-doc

这是一个关于swagger的测试版本

## 依赖说明

### 依赖的 egg 版本

@kecoyo/egg-swagger-doc 版本 | egg 1.x
--- | ---
1.x | 😁
0.x | ❌

### 依赖的插件
<!--

如果有依赖其它插件，请在这里特别说明。如

- security
- multipart

-->

## 开启插件

```js
// config/plugin.js
exports.swaggerdoc = {
  enable: true,
  package: '@kecoyo/egg-swagger-doc',
};
```

## 使用场景

- Why and What: 描述为什么会有这个插件，它主要在完成一件什么事情。
尽可能描述详细。
- How: 描述这个插件是怎样使用的，具体的示例代码，甚至提供一个完整的示例，并给出链接。

## 详细配置

请到 [config/config.default.js](config/config.default.js) 查看详细配置项说明。

## 单元测试

<!-- 描述如何在单元测试中使用此插件，例如 schedule 如何触发。无则省略。-->

## 提问交流

请到 [egg issues](https://github.com/eggjs/egg/issues) 异步交流。

## License

[MIT](LICENSE)
