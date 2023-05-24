"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.createReact_Vite_Ts = exports.createReact_Vite = exports.createViteReactTypescript = exports.createViteReact = void 0;
const child_process_1 = require("child_process");
const util_1 = require("util");
const util_fn_1 = require("./util_fn");
const exec_run = (0, util_1.promisify)(child_process_1.exec);
function createViteReact(name) {
    return __awaiter(this, void 0, void 0, function* () {
        try {
            yield (0, util_fn_1.createDict)(name);
            yield createReact_Vite(name);
        }
        catch (error) {
            console.log(error);
        }
    });
}
exports.createViteReact = createViteReact;
function createViteReactTypescript(name) {
    return __awaiter(this, void 0, void 0, function* () {
        try {
            yield (0, util_fn_1.createDict)(name);
            yield createReact_Vite_Ts(name);
        }
        catch (error) {
            console.log(error);
        }
    });
}
exports.createViteReactTypescript = createViteReactTypescript;
// react, react-ts
function createReact_Vite(name) {
    return __awaiter(this, void 0, void 0, function* () {
        yield exec_run(`cd ${name} && npm create vite@latest ${name}_frontend -- --template react && cd ${name}_frontend && npm install axios @reduxjs/toolkit react-redux redux react-router-dom react-router`);
    });
}
exports.createReact_Vite = createReact_Vite;
function createReact_Vite_Ts(name) {
    return __awaiter(this, void 0, void 0, function* () {
        yield exec_run(`cd ${name} && npm create vite@latest ${name}_frontend -- --template react-ts && cd ${name}_frontend && npm install axios @reduxjs/toolkit react-redux redux react-router-dom react-router`);
    });
}
exports.createReact_Vite_Ts = createReact_Vite_Ts;
