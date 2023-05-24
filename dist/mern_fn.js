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
exports.createReactNestJsMongoVite = exports.createMernViteTypescript = exports.createMernVite = exports.createReactNestJsMongo = exports.createMernTypescript = exports.createMern = void 0;
const express_fn_1 = require("./express_fn");
const nest_fn_1 = require("./nest_fn");
const react_fn_1 = require("./react_fn");
const util_fn_1 = require("./util_fn");
const vite_fn_1 = require("./vite_fn");
function createMern(name) {
    return __awaiter(this, void 0, void 0, function* () {
        try {
            yield (0, util_fn_1.createDict)(name);
            yield (0, express_fn_1.createExpress_Js)(name);
            yield (0, react_fn_1.createReact_Js)(name);
        }
        catch (error) {
            console.log(error);
        }
    });
}
exports.createMern = createMern;
function createMernTypescript(name) {
    return __awaiter(this, void 0, void 0, function* () {
        try {
            yield (0, util_fn_1.createDict)(name);
            yield (0, express_fn_1.createExpress_Ts)(name);
            yield (0, react_fn_1.createReact_Ts)(name);
        }
        catch (error) {
            console.log(error);
        }
    });
}
exports.createMernTypescript = createMernTypescript;
function createReactNestJsMongo(name) {
    return __awaiter(this, void 0, void 0, function* () {
        try {
            yield (0, util_fn_1.createDict)(name);
            yield (0, react_fn_1.createReact_Ts)(name);
            yield (0, nest_fn_1.create_nestjs)(name);
        }
        catch (error) {
            console.log(error);
        }
    });
}
exports.createReactNestJsMongo = createReactNestJsMongo;
// "Mern(Vite)",
//       "Mern(Vite) + Typescript",
//       "React(Vite-ts) + Nestjs + MongoDb",
function createMernVite(name) {
    return __awaiter(this, void 0, void 0, function* () {
        try {
            yield (0, util_fn_1.createDict)(name);
            yield (0, express_fn_1.createExpress_Js)(name);
            yield (0, vite_fn_1.createReact_Vite)(name);
        }
        catch (error) {
            console.log(error);
        }
    });
}
exports.createMernVite = createMernVite;
function createMernViteTypescript(name) {
    return __awaiter(this, void 0, void 0, function* () {
        try {
            yield (0, util_fn_1.createDict)(name);
            yield (0, express_fn_1.createExpress_Ts)(name);
            yield (0, vite_fn_1.createReact_Vite_Ts)(name);
        }
        catch (error) {
            console.log(error);
        }
    });
}
exports.createMernViteTypescript = createMernViteTypescript;
function createReactNestJsMongoVite(name) {
    return __awaiter(this, void 0, void 0, function* () {
        try {
            yield (0, util_fn_1.createDict)(name);
            yield (0, vite_fn_1.createReact_Vite_Ts)(name);
            yield (0, nest_fn_1.create_nestjs)(name);
        }
        catch (error) {
            console.log(error);
        }
    });
}
exports.createReactNestJsMongoVite = createReactNestJsMongoVite;
