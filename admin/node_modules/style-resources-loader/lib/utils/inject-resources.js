"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const _1 = require(".");
exports.injectResources = async (options, source, resources) => {
    const { injector } = options;
    const dist = injector(source, resources);
    const content = _1.isPromise(dist) ? await dist : dist;
    if (typeof content !== 'string') {
        throw new Error(_1.errorMessage.invalidInjectorReturn);
    }
    return content;
};
//# sourceMappingURL=inject-resources.js.map