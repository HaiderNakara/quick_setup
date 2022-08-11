#!/usr/bin/env node
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
const chalk_1 = __importDefault(require("chalk"));
const inquirer_1 = __importDefault(require("inquirer"));
const nanospinner_1 = require("nanospinner");
const child_process_1 = require("child_process");
const util_1 = require("util");
const react_fn_1 = require("./react_fn");
const express_fn_1 = require("./express_fn");
const nest_fn_1 = require("./nest_fn");
const mern_fn_1 = require("./mern_fn");
let projectName = "projectTry";
const exec_run = (0, util_1.promisify)(child_process_1.exec);
function main() {
    return __awaiter(this, void 0, void 0, function* () {
        const answer1 = yield inquirer_1.default.prompt({
            name: "projectName",
            type: "input",
            message: "What is the name of your project?",
            default() {
                return "my-project";
            },
            validate: (name) => {
                const regex = /^[a-z0-9]+(_[a-z0-9]+)*$/;
                if (name.length < 4) {
                    return "Project name must be at least 3 characters long";
                }
                if (!regex.test(name)) {
                    return "Project name must be snake_case";
                }
                return true;
            },
        });
        projectName = answer1.projectName;
        const answer = yield inquirer_1.default.prompt({
            name: "stackName",
            type: "list",
            message: "What stack do you want to use?",
            choices: [
                "Mern",
                "Mern + Typescript",
                "React(Typescript) + Nestjs + MongoDb",
                "React",
                "React(Typescript)",
                "Nestjs",
                "Nestjs + MongoDb",
                "Express(Typescript)",
                "Express",
            ],
        });
        console.log(chalk_1.default.green(`You have selected ${answer.stackName}`));
        const spinner = (0, nanospinner_1.createSpinner)();
        spinner.start({ text: "Creating project" });
        return createProject(projectName, answer.stackName).then(() => {
            spinner.success({ text: "Project created" });
            console.log(chalk_1.default.green("cd " + projectName));
        });
    });
}
function createProject(name, stackName) {
    return __awaiter(this, void 0, void 0, function* () {
        console.clear();
        console.log(chalk_1.default.green(`Creating project ${name}`));
        switch (stackName) {
            case "Mern":
                yield (0, mern_fn_1.createMern)(name);
                break;
            case "Mern + Typescript":
                yield (0, mern_fn_1.createMernTypescript)(name);
                break;
            case "React(Typescript) + Nestjs + MongoDb":
                yield (0, mern_fn_1.createReactNestJsMongo)(name);
                break;
            case "React":
                yield (0, react_fn_1.createReact)(name);
                break;
            case "React(Typescript)":
                yield (0, react_fn_1.createRectTypescript)(name);
                break;
            case "Nestjs":
                yield (0, nest_fn_1.createNestJs)(name);
                break;
            case "Nestjs + MongoDb":
                yield (0, nest_fn_1.createNestJs)(name);
                break;
            case "Express(Typescript)":
                yield (0, express_fn_1.createExpressTypescript)(name);
                break;
            case "Express":
                yield (0, express_fn_1.createExpressJavascript)(name);
                break;
        }
    });
}
main();
