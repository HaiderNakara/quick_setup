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
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.test_all = void 0;
const chalk_1 = __importDefault(require("chalk"));
const express_fn_1 = require("./express_fn");
const mern_fn_1 = require("./mern_fn");
const nest_fn_1 = require("./nest_fn");
const react_fn_1 = require("./react_fn");
function test_all(name, stackName) {
    return __awaiter(this, void 0, void 0, function* () {
        console.clear();
        console.log(chalk_1.default.green(`Creating project ${name}`));
        switch (stackName) {
            case "Mern":
                yield (0, mern_fn_1.createMern)(name + "_one");
            case "Mern + Typescript":
                yield (0, mern_fn_1.createMernTypescript)(name + "_two");
            case "React(Typescript) + Nestjs + MongoDb":
                yield (0, mern_fn_1.createReactNestJsMongo)(name + "_three");
            case "React":
                yield (0, react_fn_1.createReact)(name + "_four");
            case "React(Typescript)":
                yield (0, react_fn_1.createRectTypescript)(name + "_five");
            case "Nestjs":
                yield (0, nest_fn_1.createNestJs)(name + "_six");
            case "Nestjs + MongoDb":
                yield (0, nest_fn_1.createNestJs)(name + "_seven");
            case "Express(Typescript)":
                yield (0, express_fn_1.createExpressTypescript)(name + "_eight");
            case "Express":
                yield (0, express_fn_1.createExpressJavascript)(name + "_nine");
                break;
        }
    });
}
exports.test_all = test_all;
test_all("test", "Mern");
