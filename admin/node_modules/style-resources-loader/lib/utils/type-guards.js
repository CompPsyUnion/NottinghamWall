"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const path_1 = __importDefault(require("path"));
const is_promise_1 = __importDefault(require("is-promise"));
exports.isPromise = is_promise_1.default;
const _1 = require(".");
exports.isFunction = (arg) => typeof arg === 'function';
exports.isStyleFile = (file) => _1.SUPPORTED_FILE_EXTS.includes(path_1.default.extname(file));
//# sourceMappingURL=type-guards.js.map