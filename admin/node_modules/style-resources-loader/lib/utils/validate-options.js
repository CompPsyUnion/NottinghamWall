"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const schema_utils_1 = __importDefault(require("schema-utils"));
const __1 = require("..");
const _1 = require(".");
exports.validateOptions = options => schema_utils_1.default(__1.schema, options, {
    name: _1.LOADER_NAME,
    baseDataPath: _1.VALIDATION_BASE_DATA_PATH,
});
//# sourceMappingURL=validate-options.js.map