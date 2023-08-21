"use strict";
const fs = require("fs");

module.exports = {
  /**
   * 获取controller文件内容
   */
  getControlContent(control) {
    // const symbleKey = Symbol.for('EGG_LOADER_ITEM_FULLPATH');
    const symbleKey = Reflect.ownKeys(control).find((key) => key.toString() === "Symbol(EGG_LOADER_ITEM_FULLPATH)");
    if (symbleKey) {
      const itemFullPath = control[symbleKey];
      const content = fs.readFileSync(itemFullPath, "utf-8");
      return content;
    }
    return null;
  },

  /**
   * 获取方法的注释
   */
  getFuncComment(content, funcName) {
    let result = content.match(new RegExp(`@summary.*\\n(^\\s*\\*\\s*.*\\n)*(\\s*async\\s+${funcName}\\(\\)\\s*\\{)`, "gm"));
    if (result) {
      return result[0];
    }
    return null;
  },

  /**
   * 获取router中apikey
   */
  getRouteApikey(comment = "") {
    const result = /@(apikey)/gi.exec(comment);
    if (result) {
      return result[1].toLowerCase();
    }
    return null;
  },

  /**
   * 获取router中method
   */
  getRouteMethod(comment = "") {
    const result = /@[r|R]outer\s+(\w+)/g.exec(comment);
    if (result) {
      return result[1].toLowerCase();
    }
    return null;
  },

  /**
   * 获取router中path
   */
  getRoutePath(comment = "") {
    const result = /@[r|R]outer\s+\w+\s+(\S+)/g.exec(comment);
    if (result) {
      return result[1];
    }
    return null;
  },
};
