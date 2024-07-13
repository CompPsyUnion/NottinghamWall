"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const _1 = require(".");
exports.loadResources = async (ctx, source, callback) => {
    try {
        const options = _1.normalizeOptions(ctx);
        const resources = await _1.getResources(ctx, options);
        const content = await _1.injectResources(options, source, resources);
        return callback(null, content);
    }
    catch (err) {
        return callback(err);
    }
};
//# sourceMappingURL=load-resources.js.map