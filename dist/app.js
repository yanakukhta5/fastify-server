"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.buildApp = buildApp;
const fastify_1 = __importDefault(require("fastify"));
async function buildApp(options = {}) {
    const fastify = (0, fastify_1.default)(options);
    return fastify;
}
//# sourceMappingURL=app.js.map