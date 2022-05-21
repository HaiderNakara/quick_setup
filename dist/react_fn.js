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
exports.createReact_Ts = exports.createReact_Js = exports.createRectTypescript = exports.createReact = void 0;
const child_process_1 = require("child_process");
const util_1 = require("util");
const util_fn_1 = require("./util_fn");
const exec_run = (0, util_1.promisify)(child_process_1.exec);
function createReact(name) {
    return __awaiter(this, void 0, void 0, function* () {
        try {
            yield (0, util_fn_1.createDict)(name);
            yield createReact_Js(name);
        }
        catch (error) {
            console.log(error);
        }
    });
}
exports.createReact = createReact;
function createRectTypescript(name) {
    return __awaiter(this, void 0, void 0, function* () {
        try {
            yield (0, util_fn_1.createDict)(name);
            yield createReact_Ts(name);
        }
        catch (error) {
            console.log(error);
        }
    });
}
exports.createRectTypescript = createRectTypescript;
function createReact_Js(name) {
    return __awaiter(this, void 0, void 0, function* () {
        yield exec_run(`cd ${name} && npx create-react-app ${name}_frontend && cd ${name}_frontend && npm install axios @reduxjs/toolkit react-redux redux react-router-dom react-router`);
    });
}
exports.createReact_Js = createReact_Js;
function createReact_Ts(name) {
    return __awaiter(this, void 0, void 0, function* () {
        yield exec_run(`cd ${name} && npx create-react-app ${name}_frontend --template typescript && cd ${name}_frontend && npm install axios @reduxjs/toolkit react-redux redux react-router-dom react-router`);
    });
}
exports.createReact_Ts = createReact_Ts;
