"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.PACKAGE_NAME = 'style-resources-loader';
exports.ISSUES_URL = `https://github.com/yenshih/${exports.PACKAGE_NAME}/issues`;
exports.LOADER_NAME = exports.PACKAGE_NAME.split('-')
    .map(word => `${word[0].toUpperCase()}${word.slice(1)}`)
    .join(' ');
exports.VALIDATION_BASE_DATA_PATH = 'options';
exports.SUPPORTED_FILE_FORMATS = ['css', 'sass', 'scss', 'less', 'styl'];
exports.SUPPORTED_FILE_EXTS = exports.SUPPORTED_FILE_FORMATS.map(type => `.${type}`);
//# sourceMappingURL=constants.js.map