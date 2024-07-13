"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const fs_1 = __importDefault(require("fs"));
const util_1 = __importDefault(require("util"));
const _1 = require(".");
exports.getResources = async (ctx, options) => {
    const { resolveUrl } = options;
    const files = await _1.matchFiles(ctx, options);
    files.forEach(file => ctx.dependency(file));
    const resources = await Promise.all(files.map(async (file) => {
        const content = await util_1.default.promisify(fs_1.default.readFile)(file, 'utf8');
        const resource = { file, content };
        return resolveUrl ? _1.resolveImportUrl(ctx, resource) : resource;
    }));
    return resources;
};
//# sourceMappingURL=get-resources.js.map