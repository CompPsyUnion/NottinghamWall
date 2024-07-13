"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const _1 = require(".");
const formatErrorMessage = (message) => `[${_1.PACKAGE_NAME}] ${message}`;
const messageByType = {
    impossible: `This error is caused by a bug. Please file an issue: ${_1.ISSUES_URL}.`,
    syncCompilation: 'Synchronous compilation is not supported.',
    invalidInjectorReturn: 'Expected options.injector(...) returns a string. Instead received number.',
};
exports.errorMessage = Object.entries(messageByType).reduce((errorMessage, [type, message]) => ({
    ...errorMessage,
    [type]: formatErrorMessage(message),
}), messageByType);
//# sourceMappingURL=error-message.js.map